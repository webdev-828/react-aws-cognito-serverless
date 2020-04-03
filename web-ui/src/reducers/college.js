/**
 * Action types
 */

export const SET_COLLEGE = 'college/SET_COLLEGE';
export const REQEUST_COLLEGE = 'college/REQEUST_COLLEGE';
export const FETCH_COLLEGE = 'college/FETCH_COLLEGE';
export const RECEIVE_COLLEGE = 'college/RECEIVE_COLLEGE';

/**
 * Action types
 */
export const setCollege = (college) => ({type: SET_COLLEGE, college});
export const fetchCollege = () => ({type: FETCH_COLLEGE});
export const requestCollege = () => ({type: REQEUST_COLLEGE});
export const receiveCollege = (college) => ({type: RECEIVE_COLLEGE, college});

/**
 * Reducers
 */

const initialState = {
    college: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQEUST_COLLEGE:
            return {
                ...state,
           };
        case RECEIVE_COLLEGE:
                return {
                    ...state,
                    college: action.colleges
               };        
        default:
            return state;
   };
};