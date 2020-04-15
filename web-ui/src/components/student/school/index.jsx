import { connect, useSelector } from 'react-redux';
import React, { useEffect, useCallback } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Reach from './Reach';
import Target from './Target';
import Match from './Match';
import SearchBar from './search-bar';
import { fetchWorksheets } from './../../../reducers/worksheet';
import { fetchUser } from './../../../reducers/user';
import { fetchDashboard } from './../../../reducers/dashboard';
import { fetchAnalysis } from './../../../reducers/analysis';
import { fetchCore } from './../../../reducers/core';
import { fetchLife } from './../../../reducers/life';
import { fetchCareer } from './../../../reducers/career';
import { fetchCollege } from './../../../reducers/college';
import { fetchImplementation } from './../../../reducers/implementation';
import {
  ADD_SCHOOL,
  DELETE_SCHOOL,
  GET_SCHOOLS,
} from '../../../graphql/student/school';

const mapStateToProps = (state) => {
  return {
    worksheets: state.worksheet.worksheets,
    user: state.user.user,
    dashboard: state.dashboard.dashboard,
    analysis: state.analysis.analysis,
    cores: state.core.core,
    lifes: state.life.life,
    careers: state.career.career,
    college: state.college.college,
    implementation: state.implementation.implementation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchWorksheets: () => dispatch(fetchWorksheets()),
    onFetchUser: () => dispatch(fetchUser()),
    onFetchDashboard: () => dispatch(fetchDashboard()),
    onFetchAnalysis: () => dispatch(fetchAnalysis()),
    onFetchCore: () => dispatch(fetchCore()),
    onFetchLife: () => dispatch(fetchLife()),
    onFetchCareer: () => dispatch(fetchCareer()),
    onFetchCollege: () => dispatch(fetchCollege()),
    onFetchImplementation: () => dispatch(fetchImplementation()),
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '5%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#12263f',
    border: 'solid',
    borderColor: 'white',
    borderWidth: '0.2rem',
    borderRadius: '5%',
  },
  name: {
    paddingTop: theme.spacing(10),
  },
  date: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(3),
  },
  icon: {
    fontSize: '3rem',
    color: 'grey',
  },
}));

const School = (props) => {
  const [addSchool] = useMutation(ADD_SCHOOL);
  const [removeSchool] = useMutation(DELETE_SCHOOL);

  const classes = useStyles();
  props.onFetchWorksheets();
  props.onFetchUser();
  props.onFetchDashboard();
  props.onFetchAnalysis();
  props.onFetchCore();
  props.onFetchLife();
  props.onFetchCareer();
  props.onFetchCollege();
  props.onFetchImplementation();
  const { loading, error, data } = useQuery(GET_SCHOOLS, {
    variables: {
      student_sub: props.user.sub,
    },
  });

  const schools = data ? data.student_college : [];

  const onAddSchool = (target, college) => {
    return addSchool({
      variables: {
        input: {
          category: target,
          college_name: college.label,
          college_id: String(college.value),
          student_sub: props.user.sub,
        },
      },
      update: (store, resp) => {
        const data = store.readQuery({
          query: GET_SCHOOLS,
          variables: {
            student_sub: props.user.sub,
          },
        });
        data.student_college.push(resp.data.insert_student_college.returning[0]);
        store.writeQuery({
          query: GET_SCHOOLS,
          variables: {
            student_sub: props.user.sub,
          },
          data
        })
      },
    });
  };

  const onRemoveSchool = (id) => {
    return removeSchool({
      variables: {
        student_sub: props.user.sub,
        college_id: id,
      },
      update: (store) => {
        const data = store.readQuery({
          query: GET_SCHOOLS,
          variables: {
            student_sub: props.user.sub,
          },
        });
        const updatedData = data.student_college.filter(i => i.college_id !== id );
        store.writeQuery({
          query: GET_SCHOOLS,
          variables: {
            student_sub: props.user.sub,
          },
          data: {
            ...data,
            student_college: updatedData
          }
        })
      },
    });
  };

  const SchoolWithCard = useCallback(() => {
    return (
      <div className={classes.root}>
        <SearchBar
          onAddSchool={onAddSchool}
          onRemoveSchool={onRemoveSchool}
        />
      </div>
    );
  }, []);

  return (
    <Router history={props.history}>
      <Switch>
        <Route exact path="/school-list" component={SchoolWithCard} />
        <Route
          path="/school-list/reach"
          render={() => (
            <Reach
              {...props}
              loading={loading}
              schools={schools.filter((s) => s.category === 'reach')}
              onRemoveSchool={onRemoveSchool}
            />
          )}
        />
        <Route
          exact
          path="/school-list/target"
          render={() => (
            <Target
              {...props}
              loading={loading}
              schools={schools.filter((s) => s.category === 'target')}
              onRemoveSchool={onRemoveSchool}
            />
          )}
        />
        <Route
          exact
          path="/school-list/match"
          render={() => (
            <Match
              {...props}
              loading={loading}
              schools={schools.filter((s) => s.category === 'match')}
              onRemoveSchool={onRemoveSchool}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(School);
