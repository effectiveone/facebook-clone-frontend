// Import necessary modules
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreatePost from "./index";

// Mock useAppContext
jest.mock("../../../context/useAppContext", () => ({
  useAppContext: () => ({
    user: {
      picture: "sample_picture_url",
      first_name: "John",
    },
    setVisible: jest.fn(),
  }),
}));

const mockProfile = {
  id: "1",
  name: "John Doe",
  picture: "profile_picture_url",
};

describe("CreatePost component", () => {
  it("should render without crashing", () => {
    const { container } = render(<CreatePost profile={mockProfile} />);
    expect(container).toBeInTheDocument();
  });

  it("should display user name and picture", () => {
    const { getByAltText, getByText } = render(
      <CreatePost profile={mockProfile} />
    );
    const image = getByAltText("");
    const name = getByText(/What's on your mind/i);

    expect(image).toHaveAttribute("src", "sample_picture_url");
    expect(name).toBeInTheDocument();
  });

  it("should display correct icons and text", () => {
    const { getByText } = render(<CreatePost profile={mockProfile} />);
    const liveVideo = getByText(/Live Video/i);
    const photo = getByText(/Photo\/Video/i);
    const lifeEvent = getByText(/Life Event/i);

    expect(liveVideo).toBeInTheDocument();
    expect(photo).toBeInTheDocument();
    expect(lifeEvent).toBeInTheDocument();
  });

  it("should call setVisible when clicking on the open_post div", () => {
    const { useAppContext } = require("../../../context/useAppContext");
    const { getByText } = render(<CreatePost profile={mockProfile} />);
    const openPost = getByText(/What's on your mind/i);

    fireEvent.click(openPost);
    expect(useAppContext().setVisible).toHaveBeenCalledTimes(1);
  });
});
