import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplyIcon from '@material-ui/icons/Reply';
import Weadmit from './Weadmit';
import Sheet1 from './Sheet1';
import TAnalysis from './Time_Analysis';
import TDepth from './Time_Depth';

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
  wraper: {
    borderWidth: '1rem',
    border: 'ridge',
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const DashboardWithCard = () => {
    const card = props.dashboard
      .filter(
        (cards, index1) =>
          index1 === 0 || index1 === 1 || index1 === 11 || index1 === 12,
      )
      .map((dash, index) => (
        <Grid key={index} item sm={12} md={6} lg={4}>
          <Link
            to={`${props.pathname}/${props.worksheets[0].worksheet_url}/${dash.url}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <Paper className={classes.paper}>
              <div className={classes.name}>{dash.name}</div>
              <div className={classes.date}>{dash.date}</div>
            </Paper>
          </Link>
        </Grid>
      ));

    return (
      <div className={classes.root}>
        <div className="direction">
          <Link
            to={props.pathname}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <ReplyIcon className={classes.icon} />
          </Link>
        </div>
        <Grid container spacing={3}>
          {card}
        </Grid>
      </div>
    );
  };

  const Components = [
    <Weadmit {...props} subid={1} />,
    <Sheet1 {...props} subid={2} />,
    <TAnalysis {...props} subid={3} />,
    <TDepth {...props} subid={4} />,
  ];

  const Routes = props.dashboard
    .filter(
      (cards, index1) =>
        index1 === 0 || index1 === 1 || index1 === 11 || index1 === 12,
    )
    .map((dash, index) => (
      <Route
        key={index}
        path={`${props.pathname}/${props.worksheets[0].worksheet_url}/${dash.url}`}
        render={() => Components[index]}
      />
    ));

  return (
    <Router history={props.history}>
      <Switch>
        <Route
          exact
          path={`${props.pathname}/${props.worksheets[0].worksheet_url}`}
          component={DashboardWithCard}
        />
        {Routes}
      </Switch>
    </Router>
  );
};

export default withApollo(Dashboard);
