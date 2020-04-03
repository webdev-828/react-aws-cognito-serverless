import Amplify, { Auth } from 'aws-amplify';
import Storage from '@aws-amplify/storage';

export function configureAmplify() {
  Amplify.configure({
    Auth: {
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,

      // REQUIRED - Amazon Cognito Region
      region: process.env.REACT_APP_REGION,

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: process.env.REACT_APP_USER_POOL_ID,

      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,

      // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
      mandatorySignIn: true,
    },
    Storage: {
      bucket: process.env.REACT_APP_BUCKET,
      region: process.env.REACT_APP_REGION,
      ACL: 'public-read',
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
    },
    API: {
      endpoints: [
        {
          name: 'api',
          endpoint: process.env.REACT_APP_API_HOST,
          custom_header: async () => {
            return {
              Authorization: `Bearer ${(await Auth.currentSession())
                .getIdToken()
                .getJwtToken()}`,
            };
          },
        },
      ],
    },
  });
}

export function SetS3Config(bucket, level) {
  console.log(process.env.REACT_APP_IDENTITY_POOL_ID);
  Storage.configure({
    bucket: bucket,
    level: level,
    region: process.env.REACT_APP_REGION,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
  });
}
