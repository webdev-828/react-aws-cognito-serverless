import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FileUpload from '../helperComponents/FileUpload';
import useStyles from '../styles';

const BasicFormTop = ({ userData, handleUserData, userId, sub }) => {
  const classes = useStyles();
  const [data, setData] = useState({});

  const { user_first_name, user_last_name, user_email } = userData;
  useEffect(() => {
    setData({ ...data, [user_email]: user_email });
  }, [])
  
  const addUserInfo = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    handleUserData(data);
  };
  return (
    <React.Fragment>
      <Grid item container spacing={2} xs={12} className={classes.formSection}>
        <Grid item container xs={12} md={6} lg={4}>
          <TextField
            name='firstName'
            label='First Name'
            margin='normal'
            defaultValue={user_first_name}
            variant='filled'
            onChange={addUserInfo}
            fullWidth
          />
          <TextField
            name='lastName'
            label='Last Name'
            margin='normal'
            defaultValue={user_last_name}
            variant='filled'
            onChange={addUserInfo}
            fullWidth
          />
          <TextField
            name='email'
            label='Email'
            margin='normal'
            defaultValue={user_email}
            variant='filled'
            onChange={addUserInfo}
            fullWidth
          />
        </Grid>

        <Grid
          item
          container
          justify='center'
          alignItems='center'
          xs={12}
          md={4}
          lg={2}
        >
          <FileUpload sub={sub} userId={userId} />
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={2} className={classes.formSection}>
        <Grid item xs={12} md={4} lg={3}>
          <TextField
            label='High School Graduation Year'
            name='high_school_graduation_year'
            type='number'
            fullWidth
            margin='normal'
            defaultValue='2000'
            variant='outlined'
            onChange={addUserInfo}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <TextField
            label='High School GPA'
            name='high_school_gpa'
            type='number'
            fullWidth
            margin='normal'
            defaultValue='39167'
            variant='outlined'
            onChange={addUserInfo}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default BasicFormTop;
