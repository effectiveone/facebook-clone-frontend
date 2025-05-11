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

    // Ustaw domyślny nagłówek Content-Type tylko, gdy nagłówek nie został ustawiony
    // i nie przesyłamy danych typu FormData (np. przy przesyłaniu zdjęć).
    if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
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
  console.log('acceptFriendInvitation - dane wejściowe:', {
    senderId,
    receiverId,
  });
  try {
    const response = await apiClient.post('/friend-invitation/accept', {
      senderId,
      receiverId,
    });
    console.log('acceptFriendInvitation - odpowiedź:', response.data);
    return response;
  } catch (exception) {
    console.error('acceptFriendInvitation - błąd:', exception);
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async ({ senderId, receiverId }) => {
  console.log('rejectFriendInvitation - dane wejściowe:', {
    senderId,
    receiverId,
  });
  try {
    const response = await apiClient.post('/friend-invitation/reject', {
      senderId,
      receiverId,
    });
    console.log('rejectFriendInvitation - odpowiedź:', response.data);
    return response;
  } catch (exception) {
    console.error('rejectFriendInvitation - błąd:', exception);
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

// Story API methods
export const createPhotoStory = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('type', 'photo');
    formData.append('image', imageFile);

    // Wypisujemy zawartość formData dla debugowania
    console.log('Form data contents:');
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
      if (pair[0] === 'image') {
        console.log('Image file details:', {
          name: pair[1].name,
          type: pair[1].type,
          size: pair[1].size,
        });
      }
    }

    console.log('Sending story data to API:', {
      type: 'photo',
      imageSize: imageFile.size,
      imageName: imageFile.name,
      imageType: imageFile.type,
    });

    // Path should be relative to apiClient baseURL (which already includes '/api')
    const apiUrl = '/story/create';
    console.log('API URL:', apiUrl);

    const response = await apiClient.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Story creation response:', response.data);
    return response;
  } catch (exception) {
    console.error('Story creation error:', exception);
    if (exception.response) {
      console.error('Error status:', exception.response.status);
      console.error('Error details:', exception.response.data);
    } else if (exception.request) {
      console.error('No response received');
    } else {
      console.error('Error setting up request:', exception.message);
    }
    checkResponseCode(exception);
    return {
      error: true,
      message: exception.response?.data?.message || 'Failed to create story',
      exception,
    };
  }
};

export const createTextStory = async (text, background) => {
  try {
    console.log('Creating text story with:', { text, background });

    const response = await apiClient.post(
      '/story/create',
      {
        type: 'text',
        text,
        background,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    console.log('Text story created successfully:', response.data);
    return response;
  } catch (exception) {
    console.error('Error creating text story:', exception);
    console.error('Error details:', exception.response?.data);
    checkResponseCode(exception);
    return {
      error: true,
      message:
        exception.response?.data?.message || 'Failed to create text story',
      exception,
    };
  }
};

export const getStories = async () => {
  try {
    const response = await apiClient.get('/story');
    return response;
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const viewStory = async (storyId) => {
  try {
    const response = await apiClient.put(`/story/${storyId}/view`);
    return response;
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const deleteStory = async (storyId) => {
  try {
    const response = await apiClient.delete(`/story/${storyId}`);
    return response;
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};
