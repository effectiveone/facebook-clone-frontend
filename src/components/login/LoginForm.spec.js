import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm";

jest.mock("axios");

describe("LoginForm", () => {
  it("renders the LoginForm component", () => {
    render(
      <MemoryRouter>
        <LoginForm setVisible={() => {}} />
      </MemoryRouter>
    );
    expect(screen.getByText("Facebook helps you connect")).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    const data = {
      email: "test@example.com",
      password: "password",
    };
    axios.post.mockResolvedValue({ data });

    render(
      <MemoryRouter>
        <LoginForm setVisible={() => {}} />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(
      "Email address or phone number"
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Log In");

    fireEvent.change(emailInput, { target: { value: data.email } });
    fireEvent.change(passwordInput, { target: { value: data.password } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      expect(Cookies.get("user")).toEqual(JSON.stringify(data));
    });
  });

  it("displays error message on form submit with invalid data", async () => {
    const errorMessage = "Invalid email or password.";
    axios.post.mockRejectedValue({
      response: { data: { message: errorMessage } },
    });

    render(
      <MemoryRouter>
        <LoginForm setVisible={() => {}} />
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText(
      "Email address or phone number"
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Log In");

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.change(passwordInput, { target: { value: "invalid-password" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
