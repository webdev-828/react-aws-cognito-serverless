import { connect } from 'react-redux';
import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Meeting from './Meeting';
import Message from './Message';
import { fetchWorksheets } from './../../../reducers/worksheet';
import { fetchUser } from './../../../reducers/user';
import { fetchDashboard } from './../../../reducers/dashboard';
import { fetchAnalysis } from './../../../reducers/analysis';
import { fetchCore } from './../../../reducers/core';
import { fetchLife } from './../../../reducers/life';
import { fetchCareer } from './../../../reducers/career';
import { fetchCollege } from './../../../reducers/college';
import { fetchImplementation } from './../../../reducers/implementation';

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
        implementation: state.implementation.implementation
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
        onFetchImplementation: () => dispatch(fetchImplementation())
    }
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '5%'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: '#12263f',
        border: 'solid',
        borderColor: 'white',
        borderWidth: '0.2rem',
        borderRadius: '5%'
    },
    name: {
        paddingTop: theme.spacing(10)
    },
    date: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(3)
    },
    icon: {
        fontSize: '3rem',
        color: 'grey'
    },
}));

const Head = (props) => {
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

    const HeadWithCard = () => {
        return (
                <div className = {classes.root}>
                    <Grid container spacing = {3}>
                        <Grid item sm = {12} md = {6} lg = {4}>
                            <Link to = '/head-counselor/hmeeting' style = {{textDecoration: 'none', color: 'black'}}>
                                <Paper className = {classes.paper}>
                                    <div className = {classes.name}>Request Meeting</div>
                                    <div className = {classes.date}>2015-12-15</div>
                                </Paper>
                            </Link>
                        </Grid>
                        <Grid item sm = {12} md = {6} lg = {4}>
                            <Link to = '/head-counselor/hmessage' style = {{textDecoration: 'none', color: 'black'}}>
                                <Paper className = {classes.paper}>
                                    <div className = {classes.name}>Send a Message</div>
                                    <div className = {classes.date}>2015-12-15</div>
                                </Paper>
                            </Link>
                        </Grid>  
                    </Grid>
                </div>          
        );
    };

    const Components = [
        <Meeting {...props}/>,
        <Message {...props}/>
    ];

    return (
        <Router history = {props.history}>
            <Switch>
                <Route exact path = '/head-counselor' component = {HeadWithCard} />
                <Route path = '/head-counselor/hmeeting' render = {() => Components[0]}></Route>
                <Route path = '/head-counselor/hmessage' render = {() => Components[1]}></Route>
            </Switch>
        </Router>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Head);