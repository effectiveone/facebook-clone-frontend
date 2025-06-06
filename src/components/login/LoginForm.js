import { Formik, Form } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import DotLoader from 'react-spinners/DotLoader';
import LoginInput from '../common/inputs/loginInput/index';

const loginInfos = {
  email: '',
  password: '',
};

export default function LoginForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidation = Yup.object({
    email: Yup.string()
      .required('Email address is required.')
      .email('Must be a valid email.')
      .max(100),
    password: Yup.string().required('Password is required'),
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      console.log('Próba logowania z danymi:', { email, password });

      // Używam nowego testowego endpointu zamiast standardowego logowania
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/testLogin`,
        {
          email,
          password,
        },
      );

      console.log('Odpowiedź z serwera:', data);

      // Zapisuję token w localStorage dla późniejszej autoryzacji
      if (data && data.token) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
      }

      dispatch({ type: 'LOGIN', payload: data });
      Cookies.set('user', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      setLoading(false);

      // Szczegółowa diagnostyka błędów
      console.error('Pełny błąd logowania:', error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else if (error.response) {
        setError(`Błąd serwera: ${error.response.status}`);
      } else {
        setError('Nie można połączyć się z serwerem');
      }
    }
  };

  return (
    <div className="login_wrap" data-testid="login-form">
      <div className='login_1'>
        <img src='../../icons/facebook.svg' alt='' />
        <span>
          Facebook helps you connect and share with the people in your life.
        </span>
      </div>
      <div className='login_2'>
        <div className='login_2_wrap'>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type='text'
                  name='email'
                  placeholder='Email address or phone number'
                  onChange={handleLoginChange}
                />
                <LoginInput
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={handleLoginChange}
                  bottom
                />
                <button type='submit' className='blue_btn'>
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          <Link to='/reset' className='forgot_password'>
            Forgotten password?
          </Link>
          <DotLoader color='#1876f2' loading={loading} size={30} />

          {error && <div className='error_text'>{error}</div>}
          <div className='sign_splitter'></div>
          <button
            className='blue_btn open_signup'
            onClick={() => setVisible(true)}
            data-testid="register-button"
          >
            Create Account
          </button>
        </div>
        <Link to='/' className='sign_extra'>
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
