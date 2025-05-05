import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 5000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem('user');

    if (userDetails) {
      try {
        const userData = JSON.parse(userDetails);
        if (userData && userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`;
          console.log('Dodano token autoryzacji do żądania API');
        } else {
          console.error('Brak tokena w danych użytkownika');
        }
      } catch (e) {
        console.error('Błąd podczas przetwarzania danych użytkownika:', e);
      }
    } else {
      console.warn(
        'Brak danych użytkownika w localStorage. Żądanie bez autoryzacji.',
      );
    }

    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (err) => {
    console.error('Błąd konfiguracji żądania:', err);
    return Promise.reject(err);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Błąd odpowiedzi API:', error);

    if (error.response && error.response.status === 401) {
      console.error('Błąd autoryzacji. Wymagane ponowne logowanie.');
      // Tutaj można dodać kod do wylogowania i przekierowania do strony logowania
    }

    return Promise.reject(error);
  },
);

export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post('/friend-invitation/invite', data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async ({ senderId, receiverId }) => {
  try {
    return await apiClient.post('/friend-invitation/accept', {
      senderId,
      receiverId,
    });
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async ({ senderId, receiverId }) => {
  console.log('rejectFriendInvitation', senderId);
  console.log('rejectFriendInvitationreceiverId', receiverId);

  try {
    return await apiClient.post('/friend-invitation/reject', {
      senderId,
      receiverId,
    });
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    console.log(`Kod odpowiedzi: ${responseCode}`);
    if (responseCode === 401 || responseCode === 403) {
      console.error('Brak autoryzacji lub odmowa dostępu');
    } else if (responseCode >= 500) {
      console.error('Błąd serwera');
    }
  }

  return;
};
