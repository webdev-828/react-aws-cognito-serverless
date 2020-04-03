/**
 * Action types
 */

export const SET_LIFE = 'life/SET_LIFE';
export const REQEUST_LIFE = 'life/REQEUST_LIFE';
export const FETCH_LIFE = 'life/FETCH_LIFE';
export const RECEIVE_LIFE = 'life/RECEIVE_LIFE';

/**
 * Action types
 */
export const setLife = (life) => ({type: SET_LIFE, life});
export const fetchLife = () => ({type: FETCH_LIFE});
export const requestLife = () => ({type: REQEUST_LIFE});
export const receiveLife = (life) => ({type: RECEIVE_LIFE, life});

/**
 * Reducers
 */

const initialState = {
    life: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQEUST_LIFE:
            return {
                ...state,
           };
        case RECEIVE_LIFE:
                return {
                    ...state,
                    life: action.lifes
               };        
        default:
            return state;
   };
};