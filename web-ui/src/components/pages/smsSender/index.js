import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Message from './Message';
import LinearProgress from '@material-ui/core/LinearProgress';
import { grey } from '@material-ui/core/colors';
import SendMsgForm from './SendMsgForm';

import { USER_QUERY_SMS } from './Sender.Queries';
import { INSERT_SMS_ROW } from './Sender.Mutations';
import SearchBar from './SearchBar';

const mapStateToProps = state => {
  return {
    userId: state.user.user.id
  };
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: '100%'
  },
  margin: {
    margin: theme.spacing(1)
  },
  historyContainer: {
    minHeight: '20rem',
    margin: theme.spacing(1)
  },
  historyWrapper: {
    minHeight: '20rem',
    maxHeight: '45rem',
    overflowY: 'auto',
    scrollBehavior: 'smooth'
  },
  lastMsgContainer: {
    height: '100%',
    maxHeight: '496px',
    overflowY: 'auto'
  }
}));

const SmsSender = ({ userId }) => {
  const classes = useStyles();
  const [sms, setSms] = useState([]);
  const [replyTo, setReplyTo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [insertSms] = useMutation(INSERT_SMS_ROW);

  const { loading, data, error } = useQuery(USER_QUERY_SMS, {
    variables: { userId }
  });

  useEffect(() => {
    if (data) {
      setSms([...sms, ...data.sms_messages]);
    }
  }, [data, loading]);

  if (loading) return <LinearProgress />;
  if (error) return <div>{error}</div>;

  const getFormData = obj => {
    obj.created_at = new Date(new Date() + ' UTC').toISOString().slice(0, 10);
    setSms([...sms, obj]);
  };

  const getReplyTo = addr => setReplyTo(addr);

  const filteredEmails = sms.filter(msg =>
    msg.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lastSmsList = [...sms].reverse().slice(0, 4);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item container xs={12} spacing={3}>
          <Grid item xs={12} md={7} lg={6}>
            <SendMsgForm
              userId={userId}
              icon={'phone_iphone'}
              type={'tel'}
              prefix={'sms'}
              label={'Phone Number'}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              getFormData={getFormData}
              insertRowToDb={insertSms}
            />
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <h5 style={{ color: grey[700] }}>Last messages</h5>
            <div
              className={classes.lastMsgContainer}
              style={{ height: '100%' }}
            >
              {sms.length ? (
                lastSmsList.map((msg, i) => (
                  <Message
                    getReplyTo={getReplyTo}
                    msg={msg}
                    side={true}
                    icon={'phone_iphone'}
                    key={i}
                  />
                ))
              ) : (
                <p style={{ color: grey[500] }}>Message history is empty</p>
              )}
            </div>
          </Grid>

          <Grid item container xs={12} lg={10}>
            <Paper className={classes.paper}>
              <div className={classes.margin}>
                <SearchBar
                  prefix={'Phone Number'}
                  setSearchTerm={setSearchTerm}
                />
              </div>
            </Paper>
          </Grid>

          <Grid
            item
            container
            xs={12}
            lg={10}
            className={classes.historyWrapper}
          >
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div className={classes.historyContainer}>
                  {filteredEmails.length ? (
                    filteredEmails.map((msg, i) => (
                      <Message
                        getReplyTo={getReplyTo}
                        msg={msg}
                        icon={'phone_iphone'}
                        key={i}
                      />
                    ))
                  ) : (
                    <p>Message history is empty</p>
                  )}
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default connect(mapStateToProps)(SmsSender);
