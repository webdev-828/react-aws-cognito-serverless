import React, { useState, useEffect, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

const Participant = ({ participant, isLocal }) => {
  console.log(participant);
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();

  const trackPublished = (publication) => {
    console.log(
      `RemoteParticipant ${participant.identity} published a RemoteTrack: ${publication}`,
    );

    publication.on('subscribed', (track) => {
      console.log(`LocalParticipant subscribed to a RemoteTrack: ${track}`);
      if (publication.isSubscribed) {
        if (track.kind === 'video') {
          setVideoTracks((videoTracks) => [...videoTracks, publication]);
        } else {
          setAudioTracks((audioTracks) => [...audioTracks, publication]);
        }
        console.log('subscribed', track);
      }
    });

    publication.on('unsubscribed', (track) => {
      console.log(`LocalParticipant unsubscribed from a RemoteTrack: ${track}`);
      console.log(track);
      if (track.kind === 'video') {
        setVideoTracks((videoTracks) =>
          videoTracks.filter((v) => v !== publication),
        );
      } else {
        setAudioTracks((audioTracks) =>
          audioTracks.filter((a) => a !== publication),
        );
      }
    });
  };

  useEffect(() => {
    setVideoTracks(Array.from(participant.videoTracks.values()));
    setAudioTracks(Array.from(participant.audioTracks.values()));

    participant.tracks.forEach((publication) => {
      trackPublished(publication);
    });

    participant.on('trackPublished', (publication) => {
      trackPublished(publication);
    });

    participant.on('trackUnpublished', (publication) => {
      console.log(
        `RemoteParticipant ${participant.identity} unpublished a RemoteTrack: ${publication}`,
        publication,
      );
      publication.track && publication.track.detach();
    });

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const videoTrack = videoTracks.find((i) => i.trackName !== 'screen');
    if (videoTrack) {
      if (isLocal || videoTrack.isSubscribed) {
        videoTrack.track.attach(videoRef.current);
      }
    }
    return () => {
      videoTrack && videoTrack.track && videoTrack.track.detach();
    };
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      if (isLocal || audioTrack.isSubscribed) {
        audioTrack.track.attach(audioRef.current);
      }
    }
    return () => {
      audioTrack && audioTrack.track && audioTrack.track.detach();
    };
  }, [audioTracks]);

  return (
    <div className="participant">
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={false} />
    </div>
  );
};

export default withStyles(styles)(Participant);
