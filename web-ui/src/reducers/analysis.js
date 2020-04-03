/**
 * Action types
 */

export const SET_ANALYSIS = 'analysis/SET_ANALYSIS';
export const REQEUST_ANALYSIS = 'analysis/REQEUST_ANALYSIS';
export const FETCH_ANALYSIS = 'analysis/FETCH_ANALYSIS';
export const RECEIVE_ANALYSIS = 'analysis/RECEIVE_ANALYSIS';

/**
 * Action types
 */
export const setAnalysis = (analysis) => ({type: SET_ANALYSIS, analysis});
export const fetchAnalysis = () => ({type: FETCH_ANALYSIS});
export const requestAnalysis = () => ({type: REQEUST_ANALYSIS});
export const receiveAnalysis = (analysis) => ({type: RECEIVE_ANALYSIS, analysis});

/**
 * Reducers
 */

const initialState = {
    analysis: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQEUST_ANALYSIS:
            return {
                ...state,
           };
        case RECEIVE_ANALYSIS:
                return {
                    ...state,
                    analysis: action.analys
               };        
        default:
            return state;
   };
};