import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptFriendInvitation,
  rejectFriendInvitation,
} from "../../store/actions/friendsActions";

export default function Card({ userr, type, allDate, key, second }) {
  const dispatch = useDispatch();

  const confirmHandler = async (invitationId) => {
    dispatch(
      acceptFriendInvitation({ senderId: userr._id, receiverId: second })
    );
  };

  const deleteHandler = async (invitationId) => {
    dispatch(
      rejectFriendInvitation({ senderId: userr._id, receiverId: second })
    );
  };

  return (
    <div className="req_card">
      <Link to={`/profile/${userr.username}`}>
        <img src={userr.picture} alt="" />
      </Link>
      <div className="req_name">
        {userr.first_name} {userr.last_name}
      </div>
      {type === "request" ? (
        <>
          <button className="blue_btn" onClick={() => confirmHandler()}>
            Confirm
          </button>
          <button className="gray_btn" onClick={() => deleteHandler()}>
            Delete
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
