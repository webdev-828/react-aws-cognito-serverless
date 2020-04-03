import gql from 'graphql-tag';

export const GET_DOCUMENTS = gql`
  query getDocuments($userId: Int!) {
    documents(where: { created_by: { _eq: $userId } }) {
      created_at
      document_id
      document_storage
      id
      filename
      url
    }
  }
`;
