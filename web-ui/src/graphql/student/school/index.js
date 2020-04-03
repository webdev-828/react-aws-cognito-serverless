import gql from 'graphql-tag';

const RESPONSE_FRAGMENT = gql`
    fragment StudentSchool on student_college {
        college_id,
        college_name
        category,
        id,
        student_sub
        __typename
    }
`;
export const GET_SCHOOLS = gql`
  query getSchools($student_sub: uuid!) {
    student_college(where: { student_sub: { _eq: $student_sub } }) {
      ...StudentSchool
    }
  }
  ${RESPONSE_FRAGMENT}
`;

export const ADD_SCHOOL = gql`
  mutation insert_college($input: student_college_insert_input!) {
    insert_student_college(objects: [$input]) {
      returning {
          ...StudentSchool
      }
    }
  }
  ${RESPONSE_FRAGMENT}
`;

export const DELETE_SCHOOL = gql`
  mutation deleteUser($college_id: String!, $student_sub: uuid!) {
    delete_student_college(
      where: {
        college_id: { _eq: $college_id }
        student_sub: { _eq: $student_sub }
      }
    ) {
      returning {
          ...StudentSchool
      }
    }
  }
  ${RESPONSE_FRAGMENT}
`;
