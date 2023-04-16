import { useEffect, useRef, useCallback, useState } from "react";
import { Return, Search } from "../../../assets/svg";
import useClickOutside from "../../../utils/clickOutside";
import {
  addToSearchHistory,
  getSearchHistory,
  removeFromSearch,
  search,
} from "../../../store/actions/userActions";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/useAppContext";

export default function SearchMenu({ color, setShowSearchMenu }) {
  const { user } = useAppContext();
  const { token } = user;
  const [iconVisible, setIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const menu = useRef(null);
  const input = useRef(null);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  const getHistory = useCallback(async () => {
    // eslint-disable-next-line
    const res = await getSearchHistory(token);
    setSearchHistory(res);
  }, [token]);

  useEffect(() => {
    input.current.focus();
  }, []);

  const searchHandler = useCallback(async () => {
    console.log("tokensearchHandler", token);
    console.log("searchTerm_searchHandler", searchTerm);

    // If the searchTerm is an empty string, set the results to an empty array
    if (searchTerm === "") {
      setResults([]);
    } else {
      // Call the search function with the searchTerm
      const searchFunction = search(searchTerm);

      // Pass the data and token as separate arguments to searchFunction
      const res = await searchFunction({}, token)();

      // Alternatively, you can use .then and .catch for handling promises
      // searchFunction({}, token)().then(console.log).catch(console.error);

      // Update the results with the received data
      setResults(res);
    }
  }, [search, searchTerm, token]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  const addToSearchHistoryHandler = async (searchUser) => {
    // eslint-disable-next-line
    const res = await addToSearchHistory(searchUser, token);
    getHistory();
  };

  const handleRemove = async (searchUser) => {
    removeFromSearch(searchUser, token);
    getHistory();
  };

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Facebook"
            ref={input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={searchHandler}
            onFocus={() => {
              setIconVisible(false);
            }}
            onBlur={() => {
              setIconVisible(true);
            }}
          />
        </div>
      </div>
      {results === "" && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a>Edit</a>
        </div>
      )}
      <div className="search_history scrollbar">
        {searchHistory &&
          results === "" &&
          Array.isArray(searchHistory) &&
          searchHistory.length > 0 &&
          searchHistory
            .sort((a, b) => {
              return new Date(b.createdAt) - new Date(a.createdAt);
            })
            .map((user) => (
              <div className="search_user_item hover1" key={user._id}>
                <Link
                  className="flex"
                  to={`/profile/${user.user.username}`}
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  <img src={user?.user?.picture} alt="" />
                  <span>
                    {user?.user?.first_name} {user?.user?.last_name}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => {
                    handleRemove(user.user._id);
                  }}
                ></i>
              </div>
            ))}
      </div>
      <div className="search_results scrollbar">
        {results &&
          Array.isArray(results) &&
          results.length > 0 &&
          results?.map((user) => (
            <Link
              to={`/profile/${user.username}`}
              className="search_user_item hover1"
              onClick={() => addToSearchHistoryHandler(user._id)}
              key={user._id}
            >
              <img src={user?.picture} alt="" />
              <span>
                {user?.first_name} {user?.last_name}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
