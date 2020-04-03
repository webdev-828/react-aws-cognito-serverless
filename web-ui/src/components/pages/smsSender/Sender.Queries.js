import gql from 'graphql-tag';

export const USER_QUERY_EMAILS = gql`
  query UserEmails($userId: Int!) {
    email_messages(where: { user_id: { _eq: $userId } }) {
      created_at
      address
      email_subject
      email_text
      id
    }
  }
`;

export const LC_PROFILE_QUERY = gql`
  query UserProfileBasic($userId: Int!) {
    user: users(where: { user_id: { _eq: $userId } }) {
      user_email
      user_phone
    }
  }
`;

export const USER_QUERY_SMS = gql`
  query UserSms($userId: Int!) {
    sms_messages(where: { user_id: { _eq: $userId } }) {
      created_at
      address
      sms_subject
      sms_text
      id
    }
  }
`;
