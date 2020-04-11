import cx from "classnames";
import { Link } from 'react-router-dom';
import blue from "@material-ui/core/colors/blue";
import Typography from "@material-ui/core/Typography";
import React from "react";
import moment from "moment";

const Milestone = ({ classes, milestone, index, onClick, isStudent, pathname }) => {
  const tasks = isStudent
    ? milestone.milestone.tasks.filter((t) => t.student_tasks[0].is_enabled)
    : milestone.milestone.tasks;
  return (
    <div
      className={cx(classes.milestone, { bottom: index % 2 !== 0 })}
      style={{ color: blue[(index + 1) * 100] }}
    >
      <div className="content">
        <Typography gutterBottom variant="h6">
          {milestone.milestone.name}
        </Typography>
        <ul>
          {tasks.map((i, idx) => {
            const { url } = i;
            return (
              <li
                key={idx}
                className={i.student_tasks[0].is_done ? 'done' : undefined}
              >
                <Typography color="inherit" variant="body2">
                  {url ? <Link to={`${pathname}/${url}`}>{i.name}</Link> : i.name}
                </Typography>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="circle" onClick={() => onClick(milestone)}>
        {milestone.due_date ? (
          <React.Fragment>
            <Typography variant="body2">
              {moment(milestone.due_date).format('MMM, DD')}
            </Typography>
            <Typography variant="h6">
              {moment(milestone.due_date).format('YYYY')}
            </Typography>
          </React.Fragment>
        ) : (
          <div style={{ padding: '0 10px', fontSize: 14 }}>
            {isStudent ? 'No Due Date' : 'Assign Due Date'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Milestone;
