// Import necessary modules
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreatePostPopup from "./index";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../../../store";

// Create a store for testing
const store = createStore(rootReducer);

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
    const { container } = render(
      <Provider store={store}>
        <CreatePostPopup posts={mockPosts} />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });

  it("should display user name and picture", () => {
    const { getByAltText, getByText } = render(
      <Provider store={store}>
        <CreatePostPopup posts={mockPosts} />
      </Provider>
    );
    const image = getByAltText("");
    const name = getByText(/John Doe/i);

    expect(image).toHaveAttribute("src", "sample_picture_url");
    expect(name).toBeInTheDocument();
  });
});

// Add more test cases according to your requirements
