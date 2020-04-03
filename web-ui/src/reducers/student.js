export const GET_STUDENT_PROFILE = 'student/GET_USER_PROFILE';
export const GET_STUDENT_RESOLVED = 'student/GET_STUDENT_RESOLVED';

export const setStudentProfile = (data) => ({ type: GET_STUDENT_RESOLVED, payload: data });

const initialState = {
  profile: {}
};

export default (state = initialState, action) => {
  const { type, payload} = action;
  switch (type) {
    case GET_STUDENT_RESOLVED: {
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload
        }
      }
    }
    default:
      return state;
  }
};
