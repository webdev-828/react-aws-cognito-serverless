import gql from 'graphql-tag';

export const GET_UNIVERSITY = gql `
    query getUniversities($usersub: String!) {
        universities: university(where: {usersub: {_eq: $usersub}}, order_by: {id: asc}) {
            id
            value
        }
    }  
`

export const INSERT_UNIVERSITY = gql `
    mutation insertUniversity($university: [university_insert_input!]!) {
        university: insert_university(on_conflict: {constraint: university_pkey, update_columns: value}, objects: $university) {
            returning {
                id
                value
            }
        }
    }  
`