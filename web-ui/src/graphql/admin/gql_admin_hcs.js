import gql from 'graphql-tag';

export const GET_ADMIN_HCS = gql `
    query getModules($user_type: String!) {
        users(where: { user_type: { _eq: $user_type }}) {
            user_email
            user_first_name
            user_id
            user_last_name
        }
    }
`;