import { useRef, useState } from 'react';
import './createPostPopup.scss';
import EmojiPickerBackgrounds from './EmojiPickerBackgrounds';
import AddToYourPost from './AddToYourPost';
import ImagePreview from './ImagePreview';
import useClickOutside from '../../../utils/clickOutside';
import { createPost } from '../../../store/actions/postsActions';
import PulseLoader from 'react-spinners/PulseLoader';
import dataURItoBlob from '../../../utils/dataURItoBlob';
import { uploadImages } from '../../../store/actions/uploadImages';
import { useAppContext } from '../../../context/useAppContext';
import { useDispatch } from 'react-redux';
export default function CreatePostPopup({ posts, profile }) {
  const { user, setVisible } = useAppContext();
  const dispatch = useDispatch();
  const popup = useRef(null);
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState('');
  useClickOutside(popup, () => {
    setVisible(false);
  });
  const postSubmit = async (dispatch) => {
    if (background) {
      setLoading(true);
      try {
        const { data, status } = await createPost(
          null,
          background,
          text,
          null,
          user.id,
          user.token,
        )(dispatch);
        if (status === 'ok') {
          dispatch({
            type: profile ? 'PROFILE_POSTS' : 'POSTS_SUCCESS',
            payload: [data, ...posts],
          });
          setBackground('');
          setText('');
          setVisible(false);
        } else {
          setError(data);
        }
      } catch (error) {
        setError(error);
      }
      setLoading(false);
      setVisible(false);
    } else if (images && images.length) {
      setLoading(true);
      try {
        const postImages = images.map((img) => {
          return dataURItoBlob(img);
        });
        const path = `${user.username}/post_images`;
        let formData = new FormData();
        formData.append('path', path);
        postImages.forEach((image) => {
          formData.append('file', image);
        });
        const response = await uploadImages(formData, path, user.token);
        const { data, status } = await createPost(
          null,
          null,
          text,
          response,
          user.id,
          user.token,
        )(dispatch);
        if (status === 'ok') {
          dispatch({
            type: profile ? 'PROFILE_POSTS' : 'POSTS_SUCCESS',
            payload: [data, ...posts],
          });
          setText('');
          setImages('');
          setVisible(false);
        } else {
          setError(data);
          setVisible(false);
        }
      } catch (error) {
        setVisible(false);
        setError(error);
      }
      setLoading(false);
      setVisible(false);
    } else if (text) {
      setLoading(true);
      try {
        const { data, status } = await createPost(
          null,
          null,
          text,
          null,
          user.id,
          user.token,
        )(dispatch);
        if (status === 'ok') {
          dispatch({
            type: profile ? 'PROFILE_POSTS' : 'POSTS_SUCCESS',
            payload: [data, ...posts],
          });
          setBackground('');
          setText('');
          setVisible(false);
        } else {
          setError(data);
          setVisible(false);
        }
      } catch (error) {
        setError(error);
        setVisible(false);
      }
      setLoading(false);
      setVisible(false);
    } else {
      console.log('nothing');
    }
  };

  return (
    <div className='blur'>
      <div className='postBox' ref={popup}>
        {/* {error && <PostError error={error} setError={setError} />} */}
        <div className='box_header'>
          <div
            className='small_circle'
            onClick={() => {
              setVisible(false);
            }}
          >
            <i className='exit_icon'></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className='box_profile'>
          <img src={user?.picture} alt='' className='box_profile_img' />
          <div className='box_col'>
            <div className='box_profile_name'>
              {user?.first_name} {user?.last_name}
            </div>
            <div className='box_privacy'>
              <img src='../../../icons/public.png' alt='' />
              <span>Public</span>
              <i className='arrowDown_icon'></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
            setError={setError}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button
          className='post_submit'
          onClick={() => {
            postSubmit(dispatch);
          }}
          disabled={loading}
        >
          {loading ? <PulseLoader color='#fff' size={5} /> : 'Post'}
        </button>
      </div>
    </div>
  );
}
