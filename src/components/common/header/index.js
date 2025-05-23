import './style.scss';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  Friends,
  FriendsActive,
  Gaming,
  Home,
  HomeActive,
  Logo,
  Market,
  Menu,
  Messenger,
  Notifications,
  Search,
  Watch,
} from '../../../assets/svg';
import { useSelector } from 'react-redux';
import SearchMenu from './SearchMenu';
import { useRef, useState, useEffect } from 'react';
import AllMenu from './AllMenu';
import useClickOutside from '../../../utils/clickOutside';
import UserMenu from './userMenu';

export default function Header({ page }) {
  // Pobieramy pełny stan Redux, aby sprawdzić gdzie jest token
  const state = useSelector((state) => state);
  const user = useSelector((state) => state.user);

  const color = '#65676b';
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [showAllMenu, setShowAllMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const allmenu = useRef(null);
  const usermenu = useRef(null);

  // Debug - sprawdzanie stanu Redux
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Sprawdzamy, gdzie jest token
      if (user?.token) {
        console.log('Token znaleziony w state.user.token');
      } else if (state?.auth?.token) {
        console.log('Token znaleziony w state.auth.token');
      } else {
        console.log('Struktura Redux:', Object.keys(state || {}).join(', '));
      }
    }
  }, [state, user]);

  useClickOutside(allmenu, () => {
    setShowAllMenu(false);
  });
  useClickOutside(usermenu, () => {
    setShowUserMenu(false);
  });

  return (
    <header>
      <div className='header_left'>
        <Link to='/' className='header_logo'>
          <div className='circle'>
            <Logo />
          </div>
        </Link>
        <div
          className='search search1'
          onClick={() => {
            setShowSearchMenu(true);
          }}
        >
          <Search color={color} />
          <input
            type='text'
            placeholder='Wyszukaj użytkowników'
            className='hide_input'
          />
        </div>
      </div>
      {showSearchMenu && (
        <SearchMenu color={color} setShowSearchMenu={setShowSearchMenu} />
      )}
      <div className='header_middle'>
        <Link
          to='/'
          className={`middle_icon ${page === 'home' ? 'active' : 'hover1'}`}
        >
          {page === 'home' ? <HomeActive /> : <Home color={color} />}
        </Link>
        <Link
          to='/friends'
          className={`middle_icon ${page === 'friends' ? 'active' : 'hover1'}`}
        >
          {page === 'friends' ? <FriendsActive /> : <Friends color={color} />}
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Watch color={color} />
          <div className='middle_notification'>9+</div>
        </Link>
        <Link to='/' className='middle_icon hover1'>
          <Market color={color} />
        </Link>
        <Link to='/' className='middle_icon hover1 '>
          <Gaming color={color} />
        </Link>
      </div>
      <div className='header_right'>
        <Link
          to='/profile'
          className={`profile_link hover1 ${
            page === 'profile' ? 'active_link' : ''
          }`}
        >
          <img src={user?.picture} alt='' />
          <span>{user?.first_name}</span>
        </Link>
        <div
          className={`circle_icon hover1 ${showAllMenu && 'active_header'}`}
          ref={allmenu}
        >
          <div
            onClick={() => {
              setShowAllMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: 'translateY(2px)' }}>
              <Menu />
            </div>
          </div>

          {showAllMenu && <AllMenu />}
        </div>
        <div className='circle_icon hover1'>
          <Messenger />
        </div>
        <div className='circle_icon hover1'>
          <Notifications />
          <div className='right_notification'>5</div>
        </div>
        <div
          className={`circle_icon hover1 ${showUserMenu && 'active_header'}`}
          ref={usermenu}
        >
          <div
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            <div style={{ transform: 'translateY(2px)' }}>
              <ArrowDown />
            </div>
          </div>

          {showUserMenu && <UserMenu user={user} />}
        </div>
      </div>
    </header>
  );
}
