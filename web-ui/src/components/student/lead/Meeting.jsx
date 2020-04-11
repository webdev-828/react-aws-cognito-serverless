import React from 'react';
import { useSelector } from 'react-redux';
import Calendar from './Calendar';

const Meeting = (props) => {
  const profile = useSelector(state => state.student.profile);
  const lcSub = profile.lc_user && profile.lc_user.user_cognito_sub;
    return (
        <div>
            <Calendar sub={lcSub} />
        </div>
    );
};

export default Meeting;
