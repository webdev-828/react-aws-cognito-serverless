import gql from 'graphql-tag';

export const GET_STUDENT_PROFILE = gql`
    query getUserProfile($id: Int) {
        student_profile(where: {user_id: { _eq: $id }}) {
            user_pic
            lc_user {
                user_id
                user_cognito_sub
            }
            hc_user {
                user_id
                user_cognito_sub
            }
        }   
    }
`;
