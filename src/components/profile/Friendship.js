import React, { useEffect, useRef, useState, useMemo } from "react";
import useClickOutside from "../../utils/clickOutside";
import { useSelector, useDispatch } from "react-redux";
import { follow, unfollow, unfriend } from "../../store/actions/userActions";
import {
  acceptFriendInvitation,
  rejectFriendInvitation,
  sendFriendInvitation,
} from "../../store/actions/friendsActions";
import { getProfile } from "../../store/actions/profileActions";
import { useProfileContext } from "../../context/useProfileContext";
import { useParams } from "react-router-dom";

function Friendship({ friendshipp }) {
  const dispatch = useDispatch();
  const { profile } = useProfileContext();
  const { username } = useParams();

  // useEffect(() => {
  //   dispatch(getProfile(username));
  // }, []);

  const profileid = profile.profile._id;
  const [friendship, setFriendship] = useState(friendshipp);
  useEffect(() => {
    setFriendship(friendshipp);
  }, [friendshipp]);
  const [friendsMenu, setFriendsMenu] = useState(false);
  const [respondMenu, setRespondMenu] = useState(false);
  const menu = useRef(null);
  const menu1 = useRef(null);
  useClickOutside(menu, () => setFriendsMenu(false));
  useClickOutside(menu1, () => setRespondMenu(false));
  const { user } = useSelector((state) => ({ ...state }));

  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await dispatch(
      sendFriendInvitation({
        targetMailAddress: profile.profile.email,
        token: user.token,
      })
    );
  };

  const cancelRequestHandler = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await dispatch(
      rejectFriendInvitation({ profileId: profileid, token: user.token })
    );
  };

  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await dispatch(follow(profileid, user.token));
  };

  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await dispatch(unfollow(profileid, user.token));
  };

  const acceptRequestHanlder = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
    await dispatch(
      acceptFriendInvitation({ id: profileid, token: user.token })
    );
  };

  const unfriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await dispatch(unfriend(profileid, user.token));
  };

  const deleteRequestHanlder = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await dispatch(
      rejectFriendInvitation({ profileId: profileid, token: user.token })
    );
  };

  return (
    <div className="friendship">
      {friendship?.friends ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
            <img src="../../../icons/friends.png" alt="" />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={menu}>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/favoritesOutline.png" alt="" />
                Favorites
              </div>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/editFriends.png" alt="" />
                Edit Friend list
              </div>
              {friendship?.following ? (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => unfollowHandler()}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Unfollow
                </div>
              ) : (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => followHandler()}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Follow
                </div>
              )}
              <div
                className="open_cover_menu_item hover1"
                onClick={() => unfriendHandler()}
              >
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="blue_btn" onClick={() => addFriendHandler()}>
            <img src="../../../icons/addFriend.png" alt="" className="invert" />
            <span>Add Friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="blue_btn" onClick={() => cancelRequestHandler()}>
          <img
            src="../../../icons/cancelRequest.png"
            className="invert"
            alt=""
          />
          <span>Cancel Request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friends_menu_wrap">
            <button className="gray_btn" onClick={() => setRespondMenu(true)}>
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {respondMenu && (
              <div className="open_cover_menu" ref={menu1}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => acceptRequestHanlder()}
                >
                  Confirm
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={() => deleteRequestHanlder()}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
        )
      )}
      <div className="flex">
        {friendship?.following ? (
          <button className="gray_btn" onClick={() => unfollowHandler()}>
            <img src="../../../icons/follow.png" alt="" />
            <span>Following</span>
          </button>
        ) : (
          <button className="blue_btn" onClick={() => followHandler()}>
            <img src="../../../icons/follow.png" className="invert" alt="" />
            <span>Follow</span>
          </button>
        )}
        <button className={friendship?.friends ? "blue_btn" : "gray_btn"}>
          <img
            src="../../../icons/message.png"
            className={friendship?.friends && "invert"}
            alt=""
          />
          <span>Message</span>
        </button>
      </div>
    </div>
  );
}

export default React.memo(Friendship);
