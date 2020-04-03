import React, { useState } from 'react';
import uuid from 'uuidv4';
import Grid from '@material-ui/core/Grid';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import useStyles from '../styles';

const BasicFormTexts = ({ handleUserVision }) => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const addUserInfo = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    handleUserVision(data);
  };
  return (
    <Grid item container xs={12} md={10} lg={6} className={classes.formSection}>
      <h5>Life vision</h5>
      <Grid item xs={12}>
        <p className={classes.pre}>To be</p>
        <TextareaAutosize
          rows={2}
          name='toBe'
          className={classes.textArea}
          placeholder='To be ...'
          defaultValue=''
          onChange={addUserInfo}
        />
        <p className={classes.pre}>To have</p>
        <TextareaAutosize
          rows={2}
          name='To have'
          className={classes.textArea}
          placeholder='To have ...'
          defaultValue=''
          onChange={addUserInfo}
        />
        <p className={classes.pre}>To get</p>
        <TextareaAutosize
          rows={2}
          name='To get'
          className={classes.textArea}
          placeholder='To get ...'
          defaultValue=''
          onChange={addUserInfo}
        />
        <p className={classes.pre}>Career Goal</p>
        <TextareaAutosize
          rows={2}
          name='careerGoal'
          className={classes.textArea}
          placeholder='Career Goal'
          defaultValue=''
          onChange={addUserInfo}
        />
        <p className={classes.pre}>Intended Major</p>
        <TextareaAutosize
          rows={2}
          name='intendedMajor'
          className={classes.textArea}
          placeholder='Intended Major ...'
          defaultValue=''
          onChange={addUserInfo}
        />
      </Grid>
    </Grid>
  );
};

export default BasicFormTexts;
