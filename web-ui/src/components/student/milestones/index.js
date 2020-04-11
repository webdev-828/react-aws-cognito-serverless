import React, { useState, useEffect } from 'react';
import { Query, useApolloClient } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/styles';
import blue from '@material-ui/core/colors/blue';
import MilestoneDetails from './MilestoneDetails';
import {
  GET_STUDENT_MILESTONES,
  GET_MILESTONES_SUMMARY,
  UPSERT_STUDENT_MILESTONE_TASKS,
} from '../../../graphql/student/milestones';
import Milestone from "./Milestone";

const styles = (theme) => ({
  root: {
    marginTop: 50,
  },
  milestones: {
    display: 'flex',
    alignItems: 'flex-end',
    paddingBottom: 50,
  },
  milestone: {
    'flexShrink': 0,
    'width': 320,
    'position': 'relative',
    '&.bottom': {
      '& .content': {
        marginTop: 100,
        marginBottom: 50,
        paddingTop: 30,
        paddingBottom: 0,
        position: 'absolute',
      },
    },
    '&:not(:last-child)::after': {
      content: '""',
      bottom: 48,
      position: 'absolute',
      width: '100%',
      height: 4,
      backgroundColor: 'currentColor',
    },
    '& .content': {
      'marginLeft': 50,
      'padding': '0px 10px 30px 10px',
      'borderLeft': '2px dotted #5F84BE',
      '& ul': {
        'margin': 0,
        'marginLeft': 15,
        '& li': {
          margin: 0,
          color: '#555',
          display: 'flex',
        },
        '& li.done::after': {
          content: '"✓"',
          marginLeft: 5,
        },
      },
      '& h6': {
        lineHeight: 1.2,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    '& .circle': {
      'width': 100,
      'height': 100,
      'position': 'relative',
      'zIndex': 1,
      'display': 'flex',
      'flexDirection': 'column',
      'alignItems': 'center',
      'justifyContent': 'center',
      'borderRadius': '50%',
      'fontWeight': 'bold',
      'fontSize': 16,
      'backgroundColor': 'white',
      'border': '4px solid currentColor',
      'textAlign': 'center',
      'cursor': 'pointer',
      'transition': 'all .2s ease',
      '&:after': {
        content: '""',
      },
      '&:hover': {
        'backgroundColor': blue['500'],
        'color': blue['200'],
        '& p, h6': {
          color: 'white',
        },
      },
    },
  },
});

const setupStudentData = async (client, studentId) => {
  const {
    data: { milestones },
  } = await client.query({
    query: GET_MILESTONES_SUMMARY,
  });
  const studentMilestones = milestones.map((i) => ({
    milestone_id: i.id,
    user_id: studentId,
  }));
  const milestoneTasks = [];
  milestones.forEach((m) => {
    m.tasks.forEach((t) => {
      milestoneTasks.push({
        task_id: t.id,
        user_id: studentId,
      });
    });
  });
  return await client.mutate({
    mutation: UPSERT_STUDENT_MILESTONE_TASKS,
    variables: {
      milestones: studentMilestones,
      milestoneTasks,
    },
  });
};

const Milestones = ({ student, type, user, classes, pathname }) => {
  const [initializing, setInitializing] = useState(true);
  const [selected, setSelected] = useState();
  const client = useApolloClient();
  const isStudent = type === 'student';
  const userId = isStudent ? user.id : student.user_id;

  useEffect(() => {
    client
      .query({
        query: GET_STUDENT_MILESTONES,
        variables: {
          userId,
        },
      })
      .then(({ data: { student_milestones } }) => {
        if (!student_milestones.length) {
          setupStudentData(client, userId).then(
            (resp) => {
              setInitializing(false);
            },
            (e) => {
              console.log(e);
            },
          );
        } else {
          setInitializing(false);
        }
      });
  }, []);


  if (initializing) return <CircularProgress />;
  return (
    <Query query={GET_STUDENT_MILESTONES} fetchPolicy={"network-only"} variables={{ userId }}>
      {({ data, loading }) => {
        if (loading) {
          return <CircularProgress />;
        }
        return (
          <div className={classes.root}>
            <div className={classes.milestones}>
              {data.student_milestones.map((i, idx) => (
                <Milestone
                  isStudent={isStudent}
                  key={i.id}
                  index={idx}
                  classes={classes}
                  milestone={i}
                  onClick={setSelected}
                  pathname={pathname}
                />
              ))}
            </div>
            {selected && (
              <MilestoneDetails
                isStudent={isStudent}
                onClose={() => setSelected()}
                milestone={selected}
                student={student}
                pathname={pathname}
              />
            )}
          </div>
        );
      }}
    </Query>
  );
};

export default withStyles(styles)(Milestones);
