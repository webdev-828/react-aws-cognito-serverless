import gql from 'graphql-tag';

export const GET_HC_STUDENTS = gql `
    query getModules($user_id: Int!, $user_type: String!) {
        v_hc_students(where: { user_type: { _eq: $user_type }, hc_id: {_eq: $user_id}}) {
            user_email
            user_first_name
            user_id
            user_last_name
            hc_name
            hc_id
            user_cognito_sub
        }
    }
`;

