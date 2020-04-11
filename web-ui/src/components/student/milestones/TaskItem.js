import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

const TaskItem = ({
  task,
  classes,
  isStudent,
  handleChange,
  toggleEnableTask,
  onSchedule,
}) => {
  const studentTask = task.student_tasks[0];
  if (task.is_coaching) {
    if (isStudent) {
      return (
        <Button
          key={task.id}
          variant="outlined"
          color="primary"
          style={{ marginTop: 8, marginBottom: 8 }}
          onClick={onSchedule}
        >
          Schedule Coaching Session
        </Button>
      );
    }
    return (
      <div className={classes.row}>
        <span style={{ flex: 1 }}>{task.name}</span>
      </div>
    );
  }
  if (isStudent) {
    return (
      <div className={classes.row}>
        <span style={{ marginRight: 5 }}>{task.name}</span>
        {studentTask.is_done && <span>✓</span>}
      </div>
    );
  } else {
    return (
      <div className={classes.row}>
        <FormControlLabel
          classes={{ root: classes.controlRoot, label: classes.label }}
          labelPlacement="start"
          control={
            <Tooltip
              title={`Uncheck this to remove this task from milestone for the student.`}
            >
              <Checkbox
                classes={{ root: classes.checkbox }}
                checked={studentTask.is_done}
                onChange={handleChange(task)}
                value={task.id}
              />
            </Tooltip>
          }
          label={task.name}
        />
        {studentTask.is_enabled ? (
          <Button
            size="small"
            variant="outlined"
            color="primary"
            classes={{ outlinedSizeSmall: classes.btnSmall }}
            onClick={() => toggleEnableTask(task, false)}
          >
            Enabled
          </Button>
        ) : (
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            classes={{ outlinedSizeSmall: classes.btnSmall }}
            onClick={() => toggleEnableTask(task, true)}
          >
            Disabled
          </Button>
        )}
      </div>
    );
  }
};

export default TaskItem;
