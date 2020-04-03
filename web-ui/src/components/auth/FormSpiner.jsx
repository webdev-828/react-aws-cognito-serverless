import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  spinerBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(255,255,255, .5)',
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0'
  },
  formSpiner: {
    color: lightBlue[600]
  }
}));

const FormSpiner = ({ loading }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {loading && (
        <div className={classes.spinerBox}>
          <CircularProgress
            disableShrink
            size='4rem'
            className={classes.formSpiner}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default FormSpiner;
