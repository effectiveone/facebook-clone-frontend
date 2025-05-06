import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Story from '../Story';

describe('Story Component', () => {
  // Podstawowy test - sprawdza czy komponent renderuje się bez błędów
  test('renders without crashing', () => {
    const photoStory = {
      type: 'photo',
      image: 'test-image.jpg',
      profile_picture: 'profile-pic.jpg',
      profile_name: 'John Doe'
    };
    
    render(<Story story={photoStory} />);
    // Sprawdzenie czy nazwa profilowa jest wyświetlana
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  // Test dla story typu photo
  test('renders photo story correctly', () => {
    const photoStory = {
      type: 'photo',
      image: 'test-image.jpg',
      profile_picture: 'profile-pic.jpg',
      profile_name: 'John Doe'
    };
    
    render(<Story story={photoStory} />);
    
    // Sprawdzenie czy komponent story jest renderowany
    const storyElement = screen.getByText('John Doe').closest('.story');
    expect(storyElement).toBeInTheDocument();
    
    // Sprawdzenie czy nazwa profilowa jest wyświetlana
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
  
  // Test dla story typu text
  test('renders text story correctly', () => {
    const textStory = {
      type: 'text',
      text: 'Test story',
      background: '#ff5722',
      profile_picture: 'profile-pic.jpg',
      profile_name: 'Jane Smith'
    };
    
    render(<Story story={textStory} />);
    
    // Sprawdzenie czy nazwa profilowa jest wyświetlana
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
  
  // Test dla story z niepełnymi danymi
  test('renders with fallback values for incomplete story data', () => {
    const incompleteStory = {
      type: 'photo'
      // Celowo pomijamy inne właściwości
    };
    
    render(<Story story={incompleteStory} />);
    
    // Powinno renderować domyślną nazwę użytkownika
    expect(screen.getByText('User')).toBeInTheDocument();
  });
});
