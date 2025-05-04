import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import { registerLogic } from "./registerLogic";
import configureMockStore from "redux-mock-store";

// Mock modułów
jest.mock("./registerLogic", () => ({
  registerLogic: {
    registerValidation: {},
    registerSubmit: jest.fn(),
  },
}));

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

  test("powinien renderować formularz rejestracji", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm setVisible={setVisible} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Zarejestruj się")).toBeInTheDocument();
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
    fireEvent.change(screen.getByPlaceholderText("Numer telefonu lub adres email"), {
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
    const submitButton = screen.getByText("Zarejestruj się", { selector: "button" });
    fireEvent.click(submitButton);

    // Sprawdź, czy funkcja registerSubmit została wywołana
    await waitFor(() => {
      expect(registerLogic.registerSubmit).toHaveBeenCalled();
    });
  });

  test("powinien wyświetlić błąd, gdy użytkownik jest za młody", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm setVisible={setVisible} />
        </BrowserRouter>
      </Provider>
    );

    // Ustaw datę urodzenia na zbyt późną (użytkownik za młody)
    const yearSelect = screen.getByLabelText("Year");
    fireEvent.change(yearSelect, { target: { value: new Date().getFullYear() - 10 } });

    // Wybierz płeć
    const genderRadios = screen.getAllByRole("radio");
    fireEvent.click(genderRadios[0]);

    // Kliknij przycisk rejestracji
    const submitButton = screen.getByText("Zarejestruj się", { selector: "button" });
    fireEvent.click(submitButton);

    // Sprawdź, czy pojawił się komunikat o błędzie
    await waitFor(() => {
      expect(screen.getByText(/Musisz mieć co najmniej 14 lat/)).toBeInTheDocument();
    });
    expect(registerLogic.registerSubmit).not.toHaveBeenCalled();
  });

  test("powinien wyświetlić błąd, gdy użytkownik nie wybrał płci", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterForm setVisible={setVisible} />
        </BrowserRouter>
      </Provider>
    );

    // Ustaw poprawną datę urodzenia
    const yearSelect = screen.getByLabelText("Year");
    fireEvent.change(yearSelect, { target: { value: "1990" } });

    // Nie wybieraj płci

    // Kliknij przycisk rejestracji
    const submitButton = screen.getByText("Zarejestruj się", { selector: "button" });
    fireEvent.click(submitButton);

    // Sprawdź, czy pojawił się komunikat o błędzie
    await waitFor(() => {
      expect(screen.getByText(/Wybierz płeć/)).toBeInTheDocument();
    });
    expect(registerLogic.registerSubmit).not.toHaveBeenCalled();
  });
}); 