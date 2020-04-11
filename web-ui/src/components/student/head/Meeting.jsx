import React from 'react';
import { useSelector } from 'react-redux';
import Calendar from './Calendar';

const Meeting = (props) => {
    const profile = useSelector(state => state.student.profile);
    console.log(profile)
    const lcSub = profile.lc_user && profile.lc_user.user_cognito_sub;
    const hcSub = profile.lc_user && profile.hc_user.user_cognito_sub;
    return (
      <div>
          <Calendar lcSub={lcSub} hcSub={hcSub} />
      </div>
    );
};

export default Meeting;
