import gql from 'graphql-tag';

const UPDATE_USER = gql`
  mutation UserMutation(
    $sub: uuid!
    $name: String
    $lname: String
    $email: String
  ) {
    update_users(
      where: { user_cognito_sub: { _eq: $sub } }
      _set: {
        user_email: $email
        user_first_name: $name
        user_last_name: $lname
      }
    ) {
      affected_rows
    }
  }
`;

const UPDATE_USER_VISION = gql`
  mutation UserMutationPic(
    $userId: Int!
    $goal: String
    $major: String
    $toBe: String
    $toGive: String
    $toHave: String
  ) {
    update_student_profile(
      where: { user_id: { _eq: $userId } }
      _set: {
        career_goal: $goal
        intended_major: $major
        life_vision_tobe: $toBe
        life_vision_togive: $toGive
        life_vision_tohave: $toHave
      }
    ) {
      affected_rows
    }
  }
`;

const USER_UPDATE_PIC = gql`
  mutation UserMutationPic($userId: Int!, $path: String) {
    update_student_profile(
      where: { user_id: { _eq: $userId } }
      _set: { user_pic: $path }
    ) {
      affected_rows
    }
  }
`;

export { UPDATE_USER, USER_UPDATE_PIC, UPDATE_USER_VISION };
