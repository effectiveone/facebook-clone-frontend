import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import useClickOutside from '../../utils/clickOutside';
import getCroppedImg from '../../utils/getCroppedImg';
import { uploadImages } from '../../store/actions/uploadImages';
import { useSelector, useDispatch } from 'react-redux';
import { updateCover, updateUserCover } from '../../store/actions/userActions';
import { createPost } from '../../store/actions/postsActions';
import PulseLoader from 'react-spinners/PulseLoader';
import OldCovers from './OldCovers';

export default function Cover({ cover, visitor, photos }) {
  const [showCoverMneu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => {
    return { ...state };
  });
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const refInput = useRef(null);
  const cRef = useRef(null);
  useClickOutside(menuRef, () => setShowCoverMenu(false));
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('Cover prop:', cover);
    console.log('User from Redux:', user);
    if (cover) {
      console.log('URL okładki:', cover);
      if (cRef.current) {
        console.log('Aktualizuję src obrazu okładki');
        cRef.current.src = cover;
      }
    }
  }, [cover, user]);

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/webp' &&
      file.type !== 'image/gif'
    ) {
      setError(`${file.name} format is not supported.`);
      setShowCoverMenu(false);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      setShowCoverMenu(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
    };
  };

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
        setError('Error cropping image');
      }
    },
    [croppedAreaPixels, coverPicture],
  );

  const coverRef = useRef(null);
  const [width, setWidth] = useState();

  useEffect(() => {
    if (coverRef.current) {
      setWidth(coverRef.current.clientWidth);
    }
  }, []);

  const updateCoverPicture = async () => {
    if (!user) {
      setError('User not found');
      return;
    }

    try {
      setLoading(true);
      console.log('Rozpoczynam aktualizację okładki...');

      const img = await getCroppedImage();
      if (!img) {
        throw new Error('Failed to crop image');
      }
      console.log('Zdjęcie przycięte pomyślnie');

      const blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);
      console.log('Wysyłam zdjęcie do backendu...');

      const res = await uploadImages(formData, path, user.token);
      if (typeof res === 'string') {
        throw new Error(res);
      }
      console.log('Zdjęcie przesłane do Cloudinary:', res[0].url);

      try {
        console.log('Wywołuję updateCover z URL:', res[0].url);
        const updated_picture = await updateCover({ url: res[0].url })();
        console.log('Odpowiedź z backendu:', updated_picture);

        if (updated_picture && updated_picture.cover) {
          console.log('Nowy URL okładki:', updated_picture.cover);
          console.log('Dyspatchuję akcję updateUserCover...');
          dispatch(updateUserCover(updated_picture.cover));

          // Aktualizuję stan lokalny
          setCoverPicture('');
          if (cRef.current) {
            console.log('Aktualizuję src obrazu...');
            cRef.current.src = updated_picture.cover;
          }

          console.log('Tworzę nowy post...');
          const new_post = await dispatch(
            createPost('coverPicture', null, null, res, user.id, user.token),
          );
          if (new_post.status === 'ok') {
            console.log('Post utworzony pomyślnie');
          } else {
            throw new Error(new_post.message || 'Failed to create post');
          }
        } else {
          throw new Error('Nieprawidłowa odpowiedź z serwera');
        }
      } catch (error) {
        console.error('Błąd podczas aktualizacji okładki:', error);
        setError(error.message || 'Wystąpił błąd podczas aktualizacji okładki');
      }
    } catch (error) {
      console.error('Błąd podczas przetwarzania zdjęcia:', error);
      setError(error.message || 'Wystąpił błąd podczas przetwarzania zdjęcia');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='profile_cover' ref={coverRef}>
      {coverPicture && (
        <div className='save_changes_cover'>
          <div className='save_changes_left'>
            <i className='public_icon'></i>
            Your cover photo is public
          </div>
          <div className='save_changes_right'>
            <button
              className='blue_btn opacity_btn'
              onClick={() => setCoverPicture('')}
            >
              Cancel
            </button>
            <button
              className='blue_btn'
              onClick={updateCoverPicture}
              disabled={loading}
            >
              {loading ? <PulseLoader color='#fff' size={5} /> : 'Save changes'}
            </button>
          </div>
        </div>
      )}
      <input
        type='file'
        ref={refInput}
        hidden
        accept='image/jpeg,image/png,image/webp,image/gif'
        onChange={handleImage}
      />
      {error && (
        <div className='postError comment_error cover_error'>
          <div className='postError_error'>{error}</div>
          <button className='blue_btn' onClick={() => setError('')}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className='cover_crooper'>
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={width / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit='horizontal-cover'
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img
          src={cover}
          className='cover'
          alt=''
          ref={cRef}
          onLoad={() => console.log('Obraz okładki załadowany pomyślnie')}
          onError={(e) => {
            console.error('Błąd ładowania obrazu okładki:', e);
            setError('Błąd ładowania obrazu okładki');
          }}
        />
      )}
      {!visitor && (
        <div className='udpate_cover_wrapper'>
          <div
            className='open_cover_update'
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className='camera_filled_icon'></i>
            Add Cover Photo
          </div>
          {showCoverMneu && (
            <div className='open_cover_menu' ref={menuRef}>
              <div
                className='open_cover_menu_item hover1'
                onClick={() => setShow(true)}
              >
                <i className='photo_icon'></i>
                Select Photo
              </div>
              <div
                className='open_cover_menu_item hover1'
                onClick={() => refInput.current.click()}
              >
                <i className='upload_icon'></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
      {show && (
        <OldCovers
          photos={photos}
          setCoverPicture={setCoverPicture}
          setShow={setShow}
        />
      )}
    </div>
  );
}
