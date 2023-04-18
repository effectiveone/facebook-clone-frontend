import { render, screen, fireEvent } from "@testing-library/react";
import Login from "./Login";

describe("Login component", () => {
  test("should render Login component", () => {
    render(<Login />);
    const loginComponent = screen.getByTestId("login");
    expect(loginComponent).toBeInTheDocument();
  });

  test("should render LoginForm component", () => {
    render(<Login />);
    const loginForm = screen.getByTestId("login-form");
    expect(loginForm).toBeInTheDocument();
  });

  test('should render RegisterForm component after clicking "Zarejestruj się" button', () => {
    render(<Login />);
    const registerButton = screen.getByTestId("register-button");
    fireEvent.click(registerButton);
    const registerForm = screen.getByTestId("register-form");
    expect(registerForm).toBeInTheDocument();
  });

  test("should render Footer component", () => {
    render(<Login />);
    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
  });
});
