import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import MsgModal from './MsgModal';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  msgBox: {
    borderBottom: '1px solid #ccc',
    marginBottom: '1rem',
    transition: 'all .3s',
    padding: '1rem',
    cursor: 'pointer',

    '&:hover': {
      background: grey[50]
    }
  },
  msgBody: {
    padding: '1rem .5rem 0',
    maxWidth: '88%',
    textAlign: 'left'
  },
  msgHead: {
    maxWidth: '35rem',
    borderBottom: `1px solid ${grey[200]}`
  },
  msgBodyText: {
    overflow: 'hidden',
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: '2'
  }
}));

const Message = ({ msg, icon, side, getReplyTo }) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  const handleOpen = () => {
    setModal(true);
  };
  const handleClose = val => {
    setModal(val);
  };
  const handleClick = e => {
    const address = e.target.textContent;
    getReplyTo(address);
  };

  const createdAt = msg.created_at.slice(0, 10);

  return (
    <Grid item container className={classes.msgBox} xs={12}>
      <Grid container item justify='flex-start' xs={6}>
        <Tooltip title='Reply' aria-label='reply' placement='top-end'>
          <div className='address'>
            <Chip
              style={{ padding: '0 .2rem' }}
              icon={<Icon style={{ fontSize: 25 }}>{icon}</Icon>}
              label={msg.address}
              clickable
              color='primary'
              variant='outlined'
              onClick={handleClick}
            />
          </div>
        </Tooltip>
      </Grid>
      <Grid item container justify='flex-end' xs={6}>
        <Chip label={createdAt} disabled />
      </Grid>
      <Grid className={classes.msgBody} item xs={12}>
        <h6 className={classes.msgHead}>
          {msg.email_subject || msg.sms_subject}
        </h6>
        {!side && (
          <p className={classes.msgBodyText}>
            {msg.email_text || msg.sms_text}
          </p>
        )}
      </Grid>
      <Grid item container>
        <Button size='small' onClick={handleOpen}>
          Expand
        </Button>
      </Grid>
      <MsgModal icon={icon} msg={msg} modal={modal} handleClose={handleClose} />
    </Grid>
  );
};

export default Message;
