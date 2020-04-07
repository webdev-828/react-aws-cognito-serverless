import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReplyIcon from '@material-ui/icons/Reply';
import Approach from './Approach';
import Aptitude from './Aptitude';
import Future from './Future';
import CInterview from './CInterview';
import CDeclaration from './CDeclaration';
import Research from './Research';
import MInterview from './MInterview';
import MDeclaration from './MDeclaration';

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

const Career = props => {
    const classes = useStyles();

    const CareerWithCard = () => {
        const card = props.careers.map((career, index) => {
            return (
                <Grid key = {index} item sm = {12} md = {6} lg = {4}>
                    <Link to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${career.url}`} style = {{textDecoration: 'none', color: 'black'}}>
                        <Paper className = {classes.paper}>
                            <div className = {classes.name}>{career.name}</div>
                            <div className = {classes.date}>{career.date}</div>
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
        <Approach {...props} subid = {1}/>,
        <Aptitude {...props} subid = {2}/>,
        <Future {...props} subid = {3}/>,
        <CInterview {...props} subid = {4}/>,
        <CDeclaration {...props} subid = {5}/>,
        <Research {...props} subid = {6}/>,
        <MInterview {...props} subid = {7}/>,
        <MDeclaration {...props} subid = {8}/>
    ];

    const Routes = props.careers.map((career, index) => 
        <Route key = {index} path = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${career.url}`} render = {() => Components[index]} />
    );
    
    return (
        <Router history = {props.history}>
            <Switch>
                <Route exact path = {`${props.pathname}/${props.worksheets[4].worksheet_url}`} component = {CareerWithCard} />
                {Routes}
            </Switch>
        </Router>
    )
}

export default (withApollo(Career));