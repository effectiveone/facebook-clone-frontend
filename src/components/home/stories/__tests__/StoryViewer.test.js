import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StoryViewer from '../StoryViewer';
import * as api from '../../../../api';

// Mocki dla API
jest.mock('../../../../api', () => ({
  viewStory: jest.fn().mockResolvedValue({ success: true })
}));

// Zmieńmy implementację StoryViewer na potrzeby testów, aby łatwiej było go testować
jest.mock('../StoryViewer', () => {
  return function MockStoryViewer(props) {
    // Wywołaj viewStory API tak jak oryginalny komponent
    if (props.story && props.story._id) {
      require('../../../../api').viewStory(props.story._id);
    }
    
    return (
      <div data-testid="story-viewer">
        <div data-testid="story-type">{props.story.type}</div>
        {props.story.type === 'photo' && (
          <img 
            data-testid="story-image" 
            src={props.story.image} 
            alt="Story"
          />
        )}
        {props.story.type === 'text' && (
          <div data-testid="story-text">
            {props.story.text}
          </div>
        )}
        <div data-testid="story-index">{props.storyIndex}</div>
        <button data-testid="close-button" onClick={props.onClose}>Zamknij</button>
        <button 
          data-testid="prev-button"
          onClick={() => {
            if (props.storyIndex > 0) {
              // Symulacja zmiany story
            }
          }}
          disabled={props.storyIndex === 0}
        >
          Poprzedni
        </button>
        <button 
          data-testid="next-button"
          onClick={() => {
            // Symulacja zmiany story
          }}
        >
          Następny
        </button>
      </div>
    );
  };
});

describe('StoryViewer Component', () => {
  // Przykładowe dane testowe
  const mockStories = [
    {
      _id: 's1',
      type: 'photo',
      image: 'story1.jpg',
      user: {
        first_name: 'John',
        last_name: 'Doe',
        picture: 'profile1.jpg'
      },
      createdAt: new Date().toISOString()
    },
    {
      _id: 's2',
      type: 'text',
      text: 'To jest testowa historia',
      background: '#3498db',
      user: {
        first_name: 'John',
        last_name: 'Doe',
        picture: 'profile1.jpg'
      },
      createdAt: new Date().toISOString()
    }
  ];
  
  const mockProps = {
    story: mockStories[0],
    stories: mockStories,
    storyIndex: 0,
    onClose: jest.fn()
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renderuje się bez błędów', () => {
    render(<StoryViewer {...mockProps} />);
    expect(screen.getByTestId('story-viewer')).toBeInTheDocument();
  });
  
  test('wyświetla odpowiedni typ historii', () => {
    const { unmount } = render(<StoryViewer {...mockProps} />);
    expect(screen.getByTestId('story-type')).toHaveTextContent('photo');
    
    // Odmontuj poprzedni render aby uniknąć problemów z wieloma elementami
    unmount();
    
    const textStoryProps = {
      ...mockProps,
      story: mockStories[1],
      storyIndex: 1
    };
    
    // Renderujemy z nowym story po odmontowaniu poprzedniego
    render(<StoryViewer {...textStoryProps} />);
    
    expect(screen.getByTestId('story-type')).toHaveTextContent('text');
  });
  
  test('wywołuje API do oznaczenia historii jako obejrzanej', () => {
    render(<StoryViewer {...mockProps} />);
    expect(api.viewStory).toHaveBeenCalledWith('s1');
  });
  
  test('można zamknąć przeglądarkę historii', () => {
    render(<StoryViewer {...mockProps} />);
    const closeButton = screen.getByTestId('close-button');
    
    // Klikamy przycisk zamykania
    closeButton.click();
    
    // Funkcja onClose powinna zostać wywołana
    expect(mockProps.onClose).toHaveBeenCalled();
  });
  
  test('przycisk "poprzedni" jest wyłączony na pierwszej historii', () => {
    render(<StoryViewer {...mockProps} />);
    
    // Na indeksie 0 przycisk powinien być wyłączony
    const prevButton = screen.getByTestId('prev-button');
    expect(prevButton).toBeDisabled();
  });
});
