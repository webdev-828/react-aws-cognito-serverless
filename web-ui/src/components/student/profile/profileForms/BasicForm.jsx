import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import useStyles from '../styles';

//Components
import BasicFormTop from './BasicFormTop';
import BasicFormTexts from './BasicFormTexts';

//Query
import { USER_QUERY_PROFILE_BASIC } from '../Profile.Queries';
//Mutation
import { UPDATE_USER } from '../Profile.Mutations';
import { UPDATE_USER_VISION } from '../Profile.Mutations';

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

const BasicForm = ({ sub, user }) => {
  const classes = useStyles();
  const userPattern = { firstName: '', lastName: '', email: '' };
  var visionPattern = {
    toBe: '',
    toHave: '',
    toGive: '',
    goal: '',
    major: ''
  };
  const [userData, setUserData] = useState(userPattern);
  const [userVision, setuserVision] = useState(visionPattern);

  const string = 'Your data has been updated!';
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: data => {
      alert(string);
    }
  });
  const [updateVision] = useMutation(UPDATE_USER_VISION);
  const { data, loading, error } = useQuery(USER_QUERY_PROFILE_BASIC, {
    variables: { sub }
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>Error ...</p>;
  visionPattern = {
    toBe: data.user[0].profile.life_vision_tobe && data.user[0].profile.life_vision_tobe,
    toHave: data.user[0].profile.life_vision_tohave && data.user[0].profile.life_vision_tohave,
    toGive: '',
    goal: '',
    major: ''
  }
  const handleUserVision = object => {
    console.log(object)
    setuserVision({ ...userVision, ...object });
  };

  const handleSubmit = e => {
    const { user_first_name, user_last_name, user_email } = data.user[0];
    const { firstName, lastName, email } = userData;
    const { toBe, toHave, toGive, goal, major } = userVision;
    const {
      career_goal,
      intended_major,
      life_vision_tobe,
      life_vision_togive,
      life_vision_tohave
    } = data.user[0];
    
    updateUser({
      variables: {
        sub: sub,
        name: firstName || user_first_name,
        lname: lastName || user_last_name,
        email: email || user_email
      }
    });

    updateVision({
      variables: {
        userId: user.id,
        goal: goal || career_goal,
        major: major || intended_major,
        toBe: toBe || life_vision_tobe,
        toGive: toGive || life_vision_togive,
        toHave: toHave || life_vision_tohave
      }
    });
    e.preventDefault();
  };

  const profileData = data.user[0].profile[0];
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={0}>
        {/* Name/Last Name/ Email ... */}
        <BasicFormTop
          userData={userData}
          // handleUserData={handleUserData}
          setUserData={setUserData}
          userInfo={data.user[0]}
          userId={user.id}
          sub={sub}
        />
        {/* To be/ To have / To get ...  */}
        <BasicFormTexts
          handleUserVision={handleUserVision}
          profileData={profileData}
        />
      </Grid>

      <Button
        size='large'
        variant='contained'
        color='primary'
        className={classes.button}
        onClick={handleSubmit}
      >
        Save
      </Button>
    </form>
  );
};
// export default BasicForm;
export default connect(mapStateToProps)(withApollo(BasicForm));
