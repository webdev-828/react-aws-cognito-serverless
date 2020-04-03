import gql from 'graphql-tag';

export const GET_IMPLEMENTATION = gql `
    query getImplementation($usersub: String!, $subid: Int!) {
        implementation: c_implementation(where: {_and: {usersub: {_eq: $usersub}, sub_id: {_eq: $subid}}}) {
            id value
        }
    }
`;

export const INSEERT_IMPLEMENTATION = gql `
    mutation insertImplementation($implementation: [c_implementation_insert_input!]!) {
        implementation: insert_c_implementation(objects: $implementation, on_conflict: {constraint: c_implementation_pkey, update_columns: value}) {
            affected_rows
        }
    }  
`;

export const GET_IMPLEMENTATION_COMMENT = gql `
    query getImplementationComment($userid: Int!, $student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_implementation_comment(where: {_and: {userid: {_eq: $userid}, student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
            id
            comment
            reply
            moduleid
            userid
            student_sub
            itemid
            LC {
                user_first_name
                user_last_name
            }
            Student {
                user_first_name
                user_last_name
                student_profiles {
                    user_pic
                }
            }
        }
    }  
`;

export const GET_IMPLEMENTATION_COMMENT1 = gql `
    query getImplementationComment($student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_implementation_comment(where: {_and: {student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
            id
            comment
            reply
            moduleid
            userid
            student_sub
            itemid
            LC {
                user_first_name
                user_last_name
            }
            Student {
                user_first_name
                user_last_name
                student_profiles {
                    user_pic
                }
            }
        }
    }  
`;

export const INSERT_IMPLEMENTATION_COMMENT = gql `
    mutation insertImplementationComments($comments: [c_implementation_comment_insert_input!]!) {
        comment: insert_c_implementation_comment(objects: $comments, on_conflict: {constraint: c_implementation_comment_pkey, update_columns: [comment, reply]}) {
            returning {
                id
                comment
                reply
                moduleid
                userid
                student_sub
                itemid
                LC {
                    user_first_name
                    user_last_name
                }
                Student {
                    user_first_name
                    user_last_name
                    student_profiles {
                        user_pic
                    }
                }
            }
        }
    }  
`;

export const DELETE_IMPLEMENTATION_COMMENT = gql `
    mutation deleteImplementationComment($id: Int!) {
        rows: delete_c_implementation_comment(where: {id: {_eq: $id}}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`;