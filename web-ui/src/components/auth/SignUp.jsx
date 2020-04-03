import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { grey, lightBlue } from '@material-ui/core/colors';
import CustomizedSnackbars from '../snackBar';
import FormSpiner from './FormSpiner';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  formContainer: {
    width: '90%',
    border: `1px solid ${grey[200]}`,
    margin: '0 auto',
    padding: '1.5rem 2.5rem'
  },
  form: {
    position: 'relative'
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

    '&:hover': {
      backgroundColor: lightBlue[700]
    }
  },
  linkLine: {
    color: lightBlue[600],
    fontWeight: 400
  }
}));

const SignUp = ({ setValue }) => {
  const classes = useStyles();
  const formPattern = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    repeatedPassword: '',
    phoneNumber: '14084561078',
    email: '',
    userType: '',
    confirmationCode: '',
    verified: false
  };
  const [data, setData] = useState(formPattern);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: 'default',
    variant: 'success'
  });

  const signUp = async () => {
    setLoading(true);
    const params = {
      username: data.username,
      password: data.password,
      attributes: {
        email: data.email,
        phone_number: `+${data.phoneNumber}`,
        'custom:usertype': data.userType || 'user',
        'custom:lastName': data.lastName || '',
        'custom:firstName': data.firstName || ''
      }
    };
    try {
      await Auth.signUp(params);
      setSnack({
        open: true,
        message: 'Successfully signed up',
        variant: 'success'
      });
      setLoading(false);
    } catch (error) {
      console.log(`Error signing up: ${JSON.stringify(error)}`);
      setLoading(false);
      setSnack({
        open: true,
        message: JSON.stringify(error),
        variant: 'error'
      });
    }
  };

  const confirmSignUp = () => {
    console.log('CONFIRM DATA', data);
    setLoading(true);
    const { username, confirmationCode } = data;
    Auth.confirmSignUp(username, confirmationCode)
      .then(() => {
        setSnack({
          open: true,
          message: 'Successfully confirmed signed up',
          variant: 'success'
        });
        setLoading(false);
        // 1 - is the index of signin tab
        setValue(1);
      })
      .catch(error => console.log(`Error confirming sign up - ${error}`));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (data.verified) {
      confirmSignUp();
      setData({ ...data, confirmationCode: '', username: '' });
    } else {
      if (data.password === data.repeatedPassword) {
        signUp();
        setData({ ...data, verified: true, firstName: '' });
      } else {
        console.log('WRONG PASSWORD');
        setSnack({
          open: true,
          message: 'Passwords do not match.',
          variant: 'error'
        });
      }
    }
  };

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const userTypes = [
    {
      value: 'admin',
      label: 'Admin'
    },
    {
      value: 'student',
      label: 'Student'
    },
    {
      value: 'parent',
      label: 'Parent'
    },
    {
      value: 'lead_coach',
      label: 'Lead Coach'
    },
    {
      value: 'head_coach',
      label: 'Head Coach'
    }
  ];

  console.log('Loading', loading);
  return (
    <Box className={classes.formContainer} boxShadow={2}>
      {data.verified ? (
        <React.Fragment>
          <Typography className={classes.subHeading} variant='h5'>
            Please check your email and enter a Confirmation Code
          </Typography>

          <form
            autoComplete='false'
            onSubmit={handleSubmit}
            className={classes.form}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  name='confirmationCode'
                  label='Confirmation Code'
                  value={data.confirmationCode}
                  type='text'
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
              Confirm
            </Button>
            <FormSpiner loading={loading} />
          </form>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={classes.formContaineTop}>
            <Typography variant='h4' gutterBottom>
              Create your account
            </Typography>
            <Typography className={classes.subHeading} variant='h5'>
              Build The Perfect College Counseling Team
            </Typography>
          </div>
          <form
            autoComplete='false'
            onSubmit={handleSubmit}
            className={classes.form}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  // error
                  // helperText=''
                  label='First Name'
                  name='firstName'
                  type='text'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label='Last Name'
                  name='lastName'
                  type='text'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label='User Name'
                  name='username'
                  type='text'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  required
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label='Phone Number'
                  name='phoneNumber'
                  defaultValue={data.phoneNumber}
                  type='number'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  label='Email'
                  name='email'
                  type='email'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  label='Confirm Password'
                  name='repeatedPassword'
                  type='password'
                  fullWidth
                  margin='normal'
                  variant='outlined'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  name='userType'
                  select
                  label='User Type'
                  className={classes.textField}
                  value={data.userType}
                  fullWidth
                  onChange={handleChange}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin='normal'
                  variant='outlined'
                >
                  {userTypes.map(option => (
                    <MenuItem required key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <div className={classes.formFooter}>
              <Typography variant='subtitle1'>
                By clicking Sign Up, you agree to our{' '}
                <Link className={classes} to='/terms'>
                  Terms of Use{' '}
                </Link>{' '}
                and our
                <Link to='/privacy'> Privacy Policy</Link>.
              </Typography>
            </div>
            <Button
              className={classes.submitBtn}
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              color='primary'
            >
              Submit
            </Button>
            <FormSpiner loading={loading} />
          </form>
        </React.Fragment>
      )}
      <CustomizedSnackbars snack={snack} setSnack={setSnack} />
    </Box>
  );
};

export default SignUp;
