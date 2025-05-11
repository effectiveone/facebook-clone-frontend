import { useEffect, useRef, useCallback, useState } from 'react';
import { Return, Search } from '../../../assets/svg';
import useClickOutside from '../../../utils/clickOutside';
import {
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  search,
} from '../../../store/actions/userActions';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../../context/useAppContext';
import { useSelector } from 'react-redux';

export default function SearchMenu({ color, setShowSearchMenu }) {
  // Pobieramy token z Reduxa
  const userState = useSelector((state) => state.user);
  const token = userState?.token;

  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const menu = useRef(null);
  const input = useRef(null);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  const getHistory = useCallback(async () => {
    if (!token) {
      setError('Brak tokena, nie można pobrać historii wyszukiwania');
      return;
    }

    try {
      // Przekazujemy token do funkcji API
      const res = await getSearchHistory()()(token);

      if (res && Array.isArray(res)) {
        setSearchHistory(res);
      } else {
        setError('Problem z pobieraniem historii wyszukiwania');
      }
    } catch (err) {
      setError('Błąd podczas pobierania historii wyszukiwania');
    }
  }, [token]);

  useEffect(() => {
    if (input.current) {
      try {
        input.current.focus();
      } catch (err) {
        setError('Błąd podczas ustawiania focus');
      }
    }
  }, []);

  const searchHandler = useCallback(async () => {
    if (!token) {
      setError('Brak tokena autoryzacyjnego. Wymagane ponowne zalogowanie.');
      return;
    }

    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Przekazujemy token do funkcji search
      const res = await search(searchTerm)()(token);

      if (res && Array.isArray(res)) {
        setResults(res);
      } else {
        setError(
          'Nie udało się pobrać wyników wyszukiwania: ' +
            (res || 'Brak odpowiedzi'),
        );
        setResults([]);
      }
    } catch (err) {
      setError(`Wystąpił błąd: ${err.message || 'Nieznany błąd'}`);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, token]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        searchHandler();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchHandler]);

  const addToSearchHistoryHandler = async (searchUser) => {
    if (!token) {
      setError('Brak tokena, nie można dodać do historii wyszukiwania');
      return;
    }

    try {
      // Przekazujemy token do funkcji API
      await addToSearchHistory(searchUser)()(token);
      getHistory();
    } catch (err) {
      setError('Błąd podczas dodawania do historii');
    }
  };

  const handleRemove = async (searchUser) => {
    if (!token) {
      setError('Brak tokena, nie można usunąć z historii wyszukiwania');
      return;
    }

    try {
      // Przekazujemy token do funkcji API
      await removeFromSearch(searchUser)()(token);
      getHistory();
    } catch (err) {
      setError('Błąd podczas usuwania z historii');
    }
  };

  const refreshToken = () => {
    try {
      alert(
        'Prosimy o wylogowanie i ponowne zalogowanie się do aplikacji, aby odświeżyć sesję.',
      );
    } catch (err) {
      setError('Błąd podczas odświeżania sesji');
    }
  };

  return (
    <div className='header_left search_area scrollbar' ref={menu}>
      <div className='search_wrap'>
        <div className='header_logo'>
          <div
            className='circle hover1'
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className='search'
          onClick={() => {
            if (input.current) {
              input.current.focus();
            }
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type='text'
            placeholder='Wyszukaj użytkowników'
            ref={input}
            style={{ color: '#000' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>

      {error && (
        <div className='search_results_error'>
          {error}
          <button
            onClick={refreshToken}
            style={{ marginLeft: '10px', padding: '2px 5px' }}
          >
            Odśwież sesję
          </button>
        </div>
      )}

      {/* Historia wyszukiwania */}
      {searchTerm === '' && !error && (
        <div className='search_history_header'>
          <span>Ostatnie wyszukiwania</span>
          <a href='#'>Edytuj</a>
        </div>
      )}

      <div className='search_history scrollbar'>
        {searchHistory &&
          searchTerm === '' &&
          !error &&
          Array.isArray(searchHistory) &&
          searchHistory.length > 0 &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              <div className='search_user_item hover1' key={user._id}>
                <Link
                  className='flex'
                  to={`/profile/${user.user.username}`}
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  <img src={user?.user?.picture} alt='' />
                  <span className='user_name'>
                    {user?.user?.first_name} {user?.user?.last_name}
                  </span>
                </Link>
                <i
                  className='exit_icon'
                  onClick={() => {
                    handleRemove(user.user._id);
                  }}
                ></i>
              </div>
            ))}
      </div>

      {/* Wyniki wyszukiwania */}
      <div className='search_results scrollbar'>
        {loading ? (
          <div className='search_results_loading'>Wyszukiwanie...</div>
        ) : (
          <>
            {results &&
              Array.isArray(results) &&
              results.length > 0 &&
              results.map((user) => {
                return (
                  <Link
                    to={`/profile/${user.username}`}
                    className='search_user_item hover1'
                    onClick={() => addToSearchHistoryHandler(user._id)}
                    key={user._id}
                  >
                    <img src={user?.picture} alt='' />
                    <span className='user_name' style={{ color: '#000' }}>
                      {user?.username}
                    </span>
                  </Link>
                );
              })}
            {searchTerm &&
              results &&
              Array.isArray(results) &&
              results.length === 0 && (
                <div className='search_results_empty'>
                  Nie znaleziono użytkowników
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
}
