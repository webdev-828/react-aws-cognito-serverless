/**
 * Action types
 */

export const SET_CORE = 'core/SET_CORE';
export const REQEUST_CORE = 'core/REQEUST_CORE';
export const FETCH_CORE = 'core/FETCH_CORE';
export const RECEIVE_CORE = 'core/RECEIVE_CORE';

/**
 * Action types
 */
export const setCore = (core) => ({type: SET_CORE, core});
export const fetchCore = () => ({type: FETCH_CORE});
export const requestCore = () => ({type: REQEUST_CORE});
export const receiveCore = (core) => ({type: RECEIVE_CORE, core});

/**
 * Reducers
 */

const initialState = {
    core: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQEUST_CORE:
            return {
                ...state,
           };
        case RECEIVE_CORE:
                return {
                    ...state,
                    core: action.cor
               };        
        default:
            return state;
   };
};