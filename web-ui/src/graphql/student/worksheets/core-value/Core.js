import gql from 'graphql-tag';

export const GET_CORE = gql `
    query getCore($usersub: String!, $subid: Int!) {
        core: c_core(where: {_and: {usersub: {_eq: $usersub}, sub_id: {_eq: $subid}}}) {
            id value
        }
    }
`;

export const INSEERT_CORE = gql `
    mutation insertCore($core: [c_core_insert_input!]!) {
        core: insert_c_core(objects: $core, on_conflict: {constraint: c_core_pkey, update_columns: value}) {
            affected_rows
        }
    }  
`;

export const GET_CORE_COMMENT = gql `
    query getCoreComment($userid: Int!, $student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_core_comment(where: {_and: {userid: {_eq: $userid}, student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const GET_CORE_COMMENT1 = gql `
    query getCoreComment($student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_core_comment(where: {_and: {student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const INSERT_CORE_COMMENT = gql `
    mutation insertCoreComments($comments: [c_core_comment_insert_input!]!) {
        comment: insert_c_core_comment(objects: $comments, on_conflict: {constraint: c_core_comment_pkey, update_columns: [comment, reply]}) {
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

export const DELETE_CORE_COMMENT = gql `
    mutation deleteCoreComment($id: Int!) {
        rows: delete_c_core_comment(where: {id: {_eq: $id}}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`;