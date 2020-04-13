import React, { useState } from 'react';
import uuid from 'uuidv4';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useStyles from '../styles';

const BasicFormTexts = ({ handleUserVision, profileData }) => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const addUserInfo = e => {
    setData({ ...data, [e.target.name]: e.target.value });
    handleUserVision(data);
  };

  const {
    career_goal,
    intended_major,
    life_vision_tobe,
    life_vision_togive,
    life_vision_tohave
  } = profileData;
  return (
    <Grid item container xs={12} md={10} lg={6} className={classes.formSection}>
      <h5>Life vision</h5>
      <Grid item xs={12}>
        <div>
          <p className={classes.pre}>To be</p>
          <div>
            <TextField      
              name='toBe'
              className={classes.textArea}
              placeholder='To be ...'
              defaultValue={life_vision_tobe}
              onChange={addUserInfo}
              multiline
              InputProps = {{
                  disableUnderline: true,
                  style: {
                    height: '4rem',
                    border: 'solid',
                    borderRadius: '0.375rem',
                    borderWidth: '1px',
                    padding: '0 10px'
                  }
              }}
            />
          </div>
        </div>
        <div>
          <p className={classes.pre}>To have</p>
          <div>
            <TextField      
                name='toHave'
                className={classes.textArea}
                placeholder='To have ...'
                defaultValue={life_vision_tohave}
                onChange={addUserInfo}
                multiline
                InputProps = {{
                    disableUnderline: true,
                    style: {
                      height: '4rem',
                      border: 'solid',
                      borderRadius: '0.375rem',
                      borderWidth: '1px',
                      padding: '0 10px'
                    }
                }}
            />
          </div>
        </div>
        <div>
          <p className={classes.pre}>To give</p>
          <div>
            <TextField      
              name='toGive'
              className={classes.textArea}
              placeholder='To give...'
              defaultValue={life_vision_togive}
              onChange={addUserInfo}
              multiline
              InputProps = {{
                  disableUnderline: true,
                  style: {
                    height: '4rem',
                    border: 'solid',
                    borderRadius: '0.375rem',
                    borderWidth: '1px',
                    padding: '0 10px'
                  }
              }}
            />
          </div>
        </div>
        <div>
          <p className={classes.pre}>Career Goal</p>
          <div>
            <TextField      
              name='goal'
              className={classes.textArea}
              placeholder='Career Goal'
              defaultValue={career_goal}
              onChange={addUserInfo}
              multiline
              InputProps = {{
                  disableUnderline: true,
                  style: {
                    height: '4rem',
                    border: 'solid',
                    borderRadius: '0.375rem',
                    borderWidth: '1px',
                    padding: '0 10px'
                  }
              }}
            />
          </div>
        </div>
        <div>
        <p className={classes.pre}>Intended Major</p>
        <div>
          <TextField      
            name='major'
            className={classes.textArea}
            placeholder='Intended Major ...'
            defaultValue={intended_major}
            onChange={addUserInfo}
            multiline
            InputProps = {{
                disableUnderline: true,
                style: {
                  height: '4rem',
                  border: 'solid',
                  borderRadius: '0.375rem',
                  borderWidth: '1px',
                  padding: '0 10px'
                }
            }}
          />
        </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default BasicFormTexts;
