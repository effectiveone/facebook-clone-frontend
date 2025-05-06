import React, { useState, useEffect, useRef } from 'react';
import { viewStory } from '../../../api';
import './storyViewer.css';

export default function StoryViewer({ story, stories, storyIndex, onClose }) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(storyIndex);
  const [currentStory, setCurrentStory] = useState(story);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);
  const storyDuration = 5000; // 5 seconds per story
  
  // Define navigation functions first with useCallback to prevent rerenders
  const moveToNextStory = React.useCallback(() => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prevIndex => prevIndex + 1);
    } else {
      onClose(); // Close viewer if this was the last story
    }
  }, [currentStoryIndex, stories, onClose]);
  
  const moveToPreviousStory = React.useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prevIndex => prevIndex - 1);
    }
  }, [currentStoryIndex]);
  
  // Set up progress bar and story navigation
  useEffect(() => {
    // Mark story as viewed
    const markAsViewed = async () => {
      try {
        if (currentStory && currentStory._id) {
          await viewStory(currentStory._id);
        }
      } catch (error) {
        console.error('Error marking story as viewed:', error);
      }
    };
    
    markAsViewed();
    
    // Reset progress
    setProgress(0);
    
    // Set up progress interval
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (storyDuration / 100));
        
        // Move to next story when progress completes
        if (newProgress >= 100) {
          clearInterval(progressInterval.current);
          moveToNextStory();
        }
        
        return newProgress;
      });
    }, 100);
    
    // Cleanup interval on unmount or story change
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [currentStory, moveToNextStory]);
  
  // Update current story when story index changes
  useEffect(() => {
    if (stories && stories.length > currentStoryIndex) {
      setCurrentStory(stories[currentStoryIndex]);
    }
  }, [currentStoryIndex, stories]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        moveToPreviousStory();
      } else if (e.key === 'ArrowRight') {
        moveToNextStory();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentStoryIndex, moveToNextStory, moveToPreviousStory, onClose]);
  
  const handleStoryClick = (e) => {
    const { clientX } = e;
    const { innerWidth } = window;
    
    // Click on left 1/3 of screen to go back, right 2/3 to go forward
    if (clientX < innerWidth / 3) {
      moveToPreviousStory();
    } else {
      moveToNextStory();
    }
  };
  
  // Render story content based on type
  const renderStoryContent = () => {
    if (!currentStory) return null;
    
    if (currentStory.type === 'photo' && currentStory.image) {
      return (
        <img 
          src={currentStory.image} 
          alt="Story" 
          className="story_viewer_image"
        />
      );
    } else if (currentStory.type === 'text' && currentStory.text) {
      return (
        <div 
          className="story_viewer_text"
          style={{ backgroundColor: currentStory.background }}
        >
          <p>{currentStory.text}</p>
        </div>
      );
    } else {
      // Fallback for unknown story type
      return (
        <div className="story_viewer_error">
          <p>Unable to display this story</p>
        </div>
      );
    }
  };
  
  return (
    <div className="story_viewer_overlay">
      <div className="story_viewer">
        <div className="story_viewer_header">
          <div className="story_viewer_progress">
            {stories.map((_, i) => (
              <div 
                key={i} 
                className={`progress_bar ${i === currentStoryIndex ? 'active' : ''} ${i < currentStoryIndex ? 'completed' : ''}`}
              >
                <div 
                  className="progress_fill" 
                  style={{ width: i === currentStoryIndex ? `${progress}%` : i < currentStoryIndex ? '100%' : '0%' }}
                ></div>
              </div>
            ))}
          </div>
          
          <div className="story_viewer_user_info">
            <div className="story_viewer_profile_pic">
              <img src={stories[0]?.user?.picture || 'default-profile.jpg'} alt="" />
            </div>
            <div className="story_viewer_username">
              {stories[0]?.user?.first_name} {stories[0]?.user?.last_name}
            </div>
            <div className="story_viewer_timestamp">
              {new Date(currentStory?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
          
          <button className="close_btn" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div 
          className="story_viewer_content"
          onClick={handleStoryClick}
        >
          {renderStoryContent()}
        </div>
        
        <div className="story_viewer_navigation">
          <button 
            className="nav_btn prev_btn"
            onClick={moveToPreviousStory}
            disabled={currentStoryIndex === 0}
          >
            ←
          </button>
          <button 
            className="nav_btn next_btn"
            onClick={moveToNextStory}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
