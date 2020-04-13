import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import useStyles from '../styles';
import Button from '@material-ui/core/Button';
import SubjectModal from './SubjectModal';

const InputObject = ({objects, btnText, addNewObject}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();

  return (
    <React.Fragment>
      <SubjectModal
        open={open}
        handleClose={handleClose}
        addNewObject={addNewObject}
      />
      <Grid item container spacing={2} xs={10}>
        {objects.map((item, id) => {
          return (
            <Grid item xs={10} sm={6} md={5} lg={3} key={id}>
              <p className={classes.pre}>{item.subject}</p>
              <TextField
                margin='normal'
                defaultValue={item.score}
                variant='outlined'
                type='number'
                fullWidth
                inputProps = {{
                  style: {
                    height: '0.25rem'
                  }
                }}
              />
            </Grid>
          );
       })}
      </Grid>
      {btnText && (
        <Button
          variant='outlined'
          color='primary'
          className={classes.btnAdd}
          onClick={() => handleOpen()}
        >
          {btnText}
        </Button>
      )}
    </React.Fragment>
  );
};

export default InputObject;
