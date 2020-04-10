import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { DatePicker } from '@material-ui/pickers';
import Input from '@material-ui/core/TextField';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import Modal from 'components/ui/modal';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const addUniversity = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <Modal open title="Add University" onClose={onClose}>
      <Input variant="outlined" label="University name" />
      <KeyboardDatePicker
        margin="normal"
        label="Due date"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </Modal>
  )
};

export default addUniversity;
