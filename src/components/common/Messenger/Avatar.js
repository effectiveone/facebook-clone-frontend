import React from 'react';
import { styled } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';

const AvatarPreview = styled('div')({
  height: '40px',
  width: '40px',
  backgroundColor: '#e4e6eb',
  borderRadius: '50%',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const DefaultAvatar = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&::before': {
    content: '""',
    width: '60%',
    height: '60%',
    backgroundColor: '#aaa',
    borderRadius: '50%',
    position: 'absolute',
    top: '10%',
    left: '20%',
  },

  '&::after': {
    content: '""',
    width: '100%',
    height: '50%',
    backgroundColor: '#aaa',
    position: 'absolute',
    bottom: '-15%',
    borderRadius: '50% 50% 0 0',
  },
});

const ActiveIndicator = styled('div')({
  width: '8px',
  height: '8px',
  backgroundColor: '#31a24c',
  borderRadius: '50%',
  border: '2px solid white',
  position: 'absolute',
  bottom: '0',
  right: '0',
  zIndex: 2,
});

const Avatar = ({ username, large, showStatus = false, imageUrl = null }) => {
  return (
    <Tooltip title={username} placement='left'>
      <AvatarPreview style={large ? { height: '80px', width: '80px' } : {}}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={username}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <DefaultAvatar />
        )}
        {showStatus && <ActiveIndicator />}
      </AvatarPreview>
    </Tooltip>
  );
};

export default Avatar;
