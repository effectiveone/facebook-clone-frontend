import { roomActions } from "../types/roomTypes";

export const setOpenRoom = (
  isUserRoomCreator = false,
  isUserInRoom = false
) => {
  return {
    type: roomActions.OPEN_ROOM,
    isUserRoomCreator,
    isUserInRoom,
  };
};

export const getActions = (dispatch) => {
  return {
    setAudioOnly: (audioOnly) => dispatch(setAudioOnly(audioOnly)),
    setScreenSharingStream: (stream) => {
      dispatch(setScreenSharingStream(stream));
    },
  };
};

export const setRoomDetails = (roomDetails) => {
  return {
    type: roomActions.SET_ROOM_DETAILS,
    roomDetails,
  };
};

export const setActiveRooms = (activeRooms) => {
  return {
    type: roomActions.SET_ACTIVE_ROOMS,
    activeRooms,
  };
};

export const setLocalStream = (localStream) => {
  return {
    type: roomActions.SET_LOCAL_STREAM,
    localStream,
  };
};

export const setAudioOnly = (audioOnly) => {
  return {
    type: roomActions.SET_AUDIO_ONLY,
    audioOnly,
  };
};

export const setRemoteStreams = (remoteStreams) => {
  return {
    type: roomActions.SET_REMOTE_STREAMS,
    remoteStreams,
  };
};

export const setScreenSharingStream = (stream) => {
  return {
    type: roomActions.SET_SCREEN_SHARE_STREAM,
    isScreenSharingActive: stream ? true : false,
    screenSharingStream: stream || null,
  };
};

export const setIsUserJoinedOnlyWithAudio = (onlyWithAudio) => {
  return {
    type: roomActions.SET_IS_USER_JOINED_WITH_ONLY_AUDIO,
    isUserJoinedWithOnlyAudio: onlyWithAudio,
  };
};
