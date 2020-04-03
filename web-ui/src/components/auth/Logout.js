import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import Cookie from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { grey, lightBlue } from '@material-ui/core/colors';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  formContainer: {
    width: '90%',
    border: `1px solid ${grey[200]}`,
    margin: '2.5rem auto 0',
    padding: '1.5rem 2.5rem',
    maxWidth: '36rem'
  },
  formContaineTop: {
    margin: '0 auto',
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: grey[800]
  },
  subHeading: {
    color: grey[700],
    fontSize: '1.2rem'
  },
  logOutForm: {
    margin: '0 auto',
    marginTop: '1.5rem',
    width: '90%',
    maxWidth: '25rem'
  },
  submitBtn: {
    backgroundColor: lightBlue[600],
    marginTop: '1rem',

    '&:hover': {
      backgroundColor: lightBlue[700]
    }
  }
}));

const Logout = ({ user }) => {
  const classes = useStyles();
  const cookies = new Cookie();
  const [signeOut, setSigneOut] = useState(false);
  console.log('USER LOGOUT', user);

  const signOut = async () => {
    try {
      const user = await Auth.signOut();
      console.log(user);
      cookies.remove('token');
      cookies.remove('sub');
      window.location.assign('/');
    } catch (error) {
      console.log(error);
      window.location.assign('/');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    signOut();
    setSigneOut(true);
    e.target.reset();
  };

  return (
    <Box className={classes.formContainer} boxShadow={2}>
      {signeOut ? (
        <Typography className={classes.subHeading} variant='h5'>
          You have signed out!
        </Typography>
      ) : (
        <React.Fragment>
          <div className={classes.formContaineTop}>
            <Typography variant='h4' gutterBottom>
              {`Goodbye ${user.user.fname} !`}
            </Typography>
            <Typography className={classes.subHeading} variant='h5'>
              Have a nice day!
            </Typography>

            <Grid container spacing={3}>
              <form className={classes.logOutForm} onSubmit={handleSubmit}>
                <Button
                  className={classes.submitBtn}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  color='primary'
                >
                  Logout
                </Button>
              </form>
            </Grid>
          </div>
        </React.Fragment>
      )}
    </Box>
  );
};

export default connect(mapStateToProps)(Logout);
