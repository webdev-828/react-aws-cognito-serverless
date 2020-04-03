import gql from 'graphql-tag';

export const GET_LIFE = gql `
    query getLife($usersub: String!, $subid: Int!) {
        life: c_life(where: {_and: {usersub: {_eq: $usersub}, sub_id: {_eq: $subid}}}) {
            id value
        }
    }
`;

export const INSEERT_LIFE = gql `
    mutation insertLife($life: [c_life_insert_input!]!) {
        life: insert_c_life(objects: $life, on_conflict: {constraint: c_life_pkey, update_columns: value}) {
            affected_rows
        }
    }  
`;

export const GET_LIFE_COMMENT = gql `
    query getLife($userid: Int!, $student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_life_comment(where: {_and: {userid: {_eq: $userid}, student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const GET_LIFE_COMMENT1 = gql `
    query getLife($student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_life_comment(where: {_and: {student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const INSERT_LIFE_COMMENT = gql `
    mutation insertLifeComments($comments: [c_life_comment_insert_input!]!) {
        comment: insert_c_life_comment(objects: $comments, on_conflict: {constraint: c_life_comment_pkey, update_columns: [comment, reply]}) {
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

export const DELETE_LIFE_COMMENT = gql `
    mutation deleteLifeComment($id: Int!) {
        rows: delete_c_life_comment(where: {id: {_eq: $id}}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`;