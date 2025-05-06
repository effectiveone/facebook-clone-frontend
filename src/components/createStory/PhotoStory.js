import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/header';
import { createPhotoStory } from '../../api';
import './photoStory.css';

export default function PhotoStory() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
      const imageFile = new File([blob], 'story-image.jpg', { type: 'image/jpeg' });
      
      // Send to backend
      const response = await createPhotoStory(imageFile);
      
      if (response.error) {
        throw new Error('Failed to create story');
      }
      
      // After successful upload, redirect back to home
      navigate('/');
    } catch (error) {
      console.error("Error uploading story:", error);
      alert('Wystąpił błąd podczas tworzenia relacji. Spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="photo_story_wrapper">
      <Header />
      <div className="photo_story_container">
        <div className="photo_story_header">
          <button 
            className="back_btn" 
            onClick={() => navigate('/create-story')}
          >
            ←
          </button>
          <h2>Utwórz relację ze zdjęciem</h2>
        </div>
        
        <div className="photo_story_content">
          {image ? (
            <div className="preview_container">
              <img src={image} alt="Preview" className="image_preview" />
              <button 
                className="change_photo_btn"
                onClick={triggerFileInput}
              >
                Zmień zdjęcie
              </button>
            </div>
          ) : (
            <div 
              className="upload_area"
              onClick={triggerFileInput}
            >
              <div className="upload_icon">📷</div>
              <p>Kliknij, aby wybrać zdjęcie</p>
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        
        <div className="photo_story_actions">
          <button 
            className="cancel_btn"
            onClick={() => navigate('/create-story')}
          >
            Odrzuć
          </button>
          <button 
            className="share_btn"
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
