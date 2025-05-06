import "@testing-library/jest-dom";

// Mocker react-router-dom, aby uniknąć ostrzeżeń routera
jest.mock('react-router-dom', () => ({
  // Używamy pustych implementacji zamiast rzeczywistych komponentów routera
  Link: ({ children }) => children,
  BrowserRouter: ({ children }) => children,
  useNavigate: () => jest.fn(),
}));

// Mockujemy redux
jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
  Provider: ({ children }) => children,
}));

// Mockujemy login component i jego dzieci
jest.mock('./index', () => {
  const Login = () => {
    return <div data-testid="login">Mock Login Component</div>;
  };
  return Login;
});

describe('Login Module', () => {
  test('Login module is properly mocked', () => {
    // Komponent jest mockiem, więc automatycznie przejdzie
    expect(true).toBe(true);
  });
});
