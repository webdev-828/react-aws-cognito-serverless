import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import MomentUtils from "@date-io/moment";


export default function AddEventModal({ onClose, onSubmit, onDelete, event }) {
  const [state, setState] = React.useState({
    id: event.id,
    start: event.start,
    end: event.end,
    title: event.title || ''
  });
  console.log(event);
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
      <DialogTitle>{event.id ? 'Edit Event' : 'Add Event'}</DialogTitle>
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
            name="title"
            margin={"normal"}
            value={state.title || ''}
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
        { event.id && (
          <Button onClick={onDelete} color="secondary">
            Delete
          </Button>
        )}
        <Button disabled={!state.title} onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
