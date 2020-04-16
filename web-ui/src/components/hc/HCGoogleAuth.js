import React from 'react';
import { GoogleLogin } from 'react-google-login';

const HCGoogleAuth = ({ onSuccess }) => {
  const onAuthError = (resp) => {
    console.log(resp);
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Connect your Google Calendar"
      onSuccess={onSuccess}
      onFailure={onAuthError}
      cookiePolicy={'single_host_origin'}
      scope="https://www.googleapis.com/auth/calendar.events"
      responseType="code"
      accessType="offline"
      prompt="consent"
      redirectUri="https://app.weadmit.io"
    />
  );
};

export default HCGoogleAuth;
