/**
 * Action types
 */

export const SET_IMPLEMENTATION = 'implementation/SET_IMPLEMENTATION';
export const REQEUST_IMPLEMENTATION = 'implementation/REQEUST_IMPLEMENTATION';
export const FETCH_IMPLEMENTATION = 'implementation/FETCH_IMPLEMENTATION';
export const RECEIVE_IMPLEMENTATION = 'implementation/RECEIVE_IMPLEMENTATION';

/**
 * Action types
 */
export const setImplementation = (implementation) => ({type: SET_IMPLEMENTATION, implementation});
export const fetchImplementation = () => ({type: FETCH_IMPLEMENTATION});
export const requestImplementation = () => ({type: REQEUST_IMPLEMENTATION});
export const receiveImplementation = (implementation) => ({type: RECEIVE_IMPLEMENTATION, implementation});

/**
 * Reducers
 */

const initialState = {
    implementation: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQEUST_IMPLEMENTATION:
            return {
                ...state,
           };
        case RECEIVE_IMPLEMENTATION:
                return {
                    ...state,
                    implementation: action.implementations
               };        
        default:
            return state;
   };
};