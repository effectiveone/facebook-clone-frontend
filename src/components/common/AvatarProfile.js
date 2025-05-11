import React from 'react';
import './AvatarProfile.scss';

export default function AvatarProfile({
  photo,
  profile,
  pRef,
  onClick,
  showCamera = true,
}) {
  return (
    <div className='profile_w_img'>
      <div
        className='profile_w_bg'
        ref={pRef}
        onClick={onClick}
        style={{
          backgroundImage: `url(${photo || profile.picture})`,
          cursor: onClick ? 'pointer' : 'default',
        }}
      />
      {showCamera && onClick && (
        <div className='profile_circle hover1' onClick={onClick}>
          <i className='camera_filled_icon'></i>
        </div>
      )}
    </div>
  );
}
