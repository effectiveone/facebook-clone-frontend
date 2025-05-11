import { useRef, useState } from 'react';
import ProfilePicture from '../common/profielPicture';
import AvatarProfile from '../common/AvatarProfile';
import Friendship from './Friendship';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProfielPictureInfos({
  profile,
  visitor,
  photo,
  othername,
}) {
  // const user = useSelector((state) => state.user);
  const currentUserPicture = useSelector(
    (state) => state.profile.profile.picture,
  );

  const [show, setShow] = useState(false);
  const pRef = useRef(null);
  return (
    <div className='profile_img_wrap'>
      {show && <ProfilePicture setShow={setShow} pRef={pRef} photo={photo} />}
      <div className='profile_w_left'>
        <AvatarProfile
          photo={currentUserPicture}
          profile={profile}
          pRef={pRef}
          onClick={!visitor ? () => setShow(true) : undefined}
          showCamera={!visitor}
        />
        <div className='profile_w_col'>
          <div className='profile_name'>
            {profile.first_name} {profile.last_name}
            <div className='othername'>{othername && `(${othername})`}</div>
          </div>
          <div className='profile_friend_count'>
            {profile?.friends && (
              <div className='profile_card_count'>
                {profile?.friends.length === 0
                  ? ''
                  : profile?.friends.length === 1
                    ? '1 Friend'
                    : `${profile?.friends.length} Friends`}
              </div>
            )}
          </div>
          <div className='profile_friend_imgs'>
            {profile?.friends &&
              profile.friends.slice(0, 6).map((friend, i) => (
                <Link to={`/profile/${friend.username}`} key={i}>
                  <img
                    src={friend.picture}
                    alt=''
                    style={{
                      transform: `translateX(${-i * 7}px)`,
                      zIndex: `${i}`,
                    }}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
      {visitor ? (
        <Friendship friendshipp={profile?.friendship} profileid={profile._id} />
      ) : (
        <div className='profile_w_right'>
          <div className='blue_btn'>
            <img src='../../../icons/plus.png' alt='' className='invert' />
            <span>Add to story</span>
          </div>
          <div className='gray_btn'>
            <i className='edit_icon'></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
}
