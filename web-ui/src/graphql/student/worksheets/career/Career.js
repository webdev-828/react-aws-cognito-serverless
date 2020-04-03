import gql from 'graphql-tag';

export const GET_CAREER = gql `
    query getCareer($usersub: String!, $subid: Int!) {
        career: c_career(where: {_and: {usersub: {_eq: $usersub}, sub_id: {_eq: $subid}}}) {
            id value
        }
    }
`;

export const INSEERT_CAREER = gql `
    mutation insertCareer($career: [c_career_insert_input!]!) {
        career: insert_c_career(objects: $career, on_conflict: {constraint: c_career_pkey, update_columns: value}) {
            affected_rows
        }
    }  
`;

export const GET_CAREER_COMMENT = gql `
    query getCareerComment($userid: Int!, $student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_career_comment(where: {_and: {userid: {_eq: $userid}, student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const GET_CAREER_COMMENT1 = gql `
    query getCareerComment($student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_career_comment(where: {_and: {student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const INSERT_CAREER_COMMENT = gql `
    mutation insertCareerComments($comments: [c_career_comment_insert_input!]!) {
        comment: insert_c_career_comment(objects: $comments, on_conflict: {constraint: c_career_comment_pkey, update_columns: [comment, reply]}) {
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

export const DELETE_CAREER_COMMENT = gql `
    mutation deleteCareerComment($id: Int!) {
        rows: delete_c_career_comment(where: {id: {_eq: $id}}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`;