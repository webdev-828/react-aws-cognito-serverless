/**
 * Action types
 */

export const SET_DASHBOARD = 'dashboard/SET_DASHBOARD';
export const REQEUST_DASHBOARD = 'dashboard/REQEUST_DASHBOARD';
export const FETCH_DASHBOARD = 'dashboard/FETCH_DASHBOARD';
export const RECEIVE_DASHBOARD = 'dashboard/RECEIVE_DASHBOARD';

/**
 * Action types
 */
export const setDashboard = (dashboard) => ({type: SET_DASHBOARD, dashboard});
export const fetchDashboard = () => ({type: FETCH_DASHBOARD});
export const requestDashboard = () => ({type: REQEUST_DASHBOARD});
export const receiveDashboard = (dashboard) => ({type: RECEIVE_DASHBOARD, dashboard});

/**
 * Reducers
 */

const initialState = {
    dashboard: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQEUST_DASHBOARD:
            return {
                ...state,
           };
        case RECEIVE_DASHBOARD:
                return {
                    ...state,
                    dashboard: action.dash
               };        
        default:
            return state;
   };
};