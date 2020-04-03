import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textfield: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    }
}));

const TextfieldWithBorder = (props) => {
    const classes = useStyles();
    return (
        <form className = {classes.container} noValidate autoComplete = 'off'>
            <div style = {{width: '100%', border: 'solid', borderWidth: 1}}>
                <TextField
                    id = {props.id}
                    className = {classes.textfield}                        
                    defaultValue = {props.disable ? 'NA' : props.value}
                    disabled = {props.disable}
                    placeholder = {props.placeholder}
                    multiline
                    InputProps = {{
                        disableUnderline: true
                    }}
                />
            </div>
        </form>
    )
};

export default TextfieldWithBorder;