import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../common/header';
import { createTextStory } from '../../api';
import './textStory.css';

export default function TextStory() {
  const [text, setText] = useState('');
  const [background, setBackground] = useState('#1877f2'); // Default Facebook blue
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const backgroundOptions = [
    '#1877f2', // Facebook blue
    '#E91E63', // Pink
    '#9C27B0', // Purple
    '#673AB7', // Deep Purple
    '#3F51B5', // Indigo
    '#2196F3', // Blue
    '#03A9F4', // Light Blue
    '#00BCD4', // Cyan
    '#009688', // Teal
    '#4CAF50', // Green
    '#8BC34A', // Light Green
    '#CDDC39', // Lime
    '#FFEB3B', // Yellow
    '#FFC107', // Amber
    '#FF9800', // Orange
    '#FF5722', // Deep Orange
    '#795548', // Brown
    '#607D8B', // Blue Grey
  ];

  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= 250) { // Maximum character limit
      setText(newText);
    }
  };

  const handleBackgroundChange = (color) => {
    setBackground(color);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      console.log('Submitting text story:', { text, background });
      // Send to backend
      const response = await createTextStory(text, background);
      
      if (response.error) {
        console.error('Error response:', response);
        throw new Error(response.message || 'Failed to create text story');
      }
      
      console.log('Story created successfully:', response.data);
      // After successful upload, redirect back to home
      navigate('/');
    } catch (error) {
      console.error("Error uploading text story:", error);
      alert(`Wystąpił błąd podczas tworzenia relacji tekstowej: ${error.message}. Spróbuj ponownie.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text_story_wrapper">
      <Header />
      <div className="text_story_container">
        <div className="text_story_header">
          <button 
            className="back_btn" 
            onClick={() => navigate('/create-story')}
          >
            ←
          </button>
          <h2>Utwórz relację tekstową</h2>
        </div>
        
        <div className="text_story_content">
          <div 
            className="text_editor"
            style={{ backgroundColor: background }}
          >
            <textarea
              value={text}
              onChange={handleTextChange}
              placeholder="Zacznij pisać"
              autoFocus
            />
            <div className="character_counter">
              {text.length}/250
            </div>
          </div>
          
          <div className="background_selector">
            <h3>Wybierz tło</h3>
            <div className="color_options">
              {backgroundOptions.map((color, index) => (
                <div 
                  key={index}
                  className={`color_option ${background === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleBackgroundChange(color)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="text_story_actions">
          <button 
            className="cancel_btn"
            onClick={() => navigate('/create-story')}
          >
            Odrzuć
          </button>
          <button 
            className="share_btn"
            disabled={!text.trim() || loading}
            onClick={handleSubmit}
          >
            {loading ? 'Udostępnianie...' : 'Udostępnij w relacji'}
          </button>
        </div>
      </div>
    </div>
  );
}
