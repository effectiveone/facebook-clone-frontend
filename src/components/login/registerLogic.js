import * as Yup from 'yup';
import axios from 'axios';
import Cookies from 'js-cookie';
import { debugRegister } from '../common/debug';

export const registerLogic = {
  registerValidation: Yup.object({
    first_name: Yup.string()
      .required('Imię jest wymagane')
      .min(2, 'Imię musi mieć od 2 do 16 znaków')
      .max(16, 'Imię musi mieć od 2 do 16 znaków'),
    last_name: Yup.string()
      .required('Nazwisko jest wymagane')
      .min(2, 'Nazwisko musi mieć od 2 do 16 znaków')
      .max(16, 'Nazwisko musi mieć od 2 do 16 znaków'),
    email: Yup.string()
      .required('Email jest wymagany do logowania i reset hasła')
      .email('Wprowadź poprawny adres email'),
    password: Yup.string()
      .required('Hasło jest wymagane')
      .min(6, 'Hasło musi mieć co najmniej 6 znaków')
      .max(36, 'Hasło nie może być dłuższe niż 36 znaków'),
  }),

  registerSubmit: async function (
    user,
    dispatch,
    navigate,
    setError,
    setSuccess,
    setLoading,
  ) {
    try {
      // Wyślij żądanie rejestracji do serwera
      console.log('Wysyłane dane:', user);

      // Użyj funkcji debug do rejestracji
      const data = await debugRegister(user);

      // Sprawdź odpowiedź
      if (data.error) {
        setLoading(false);
        setError(data.message || data.error);
        return;
      }

      setError('');
      setSuccess(data.message || 'Rejestracja zakończona sukcesem!');

      // Zapisz dane użytkownika i przekieruj
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: 'LOGIN', payload: rest });
        Cookies.set('user', JSON.stringify(rest));
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Pełny błąd rejestracji:', error);
      setLoading(false);
      setSuccess('');

      // Bezpieczna obsługa błędów
      setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
    }
  },
};
