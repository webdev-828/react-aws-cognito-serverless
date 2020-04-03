import gql from 'graphql-tag';

export const GET_DOCUMENTS = gql`
    query getDocuments($userId:Int!) {
        documents: document_users(where:{ user_id: {_eq:$userId}}) {
            document {
                id
                filename
                document_id
                document_storage
                url
                creator {
                    user_first_name
                    user_last_name
                }
            }
        }
    }
`;
