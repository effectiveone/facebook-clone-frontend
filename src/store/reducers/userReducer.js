import Cookies from 'js-cookie';

// Inicjalizacja stanu poza funkcją reducera - wykonana tylko raz przy ładowaniu modułu
const initialState = Cookies.get('user')
  ? JSON.parse(Cookies.get('user'))
  : null;

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      console.log('LOGIN - Nowy stan użytkownika:', action.payload);
      return action.payload;
    case 'LOGOUT':
      console.log('LOGOUT - Wylogowanie użytkownika');
      return null;
    case 'UPDATEPICTURE':
      console.log('UPDATEPICTURE - Nowe zdjęcie profilowe:', action.payload);
      return { ...state, picture: action.payload };
    case 'UPDATE_COVER':
      console.log('UPDATE_COVER - Nowa okładka:', action.payload);
      const newState = { ...state, cover: action.payload };
      console.log('Nowy stan użytkownika po aktualizacji okładki:', newState);
      return newState;
    case 'VERIFY':
      console.log('VERIFY - Status weryfikacji:', action.payload);
      return { ...state, verified: action.payload };

    default:
      return state;
  }
}
