import React, { useState, useEffect, useRef } from 'react';
import Video from 'twilio-video';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import CallEnd from '@material-ui/icons/CallEnd';
import ScreenShare from '@material-ui/icons/ScreenShare';
import Participant from './Participant';
import { getTracks, detachParticipantTracks, detachTrack} from './utils';
import styles from './styles';

const Room = ({ roomName, token, handleLogout, classes }) => {
  const [room, setRoom] = useState(null);
  const [sharingScreen, setSharingScreen] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [screenTrack, setScreenTrack] = useState(null);
  const screenRef = useRef();

  useEffect(() => {
    Video.connect(token, {
      name: roomName,
      audio: true,
      video: {
        width: { min: 856, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        frameRate: { min: 18, ideal: 24, max: 26 },
      },
    }).then((room) => {
      setRoom(room);
      room.participants.forEach(participantConnected);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.on('disconnected', (room) => {
        room.localParticipant.tracks.forEach((publication) => {
          publication.track.stop();
          publication.track.detach();
        });
        room.participants.forEach(detachParticipantTracks);
        handleLogout();
      });
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  useEffect(() => {
    if (screenTrack) {
      screenTrack.track.attach(screenRef.current);
    }
  }, [screenTrack]);

  const trackPublished = (publication, participant) => {
    console.log(
      `RemoteParticipant ${participant.identity} published a RemoteTrack: ${publication}`,
    );

    publication.on('subscribed', (track) => {
      console.log(`LocalParticipant subscribed to a RemoteTrack: ${track}`);
      if (track.kind === 'video' && publication.trackName === 'screen') {
        setScreenTrack(publication);
      }
    });

    publication.on('unsubscribed', (track) => {
      console.log(`LocalParticipant unsubscribed from a RemoteTrack: ${track}`);
    });
  };

  const participantConnected = (participant) => {
    setParticipants((prevParticipants) => [...prevParticipants, participant]);

    participant.tracks.forEach((publication) => {
      trackPublished(publication, participant);
    });

    participant.on('trackPublished', (publication) => {
      trackPublished(publication, participant);
    });

    participant.on('trackUnpublished', (publication) => {
      console.log(
        `RemoteParticipant ${participant.identity} unpublished a RemoteTrack: ${publication}`,
      );
      publication.track && publication.track.detach();
      if (publication.trackName === 'screen') {
        setScreenTrack();
      }
    });
  };

  const participantDisconnected = (participant) => {
    setParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p !== participant),
    );
  };

  const onShareScreen = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    stream.oninactive = onScreenShareEnd;
    const tracks = stream.getVideoTracks();
    const newScreenTrack = tracks[0];
    room.localParticipant
      .publishTrack(newScreenTrack, {
        name: 'screen',
      });
    setSharingScreen(true);
  };

  const onScreenShareEnd = () => {
    getTracks(room.localParticipant).forEach(t => {
      if (t.name === 'screen') {
          room.localParticipant.unpublishTrack(t);
          detachTrack(t);
          setSharingScreen(false);
      }
    });
    setScreenTrack();
  };

  const onDisconnect = () => {
    room.disconnect();
  };

  return (
    <>
      {room ? (
        <div className={classes.room}>
          <div className="screen-container">
            { screenTrack && (
              <video className="screen" ref={screenRef} autoPlay />
            )}
          </div>
          <div className={cx('participants', { small: !!screenTrack })}>
            <Participant isLocal participant={room.localParticipant} room={room} />
            {participants.map((p) => (
              <Participant participant={p} key={p.identity} />
            ))}
          </div>
          <div className={classes.footer}>
            <Fab color="secondary" onClick={onDisconnect}>
              <CallEnd />
            </Fab>
            {!screenTrack && !sharingScreen && (
              <Fab color="default" var onClick={onShareScreen}>
                <ScreenShare />
              </Fab>
            )}
          </div>
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default withStyles(styles)(Room);
