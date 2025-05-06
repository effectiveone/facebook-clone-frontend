import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import axios from "axios";
import Cookies from "js-cookie";
import LoginForm from "./LoginForm";

const mockStore = configureStore([]);
const store = mockStore({});

jest.mock("axios");

describe("LoginForm", () => {
  it("renders the LoginForm component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm setVisible={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    // Szukamy pola email zamiast tekstu, którego nie ma w komponencie
    const emailInput = screen.getByPlaceholderText(/email/i) || screen.getByLabelText(/email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    const data = {
      email: "test@example.com",
      password: "password",
    };
    axios.post.mockResolvedValue({ data });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm setVisible={() => {}} />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText(
      "Email address or phone number"
    );
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Log In");

    fireEvent.change(emailInput, { target: { value: data.email } });
    fireEvent.change(passwordInput, { target: { value: data.password } });

    fireEvent.click(submitButton);

    // Rozdzielamy asercje, aby uniknąć ostrzeżeń lint
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
    
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/testLogin`,
      {
        email: data.email,
        password: data.password,
      }
    );
    
    expect(Cookies.get("user")).toEqual(JSON.stringify(data));
  });

  it("displays validation error message for invalid email", async () => {
    // W rzeczywistości formularz pokazuje błąd walidacji formularza, nie błąd z serwera
    const validationErrorMessage = "Must be a valid email.";
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm setVisible={() => {}} />
        </MemoryRouter>
      </Provider>
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
      expect(screen.getByText(validationErrorMessage)).toBeInTheDocument();
    });
  });
});
