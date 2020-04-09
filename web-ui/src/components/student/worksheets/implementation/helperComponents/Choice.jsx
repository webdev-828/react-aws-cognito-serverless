import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Textfield from './../../../../ui/textfield/Textfield';
import Wrapper from './../../../../ui/wrapper/Wrapper';
import Comment from './../../../../ui/comment/Comment';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    icon: {
        fontSize: '3rem',
        color: 'grey'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    table: {
        fontSize: '1rem'
    },
    tablecell: {
        padding: '2%',
        fontSize: '1rem',
        backgroundColor: 'lightgrey',
        border: 'solid',
        borderWidth: '1px'
    },
    tablecell1: {
        border: 'solid',
        borderWidth: '1px'
    },
    tablecell2: {
        border: 'solid',
        borderWidth: '1px',
        width: '70%'
    },
    textfield: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
    label: {
        fontWeight: 'bold'
    },
    input: {
        border: 0,
        outline: 0,
        background: 'transparent',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    }
}));

const Choice = (props) => {
    const classes = useStyles();
    const params = ['class', 'strategy', 'enjoyability'];

    
    return (
        <React.Fragment>
            {props.choices.map((choice, index) =>
                <Wrapper 
                    key = {index}
                    components = {
                        [
                            <Table className = {classes.table} aria-label = 'caption table' key = {index} style = {(index === props.choices.length - 1) ? {marginBottom: 0} : {marginBottom: 10}}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className = {classes.tablecell1}>{choice[0].key}</TableCell>
                                        <TableCell className = {classes.tablecell2}>
                                            <Textfield id = {`${params[0]}-${index}`} value = {choice[0].value}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className = {classes.tablecell1}>{choice[1].key}</TableCell>
                                        <TableCell className = {classes.tablecell2}>
                                            <Textfield id = {`${params[1]}-${index}`} value = {choice[1].value}/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className = {classes.tablecell1}>{choice[2].key}</TableCell>
                                        <TableCell className = {classes.tablecell2}>
                                            <Textfield id = {`${params[2]}-${index}`} value = {choice[2].value}/>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>,
                            <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet} sub = {props.sub} item = {index + 3} />
                        ]
                    } 
                />
            )}
        </React.Fragment>
    );
};

export default Choice;