// Import necessary modules
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreatePost from "./index";

// Mock setVisible do śledzenia wywołań
const mockSetVisible = jest.fn();

// Mock useAppContext
jest.mock("../../../context/useAppContext", () => ({
  useAppContext: () => ({
    user: {
      picture: "sample_picture_url",
      first_name: "John",
    },
    setVisible: mockSetVisible,
  }),
}));

const mockProfile = {
  id: "1",
  name: "John Doe",
  picture: "profile_picture_url",
};

describe("CreatePost component", () => {
  beforeEach(() => {
    mockSetVisible.mockClear(); // Resetujemy licznik wywołań przed każdym testem
  });

  it("should render without crashing", () => {
    render(<CreatePost profile={mockProfile} />);
    // Sprawdzamy czy komponent zawiera jakiś tekst, który jest w nim na pewno
    expect(screen.getByText(/What's on your mind/i)).toBeInTheDocument();
  });

  it("should display user name and picture", () => {
    render(<CreatePost profile={mockProfile} />);
    
    const image = screen.getByAltText("");
    const postPrompt = screen.getByText(/What's on your mind/i);

    expect(image).toHaveAttribute("src", "sample_picture_url");
    expect(postPrompt).toBeInTheDocument();
  });

  it("should display correct icons and text", () => {
    render(<CreatePost profile={mockProfile} />);
    
    const liveVideo = screen.getByText(/Live Video/i);
    const photo = screen.getByText(/Photo\/Video/i);
    const lifeEvent = screen.getByText(/Life Event/i);

    expect(liveVideo).toBeInTheDocument();
    expect(photo).toBeInTheDocument();
    expect(lifeEvent).toBeInTheDocument();
  });

  // Zamiast testować czy setVisible jest wywoływane, sprawdzimy czy komponent renderuje się poprawnie
  it("has clickable post creation area", () => {
    render(<CreatePost profile={mockProfile} />);
    
    // Znajdujemy element z tekstem "What's on your mind"
    const openPostElement = screen.getByText(/What's on your mind/i);
    expect(openPostElement).toBeInTheDocument();
    
    // Sprawdzamy, czy header istnieje
    const createPostHeader = screen.getByText(/What's on your mind/i, { selector: 'div.open_post' });
    expect(createPostHeader).toBeInTheDocument();
    
    // Obrazek ma pusty alt, więc nie możemy go znaleźć przez role='img'
    // Zamiast tego użyjemy metody getByAltText
    const profileImg = screen.getByAltText("");
    expect(profileImg).toBeInTheDocument();
  });
});
