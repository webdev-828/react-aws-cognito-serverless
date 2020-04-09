import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplyIcon from '@material-ui/icons/Reply';
import Gpa from './Gpa';
import Act from './Act';
import Sat from './Sat';
import Extra from './Extra';
import Break from './Break';
import Scholarship from './Scholarship';
import College from './College';
import Strate from './Strate';
import Recommend from './Recommend';
import Resume from './Resume';
import Wait from './Wait';

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

const Implementation = props => {
    const classes = useStyles();

    const ImplementatioWithCard = () => {
        const card = props.implementation.map((implementation, index) => {
            return (
                <Grid key = {index} item sm = {12} md = {6} lg = {4}>
                    <Link to = {`${props.pathname}/${props.worksheets[6].worksheet_url}/${implementation.url}`} style = {{textDecoration: 'none', color: 'black'}}>
                        <Paper className = {classes.paper}>
                            <div className = {classes.name}>{implementation.name}</div>
                            <div className = {classes.date}>{implementation.date}</div>
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
        <Gpa {...props} subid = {1}/>,
        <Act {...props} subid = {2}/>,
        <Sat {...props} subid = {3}/>,
        <Extra {...props} subid = {4}/>,
        <Break {...props} subid = {5}/>,
        <Scholarship {...props} subid = {6}/>,
        <College {...props} subid = {7}/>,
        <Strate {...props} subid = {8}/>,
        <Recommend {...props} subid = {9}/>,
        <Resume {...props} subid = {10}/>,
        <Wait {...props} subid = {11}/>
    ];

    const Routes = props.implementation.map((implementation, index) => 
        <Route key = {index} path = {`${props.pathname}/${props.worksheets[6].worksheet_url}/${implementation.url}`} render = {() => Components[index]} />
    );
    
    return (
        <Router history = {props.history}>
            <Switch>
                <Route exact path = {`${props.pathname}/${props.worksheets[6].worksheet_url}`} component = {ImplementatioWithCard} />
                {Routes}
            </Switch>
        </Router>
    )
}

export default (withApollo(Implementation));