import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useQuery} from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Profiletabs from './profileForms/ProfileTabs';

const useStyles = makeStyles(theme => ({
  profile: {
    flexGrow: 1
  }
}));

const Profile = ({sub}) => {
  const classes = useStyles();
  return (
    <div id='aAAA' className={classes.profile}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Profiletabs sub={sub} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
