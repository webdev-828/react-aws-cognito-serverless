import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Cookie from 'universal-cookie';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CustomizedSnackbars from '../snackBar';
import { grey, lightBlue } from '@material-ui/core/colors';
import FormSpiner from './FormSpiner';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  form: {
    position: 'relative'
  },
  formContainer: {
    width: '90%',
    border: `1px solid ${grey[200]}`,
    margin: '0 auto',
    padding: '1.5rem 2.5rem'
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
  formFooter: {
    margin: '1.5rem 0 ',
    textAlign: 'center',
    color: grey[600]
  },
  submitBtn: {
    backgroundColor: lightBlue[600],
    marginTop: '1rem',

    '&:hover': {
      backgroundColor: lightBlue[700]
    }
  },
  linkLine: {
    color: lightBlue[600],
    fontWeight: 400
  }
}));

const SignIn = () => {
  const classes = useStyles();
  const cookies = new Cookie();
  const loginPattern = {
    user: '',
    username: '',
    password: '',
    signedIn: false
  };
  const [data, setData] = useState(loginPattern);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: 'default',
    variant: 'success'
  });

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(user => {
      console.log(user);
      window.location.assign('/');
    });
  }, []);

  const signIn = async () => {
    console.log('SIGNIN', data);
    const { username, password } = data;
    setLoading(true);
    try {
      const user = await Auth.signIn({
        username,
        password
      });
      const token = user.signInUserSession.getIdToken().getJwtToken();
      const sub = user.signInUserSession.getIdToken().payload.sub;
      cookies.set('token', token);
      cookies.set('sub', sub);
      window.location.assign('/');
    } catch (error) {
      setLoading(false);
      console.log(error);
      setSnack({
        open: true,
        message: error.message,
        variant: 'error'
      });
    }
  };

  const confirmSignIn = () => {
    Auth.confirmSignIn(data.username)
      .then(() => {
        console.log('successfully confirmed signed in');
        setSnack({
          open: true,
          message: 'Successfully Confirmed Signed In',
          variant: 'success'
        });
        setData({ ...loginPattern, signedIn: true });
      })
      .catch(err => console.log(`Error confirming sign up - ${err}`));
  };

  const handleSubmit = e => {
    e.preventDefault();
    signIn();
    confirmSignIn();
  };

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Box className={classes.formContainer} boxShadow={2}>
      {data.signedIn ? (
        <Typography className={classes.subHeading} variant='h5'>
          You have signed in!
        </Typography>
      ) : (
        <React.Fragment>
          <div className={classes.formContaineTop}>
            <Typography variant='h4' gutterBottom>
              Sign in to your account
            </Typography>
            <Typography className={classes.subHeading} variant='h5'>
              Build The Perfect College Counseling Team
            </Typography>
          </div>
          <form
            autoComplete='false'
            className={classes.form}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  label='Username'
                  name='username'
                  type='text'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  label='Password'
                  name='password'
                  type='password'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              className={classes.submitBtn}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              color='primary'
            >
              Signin
            </Button>
            <FormSpiner loading={loading} />
          </form>
        </React.Fragment>
      )}
      <CustomizedSnackbars snack={snack} setSnack={setSnack} />
    </Box>
  );
};

export default SignIn;
