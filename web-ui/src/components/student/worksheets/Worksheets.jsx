import { connect } from 'react-redux';
import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dashboard from './dashboard/index';
import Analysis from './analysis/index';
import Core from './core-value/index';
import Life from './life/index';
import Career from './career/index';
import Colledge from './college/index';
import Implementation from './implementation/index';
import Milestones from '../milestones';
import { setDashboard } from './../../../reducers/dashboard';
import { setAnalysis } from './../../../reducers/analysis';
import { setCore } from './../../../reducers/core';
import { setLife } from './../../../reducers/life';
import { setCareer } from './../../../reducers/career';
import { setCollege } from './../../../reducers/college';
import { setImplementation } from './../../../reducers/implementation';
import { GET_MODULES } from './../../../graphql/content/Worksheets';
import dashboard from './../../../assets/student/worksheets/dashboard.svg';
import analysis from './../../../assets/student/worksheets/self_analysis.svg';
import core from './../../../assets/student/worksheets/core_value.svg';
import life from './../../../assets/student/worksheets/life_vision.svg';
import career from './../../../assets/student/worksheets/career_exploration.svg';
import college from './../../../assets/student/worksheets/college_search.svg';
import implementation from './../../../assets/student/worksheets/implementation.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '5%',
  },
  root1: {
    'width': '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
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
  worksheet: {
    color: '#12263f',
    borderBottomColor: 'grey',
    borderBottomWidth: '0.15rem',
    borderBottomStyle: 'dotted',
  },
  back: {
    width: '75%',
    height: '75%',
  },
  name: {
    marginTop: theme.spacing(1),
  },
  date: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  percentage: {
    marginTop: '5%',
    height: '1.2rem',
    backgroundColor: 'lightgrey',
    borderRadius: '0.6rem',
  },
  progress: {
    background: 'white',
    height: '0.1rem',
  },
}));

const mapStateToProps = (state) => {
  return {
    worksheets: state.worksheet.worksheets,
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
    onSetDashboard: (dashboard) => dispatch(setDashboard(dashboard)),
    onSetAnalysis: (analysis) => dispatch(setAnalysis(analysis)),
    onSetCore: (core) => dispatch(setCore(core)),
    onSetLife: (life) => dispatch(setLife(life)),
    onSetCareer: (career) => dispatch(setCareer(career)),
    onSetCollege: (college) => dispatch(setCollege(college)),
    onSetImplementation: (implementation) =>
      dispatch(setImplementation(implementation)),
  };
};

const Worksheets = (props) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_MODULES, {
    variables: { usersub: props.sub },
  });
  const backgrounds = [
    dashboard,
    analysis,
    core,
    life,
    career,
    college,
    implementation,
  ];

  React.useEffect(() => {
    if (loading) {
      return;
    }

    if (error) {
      return;
    }

    async function fetchData() {
      const dashboard_module = data.dashboard.map((element) => ({
        id: element.id,
        name: element.title,
        url: element.url,
        time: element.time,
        date: '2019-12-15',
      }));

      const analysis_module = data.analysis.map((element) => ({
        id: element.id,
        name: element.title,
        url: element.url,
        time: element.time,
        date: '2019-12-15',
      }));

      const core_module = data.core.map((element) => ({
        id: element.id,
        name: element.title,
        url: element.url,
        time: element.time,
        date: '2019-12-15',
      }));

      const life_module = data.life.map((element) => ({
        id: element.id,
        name: element.title,
        url: element.url,
        time: element.time,
        date: '2019-12-15',
      }));

      const career_module = data.career.map((element) => ({
        id: element.id,
        name: element.title,
        url: element.url,
        time: element.time,
        date: '2019-12-15',
      }));

      const college_module = data.college.map((element) => ({
        id: element.id,
        name: element.title,
        url: element.url,
        time: element.time,
        date: '2019-12-15',
      }));

      const implementation_module = data.implement.map((element) => ({
        id: element.id,
        name: element.title,
        url: element.url,
        time: element.time,
        date: '2019-12-15',
      }));

      props.onSetDashboard(dashboard_module);
      props.onSetAnalysis(analysis_module);
      props.onSetCore(core_module);
      props.onSetLife(life_module);
      props.onSetCareer(career_module);
      props.onSetCollege(college_module);
      props.onSetImplementation(implementation_module);
    }
    fetchData();
  }, [data]);

  if (loading) {
    return (
      <div className={classes.root1}>
        <LinearProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  const WorksheetWithModule = () => {
    const worksheets = props.worksheets;
    const modules = worksheets.map((worksheet, index) => (
      <Grid key={index} item xs={12} sm={6} md={4} lg={3} data-index={index}>
        <Link
          to={`${props.pathname}/${worksheet.worksheet_url}`}
          style={{ textDecoration: 'none', color: 'black' }}
        >
          <Paper className={classes.paper}>
            <div className={classes.worksheet}>
              <div>
                <img className={classes.back} src={backgrounds[index]} />
              </div>
              <div className={classes.name}>{worksheet.worksheet_name}</div>
              <div className={classes.date}>2019-12-15</div>
            </div>
            <div className={classes.percentage}>
              <div
                style={{
                  backgroundColor: 'green',
                  height: '100%',
                  width: `${(Object.values(data)[index + 8].length /
                    Object.values(data)[index].length) *
                    100}%`,
                  borderRadius: '0.6rem',
                }}
              />
            </div>
          </Paper>
        </Link>
      </Grid>
    ));
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Link to={`${props.pathname}/milestones`}>
              <Paper className={classes.paper}>
                <div className={classes.worksheet}>
                  <div></div>
                  <div className={classes.name}>Milestones</div>
                </div>
              </Paper>
            </Link>
          </Grid>
          {modules}
        </Grid>
      </div>
    );
  };

  const sub = props.sub;
  props = { ...props, sub };

  const Components = [
    <Dashboard {...props} worksheet_id={0} />,
    <Analysis {...props} worksheet_id={1} />,
    <Core {...props} worksheet_id={2} />,
    <Life {...props} worksheet_id={3} />,
    <Career {...props} worksheet_id={4} />,
    <Colledge {...props} worksheet_id={5} />,
    <Implementation {...props} worksheet_id={6} />,
  ];

  const Routes = props.worksheets.map((worksheet, index) => (
    <Route
      key={index}
      path={`${props.pathname}/${worksheet.worksheet_url}`}
      render={() => Components[index]}
    />
  ));

  return (
    <Router history={props.history}>
      <Switch>
        {Routes}
        <Route exact path={props.pathname} component={WorksheetWithModule} />
        <Route
          path={`${props.pathname}/milestones`}
          render={(routeProps) => <Milestones {...routeProps} {...props} />}
        />
      </Switch>
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Worksheets);
