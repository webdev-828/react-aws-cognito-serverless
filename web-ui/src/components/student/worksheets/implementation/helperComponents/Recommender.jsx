import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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

const Recommender = (props) => {
    console.log(props)
    const classes = useStyles();
    const params2 = ['name', 'relationship', 'submit', 'aspect', 'chose', 'draft', 'notes'];
    const placeholder = `
        Dear xxx,
        {Thank them for being a great teacher/coach/counselor}        
        {Explain why you chose them}        
        {Explain what you want them to about}        
        {Explain practical items - which schools you want to submit their letter to, when the exact due date is, etc.}        
        Thank you,
        Your name
    `;

    return (
        <React.Fragment>
            {props.recommender.map((recommend, index) =>
                <div key = {index}>
                    <p style = {{fontWeight: 'bold', marginTop: 16, marginBottom: -20}}>{`Recommender ${index + 1}`}</p>
                    <Wrapper 
                        components = {
                            [
                                <Paper className = {classes.root}>
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {recommend.map((recomm, index1) =>
                                                <TableRow key = {index1}>
                                                    <TableCell className = {classes.tablecell1}>
                                                        {recomm.key}
                                                        {index1 === 5 && <React.Fragment><b> reach out in person!</b>)</React.Fragment>}
                                                    </TableCell>
                                                    <TableCell className = {classes.tablecell2}>
                                                        <Textfield id = {`${params2[index1]}-${index}`} value = {recomm.value} placeholder = {recomm.placeholder ? placeholder : ''}/>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </Paper>,
                                <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet} sub = {props.sub} item = {index + 2} />
                            ]
                        } 
                    />
                </div>
            )}
        </React.Fragment>
    );
};

export default Recommender;