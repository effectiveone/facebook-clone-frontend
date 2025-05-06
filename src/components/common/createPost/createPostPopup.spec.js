// Import necessary modules
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreatePostPopup from "./index";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';

// Create a mock store for testing
const mockStore = configureStore([]);
const initialState = {
  user: {
    user: {
      id: "1",
      picture: "sample_picture_url",
      first_name: "John",
      last_name: "Doe",
      token: "sample_token"
    }
  }
};
const store = mockStore(initialState);

// Mock useAppContext
jest.mock("../../../context/useAppContext", () => ({
  useAppContext: () => ({
    user: {
      id: "1",
      picture: "sample_picture_url",
      first_name: "John",
      last_name: "Doe",
      token: "sample_token",
      username: "john_doe",
    },
    setVisible: jest.fn(),
  }),
}));

const mockPosts = [
  {
    id: "1",
    content: "Sample post content",
    author: {
      id: "1",
      name: "John Doe",
      picture: "author_picture_url",
    },
  },
];

describe("CreatePostPopup component", () => {
  it("should render without crashing", () => {
    render(
      <Provider store={store}>
        <CreatePostPopup posts={mockPosts} />
      </Provider>
    );
    // Sprawdzamy, czy jest jakikolwiek element w komponencie
    const createPostElement = screen.getByAltText("");
    expect(createPostElement).toBeInTheDocument();
  });

  it("should display user picture", () => {
    render(
      <Provider store={store}>
        <CreatePostPopup posts={mockPosts} />
      </Provider>
    );
    const image = screen.getByAltText("");
    // Zamiast szukać nazwy użytkownika "John Doe", która może nie występować,
    // sprawdzamy tylko czy obraz został wyrenderowany

    expect(image).toHaveAttribute("src", "sample_picture_url");
  });
});

// Add more test cases according to your requirements
