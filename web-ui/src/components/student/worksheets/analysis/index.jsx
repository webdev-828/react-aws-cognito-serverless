import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplyIcon from '@material-ui/icons/Reply';
import './index.scss';
import Statement from './Statement';
import Dreams from './Dreams';
import Pleasants from './Pleasants';
import Unpleasants from './Unpleasants';
import Favorites from './Favorites';
import Weakness from './Weakness';
import Strength from './Strength';

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

const Analysis = (props) => {
    const classes = useStyles();
    
    const SelfWithCard = () => {
        const card = props.analysis.map((analysis, index) => {
            return (
                <Grid key = {index} item sm = {12} md = {6} lg = {4}>
                    <Link to = {`${props.pathname}/${props.worksheets[1].worksheet_url}/${analysis.url}`} style = {{textDecoration: 'none', color: 'black'}}>
                        <Paper className = {classes.paper}>
                            <div className = {classes.name}>{analysis.name}</div>
                            <div className = {classes.date}>{analysis.date}</div>
                        </Paper>
                    </Link>
                </Grid>
            )
       })
        return (
            <div className = {classes.root}>
                <div className = 'direction'>
                    <Link to = {props.pathname} style = {{textDecoration: 'none', color: 'black'}}>
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
        <Statement {...props} subid = {1}/>,
        <Dreams {...props} subid = {2}/>,
        <Pleasants {...props} subid = {3}/>,
        <Unpleasants {...props} subid = {4}/>,
        <Favorites {...props} subid = {5}/>,
        <Weakness {...props} subid = {6}/>,
        <Strength {...props} subid = {7}/>
    ];

    const Routes = props.analysis.map((analysis, index) => 
        <Route key = {index} path = {`${props.pathname}/${props.worksheets[1].worksheet_url}/${analysis.url}`} render = {() => Components[index]} />
    );

    return(
        <Router history = {props.history}>
            <Switch>
                <Route exact path = {`${props.pathname}/${props.worksheets[1].worksheet_url}`} component = {SelfWithCard} />
                {Routes}
            </Switch>
        </Router>
    );
     
}

export default (withApollo(Analysis));