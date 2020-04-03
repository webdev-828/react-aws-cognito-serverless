import gql from 'graphql-tag';

export const GET_SELF = gql `
    query getSelf($usersub: String!, $subid: Int!) {
        self: c_self(where: {_and: {usersub: {_eq: $usersub}, sub_id: {_eq: $subid}}}) {
            id value
        }
    }
`;

export const INSEERT_SELF = gql `
    mutation insertSelf($self: [c_self_insert_input!]!) {
        self: insert_c_self(objects: $self, on_conflict: {constraint: c_self_pkey, update_columns: value}) {
            affected_rows
        }
    }  
`;

export const GET_SELF_COMMENT = gql `
    query getSelfComment($userid: Int!, $student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_self_comment(where: {_and: {userid: {_eq: $userid}, student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const GET_SELF_COMMENT1 = gql `
    query getSelfComment($student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_self_comment(where: {_and: {student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const INSERT_SELF_COMMENT = gql `
    mutation insertSelfComments($comments: [c_self_comment_insert_input!]!) {
        comment: insert_c_self_comment(objects: $comments, on_conflict: {constraint: c_self_comment_pkey, update_columns: [comment, reply]}) {
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

export const DELETE_SELF_COMMENT = gql `
    mutation deleteSelfComment($id: Int!) {
        rows: delete_c_self_comment(where: {id: {_eq: $id}}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`;