import Cookies from 'js-cookie';

// Pobierz token użytkownika z cookies
export const getToken = () => {
  const user = Cookies.get('user');
  if (user) {
    try {
      const userObj = JSON.parse(user);
      return userObj.token;
    } catch (error) {
      console.error('Błąd parsowania danych użytkownika:', error);
      return null;
    }
  }
  return null;
};

// Ustaw tymczasowy token dla celów deweloperskich, jeśli brakuje rzeczywistego tokena
export const getOrCreateToken = () => {
  const token = getToken();
  if (token) {
    return token;
  }

  // Tymczasowe rozwiązanie - ustawienie domyślnego tokena dla celów deweloperskich
  const tempToken = 'dev_temp_token_for_testing';

  // Zapisz tymczasowy token w localStorage, żeby był dostępny dla API
  localStorage.setItem('token', tempToken);

  return tempToken;
};

// Sprawdź, czy użytkownik jest zalogowany
export const isAuthenticated = () => {
  return getToken() !== null;
};
