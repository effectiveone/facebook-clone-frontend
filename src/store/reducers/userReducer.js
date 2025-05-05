import Cookies from 'js-cookie';

// Inicjalizacja stanu poza funkcją reducera - wykonana tylko raz przy ładowaniu modułu
const initialState = Cookies.get('user')
  ? JSON.parse(Cookies.get('user'))
  : null;

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'UPDATEPICTURE':
      return { ...state, picture: action.payload };
    case 'VERIFY':
      return { ...state, verified: action.payload };

    default:
      return state;
  }
}
