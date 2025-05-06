// Mock dla window.matchMedia, który jest używany w testach
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

// Mock dla innych globalnych funkcji, które mogą być potrzebne w testach
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();
