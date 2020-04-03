import gql from 'graphql-tag';

export const GET_LC_STUDENTS = gql `
    query getModules($user_id: Int!, $user_type: String!) {
        v_all_students(where: { user_type: { _eq: $user_type }, lc_id: {_eq: $user_id}}) {
            user_email
            user_first_name
            user_id
            user_last_name
            lc_name
            lc_id
            user_cognito_sub
        }
    }
`;

