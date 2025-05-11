import { useRef, useState } from 'react';
import useOnClickOutside from '../../../utils/clickOutside';
import { deletePost, savePost } from '../../../store/actions/postsActions';
import { saveAs } from 'file-saver';
import { useDispatch } from 'react-redux';

export default function PostMenu({
  postUserId,
  userId,
  imagesLength,
  setShowMenu,
  token,
  postId,
  checkSaved,
  setCheckSaved,
  images,
  postRef,
  post,
  setShowEdit,
}) {
  const dispatch = useDispatch();
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowMenu(false));

  const saveHandler = async () => {
    dispatch(savePost(postId, token));
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };

  const downloadImages = async () => {
    images.map((img) => {
      return saveAs(img.url, 'image.jpg');
    });
  };

  const deleteHandler = async () => {
    try {
      if (!postId) {
        console.error('❌ [deleteHandler] Brak ID posta');
        alert('Nie można usunąć posta - brak identyfikatora posta.');
        return;
      }

      if (!token) {
        console.error('❌ [deleteHandler] Brak tokena autoryzacji');
        alert(
          'Nie można usunąć posta - brak autoryzacji. Zaloguj się ponownie.',
        );
        return;
      }

      console.log('🔍 [deleteHandler] Rozpoczęcie usuwania posta:', { postId });

      console.log('🔄 [deleteHandler] Wysyłanie żądania usunięcia...');
      const res = await dispatch(deletePost(postId, token));
      console.log('✅ [deleteHandler] Odpowiedź z usuwania:', res);

      if (res.status === 'error') {
        console.error(
          '❌ [deleteHandler] Błąd zwrócony przez API:',
          res.message,
        );
        alert(`Wystąpił błąd podczas usuwania posta: ${res.message}`);
        return;
      }

      if (postRef && postRef.current) {
        console.log('🔄 [deleteHandler] Usuwanie elementu DOM posta');
        postRef.current.remove();
      } else {
        console.log(
          '⚠️ [deleteHandler] Nie znaleziono referencji do posta w DOM, ale post został usunięty z bazy',
        );
        alert('Post został usunięty. Odśwież stronę, aby zobaczyć zmiany.');
      }
      setShowMenu(false);
    } catch (error) {
      // Ten catch powinien zostać wykonany tylko jeśli wystąpi błąd w kodzie powyżej, a nie w API
      console.error('❌ [deleteHandler] Nieoczekiwany błąd:', error);
      alert('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
    }
  };

  const editHandler = () => {
    setShowEdit(true);
    setShowMenu(false);
  };

  return (
    <div className='menu-container' ref={menu}>
      {test && (
        <div className='menu-item'>
          <div className='icon'>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              <path
                fill='#5f6368'
                d='M16,12V4H17V2H7V4H8V12L6,14V16H18V14L16,12Z'
              ></path>
            </svg>
          </div>
          <div className='menu-text'>
            <h3 className='menu-title'>Przypnij post</h3>
          </div>
        </div>
      )}

      <div
        className={`menu-item ${checkSaved ? 'selected' : ''}`}
        onClick={saveHandler}
      >
        <div className='icon'>
          <svg viewBox='0 0 24 24' width='24' height='24'>
            <path
              fill='#5f6368'
              d='M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5A2,2 0 0,0 17,3M12,13H7V11H12V13M17,9H7V7H17V9Z'
            ></path>
          </svg>
        </div>
        <div className='menu-text'>
          <h3 className='menu-title'>
            {checkSaved ? 'Anuluj zapisanie filmu' : 'Zapisz film'}
          </h3>
          <p className='menu-subtitle'>
            {checkSaved
              ? 'Usuń z zapisanych elementów.'
              : 'Dodaj do zapisanych elementów.'}
          </p>
        </div>
      </div>

      <div className='menu-item'>
        <div className='icon'>
          <svg viewBox='0 0 24 24' width='24' height='24'>
            <path
              fill='#5f6368'
              d='M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20'
            ></path>
          </svg>
        </div>
        <div className='menu-text'>
          <h3 className='menu-title'>Kto może komentować Twój post?</h3>
        </div>
      </div>

      {test && (
        <div className='menu-item' onClick={editHandler}>
          <div className='icon'>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              <path
                fill='#5f6368'
                d='M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z'
              ></path>
            </svg>
          </div>
          <div className='menu-text'>
            <h3 className='menu-title'>Edytuj post</h3>
          </div>
        </div>
      )}

      {test && (
        <div className='menu-item'>
          <div className='icon'>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              <path
                fill='#5f6368'
                d='M19.43,12.98C19.47,12.66 19.5,12.34 19.5,12C19.5,11.66 19.47,11.34 19.43,11.02L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.97 19.05,5.05L16.56,6.05C16.04,5.65 15.48,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.52,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11.02C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.66 4.57,12.98L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.95C7.96,18.35 8.52,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.48,18.68 16.04,18.34 16.56,17.95L19.05,18.95C19.27,19.04 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.98M13,15C11.34,15 10,13.66 10,12C10,10.34 11.34,9 13,9C14.66,9 16,10.34 16,12C16,13.66 14.66,15 13,15Z'
              ></path>
            </svg>
          </div>
          <div className='menu-text'>
            <h3 className='menu-title'>Edytuj grupę odbiorców</h3>
          </div>
        </div>
      )}

      <div className='menu-item'>
        <div className='icon'>
          <svg viewBox='0 0 24 24' width='24' height='24'>
            <path
              fill='#5f6368'
              d='M20.06,18C20,17.83 19.91,17.54 19.86,17.11C19.19,17.81 18.38,18.16 17.45,18.16C16.62,18.16 15.93,17.92 15.4,17.45C14.87,17 14.6,16.39 14.6,15.66C14.6,14.78 14.93,14.1 15.6,13.61C16.27,13.12 17.21,12.88 18.43,12.88H19.83V12.24C19.83,11.75 19.68,11.36 19.38,11.07C19.08,10.78 18.63,10.64 18.05,10.64C17.53,10.64 17.1,10.76 16.75,11C16.4,11.25 16.23,11.54 16.23,11.89H14.77C14.77,11.46 14.92,11.05 15.22,10.65C15.5,10.25 15.93,9.94 16.44,9.71C16.95,9.5 17.5,9.36 18.13,9.36C19.11,9.36 19.87,9.6 20.42,10.09C20.97,10.58 21.26,11.25 21.28,12.11V16.07C21.28,16.86 21.38,17.49 21.58,17.95V18H20.06M17.66,16.88C18.11,16.88 18.54,16.77 18.95,16.56C19.35,16.35 19.65,16.07 19.83,15.73V14.16H18.7C16.93,14.16 16.04,14.63 16.04,15.57C16.04,16 16.19,16.3 16.5,16.53C16.8,16.76 17.18,16.88 17.66,16.88M5.46,13.71H9.53L7.5,8.29L5.46,13.71M6.64,6H8.36L13.07,18H11.14L10.17,15.43H4.82L3.86,18H1.93L6.64,6M12.42,9H15.5V10.21H12.42V9M12.42,11.79H15.5V13H12.42V11.79M12.42,14.57H15.5V15.79H12.42V14.57Z'
            ></path>
          </svg>
        </div>
        <div className='menu-text'>
          <h3 className='menu-title'>Wyłącz tłumaczenia</h3>
        </div>
      </div>

      {test && (
        <div className='menu-item'>
          <div className='icon'>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              <path
                fill='#5f6368'
                d='M19,4H18V2H16V4H8V2H6V4H5C3.89,4 3,4.89 3,6V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V6C21,4.89 20.11,4 19,4M19,20H5V10H19V20M19,8H5V6H19V8Z'
              ></path>
            </svg>
          </div>
          <div className='menu-text'>
            <h3 className='menu-title'>Edytuj datę</h3>
          </div>
        </div>
      )}

      {imagesLength > 0 && (
        <div className='menu-item' onClick={downloadImages}>
          <div className='icon'>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              <path
                fill='#5f6368'
                d='M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2, 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3'
              ></path>
            </svg>
          </div>
          <div className='menu-text'>
            <h3 className='menu-title'>Pobierz</h3>
          </div>
        </div>
      )}

      {test && (
        <div className='menu-item'>
          <div className='icon'>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              <path
                fill='#5f6368'
                d='M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z'
              ></path>
            </svg>
          </div>
          <div className='menu-text'>
            <h3 className='menu-title'>
              Odśwież dane udostępniania załącznika
            </h3>
          </div>
        </div>
      )}

      <div className='divider'></div>

      {test && (
        <div className='menu-item'>
          <div className='icon'>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              <path
                fill='#5f6368'
                d='M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z'
              ></path>
            </svg>
          </div>
          <div className='menu-text'>
            <h3 className='menu-title'>Przenieś do archiwum</h3>
          </div>
        </div>
      )}

      {test && (
        <div className='menu-item' onClick={deleteHandler}>
          <div className='icon'>
            <svg viewBox='0 0 24 24' width='24' height='24'>
              <path
                fill='#5f6368'
                d='M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z'
              ></path>
            </svg>
          </div>
          <div className='menu-text'>
            <h3 className='menu-title'>Przenieś do kosza</h3>
            <p className='menu-subtitle'>
              Elementy w koszu są usuwane po 30 dniach.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
