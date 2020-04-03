import gql from 'graphql-tag';

export const GET_ADMIN_STUDENTS = gql `
    query getModules($user_id: Int!, $user_type: String!) {
        v_all_students(where: { user_type: { _eq: $user_type }}) {
            user_email
            user_first_name
            user_id
            user_last_name
            lc_name
            lc_id
        }
    }
`;

export const ADD_LC = gql `
    mutation add_lc($user_id: Int!, $lc_id: Int!, $lc_name: String!) {
        update_student_profile(where: {user_id: {_eq: $user_id}}, _set: {lc_id: $lc_id, lc_name: $lc_name}) {
            affected_rows
        }
    }
`;