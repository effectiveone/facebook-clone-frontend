import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { registerLogic } from "./registerLogic";
import configureMockStore from "redux-mock-store";

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock modułów
jest.mock("./registerLogic", () => {
  const originalLogic = jest.requireActual("./registerLogic");
  return {
    registerLogic: {
      ...originalLogic.registerLogic,
      registerSubmit: jest.fn(), // Only mock registerSubmit
    },
  };
});

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

const mockStore = configureMockStore();
const store = mockStore({});

describe("RegisterForm component", () => {
  const setVisible = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("powinien renderować formularz rejestracji", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm setVisible={setVisible} />
        </BrowserRouter>
      </Provider>
    );

    expect(await screen.findByText("Zarejestruj się", { selector: "button" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Imię")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nazwisko")).toBeInTheDocument();
    expect(screen.getByText("Data urodzenia")).toBeInTheDocument();
    expect(screen.getByText("Płeć")).toBeInTheDocument();
  });

  test("powinien umożliwiać wprowadzenie wszystkich danych formularza", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm setVisible={setVisible} />
        </BrowserRouter>
      </Provider>
    );

    // Wypełnij dane osobowe
    fireEvent.change(screen.getByPlaceholderText("Imię"), {
      target: { value: "Jan" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nazwisko"), {
      target: { value: "Kowalski" },
    });
    fireEvent.change(screen.getByPlaceholderText("Adres email"), {
      target: { value: "jan.kowalski@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nowe hasło"), {
      target: { value: "haslo123" },
    });

    // Zmień datę urodzenia
    const daySelect = screen.getByLabelText("Day");
    const monthSelect = screen.getByLabelText("Month");
    const yearSelect = screen.getByLabelText("Year");

    fireEvent.change(daySelect, { target: { value: "15" } });
    fireEvent.change(monthSelect, { target: { value: "6" } });
    fireEvent.change(yearSelect, { target: { value: "1990" } });

    // Wybierz płeć
    const genderRadios = screen.getAllByRole("radio");
    fireEvent.click(genderRadios[0]); // Pierwszy radio - mężczyzna

    // Kliknij przycisk rejestracji
    const submitButton = await screen.findByText("Zarejestruj się", { selector: "button" });
    fireEvent.click(submitButton);

    // Sprawdź, czy funkcja registerSubmit została wywołana
    await waitFor(() => {
      expect(registerLogic.registerSubmit).toHaveBeenCalled();
    });
  });
});