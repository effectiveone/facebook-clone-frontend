import { useCallback, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture as updateProfilePictureAction } from '../../../store/actions/userActions';
import getCroppedImg from '../../../utils/getCroppedImg';
import PulseLoader from 'react-spinners/PulseLoader';
import { uploadImages } from '../../../store/actions/uploadImages';

export default function UpdateProfilePicture({
  setImage,
  image,
  setError,
  setShow,
  pRef,
}) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };

  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels, image, setImage],
  );

  const handleUpdateProfilePicture = async () => {
    try {
      setError('');
      setLoading(true);

      if (!image) {
        setError('Najpierw wybierz zdjęcie');
        setLoading(false);
        return;
      }

      if (!croppedAreaPixels) {
        setError('Najpierw przytnij zdjęcie');
        setLoading(false);
        return;
      }

      const croppedImage = await getCroppedImage();
      if (!croppedImage) {
        setError('Błąd podczas przycinania zdjęcia');
        setLoading(false);
        return;
      }

      const response = await fetch(croppedImage);
      const blob = await response.blob();

      if (blob.size === 0) {
        setError('Błąd podczas przetwarzania zdjęcia');
        setLoading(false);
        return;
      }

      const file = new File([blob], 'profile-picture.jpg', {
        type: 'image/jpeg',
      });

      const path = `${user.username}/profile_pictures`;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', path);

      console.log('Wysyłam zdjęcie do backendu...');
      const res = await uploadImages(formData, path, user.token);

      if (typeof res === 'string') {
        throw new Error(res);
      }

      console.log('Zdjęcie przesłane do Cloudinary:', res[0].url);

      const updateActionThunk = updateProfilePictureAction({
        url: res[0].url,
      });
      const updated_picture = await dispatch(updateActionThunk);
      if (updated_picture.status === 'error') {
        throw new Error(updated_picture.message);
      }

      if (pRef.current) {
        pRef.current.style.backgroundImage = `url(${res[0].url})`;
      }

      setLoading(false);
      setShow(false);
      setImage('');
    } catch (error) {
      console.error('Błąd podczas aktualizacji zdjęcia profilowego:', error);
      setError(
        error.message ||
          'Wystąpił błąd podczas aktualizacji zdjęcia profilowego',
      );
      setLoading(false);
    }
  };

  return (
    <div className='postBox update_img'>
      <div className='box_header'>
        <div className='small_circle' onClick={() => setImage('')}>
          <i className='exit_icon'></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className='update_image_desc'>
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='textarea_blue details_input'
        ></textarea>
      </div>

      <div className='update_center'>
        <div className='crooper'>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape='round'
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className='slider'>
          <div className='slider_circle hover1' onClick={() => zoomOut()}>
            <i className='minus_icon'></i>
          </div>
          <input
            type='range'
            min={1}
            max={3}
            step={0.2}
            ref={slider}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className='slider_circle hover1' onClick={() => zoomIn()}>
            <i className='plus_icon'></i>
          </div>
        </div>
      </div>
      <div className='flex_up'>
        <div className='gray_btn' onClick={() => getCroppedImage('show')}>
          <i className='crop_icon'></i>Crop photo
        </div>
      </div>
      <div className='flex_p_t'>
        <i className='public_icon'></i>
        Your profile picture is public
      </div>
      <div className='update_submit_wrap'>
        <div className='blue_link' onClick={() => setImage('')}>
          Cancel
        </div>
        <button
          className='blue_btn'
          disabled={loading}
          onClick={() => handleUpdateProfilePicture()}
        >
          {loading ? <PulseLoader color='#fff' size={5} /> : 'Save'}
        </button>
      </div>
    </div>
  );
}
