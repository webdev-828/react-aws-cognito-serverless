var userinfo = {};
export const setUser = (user) => {
    userinfo.id = user.user.user_id;
    userinfo.email = user.user.user_email;
    userinfo.fname = user.user.user_first_name;
    userinfo.lname = user.user.user_last_name;
    userinfo.type = user.user.user_type;
    userinfo.sub = user.user.user_cognito_sub;
};

export const fetchUser = () => {
  return userinfo;
};
