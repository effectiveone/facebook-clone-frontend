import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function TokenDebug() {
  const [tokenInfo, setTokenInfo] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const state = useSelector((state) => state);

  useEffect(() => {
    const infos = [];

    // 1. Sprawdź Redux store na różnych poziomach
    if (state?.user?.token) {
      infos.push({
        source: 'Redux: state.user.token',
        token: state.user.token,
      });
    }

    if (state?.auth?.token) {
      infos.push({
        source: 'Redux: state.auth.token',
        token: state.auth.token,
      });
    }

    // 2. Przeszukaj cały Redux store rekurencyjnie
    searchTokenInObject(state, 'state', infos);

    // 3. Sprawdź localStorage
    try {
      const userDetails = localStorage.getItem('user');
      if (userDetails) {
        const userData = JSON.parse(userDetails);
        if (userData?.token) {
          infos.push({
            source: 'localStorage: user.token',
            token: userData.token,
          });
        }
      }
    } catch (e) {
      console.error('Błąd podczas sprawdzania localStorage:', e);
    }

    // 4. Sprawdź sessionStorage
    try {
      const userSession = sessionStorage.getItem('user');
      if (userSession) {
        const sessionData = JSON.parse(userSession);
        if (sessionData?.token) {
          infos.push({
            source: 'sessionStorage: user.token',
            token: sessionData.token,
          });
        }
      }
    } catch (e) {
      console.error('Błąd podczas sprawdzania sessionStorage:', e);
    }

    setTokenInfo(infos);
  }, [state]);

  // Funkcja rekurencyjnie szukająca tokena w obiekcie
  const searchTokenInObject = (obj, path, results) => {
    if (!obj || typeof obj !== 'object') return;

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key;

      // Szukaj wartości zawierających słowo "token"
      if (
        typeof key === 'string' &&
        key.toLowerCase().includes('token') &&
        typeof value === 'string'
      ) {
        results.push({ source: `Redux: ${currentPath}`, token: value });
      }

      // Kontynuuj rekurencyjne przeszukiwanie
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        searchTokenInObject(value, currentPath, results);
      }
    }
  };

  if (tokenInfo.length === 0) {
    return (
      <div
        style={{
          padding: '10px',
          backgroundColor: '#ffcccc',
          borderRadius: '4px',
          margin: '10px 0',
        }}
      >
        <p>
          <strong>Nie znaleziono tokena autoryzacyjnego</strong>
        </p>
        <p>Prosimy o sprawdzenie implementacji uwierzytelniania w aplikacji.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        margin: '10px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0' }}>
          Znaleziono {tokenInfo.length} token(ów)
        </h4>
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            border: 'none',
            background: '#007bff',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {expanded ? 'Zwiń' : 'Rozwiń'}
        </button>
      </div>

      {expanded && (
        <div>
          {tokenInfo.map((info, index) => (
            <div
              key={index}
              style={{
                marginBottom: '8px',
                border: '1px solid #ddd',
                padding: '8px',
                borderRadius: '4px',
              }}
            >
              <div>
                <strong>Źródło:</strong> {info.source}
              </div>
              <div>
                <strong>Token:</strong> {info.token.substring(0, 15)}...
              </div>
            </div>
          ))}

          <div style={{ marginTop: '15px' }}>
            <p>
              <strong>Instrukcja:</strong>
            </p>
            <p>
              1. Zmień funkcję{' '}
              <code>userState = useSelector((state) => state.user)</code> na
              właściwy selektor
            </p>
            <p>
              2. Dostosuj odwołanie do tokena (<code>userState?.token</code>) do
              struktury Twojego stanu Redux
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TokenDebug;
