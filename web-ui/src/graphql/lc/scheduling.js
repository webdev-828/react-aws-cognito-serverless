import gql from 'graphql-tag';

export const GET_GOOGLE_AUTH_TOKENS = gql`
    query googleAuthTokens($code: String!) {
        googleAuth(code: $code) {
            access_token
            refresh_token
        }
    }
`;

export const SAVE_GOOGLE_AUTH_TOKEN = gql`
    mutation updateUser($sub: uuid!, $auth: String!) {
        update_users(where: {user_cognito_sub: {_eq: $sub }}, _set: { user_google_auth: $auth}) {
            returning {
                user_google_auth
            }
        }
    }
`;
