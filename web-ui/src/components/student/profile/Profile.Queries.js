import gql from 'graphql-tag';

const USER_QUERY_TYPE = gql`
  query UserType {
    users(
      where: {
        user_cognito_sub: {_eq: "d087a1b9-cc40-4e84-adb3-4fca8759f1b8"}
     }
    ) {
      user_first_name
      user_last_name
      user_type
   }
 }
`;

const USER_QUERY_PROFILE_BASIC = gql`
  query UserProfileBasic($sub: uuid!) {
    user: users(where: {user_cognito_sub: {_eq: $sub}}) {
      user_first_name
      user_last_name
      user_email
      profile: student_profiles {
        high_school_graduation_year
        career_goal
        life_vision_tohave
        life_vision_togive
        life_vision_tobe
        intended_major
        user_pic  
     }
   }
 }
`;

const USER_QUERY_PROFILE_ACADEMIC = gql`
  query UserProfileAcademic($sub: uuid!) {
    user: users(where: {user_cognito_sub: {_eq: $sub}}) {
      profile: student_profiles {
        act1_english
        act1_math
        act1_reading
        act1_science
        act2_english
        act2_math
        act2_reading
        act2_science
        act3_english
        act3_math
        act3_reading
        act3_science
        act4_english
        act4_math
        act4_reading
        act4_science
        act5_english
        act5_math
        act5_reading
        act5_science
        gpa
        high_school_name
        n_district_level_extracurriculars
        n_ap_ib_classes
        n_honors_classes
        n_national_internation_extracurriculars
        n_other_acedemic_classes
        n_school_level_extracurriculars
        n_state_level_extracurriculars
        race_or_ethnicity
        sat1_math
        sat1_rw
        sat2_math
        sat2_rw
        sat3_math
        sat3_rw
        sat4_math
        sat4_rw
        sat5_math
        sat5_rw
     }
   }
 }
`;

const USER_QUERY_PIC = gql`
  query UserProfilePic($sub: uuid!) {
    user: users(where: { user_cognito_sub: { _eq: $sub } }) {
      profile: student_profiles {
        user_pic
      }
    }
  }
`;

const USER_QUERY_PROFILE_PREFS = gql`
  query UserProfilePrefs($sub: uuid!) {
    user: users(where: {user_cognito_sub: {_eq: $sub}}) {
      profile: student_profiles {
        region_preference_college
        state_preference_college
     }
   }
 }
`;

export {
  USER_QUERY_PROFILE_BASIC,
  USER_QUERY_TYPE,
  USER_QUERY_PROFILE_ACADEMIC,
  USER_QUERY_PROFILE_PREFS,
  USER_QUERY_PIC
};
