import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SearchBar from '../smsSender/SearchBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Message from '../smsSender/Message';
import SendMsgForm from '../smsSender/SendMsgForm';
import { grey } from '@material-ui/core/colors';

import { USER_QUERY_EMAILS } from '../smsSender/Sender.Queries';
import { INSERT_EMAIL_ROW } from '../smsSender/Sender.Mutations';

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
    padding: theme.spacing(1),
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

const EmailSender = ({ userId }) => {
  const classes = useStyles();
  const [emails, setEmails] = useState([]);
  const [replyTo, setReplyTo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [insertEmail] = useMutation(INSERT_EMAIL_ROW);
  const { loading, data, error } = useQuery(USER_QUERY_EMAILS, {
    variables: { userId }
  });
  useEffect(() => {
    if (data) {
      setEmails([...emails, ...data.email_messages]);
    }
  }, [data, loading]);

  if (loading) return <LinearProgress />;
  if (error) return <div>{error}</div>;

  const getFormData = obj => {
    obj.created_at = new Date(new Date() + ' UTC').toISOString().slice(0, 10);
    setEmails([...emails, obj]);
  };

  const getReplyTo = addr => setReplyTo(addr);

  const filteredEmails = emails.filter(msg =>
    msg.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const lastEmailsList = [...emails].reverse().slice(0, 4);
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item container xs={12} spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
            <SendMsgForm
              userId={userId}
              icon={'mail'}
              type={'email'}
              prefix={'email'}
              label={'Email Address'}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              getFormData={getFormData}
              insertRowToDb={insertEmail}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <h5 style={{ color: grey[700] }}>Last messages</h5>
            <div
              className={classes.lastMsgContainer}
              style={{ height: '100%' }}
            >
              <Paper className={classes.paper}>
                {emails.length ? (
                  lastEmailsList.map((msg, i) => (
                    <Message
                      getReplyTo={getReplyTo}
                      msg={msg}
                      side={true}
                      icon={'mail'}
                      key={i}
                    />
                  ))
                ) : (
                  <p style={{ color: grey[500] }}>Message history is empty</p>
                )}
              </Paper>
            </div>
          </Grid>

          <Grid item container xs={12} lg={10}>
            <Paper className={classes.paper}>
              <div className={classes.margin}>
                <SearchBar prefix={'Email'} setSearchTerm={setSearchTerm} />
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
                        icon={'email'}
                        key={i}
                      />
                    ))
                  ) : (
                    <p>Message history in empty</p>
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

export default connect(mapStateToProps)(EmailSender);
