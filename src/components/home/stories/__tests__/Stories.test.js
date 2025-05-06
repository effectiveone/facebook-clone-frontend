import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Stories from '../index';
import * as api from '../../../../api';

// Mocki dla API
jest.mock('../../../../api', () => ({
  getStories: jest.fn().mockResolvedValue({
    data: { data: [] }
  })
}));

// Mock dla react-responsive
jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn().mockReturnValue(false)
}));

// Mock dla StoryViewer - upraszcza testy
jest.mock('../StoryViewer', () => {
  return function MockStoryViewer(props) {
    return (
      <div data-testid="story-viewer">
        <button onClick={props.onClose}>Zamknij</button>
      </div>
    );
  };
});

// Pomocnicza funkcja do renderowania z RouterContext
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Stories Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderuje się bez błędów', () => {
    renderWithRouter(<Stories />);
    // Sprawdzenie czy komponent renderuje się poprzez znalezienie tekstu ładowania
    expect(screen.getByText('Loading stories...')).toBeInTheDocument();
  });

  test('wyświetla stan ładowania danych', () => {
    // Symulujemy, że API się wiecznie ładuje
    api.getStories.mockImplementationOnce(() => new Promise(() => {}));
    
    renderWithRouter(<Stories />);
    
    // Sprawdzenie czy wyświetla się informacja o ładowaniu
    expect(screen.getByText('Loading stories...')).toBeInTheDocument();
  });

  test('zawiera przycisk do tworzenia nowych stories', async () => {
    // Ustawiamy API na zwrócenie pustej tablicy stories
    api.getStories.mockResolvedValueOnce({
      data: { data: [] }
    });
    
    renderWithRouter(<Stories />);
    
    // Czekamy aż zniknie ładowanie i pojawi się przycisk "Utwórz"
    await waitFor(() => {
      expect(screen.queryByText('Loading stories...')).not.toBeInTheDocument();
    });
    
    // Sprawdzamy czy jest przycisk "Utwórz"
    expect(screen.getByText('Utwórz')).toBeInTheDocument();
  });
});

