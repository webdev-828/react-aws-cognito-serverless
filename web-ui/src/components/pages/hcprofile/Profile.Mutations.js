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

const UPDATE_LC_PROFILE = gql`
  mutation LcProfileMutation(
    $userId: Int!
    $high_school_graduation_year: Int!
    $high_school_gpa: Int!
  ) {
    update_lc_profile(
      where: { user_id: { _eq: $userId } }
      _set: {
        high_school_graduation_year: $high_school_graduation_year
        high_school_gpa: $high_school_gpa
      }
    ) {
      affected_rows
    }
  }
`;

const USER_UPDATE_PIC = gql`
  mutation UserMutationPic($userId: Int!, $path: String) {
    update_lc_profile(
      where: { user_id: { _eq: $userId } }
      _set: { user_pic: $path }
    ) {
      affected_rows
    }
  }
`;

export { UPDATE_USER, USER_UPDATE_PIC, UPDATE_LC_PROFILE };
