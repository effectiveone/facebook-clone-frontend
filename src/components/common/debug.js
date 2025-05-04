// Tymczasowy plik do debugowania formularzy
export const debugRegister = async (userData) => {
  try {
    console.log('DEBUG - Wysyłanie danych rejestracji:', userData);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/testRegister`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    );

    const responseText = await response.text();
    console.log('DEBUG - Raw Response:', responseText);

    try {
      const data = JSON.parse(responseText);
      console.log('DEBUG - Parsed Response:', data);
      return data;
    } catch (e) {
      console.log('DEBUG - Error parsing JSON:', e);
      return { error: 'Invalid JSON response' };
    }
  } catch (error) {
    console.log('DEBUG - Fetch Error:', error);
    return { error: error.message };
  }
};

export const debugLogin = async (userData) => {
  try {
    console.log('DEBUG - Wysyłanie danych logowania:', userData);
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/testLogin`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      },
    );

    const responseText = await response.text();
    console.log('DEBUG - Raw Response:', responseText);

    try {
      const data = JSON.parse(responseText);
      console.log('DEBUG - Parsed Response:', data);
      return data;
    } catch (e) {
      console.log('DEBUG - Error parsing JSON:', e);
      return { error: 'Invalid JSON response' };
    }
  } catch (error) {
    console.log('DEBUG - Fetch Error:', error);
    return { error: error.message };
  }
};
