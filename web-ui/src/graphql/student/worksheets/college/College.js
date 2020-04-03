import gql from 'graphql-tag';

export const GET_COLLEGE = gql `
    query getCollege($usersub: String!, $subid: Int!) {
        college: c_college(where: {_and: {usersub: {_eq: $usersub}, sub_id: {_eq: $subid}}}) {
            id value
        }
    }
`;

export const INSEERT_COLLEGE = gql `
    mutation insertCollege($college: [c_college_insert_input!]!) {
        college: insert_c_college(objects: $college, on_conflict: {constraint: c_college_pkey, update_columns: value}) {
            affected_rows
        }
    }  
`;


export const GET_COLLEGE_COMMENT = gql `
    query getCollegeComment($userid: Int!, $student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_college_comment(where: {_and: {userid: {_eq: $userid}, student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const GET_COLLEGE_COMMENT1 = gql `
    query getCollegeComment($student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_college_comment(where: {_and: {student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const INSERT_COLLEGE_COMMENT = gql `
    mutation insertCollegeComments($comments: [c_college_comment_insert_input!]!) {
        comment: insert_c_college_comment(objects: $comments, on_conflict: {constraint: c_college_comment_pkey, update_columns: [comment, reply]}) {
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

export const DELETE_COLLEGE_COMMENT = gql `
    mutation deleteCollegeComment($id: Int!) {
        rows: delete_c_college_comment(where: {id: {_eq: $id}}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`;