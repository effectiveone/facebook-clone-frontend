import { Link } from 'react-router-dom';
import './style.scss';
import Moment from 'react-moment';
import { Dots, Public } from '../../../assets/svg';
import ReactsPopup from './ReactsPopup';
import { useEffect, useRef, useState } from 'react';
import CreateComment from './CreateComment';
import PostMenu from './PostMenu';
import {
  getReacts,
  reactPost,
  updatePost,
} from '../../../store/actions/postsActions';
import Comment from './Comment';
import { useDispatch } from 'react-redux';
import { getOrCreateToken } from '../../../helpers/authHelper';

export default function Post({ post, user, profile }) {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(1);
  const [checkSaved, setCheckSaved] = useState();
  const [comments, setComments] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editText, setEditText] = useState(post?.text || '');

  useEffect(() => {
    getPostReacts();
  }, [post]);
  useEffect(() => {
    setComments(post?.comments);
  }, [post]);
  useEffect(() => {
    if (post?.text && !showEdit) {
      setEditText(post.text);
    }
  }, [post, showEdit]);

  const getPostReacts = async () => {
    const token = user?.token || getOrCreateToken();

    if (!token) {
      console.error('Brak tokena autoryzacji');
      return;
    }

    try {
      const res = await dispatch(getReacts(post?._id, token));

      if (res) {
        setReacts(res.reacts);
        setCheck(res.check);
        setTotal(res.total);
        setCheckSaved(res.checkSaved);
      }
    } catch (error) {
      console.error('Błąd podczas pobierania reakcji:', error);
    }
  };

  const reactHandler = async (type) => {
    const token = user?.token || getOrCreateToken();

    if (!token) {
      console.error('Brak tokena autoryzacji');
      return;
    }

    dispatch(reactPost(post._id, type, token));

    if (check === type) {
      setCheck();
      if (reacts && Array.isArray(reacts)) {
        let index = reacts.findIndex((x) => x.react === check);
        if (index !== -1) {
          const newReacts = [...reacts];
          newReacts[index] = {
            ...newReacts[index],
            count: newReacts[index].count - 1,
          };
          setReacts(newReacts);
          setTotal((prev) => prev - 1);
        }
      }
    } else {
      setCheck(type);
      if (reacts && Array.isArray(reacts)) {
        let index = reacts.findIndex((x) => x.react === type);
        let index1 = reacts.findIndex((x) => x.react === check);

        const newReacts = [...reacts];

        if (index !== -1) {
          newReacts[index] = {
            ...newReacts[index],
            count: newReacts[index].count + 1,
          };
          setReacts(newReacts);
          setTotal((prev) => prev + 1);
        }

        if (index1 !== -1) {
          newReacts[index1] = {
            ...newReacts[index1],
            count: newReacts[index1].count - 1,
          };
          setReacts(newReacts);
          setTotal((prev) => prev - 1);
        }
      }
    }
  };

  const updatePostHandler = async () => {
    const token = user?.token || getOrCreateToken();

    if (!token) {
      console.error('❌ [updatePostHandler] Brak tokena autoryzacji');
      alert(
        'Nie można zaktualizować posta - brak autoryzacji. Zaloguj się ponownie.',
      );
      return;
    }

    if (!post?._id) {
      console.error('❌ [updatePostHandler] Brak ID posta');
      alert('Nie można zaktualizować posta - brak identyfikatora posta.');
      return;
    }

    console.log('🔍 [updatePostHandler] Przygotowanie aktualizacji posta:', {
      postId: post._id,
      editText: editText,
      originalText: post?.text,
      isTextChanged: editText !== post?.text,
    });

    const updatedPost = {
      text: editText,
      background: post?.background,
      images: post?.images,
    };

    try {
      console.log('🔄 [updatePostHandler] Wysyłanie żądania aktualizacji...');
      const response = await dispatch(updatePost(post._id, updatedPost, token));
      console.log('✅ [updatePostHandler] Odpowiedź z aktualizacji:', response);

      if (response.status === 'error') {
        console.error(
          '❌ [updatePostHandler] Błąd zwrócony przez API:',
          response.message,
        );
        alert(`Wystąpił błąd podczas aktualizacji posta: ${response.message}`);
        return;
      }

      setShowEdit(false);
      // Aktualizujemy lokalnie zawartość posta
      post.text = editText;
    } catch (error) {
      // Ten catch powinien zostać wykonany tylko jeśli wystąpi błąd w kodzie powyżej, a nie w API
      console.error('❌ [updatePostHandler] Nieoczekiwany błąd:', error);
      alert('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
    }
  };

  const showMore = () => {
    setCount((prev) => prev + 3);
  };
  const postRef = useRef(null);
  return (
    <div
      className='post'
      style={{ width: `${profile && '100%'}` }}
      ref={postRef}
    >
      <div className='post_header'>
        <Link
          to={`/profile/${post.user?.username}`}
          className='post_header_left'
        >
          <img src={post.user?.picture} alt='' />
          <div className='header_col'>
            <div className='post_profile_name'>
              {post.user?.first_name} {post.user?.last_name}
              <div className='updated_p'>
                {post?.type === 'profilePicture' &&
                  `updated ${
                    post.user?.gender === 'male' ? 'his' : 'her'
                  } profile picture`}
                {post?.type === 'coverPicture' &&
                  `updated ${
                    post.user?.gender === 'male' ? 'his' : 'her'
                  } cover picture`}
              </div>
            </div>
            <div className='post_profile_privacy_date'>
              <Moment fromNow interval={30}>
                {post?.createdAt}
              </Moment>
              . <Public color='#828387' />
            </div>
          </div>
        </Link>
        <div
          className='post_header_right hover1'
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color='#828387' />
        </div>
      </div>

      {showEdit ? (
        <div className='edit_post_form'>
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder='Edytuj swój post...'
            className='edit_textarea'
          />
          <div className='edit_post_buttons'>
            <button
              className='edit_post_cancel'
              onClick={() => {
                setShowEdit(false);
                setEditText(post?.text || '');
              }}
            >
              Anuluj
            </button>
            <button className='edit_post_submit' onClick={updatePostHandler}>
              Zapisz
            </button>
          </div>
        </div>
      ) : post?.background ? (
        <div
          className='post_bg'
          style={{ backgroundImage: `url(${post?.background})` }}
        >
          <div className='post_bg_text'>{post?.text}</div>
        </div>
      ) : post?.type === null ? (
        <>
          <div className='post_text'>{post?.text}</div>
          {post?.images && post.images?.length && (
            <div
              className={
                post.images.length === 1
                  ? 'grid_1'
                  : post.images.length === 2
                    ? 'grid_2'
                    : post.images.length === 3
                      ? 'grid_3'
                      : post.images.length === 4
                        ? 'grid_4'
                        : post.images.length >= 5 && 'grid_5'
              }
            >
              {post.images?.slice(0, 5).map((image, i) => (
                <img src={image.url} key={i} alt='' className={`img-${i}`} />
              ))}
              {post.images?.length > 5 && (
                <div className='more-pics-shadow'>
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post?.type === 'profilePicture' ? (
        <div className='post_profile_wrap'>
          <div className='post_updated_bg'>
            <img src={post.user?.cover} alt='' />
          </div>
          <img
            src={post?.images[0]?.url}
            alt=''
            className='post_updated_picture'
          />
        </div>
      ) : (
        <div className='post_cover_wrap'>
          <img src={post?.images[0]?.url} alt='' />
        </div>
      )}

      <div className='post_infos'>
        <div className='reacts_count'>
          <div className='reacts_count_imgs'>
            {reacts &&
              reacts
                .sort((a, b) => {
                  return b.count - a.count;
                })
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        alt=''
                        key={i}
                      />
                    ),
                )}
          </div>
          <div className='reacts_count_num'>{total > 0 && total}</div>
        </div>
        <div className='to_right'>
          <div className='comments_count'>{comments.length} comments</div>
          <div className='share_count'>0 share</div>
        </div>
      </div>
      <div className='post_actions'>
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
        <div
          className='post_action hover1'
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => reactHandler(check ? check : 'like')}
        >
          {check ? (
            <img
              src={`../../../reacts/${check}.svg`}
              alt=''
              className='small_react'
              style={{ width: '18px' }}
            />
          ) : (
            <i className='like_icon'></i>
          )}
          <span
            style={{
              color: `
          
          ${
            check === 'like'
              ? '#4267b2'
              : check === 'love'
                ? '#f63459'
                : check === 'haha'
                  ? '#f7b125'
                  : check === 'sad'
                    ? '#f7b125'
                    : check === 'wow'
                      ? '#f7b125'
                      : check === 'angry'
                        ? '#e4605a'
                        : ''
          }
          `,
            }}
          >
            {check ? check : 'Like'}
          </span>
        </div>
        <div className='post_action hover1'>
          <i className='comment_icon'></i>
          <span>Comment</span>
        </div>
        <div className='post_action hover1'>
          <i className='share_icon'></i>
          <span>Share</span>
        </div>
      </div>
      <div className='comments_wrap'>
        <div className='comments_order'></div>
        <CreateComment
          user={user}
          postId={post?._id}
          setComments={setComments}
          setCount={setCount}
        />
        {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            ?.map((comment, i) => <Comment comment={comment} key={i} />)}
        {count < comments.length && (
          <div className='view_comments' onClick={() => showMore()}>
            View more comments
          </div>
        )}
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post?.user._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
          postId={post?._id}
          token={user?.token}
          checkSaved={checkSaved}
          setCheckSaved={setCheckSaved}
          images={post?.images}
          postRef={postRef}
          post={post}
          setShowEdit={setShowEdit}
        />
      )}
    </div>
  );
}
