import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FileUpload from '../helperComponents/FileUpload';
import useStyles from '../styles';

const BasicFormTop = ({ userInfo, userData, setUserData, userId, sub }) => {
  const classes = useStyles();

  const { user_first_name, user_last_name, user_email } = userInfo;
  const addUserInfo = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
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
            inputProps = {{
              style: {
                height: '0.5rem'
              }
            }}
          />
          <TextField
            name='lastName'
            label='Last Name'
            margin='normal'
            defaultValue={user_last_name}
            variant='filled'
            onChange={addUserInfo}
            fullWidth
            inputProps = {{
              style: {
                height: '0.5rem'
              }
            }}
          />
          <TextField
            name='email'
            label='Email'
            margin='normal'
            defaultValue={user_email}
            variant='filled'
            onChange={addUserInfo}
            fullWidth
            inputProps = {{
              style: {
                height: '0.5rem'
              }
            }}
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
          { userInfo && <FileUpload sub={sub} userId={userId} profile={userInfo.profile[0]} />}
        </Grid>
      </Grid>
      <Grid item container xs={12} spacing={2} className={classes.formSection}>
        <Grid item xs={12} md={4} lg={3}>
          <TextField
            label='High School Graduation Year'
            name='graduationYear'
            type='number'
            fullWidth
            margin='normal'
            defaultValue='2000'
            variant='outlined'
            onChange={addUserInfo}
            inputProps = {{
              style: {
                height: '0.25rem'
              }
            }}
          />
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <TextField
            label='High School ZIP Code'
            name='zipCode'
            type='text'
            fullWidth
            margin='normal'
            defaultValue='39167'
            variant='outlined'
            onChange={addUserInfo}
            inputProps = {{
              style: {
                height: '0.25rem'
              }
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default BasicFormTop;
