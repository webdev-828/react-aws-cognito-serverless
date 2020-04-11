import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";

export default function AddEventModal({ onClose, onSubmit, event }) {
  const [state, setState] = React.useState({
    start: event.start,
    end: event.end,
    summary: ''
  });

  const handleSubmit = () => {
    onSubmit(state);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleDateChange = (name, val) => {
    setState({...state, [name]: val.toDate() });
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Schedule meeting</DialogTitle>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <DialogContent>
          <DateTimePicker
            fullWidth
            margin={"normal"}
            label="Start"
            value={state.start}
            onChange={val => handleDateChange('start', val)}
          />
          <DateTimePicker
            fullWidth
            margin={"normal"}
            label="End"
            value={state.end}
            onChange={val => handleDateChange('end', val)}
          />
          <TextField
            autoFocus
            name="summary"
            margin={"normal"}
            value={state.summary}
            onChange={handleChange}
            label="Description"
            fullWidth
          />
        </DialogContent>
      </MuiPickersUtilsProvider>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button disabled={!state.summary} onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
