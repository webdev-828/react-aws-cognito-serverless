import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Wrapper from './../../../ui/wrapper/Wrapper';
import Comment from './../../../ui/comment/Comment';
import Textfield from '../../../ui/textfield/Textfield';
import { GET_CORE, INSEERT_CORE } from './../../../../graphql/student/worksheets/core-value/Core';

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
  
const Influence = (props) => {
    const classes = useStyles();
    
    const root = props.location.pathname.replace(props.cores[0].url, '');
    const next = props.cores[1].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [influence, setInfluence] = React.useState(String);

    const params1 = ['name1', 'name2'];
    const params2 = ['respect1', 'respect2'];
    const params3 = ['disagree1', 'disagree2'];

    React.useEffect(() => {
        props.client.query({query: GET_CORE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.core.length > 0) {
                    setID(data.core[0].id);
                    setInfluence(data.core[0].value);
                };
            }
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {     
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                {
                    name1: document.getElementById(params1[0]).value,
                    name2: document.getElementById(params1[1]).value,
                    respect1: document.getElementById(params2[0]).value,
                    respect2: document.getElementById(params2[1]).value,
                    disagree1: document.getElementById(params3[0]).value,
                    disagree2: document.getElementById(params3[1]).value
                }
            )
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_CORE,
            variables: {
                core: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.core.affected_rows > 0) {
                props.history.push(root);
            };
        });
    };    

    const respectTable = () => {
        return (
            <TableRow>
                <TableCell className = {classes.tablecell1} align = 'center'>
                    <Textfield id = {params2[0]} value = {influence && JSON.parse(influence).respect1}/>
                </TableCell>
                <TableCell className = {classes.tablecell1} align = 'center'>
                    <Textfield id = {params2[1]} value = {influence && JSON.parse(influence).respect2}/>
                </TableCell>
            </TableRow>
        );
    };

    const disagreeTable = () => {
        return (
            <TableRow>
                <TableCell className = {classes.tablecell1} align = 'center'>
                    <Textfield id = {params3[0]} value = {influence && JSON.parse(influence).disagree1}/>
                </TableCell>
                <TableCell className = {classes.tablecell1} align = 'center'>
                    <Textfield id = {params3[1]} value = {influence && JSON.parse(influence).disagree2}/>
                </TableCell>
            </TableRow>
        );
    };

    if (!isLoaded) {
        return (
            <p>Loading ... </p>
        )
    } else {
        return (
            <div>
                <div className = 'center direction'>
                    <Link to = {root} style = {{textDecoration: 'none'}}>
                        <FastRewindRoundedIcon className = {classes.icon} style = {{marginLeft: '5rem'}} />
                    </Link>
                    <Link to = {`${root}${next}`} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <div style = {{width: '80%', textAlign: 'center'}}>
                        <h2 className = 'center'>3.1 Understand how your parent(s)/guardian(s) have influenced your core values</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>Whether or not they live with you now, your parent(s) or guardian(s) have largely influenced your morals and behavior. Analyzing your relationship with your parent(s)/guardian(s) can help you to uncover your unconscious biases and clarify your relationship with them.</p>
                        <div className = 'line'></div>
                        <p>Currently, what are the scores of the relationship between your parent(s)/guardian(s)? Use the scale of 0 (Terrible) to 10 (Excellent) for scoring.</p>
                        <div className = {classes.label}>
                            Parent/Guardian 1(<input type = 'text' className = {classes.input} id = {params1[0]} defaultValue = {influence && JSON.parse(influence).name1} />)
                        </div>
                        <div className = {classes.label}>
                            Parent/Guardian 2(<input type = 'text' className = {classes.input} id = {params1[1]} defaultValue = {influence && JSON.parse(influence).name2} />)
                        </div>
                        <p className = 'mt-5'>Philosophy, belief, behavior, habits of parent(s)/guardian(s) that you respect and want to follow:</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Parent/Guardian1</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Parent/Guardian2</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {respectTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>Philosophy, belief, behavior, habits of parent(s)/guardian(s) that you disagree with and wish they could correct:</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Parent/Guardian1</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Parent/Guardian2</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {disagreeTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
                    </div>
                </div>
                <div className = 'center'>
                    <Button
                        onClick = {handleClick}
                        className = 'pl-4 pr-4'
                        variant = 'contained'
                        color = 'primary'
                    >
                        Save
                    </Button>
                </div>
            </div>
        );
    }
};

export default Influence;