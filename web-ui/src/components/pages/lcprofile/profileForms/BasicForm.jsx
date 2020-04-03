import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import useStyles from '../styles';

// import { fetchUser } from '../../../../reducers/user';

//Components
import BasicFormTop from './BasicFormTop';
import BasicFormTexts from './BasicFormTexts';

//Query
import { USER_QUERY_PROFILE_BASIC } from '../Profile.Queries';
//Mutation
import { UPDATE_USER, UPDATE_LC_PROFILE } from '../Profile.Mutations';

const mapStateToProps = state => {
  return {
    user: state.user.user
  };
};

const BasicForm = ({ sub, user }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState({});
  const [userVision, setuserVision] = useState({});
  console.log("The User is" + JSON.stringify(user));

  const [updateUser] = useMutation(UPDATE_USER);
  const [updateLcProfile] = useMutation(UPDATE_LC_PROFILE);
  const { data, loading, error } = useQuery(USER_QUERY_PROFILE_BASIC, {
    variables: { sub }
  });
  if (loading) return <LinearProgress />;
  if (error) return <p>Error ...</p>;

  const handleUserData = object => {
    setUserData({ ...userData, object });
  };
  const handleUserVision = object => {
    setuserVision({ ...userVision, object });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('USER DATA SUBMIT', userData);
    const { firstName, lastName, email, high_school_graduation_year, high_school_gpa } = userData.object;
    console.log("The value of email is " + email);
    updateUser({
      variables: { sub: sub, name: firstName, lname: lastName, email: email }
    });
    updateLcProfile({
      variables: { userId: user.id, high_school_graduation_year: high_school_graduation_year, high_school_gpa: high_school_gpa }
    });
  };

  const profileData = data.user[0].profile[0];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={0}>
        {/* Name/Last Name/ Email ... */}
        <BasicFormTop
          handleUserData={handleUserData}
          userData={data.user[0]}
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
