import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/header';
import { useDispatch, useSelector } from 'react-redux';
import { createStory, addStory } from '../../store/actions/userActions';
import { createPhotoStory } from '../../api'; // Importujemy bezpośrednio z API
import './photoStory.css';

export default function PhotoStory() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    try {
      // Convert base64 image to file object for upload
      const fileData = image.split(',')[1];
      const byteCharacters = atob(fileData);
      const byteArrays = [];

      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }

      const byteArray = new Uint8Array(byteArrays);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      const imageFile = new File([blob], 'story-image.jpg', {
        type: 'image/jpeg',
      });

      // Logujemy szczegóły pliku
      console.log('Image file details:', {
        name: imageFile.name,
        type: imageFile.type,
        size: imageFile.size,
        lastModified: imageFile.lastModified,
      });

      // Używamy bezpośrednio API
      console.log('Sending story data:', { type: 'photo', imageFile });
      const response = await createPhotoStory(imageFile);

      console.log('Story response:', response);

      if (response.error) {
        console.error(
          'Story creation failed with error:',
          response.message || 'Unknown error',
        );
        throw new Error(response.message || 'Nie udało się utworzyć relacji');
      }

      // Dodajemy nową relację do stanu Redux
      if (response.data && response.data.data) {
        // Dodajemy informacje o użytkowniku do nowo utworzonej relacji
        const storyWithUser = {
          ...response.data.data,
          user: {
            _id: user.id,
            first_name: user.firstName,
            last_name: user.lastName,
            picture: user.picture,
            username: user.username,
          },
        };
        dispatch(addStory(storyWithUser));
      }

      // Po pomyślnym uploadzie, przekieruj z powrotem do strony głównej
      navigate('/');
    } catch (error) {
      console.error('Błąd podczas przesyłania relacji:', error);
      alert('Wystąpił błąd podczas tworzenia relacji. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='photo_story_wrapper'>
      <Header />
      <div className='photo_story_container'>
        <div className='photo_story_header'>
          <button
            className='back_btn'
            onClick={() => navigate('/create-story')}
          >
            ←
          </button>
          <h2>Utwórz relację ze zdjęciem</h2>
        </div>

        <div className='photo_story_content'>
          {image ? (
            <div className='preview_container'>
              <img src={image} alt='Preview' className='image_preview' />
              <button className='change_photo_btn' onClick={triggerFileInput}>
                Zmień zdjęcie
              </button>
            </div>
          ) : (
            <div className='upload_area' onClick={triggerFileInput}>
              <div className='upload_icon'>📷</div>
              <p>Kliknij, aby wybrać zdjęcie</p>
            </div>
          )}

          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <div className='photo_story_actions'>
          <button
            className='cancel_btn'
            onClick={() => navigate('/create-story')}
          >
            Odrzuć
          </button>
          <button
            className='share_btn'
            disabled={!image || loading}
            onClick={handleSubmit}
          >
            {loading ? 'Udostępnianie...' : 'Udostępnij w relacji'}
          </button>
        </div>
      </div>
    </div>
  );
}
