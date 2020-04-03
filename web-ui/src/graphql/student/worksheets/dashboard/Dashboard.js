import gql from 'graphql-tag';

export const GET_WORKSHEETS = gql `
    query getModules($usersub: String!, $sub_id: Int!) {
        dashboard: w_dashboard(order_by: {id: asc}) {
            id title time url
        }
        analysis: w_self(order_by: {id: asc}) {
            id title time url
        }
        core: w_core(order_by: {id: asc}) {
            id title time url
        }
        life: w_life(order_by: {id: asc}) {
            id title time url
        }
        career: w_career(order_by: {id: asc}) {
            id title time url
        }
        college: w_college(order_by: {id: asc}) {
            id title time url
        }
        implement: w_implementation(order_by: {id: asc}) {
            id title time url
        }
        essays: w_essays(order_by: {id: asc}) {
            id title time url
        }
        worksheets: worksheet {
            id worksheet_name worksheet_url time
        }
        weadmit: c_dashboard(where: {_and: {usersub: {_eq: $usersub}, sub_id: {_eq: $sub_id}}}, order_by: {id: asc}) {
            id value
        }
    }  
`;

export const GET_DASHBOARD = gql `
    query getDashboard($usersub: String!, $sub_id: Int!) {
        dashboard: c_dashboard(where: {_and: {usersub: {_eq: $usersub}, sub_id: {_eq: $sub_id}}}) {
            id value
        }
    } 
`;

export const INSEERT_DASHBOARD = gql `
    mutation insertDashboard($dashboard: [c_dashboard_insert_input!]!) {
        dashboard: insert_c_dashboard(objects: $dashboard, on_conflict: {constraint: c_dashboard_pkey, update_columns: value}) {
            affected_rows
        }
    }  
`;

export const GET_DASHBOARD_COMMENT = gql `
    query getDashboardComment($userid: Int!, $student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_dashboard_comment(where: {_and: {userid: {_eq: $userid}, student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const GET_DASHBOARD_COMMENT1 = gql `
    query getDashboardComment($student_sub: uuid!, $moduleid: Int!, $itemid: Int!) {
        comments: c_dashboard_comment(where: {_and: {student_sub: {_eq: $student_sub}, moduleid: {_eq: $moduleid}, itemid: {_eq: $itemid}}}, order_by: {id: asc}) {
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

export const INSERT_DASHBOARD_COMMENT = gql `
    mutation insertDashboardComments($comments: [c_dashboard_comment_insert_input!]!) {
        comment: insert_c_dashboard_comment(objects: $comments, on_conflict: {constraint: c_dashboard_comment_pkey, update_columns: [comment, reply]}) {
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

export const DELETE_DASHBOARD_COMMENT = gql `
    mutation deleteDashboardComment($id: Int!) {
        rows: delete_c_dashboard_comment(where: {id: {_eq: $id}}) {
            affected_rows
            returning {
                id
            }
        }
    }  
`;