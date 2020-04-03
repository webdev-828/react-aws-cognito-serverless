import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3)
    }
}));

export default (props) => {
    const classes = useStyles();
    return (
        <Paper className = {classes.root}>
            {props.components.map((component, index) =>
                <React.Fragment key = {index}>
                    {component}
                </React.Fragment>
            )}
        </Paper>
    )
}