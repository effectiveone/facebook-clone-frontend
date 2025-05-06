import { Form, Formik } from 'formik';
import { useState } from 'react';
import DateOfBirthSelect from './DateOfBirthSelect';
import GenderSelect from './GenderSelect';
import DotLoader from 'react-spinners/DotLoader';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerLogic } from './registerLogic';
import { dateOfBirthLogic } from './dateOfBirthLogic';
import RegisterInput from '../common/inputs/registerInput/index';

export default function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerValidation, registerSubmit } = registerLogic;
  const { years, months, getDays } = dateOfBirthLogic();

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentDay = new Date().getDate();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    bYear: currentYear - 20, // Ustawiam domyślnie osobę w wieku 20 lat
    bMonth: currentMonth,
    bDay: currentDay,
    gender: '',
  });

  const [dateError, setDateError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Oblicz dni dla wybranego miesiąca i roku
  const daysArray = Array.from(
    new Array(getDays(user.bYear, user.bMonth)),
    (_, i) => i + 1,
  );

  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    if (name === 'bDay' || name === 'bMonth' || name === 'bYear') {
      setUser({
        ...user,
        [name]: parseInt(value, 10),
      });
    } else {
      setUser({
        ...user,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    // Walidacja płci
    if (!gender) {
      setGenderError(
        'Wybierz płeć. Możesz później zmienić kto może to zobaczyć.',
      );
      return;
    }

    // Walidacja daty urodzenia (proste sprawdzenie)
    const today = new Date();
    const birthDate = new Date(bYear, bMonth - 1, bDay);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 13) {
      setDateError('Musisz mieć co najmniej 13 lat, aby utworzyć konto.');
      return;
    }

    // Jeśli wszystko jest w porządku, wywołujemy logikę rejestracji
    // Upewnij się, że błędy są czyszczone, jeśli walidacja przejdzie
    setDateError('');
    setGenderError('');
    // Przygotuj dane dla API
    const userData = {
      first_name,
      last_name,
      email,
      password,
      bYear,
      bMonth,
      bDay,
      gender,
      username: `${first_name}${last_name}${Math.floor(Math.random() * 1000)}`, // Unikalny username
    };

    console.log('Dane rejestracji:', userData);
    setLoading(true);

    registerSubmit(
      userData,
      dispatch,
      navigate,
      setError,
      setSuccess,
      setLoading,
    );
  };

  return (
    <div className='blur'>
      <div className='register' data-testid="register-form">
        <div className='register_header'>
          <i className='exit_icon' onClick={() => setVisible(false)}></i>
          <span>Zarejestruj się</span>
          <span>to szybkie i łatwe</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='Imię'
                  name='first_name'
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type='text'
                  placeholder='Nazwisko'
                  name='last_name'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  placeholder='Adres email'
                  name='email'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='password'
                  placeholder='Nowe hasło'
                  name='password'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Data urodzenia <i className='info_icon'></i>
                </div>
                <DateOfBirthSelect
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  days={daysArray}
                  months={months}
                  years={years}
                  handleRegisterChange={handleRegisterChange}
                  dateError={dateError}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Płeć <i className='info_icon'></i>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className='reg_infos'>
                Klikając Zarejestruj się, akceptujesz nasze{' '}
                <span>Warunki, Zasady dotyczące danych &nbsp;</span>i{' '}
                <span>Politykę cookies.</span> Możesz otrzymywać od nas
                powiadomienia SMS i możesz zrezygnować z tego w dowolnym
                momencie.
              </div>
              <div className='reg_btn_wrapper'>
                <button className='blue_btn open_signup' type='submit'>
                  Zarejestruj się
                </button>
              </div>
              {loading && (
                <DotLoader color='#1876f2' loading={loading} size={30} />
              )}
              {error && <div className='error_text'>{error}</div>}
              {success && <div className='success_text'>{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
