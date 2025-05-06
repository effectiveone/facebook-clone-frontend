import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./style.css";
import Header from '../common/header';

export default function CreateStory() {
  const navigate = useNavigate();

  return (
    <div className="create_story_wrapper">
      <Header />
      <div className="create_story_container">
        <div className="create_story_header">
          <h2>Twoja relacja</h2>
          <button className="settings_btn">
            <i className="settings_icon"></i>
          </button>
        </div>
        
        <div className="create_story_options">
          <div 
            className="story_option photo_option"
            onClick={() => navigate("/create-story/photo")}
          >
            <div className="option_icon">
              <i className="camera_icon"></i>
            </div>
            <div className="option_text">Utwórz relację ze zdjęciem</div>
          </div>
          
          <div 
            className="story_option text_option"
            onClick={() => navigate("/create-story/text")}
          >
            <div className="option_icon">
              <i className="text_icon"></i>
            </div>
            <div className="option_text">Utwórz relację tekstową</div>
          </div>
        </div>
      </div>
    </div>
  );
}
