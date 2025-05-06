import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  acceptFriendInvitation,
  rejectFriendInvitation,
} from '../../store/actions/friendsActions';

export default function Card({ userr, type, allDate }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const confirmHandler = () => {
    // Problem jest taki, ze senderId i receiverId sa undefined
    const senderId = userr;
    const receiverId = currentUser.id;
    dispatch(acceptFriendInvitation({ senderId, receiverId }));
  };

  const deleteHandler = () => {
    const senderId = userr?._id;
    const receiverId = currentUser._id;
    console.log('Odrzucam zaproszenie:', { senderId, receiverId });
    dispatch(rejectFriendInvitation({ senderId, receiverId }));
  };

  return (
    <div className='req_card'>
      <Link to={`/profile/${userr?.username}`}>
        <img src={userr?.picture} alt='' />
      </Link>
      <div className='req_name'>
        {userr?.first_name} {userr?.last_name}
      </div>
      {type === 'request' ? (
        <>
          <button className='blue_btn' onClick={confirmHandler}>
            Confirm
          </button>
          <button className='gray_btn' onClick={deleteHandler}>
            Delete
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
