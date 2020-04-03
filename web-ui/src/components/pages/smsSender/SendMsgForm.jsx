import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useQuery } from '@apollo/react-hooks';
import { Auth } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import CustomizedSnackbars from '../../snackBar';
import apiClient from '../../../utils/api-client';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%'
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const SendMsgForm = ({
  icon,
  type,
  label,
  prefix,
  replyTo,
  getFormData,
  userId,
  insertRowToDb,
  setReplyTo
}) => {
  const classes = useStyles();
  const messagePattern = {
    email: '',
    email_subject: '',
    sms_subject: '',
    email_text: '',
    sms_text: '',
    address: ''
  };
  const [jwtToken, setJwtToken] = useState('');
  const [message, setMessage] = useState(messagePattern);
  // const [lcAddress, setLcAddress] = useState({ email: '', phone: '' });
  const [disable, setDisable] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: 'default',
    variant: 'success'
  });

  const subjectInput = useRef();

  // const { loading, data, error } = useQuery(LC_PROFILE_QUERY, {
  //   variables: { userId }
  // });

  Auth.currentSession().then(userSession => {
    setJwtToken(userSession.getIdToken().getJwtToken());
  });

  useEffect(() => {
    // if (data) {
    //   setLcAddress({
    //     email: data.user[0].user_email,
    //     phone: data.user[0].user_phone
    //   });
    // }
    //get rid of replyTo right after we set it to avoid bug when we delete it and set another address
    setReplyTo('');

    if (replyTo.length) {
      subjectInput.current && subjectInput.current.focus();
      message.address = replyTo;
    }
  }, [replyTo]);

  // if (loading) return '...loadig';
  // if (error) return '...error';

  const handleChange = e => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setDisable(true);
    try {
      const body = {
        smsText: prefix === 'sms' ? message.sms_text : message.email_text,
        // from: prefix === 'sms' ? lcAddress.phone : lcAddress.email,
        toNumber: message.address
      };

      const data = await apiClient.post('/twilio/sms', body);

      if (data.error) {
        setSnack({ open: true, message: data.error.message, variant: 'error' });
        setDisable(false);
        return;
      }
      console.log('Twillio API Resp:', data);

      getFormData(message);

      insertRowToDb({
        variables: {
          userId,
          text: prefix === 'sms' ? message.sms_text : message.email_text,
          subject:
            prefix === 'sms' ? message.sms_subject : message.email_subject,
          address: message.address || replyTo
        }
      });
      setSnack({
        open: true,
        message: 'Your message has been sent',
        variant: 'success'
      });
      setMessage(messagePattern);
      setReplyTo('');
    } catch (error) {
      setSnack({ open: true, message: error.message, variant: 'error' });
      console.log('ERR', error);
    }
    setDisable(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Paper className={classes.paper}>
        <div className={classes.margin}>
          <Grid container spacing={1} alignItems='flex-end'>
            <Grid item>
              <Icon color='primary' style={{ fontSize: 25 }}>
                {icon}
              </Icon>
            </Grid>
            <Grid item xs={11}>
              <TextField
                name='address'
                type={type}
                label={label}
                fullWidth
                onChange={handleChange}
                value={message.address || replyTo}
                required
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.margin}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {' '}
              <TextField
                name={`${prefix}_subject`}
                label='Subject'
                multiline
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                margin='normal'
                variant='outlined'
                onChange={handleChange}
                inputRef={subjectInput}
                required
                value={message.email_subject || message.sms_subject || ''}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.margin}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {' '}
              <TextField
                name={`${prefix}_text`}
                label='Message Text'
                multiline
                rows='10'
                InputLabelProps={{
                  shrink: true
                }}
                fullWidth
                margin='normal'
                variant='outlined'
                onChange={handleChange}
                required
                value={message.email_text || message.sms_text || ''}
              />
            </Grid>
          </Grid>
        </div>

        <div className={classes.margin}>
          <Button
            fullWidth
            disabled={disable}
            variant='contained'
            color='primary'
            type='submit'
            endIcon={<Icon>send</Icon>}
          >
            {`Send ${prefix}`}
          </Button>
        </div>
      </Paper>
      <CustomizedSnackbars snack={snack} setSnack={setSnack} />
    </form>
  );
};

//export default SendMsgForm
export default SendMsgForm;
