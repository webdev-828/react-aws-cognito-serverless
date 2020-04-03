import gql from 'graphql-tag';

export const INSERT_EMAIL_ROW = gql`
  mutation insertEmailRow(
    $userId: Int!
    $text: String!
    $subject: String!
    $address: String!
  ) {
    insert_email_messages(
      objects: {
        user_id: $userId
        address: $address
        email_subject: $subject
        email_text: $text
      }
    ) {
      returning {
        user_id
      }
    }
  }
`;

export const INSERT_SMS_ROW = gql`
  mutation insertSmsRow(
    $userId: Int!
    $text: String!
    $subject: String!
    $address: String!
  ) {
    insert_sms_messages(
      objects: {
        user_id: $userId
        address: $address
        sms_subject: $subject
        sms_text: $text
      }
    ) {
      returning {
        user_id
      }
    }
  }
`;
