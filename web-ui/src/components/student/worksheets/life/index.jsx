import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplyIcon from '@material-ui/icons/Reply';
import Evolution from './Evolution';
import Values from './Values';
import Work from './Work';
import Expectation from './Expectation';
import Earning from './Earning';
import Summary from './Summary';

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

const Life = props => {
    const classes = useStyles();

    const LifeWithCard = () => {
        const card = props.lifes.map((life, index) => {
            return (
                <Grid key = {index} item sm = {12} md = {6} lg = {4}>
                    <Link to = {`${props.pathname}/${props.worksheets[3].worksheet_url}/${life.url}`} style = {{textDecoration: 'none', color: 'black'}}>
                        <Paper className = {classes.paper}>
                            <div className = {classes.name}>{life.name}</div>
                            <div className = {classes.date}>{life.date}</div>
                        </Paper>
                    </Link>
                </Grid>                
            );
        });

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
        <Evolution {...props} subid = {1}/>,
        <Values {...props} subid = {2}/>,
        <Work {...props} subid = {3}/>,
        <Expectation {...props} subid = {4}/>,
        <Earning {...props} subid = {5}/>,
        <Summary {...props} subid = {6}/>
    ];

    const Routes = props.lifes.map((life, index) => 
        <Route key = {index} path = {`${props.pathname}/${props.worksheets[3].worksheet_url}/${life.url}`} render = {() => Components[index]} />
    );
    
    return (
        <Router history = {props.history}>
            <Switch>
                <Route exact path = {`${props.pathname}/${props.worksheets[3].worksheet_url}`} component = {LifeWithCard} />
                {Routes}
            </Switch>
        </Router>
    )
}

export default (withApollo(Life));