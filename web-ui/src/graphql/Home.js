import gql from 'graphql-tag';

export const GET_USER = gql `
    query getUserinfo($sub: uuid!) {
        user: users(where: {user_cognito_sub: {_eq: $sub}}) {
            user_id user_email user_first_name user_last_name user_type user_cognito_sub user_google_auth
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($sub: uuid!, $data: users_set_input!) {
        user: update_users(where: {user_cognito_sub: {_eq: $sub}}, _set: $data) {
            returning {
                user_id user_email user_first_name user_last_name user_type user_cognito_sub user_google_auth
            }
        }
    }
`;

export const GET_WORKSHEETS = gql `
    query getWorksheet {
        worksheets: worksheet {
            id worksheet_name worksheet_url
        }
    }
`;
