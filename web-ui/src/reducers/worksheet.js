
/**
 * Action types
 */

export const SET_WORKSHEETS = 'worksheet/SET_WORKSHEETS';
export const REQUEST_WORKSHEETS = 'worksheet/REQUEST_WORKSHEETS';
export const FETCH_WORKSHEETS = 'worksheet/FETCH_WORKSHEETS';
export const RECEIVE_WORKSHEETS = 'worksheet/RECEIVE_WORKSHEETS';

/**
 * Actions creator
 */

export const setWorksheet = (worksheets) => ({type: SET_WORKSHEETS, worksheets});
export const fetchWorksheets = () => ({type: FETCH_WORKSHEETS});
export const requestWorksheets = () => ({type: REQUEST_WORKSHEETS});
export const receiveWorksheets = (worksheets) => ({type: RECEIVE_WORKSHEETS, worksheets});

/**
 * Reducers
 */

const initialState = {
    worksheets: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_WORKSHEETS:
            return {
                ...state
           };
        case RECEIVE_WORKSHEETS:
            return {
                ...state,
                worksheets: action.worksheets
           };        
        default:
            return state;
   };
};