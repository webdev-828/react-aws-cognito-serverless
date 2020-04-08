import { connect } from 'react-redux';
import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplyIcon from '@material-ui/icons/Reply';
import Influence from './Influence';
import History from './History';
import Experience from './Experience';
import Feedback from './Feedback';
import Community from './Community';
import Summary from './Summary';
import Selling from './Selling';
import Improvement from './Improvement';
import { fetchWorksheets } from './../../../../reducers/worksheet';
import { fetchUser } from './../../../../reducers/user';
import { fetchDashboard } from './../../../../reducers/dashboard';
import { fetchAnalysis } from './../../../../reducers/analysis';
import { fetchCore } from './../../../../reducers/core';
import { fetchLife } from './../../../../reducers/life';
import { fetchCareer } from './../../../../reducers/career';
import { fetchCollege } from './../../../../reducers/college';
import { fetchImplementation } from './../../../../reducers/implementation';

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
    wraper: {
        borderWidth: '1rem',
        border: 'ridge'
    }
}));

const Core = props => {
    const classes = useStyles();
    const root = props.location.pathname;
    const root_url = root.replace(`/${props.worksheets[2].worksheet_url}`, '');
    props.onFetchWorksheets();
    props.onFetchUser();
    props.onFetchDashboard();
    props.onFetchAnalysis();
    props.onFetchCore();
    props.onFetchLife();
    props.onFetchCareer();
    props.onFetchCollege();
    props.onFetchImplementation();

    const CoreWithCard = () => {
        const card = props.cores.map((core, index) => {
            return (
                <Grid key = {index} item sm = {12} md = {6} lg = {4}>
                    <Link to = {`${props.pathname}/${props.worksheets[2].worksheet_url}/${core.url}`} style = {{textDecoration: 'none', color: 'black'}}>
                        <Paper className = {classes.paper}>
                            <div className = {classes.name}>{core.name}</div>
                            <div className = {classes.date}>{core.date}</div>
                        </Paper>
                    </Link>
                </Grid>
            );
        });

        return (
            <div className = {classes.root}>
                <div className = 'direction'>
                    <Link to = {root_url} style = {{textDecoration: 'none', color: 'black'}}>
                        <ReplyIcon className = {classes.icon} />    
                    </Link>
                </div>
                <Grid container spacing = {3}>
                    {card}
                </Grid>
            </div>
        );
    };
    
    const Components = [
        <Influence {...props} subid = {1}/>, 
        <History {...props} subid = {2}/>, 
        <Experience {...props} subid = {3}/>, 
        <Feedback {...props} subid = {4}/>, 
        <Community {...props} subid = {5}/>, 
        <Summary {...props} subid = {6}/>, 
        <Selling {...props} subid = {7}/>, 
        <Improvement {...props} subid = {8}/>
    ];

    const Routes = props.cores.map((core, index) => 
        <Route key = {index} path = {`${props.pathname}/${props.worksheets[2].worksheet_url}/${core.url}`} render = {() => Components[index]} />
    );
    
    return (
        <Router history = {props.history}>
            <Switch>
                <Route exact path = {`${props.pathname}/${props.worksheets[2].worksheet_url}`} component = {CoreWithCard} />
                {Routes}
            </Switch>
        </Router>
    )
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (withApollo(Core));