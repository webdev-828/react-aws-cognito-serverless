import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { grey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    padding: '0',
    height: '90vh',
    width: '80vw',
    maxWidth: '80rem',
    padding: theme.spacing(0),
    color: theme.palette.text.secondary
  },
  modalHead: {
    padding: '1rem 1.7rem',
    height: '4rem',
    borderRadius: '3px',
    background: grey[100],
    marginTop: '0',
    position: 'relative'
  },
  msgHead: {
    maxWidth: '90%',
    borderBottom: `1px solid ${grey[300]}`
  },
  expandedMsg: {
    height: '100%',
    padding: '.5rem 1.5rem'
  },
  expandedMsgBody: {
    marginTop: '1rem',
    maxWidth: '80%',
    fontSize: '1.2rem'
  },
  iconHover: {
    color: grey[600]
  },
  iconClose: {
    color: grey[400],
    fontSize: 30,
    transition: 'color .3s',
    cursor: 'pointer',
    position: 'absolute',
    right: '1rem',

    '&:hover': {
      color: grey[600]
    }
  }
}));

const MsgModal = ({ modal, handleClose, msg, icon }) => {
  const classes = useStyles();

  const closeModal = () => {
    handleClose(false);
  };

  return (
    <React.Fragment>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={modal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={modal}>
          <div className={classes.paper}>
            <dir className={classes.modalHead}>
              <div className='address'>
                <Grid container spacing={1} alignItems='flex-end'>
                  <Grid item style={{ display: 'flex' }}>
                    <Icon
                      className={classes.iconHover}
                      color='disabled'
                      style={{ fontSize: 25 }}
                    >
                      {icon}
                    </Icon>
                  </Grid>
                  <Grid style={{ paddingLeft: 8 }} item container xs={5} md={5}>
                    {msg.address}
                  </Grid>
                  <Icon
                    onClick={closeModal}
                    color='disabled'
                    className={classes.iconClose}
                  >
                    close
                  </Icon>
                </Grid>
              </div>
            </dir>
            <Container className={classes.expandedMsg}>
              <h3 className={classes.msgHead}>
                {msg.email_subject || msg.sms_subject}
              </h3>
              <div className={classes.expandedMsgBody}>
                <p>{msg.email_text || msg.sms_text}</p>
              </div>
            </Container>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default MsgModal;
