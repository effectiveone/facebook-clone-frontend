import axios from 'axios';

// Stałe i pomocnicze funkcje dla tokena autoryzacji
const TOKEN_KEY = 'auth_token';

// Funkcje do zarządzania tokenem w localStorage
const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const removeToken = () => localStorage.removeItem(TOKEN_KEY);

// Zmodyfikowana funkcja do tworzenia zapytań
// Nie wymaga już ręcznego przekazywania tokena
const makeRequest = (url, method) => (data) => async () => {
  try {
    const token = getToken();
    const headers = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    } else {
      console.error('Brak tokena do autoryzacji żądania');
      // Możesz tu dodać przekierowanie do strony logowania
      // albo rzucić błąd, w zależności od wymagań
      throw new Error('Brak tokena autoryzacyjnego. Zaloguj się ponownie.');
    }

    const response = await axios({
      method,
      url: `${process.env.REACT_APP_BACKEND_URL}${url}`,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('Błąd podczas żądania:', error);

    // Sprawdzenie czy błąd jest związany z autoryzacją (401)
    if (error.response && error.response.status === 401) {
      // Token wygasł lub jest nieprawidłowy
      removeToken(); // Usuń nieprawidłowy token
      // Opcjonalnie: Przekieruj do strony logowania
      window.location.href = '/login';
      return 'Sesja wygasła. Zaloguj się ponownie.';
    }

    if (error.response) {
      console.error('Status odpowiedzi:', error.response.status);
      console.error('Dane odpowiedzi:', error.response.data);
      return (
        error.response.data.message ||
        'Wystąpił błąd podczas komunikacji z serwerem'
      );
    }

    return 'Wystąpił nieoczekiwany błąd';
  }
};

// Przykład funkcji logowania, która zapisuje token
export const login = async (credentials) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_URL}/login`,
      data: credentials,
    });

    if (response.data.token) {
      setToken(response.data.token);
      return { success: true, data: response.data };
    } else {
      return { success: false, message: 'Brak tokena w odpowiedzi' };
    }
  } catch (error) {
    console.error('Błąd logowania:', error);
    return {
      success: false,
      message: error.response?.data?.message || 'Błąd podczas logowania',
    };
  }
};

// Funkcja wylogowania
export const logout = () => {
  removeToken();
  // Można tu dodać dodatkową logikę, np. przekierowanie
};

// Eksport wszystkich funkcji w taki sam sposób, ale bez konieczności podawania tokena
export const updateProfilePicture = makeRequest('/updateProfilePicture', 'PUT');
export const updateCover = makeRequest('/updateCover', 'PUT');
export const addFriend = (id) => makeRequest(`/addFriend/${id}`, 'PUT');
export const cancelRequest = (id) => makeRequest(`/cancelRequest/${id}`, 'PUT');
export const follow = (id) => makeRequest(`/follow/${id}`, 'PUT');
export const unfollow = (id) => makeRequest(`/unfollow/${id}`, 'PUT');
export const acceptRequest = (id) => makeRequest(`/acceptRequest/${id}`, 'PUT');
export const unfriend = (id) => makeRequest(`/unfriend/${id}`, 'PUT');
export const deleteRequest = (id) => makeRequest(`/deleteRequest/${id}`, 'PUT');
export const search = (searchTerm) =>
  makeRequest(`/search/${searchTerm}`, 'POST');
export const addToSearchHistory = makeRequest('/addToSearchHistory', 'PUT');
export const getSearchHistory = makeRequest('/getSearchHistory', 'GET');
export const removeFromSearch = makeRequest('/removeFromSearch', 'PUT');
export const getFriendsPageInfos = makeRequest('/getFriendsPageInfos', 'GET');

// Funkcja pomocnicza do sprawdzenia, czy użytkownik jest zalogowany
export const isAuthenticated = () => {
  return !!getToken();
};

// Funkcja do użycia w middleware React Router
export const requireAuth = (nextState, replace) => {
  if (!isAuthenticated()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

// Dodaje funkcję do użycia przy testowym logowaniu
export const setUserAndToken = (user) => {
  if (user && user.token) {
    // Zapisz token w localStorage
    setToken(user.token);

    // Można też zaktualizować Redux store
    return {
      type: 'LOGIN',
      payload: user,
    };
  }
  return { type: 'NOOP' };
};
