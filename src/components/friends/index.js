import { Link } from 'react-router-dom';
import Header from '../common/header';
import Card from './Card';
import './style.scss';
import { useFriendsContext } from '../../context/useFriendsContext';

export default function Friends() {
  const { type, data, getData } = useFriendsContext();
  console.log('Friends_data', data);
  return (
    <>
      <Header page='friends' />
      <div className='friends'>
        <div className='friends_left'>
          <div className='friends_left_header'>
            <h3>Friends</h3>
            <div className='small_circle'>
              <i className='settings_filled_icon'></i>
            </div>
          </div>
          <div className='friends_left_wrap'>
            <Link
              to='/friends'
              className={`mmenu_item hover3 ${
                type === undefined && 'active_friends'
              }`}
            >
              <div className='small_circle'>
                <i className='friends_home_icon '></i>
              </div>
              <span>Home</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </Link>
            <Link
              to='/friends/requests'
              className={`mmenu_item hover3 ${
                type === 'requests' && 'active_friends'
              }`}
            >
              <div className='small_circle'>
                <i className='friends_requests_icon'></i>
              </div>
              <span>Friend Requests</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </Link>
            <Link
              to='/friends/sent'
              className={`mmenu_item hover3 ${
                type === 'sent' && 'active_friends'
              }`}
            >
              <div className='small_circle'>
                <i className='friends_requests_icon'></i>
              </div>
              <span>Sent Requests</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </Link>
            <div className='mmenu_item hover3'>
              <div className='small_circle'>
                <i className='friends_suggestions_icon'></i>
              </div>
              <span>Suggestions</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </div>
            <Link
              to='/friends/all'
              className={`mmenu_item hover3 ${
                type === 'all' && 'active_friends'
              }`}
            >
              <div className='small_circle'>
                <i className='all_friends_icon'></i>
              </div>
              <span>All Friends</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </Link>
            <div className='mmenu_item hover3'>
              <div className='small_circle'>
                <i className='birthdays_icon'></i>
              </div>
              <span>Birthdays</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </div>
            <div className='mmenu_item hover3'>
              <div className='small_circle'>
                <i className='all_friends_icon'></i>
              </div>
              <span>Custom Lists</span>
              <div className='rArrow'>
                <i className='right_icon'></i>
              </div>
            </div>
          </div>
        </div>
        <div className='friends_right'>
          {(type === undefined || type === 'requests') && (
            <div className='friends_right_wrap'>
              <div className='friends_left_header'>
                <h3>Friend Requests</h3>
                {type === undefined && (
                  <Link to='/friends/requests' className='see_link hover3'>
                    See all
                  </Link>
                )}
              </div>
              <div className='flex_wrap'>
                {data.receivedRequests &&
                  data.receivedRequests.map((user) => {
                    return (
                      <Card
                        second={user.receiverId}
                        userr={user._id}
                        key={user._id || user.senderId} // upewnij się, że klucz jest unikalny
                        type='request'
                        getData={getData}
                      />
                    );
                  })}
              </div>
            </div>
          )}
          {(type === undefined || type === 'sent') && (
            <div className='friends_right_wrap'>
              <div className='friends_left_header'>
                <h3>Sent Requests</h3>
                {type === undefined && (
                  <Link to='/friends/sent' className='see_link hover3'>
                    See all
                  </Link>
                )}
              </div>
              <div className='flex_wrap'>
                {data.sentRequests &&
                  data.sentRequests.map((user) => (
                    <Card
                      second={user.senderId}
                      userr={user.receiverId}
                      key={user}
                      allDate={user}
                      type='sent'
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
          {(type === undefined || type === 'all') && (
            <div className='friends_right_wrap'>
              <div className='friends_left_header'>
                <h3>Friends</h3>
                {type === undefined && (
                  <Link to='/friends/all' className='see_link hover3'>
                    See all
                  </Link>
                )}
              </div>
              <div className='flex_wrap'>
                {data.friends &&
                  data.friends.map((user) => (
                    <Card
                      userr={user}
                      key={user._id}
                      type='friends'
                      getData={getData}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
