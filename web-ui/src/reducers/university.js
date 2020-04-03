export const REQUEST_UNIVERSITIES = 'university/REQUEST_UNIVERSITIES';
export const RECEIVE_UNIVERSITIES = 'university/RECEIVE_UNIVERSITIES';
export const FETCH_UNIVERSITIES = 'university/SET_UNIVERSITIES';
export const ADD_UNIVERSITY = 'university/ADD_UNIVERSITY';
export const EDIT_UNIVERSITY = 'university/EDIT_UNIVERSITY';

export const fetchUniversities = (data) => ({type: FETCH_UNIVERSITIES, data});
export const addUniversity = (data) => ({type: ADD_UNIVERSITY, data})
export const editUniversity = (data) => ({type: EDIT_UNIVERSITY, data});

const initialState = {
    loading: false,
    result: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_UNIVERSITIES:
            return {
                ...state, loading: true
            };
        case RECEIVE_UNIVERSITIES:
            return {
                ...state, loading: false, result: action.result
            };
    
        default:
            return state;
    }
}