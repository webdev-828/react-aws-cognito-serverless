import gql from 'graphql-tag';

export const GET_MODULES = gql `
    query getModules ($usersub: String!) {
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

        c_dashboard: c_dashboard(where: {usersub: {_eq: $usersub}}) {
            id value
        }

        c_self: c_self(where: {usersub: {_eq: $usersub}}) {
            id value
        }

        c_core: c_core(where: {usersub: {_eq: $usersub}}) {
            id value
        }

        c_life: c_life(where: {usersub: {_eq: $usersub}}) {
            id value
        }

        c_career: c_career(where: {usersub: {_eq: $usersub}}) {
            id value
        }

        c_college: c_college(where: {usersub: {_eq: $usersub}}) {
            id value
        }

        c_implementation: c_implementation(where: {usersub: {_eq: $usersub}}) {
            id value
        }

        c_essays: c_essays(where: {usersub: {_eq: $usersub}}) {
            id value
        }
    }
`;