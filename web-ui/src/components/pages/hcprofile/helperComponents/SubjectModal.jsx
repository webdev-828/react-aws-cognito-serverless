import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import useStyles from '../styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { satSubjectList } from '../Component.Data';

const SubjectModal = ({ open, handleClose, addNewObject }) => {
  const [subject, setSubject] = useState({ subject: '', score: '' });
  const [satSubjectTest, setsatSubjectTest] = useState('Math');

  const classes = useStyles();

  const handleChange = ({ target }) =>
    setSubject({ ...subject, [target.name]: target.value });

  const handleClick = () => {
    addNewObject(subject);
    handleClose();
  };

  const ifDisable = !(subject.subject && subject.score);

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={() => handleClose()}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h5 id='transition-modal-title'>Add SAT ||</h5>
          <form>
            <div>
              <TextField
                name='subject'
                label='SAT subject'
                value={subject.subject}
                onChange={handleChange}
                margin='normal'
                select
                variant='outlined'
                defaultValue='Math'
                fullWidth
              >
                {satSubjectList.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                label='SAT subject score'
                type='number'
                margin='normal'
                placeholder='SAT subject score'
                variant='outlined'
                name='score'
                onChange={e => handleChange(e)}
              />
            </div>

            <Button
              disabled={ifDisable}
              variant='contained'
              color='primary'
              className={classes.modalBtn}
              onClick={() => handleClick()}
            >
              Save
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default SubjectModal;
