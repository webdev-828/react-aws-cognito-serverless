import React, { useState, useCallback } from 'react';
import { Auth } from 'aws-amplify';
import { useSelector } from 'react-redux';
import Lobby from './Lobby';
import Room from './Room';
import apiClient from '../../utils/api-client';

const VideoChat = () => {
  const user = useSelector(s => s.user.user);
  const student = useSelector(s => s.student.profile);
  const [roomName, setRoomName] = useState('');
  const [jwtToken, setJwtToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  Auth.currentSession().then(userSession => {
    setJwtToken(userSession.getIdToken().getJwtToken());
  });

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      setLoading(true);
      const roomId = user.type === 'student' ? student.lc_user.user_cognito_sub : user.sub;
      setRoomName(roomId);
      const data =  await apiClient.post('/twilio/video/token', {
        room: roomId
      });
      setToken(data.token);
      setLoading(false);
   },
    [jwtToken, roomName, student]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
 }, []);

  var render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
 } else {
    render = (
      <Lobby
        loading={loading}
        handleSubmit={handleSubmit}
      />
    );
 }
  return render;
};

export default VideoChat;
