import { store } from '../../../store';
import {
  setLocalStream,
  setRemoteStreams,
} from '../../../store/actions/roomActions';
import Peer from 'simple-peer';
import 'webrtc-adapter';
import * as socketConnection from './socketConnection';

function getConfiguration() {
  const turnIceServers = null;

  if (turnIceServers) {
    // TODO use TURN server credentials
  } else {
    console.warn('Using only STUN server');
  }

  return {};
}

const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  video: true,
  audio: true,
};

export function getLocalStreamPreview(onlyAudio = false, callbackFunc) {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      console.log(err);
      console.log('Cannot get an access to local stream');
    });
}

let peers = {};

export function prepareNewPeerConnection(connUserSocketId, isInitiator) {
  const localStream = store.getState().room.localStream;

  if (!localStream) {
    console.log('Local stream is null or undefined');
    return;
  }

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: getConfiguration(),
    stream: localStream,
  });

  peers[connUserSocketId].on('signal', (data) => {
    const signalData = {
      signal: data,
      connUserSocketId,
    };
    socketConnection.signalPeerData(signalData);
  });

  peers[connUserSocketId].on('stream', (remoteStream) => {
    console.log('remote stream came from other user');
    console.log('direct connection has been established');
    remoteStream.connUserSocketId = connUserSocketId;
    addNewRemoteStream(remoteStream);
  });
}

export function handleSignalingData(data) {
  const { connUserSocketId, signal } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].signal(signal);
  }
}

function addNewRemoteStream(remoteStream) {
  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = [...remoteStreams, remoteStream];

  store.dispatch(setRemoteStreams(newRemoteStreams));
}

export function closeAllConnections() {
  Object.entries(peers).forEach(([connUserSocketId, peer]) => {
    if (peer) {
      peer.destroy();
      delete peers[connUserSocketId];
    }
  });
}

export function handleParticipantLeftRoom(data) {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;

  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId,
  );

  store.dispatch(setRemoteStreams(newRemoteStreams));
}

export function switchOutgoingTracks(stream) {
  const peersArray = Object.values(peers);

  peersArray.forEach((peer) => {
    peer._pc.getSenders().forEach((sender) => {
      const currentTrack = sender.track;
      const newTrack = stream
        .getTracks()
        .find((track) => track.kind === currentTrack.kind);
      if (newTrack) {
        sender.replaceTrack(newTrack);
      }
    });
  });
}
