import React, { useState } from 'react';
import { withRouter } from 'react-router';
import moment from 'moment';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/styles';
import { DatePicker } from '@material-ui/pickers';
import { useMutation } from 'react-apollo';
import { useSnackbar } from 'material-ui-snackbar-provider';
import { UPSERT_STUDENT_MILESTONE_TASKS } from '../../../graphql/student/milestones';
import TaskItem from './TaskItem';
import StudentLCCalendar from '../lead/Meeting';
import StudentHCCalendar from '../head/Meeting';
import CoachCalendar from '../../lc/Calendar';

const styles = (theme) => ({
  paper: {
    width: 400,
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: 8,
  },
  title: {
    flex: 1,
    paddingLeft: 8,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  controlRoot: {
    margin: 0,
    flex: 1,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 5,
  },
  btnSmall: {
    fontSize: 10,
  },
  label: {
    flex: 1,
    fontSize: 14,
  },
  formGroup: {
    marginBottom: 30,
    padding: 16,
    flex: 1,
  },
  checkbox: {
    padding: 0,
    marginRight: 8,
  },
  inputContainer: {
    padding: 16,
  },
  footer: {
    backgroundColor: '#f8f8f8',
    padding: '10px 15%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  appBar: {
    position: 'relative',
  },
  modalBody: {
    padding: 16
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MilestoneDetails = ({
  isStudent,
  onClose,
  milestone,
  student,
  classes,
  history,
}) => {
  const [data, setData] = useState({ ...milestone });
  const [showModal, toggleModal] = useState(false);
  const [update, resp] = useMutation(UPSERT_STUDENT_MILESTONE_TASKS);
  const snackbar = useSnackbar();

  const handleChange = (task) => (e) => {
    task.student_tasks[0].is_done = e.target.checked;
    setData({ ...data });
  };

  const handleDateChange = (date) => {
    data.due_date = date;
    setData({ ...data });
  };

  const handleToggleEnableMilestone = (e) => {
    const { checked } = e.target;
    data.is_enabled = checked;
    setData({ ...data });
  };

  const toggleEnableTask = (task, isEnabled) => {
    task.student_tasks[0].is_enabled = isEnabled;
    setData({ ...data });
  };

  const handleSave = async () => {
    await update({
      variables: {
        milestones: [
          {
            id: data.id,
            milestone_id: data.milestone.id,
            user_id: student.user_id,
            is_enabled: data.is_enabled,
            due_date: data.due_date,
            is_done: data.is_done,
          },
        ],
        milestoneTasks: data.milestone.tasks.map((t) => ({
          id: t.student_tasks[0].id,
          user_id: student.user_id,
          task_id: t.id,
          is_done: t.student_tasks[0].is_done,
          is_enabled: t.student_tasks[0].is_enabled,
        })),
      },
    });
    snackbar.showMessage('Milestone updated');
    onClose();
  };

  const onSchedule = () => {
    toggleModal('lc');
  };

  const onRequestCounseling = () => {
    toggleModal('hc');
  };

  const tasks = isStudent
    ? data.milestone.tasks.filter((t) => t.student_tasks[0].is_enabled)
    : data.milestone.tasks;

  const renderModalContent = () => {
    if (!showModal) return null;
    if (isStudent) {
      return showModal === 'lc' ? <StudentLCCalendar /> : <StudentHCCalendar />;
    } else {
      return <CoachCalendar />
    }

  };

  return (
    <Drawer
      open
      anchor="right"
      onClose={onClose}
      classes={{ paper: classes.paper }}
    >
      <div className={classes.header}>
        <Typography variant="h6" className={classes.title}>
          {milestone.milestone.name}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.container}>
        {!isStudent && (
          <div className={classes.inputContainer}>
            <FormControlLabel
              onChange={handleToggleEnableMilestone}
              control={<Switch checked={data.is_enabled} color="primary" />}
              label="Enable Milestone"
            />
          </div>
        )}
        <div className={classes.inputContainer}>
          {isStudent ? (
            <div>
              {data.due_date ? (
                <span>
                  Due by <strong>{moment(data.due_date).format('LL')}</strong>
                </span>
              ) : (
                'No Due Date'
              )}
            </div>
          ) : (
            <DatePicker
              disablePast
              fullWidth
              label="Milestone Due Date"
              emptyLabel="Please select date"
              format="LL"
              value={data.due_date}
              onChange={handleDateChange}
            />
          )}
        </div>
        <FormGroup className={classes.formGroup}>
          <Typography variant="button" gutterBottom color="textSecondary">Milestone Tasks</Typography>
          {tasks.map((i) => {
            return (
              <TaskItem
                key={i.id}
                task={i}
                handleChange={handleChange}
                isStudent={isStudent}
                onSchedule={onSchedule}
                toggleEnableTask={toggleEnableTask}
                classes={classes}
              />
            );
          })}
        </FormGroup>
        { isStudent ? (
          <div className={classes.footer}>
            <Button fullWidth variant="contained" color="secondary" onClick={onRequestCounseling}>
              Schedule a Counseling Session
            </Button>
          </div>
        ) : (
          <div className={classes.footer}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={resp && resp.loading}
            >
              Save
            </Button>
          </div>
        )}
      </div>
      <Dialog fullScreen  open={showModal} onClose={() => toggleModal(false)}  TransitionComponent={Transition}>
        <AppBar className={classes.appBar} color={showModal === 'lc' ? 'primary' : 'secondary'}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={() => toggleModal(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.modalBody}>
          {renderModalContent()}
        </div>
      </Dialog>
    </Drawer>
  );
};

export default withStyles(styles)(withRouter(MilestoneDetails));
