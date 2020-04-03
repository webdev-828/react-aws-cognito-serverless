/**
 * Action types
 */

export const SET_CAREER = 'career/SET_CAREER';
export const REQEUST_CAREER = 'career/REQEUST_CAREER';
export const FETCH_CAREER = 'career/FETCH_CAREER';
export const RECEIVE_CAREER = 'career/RECEIVE_CAREER';

/**
 * Action types
 */
export const setCareer = (career) => ({type: SET_CAREER, career});
export const fetchCareer = () => ({type: FETCH_CAREER});
export const requestCareer = () => ({type: REQEUST_CAREER});
export const receiveCareer = (career) => ({type: RECEIVE_CAREER, career});

/**
 * Reducers
 */

const initialState = {
    career: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQEUST_CAREER:
            return {
                ...state,
           };
        case RECEIVE_CAREER:
                return {
                    ...state,
                    career: action.careers
               };        
        default:
            return state;
   };
};