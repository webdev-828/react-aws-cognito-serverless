import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
import { GET_LIFE, INSEERT_LIFE } from './../../../../graphql/student/worksheets/life-vision/Life';

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
        borderWidth: '1px',
        width: '50%',
        paddingLeft: 36
    },
    tablecell2: {
       border: 'solid',
       borderWidth: '1px',
       width: '75%'
    },
    tablecell3: {
       border: 'solid',
       borderWidth: '1px',
    },
    tablecell4: {
       border: 'solid',
       borderWidth: '1px',
       width: '25%'
    },
    tablecell5: {
       border: 'solid',
       borderWidth: '1px',
       width: '60%'
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

const Values = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.lifes[1].url, '');
    const prev = props.lifes[0].url;
    const next = props.lifes[2].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [value, setValue] = React.useState(String);

    const params = ['value', 'reason'];    

    React.useEffect(() => {
        props.client.query({query: GET_LIFE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.life.length > 0) {
                    setID(data.life[0].id);
                    setValue(data.life[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var values = [];
        for (var index = 0; index < document.getElementById('values').childElementCount; index++) {
            const val_obj = {
                value: document.getElementById(`${params[0]}-${index}`).value,
                reason: document.getElementById(`${params[1]}-${index}`).value
            };
            values.push(val_obj);
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(values)
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_LIFE,
            variables: {
                life: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.life.affected_rows > 0) {
                props.history.push(root);
            }
        });
    };

    const exampleTable = () => {
        return (
            <TableBody>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>
                        <ul>
                            <li>Family (e.g. parents, siblings)</li>
                            <li>Time</li>
                            <li>Money</li>
                            <li>Work</li>
                            <li>Social status</li>
                            <li>Partner (e.g. boyfriend/girlfriend, future spouse)</li>
                            <li>Health</li>
                        </ul>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <ul>
                            <li>Friends</li>
                            <li>Pastime/Hobbies</li>
                            <li>Fame</li>
                            <li>Stable life</li>
                            <li>Community service/Volunteering</li>
                            <li>Travel</li>
                            <li>Religion</li>
                            <li>Studies/Learning</li>
                        </ul>                        
                    </TableCell>
                </TableRow>
            </TableBody>
        )
    };

    const valuesTable = () => {
        var tbody = [];
        for (var index = 0; index < 5; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell3} align = 'center'>
                        {index + 1}
                    </TableCell>
                    <TableCell className = {classes.tablecell4}>
                        <Textfield id = {`${params[0]}-${index}`} value = {value && JSON.parse(value)[index].value}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell5}>
                        <Textfield id = {`${params[1]}-${index}`} value = {value && JSON.parse(value)[index].reason} />
                    </TableCell>
                </TableRow>
            )
        };
        return tbody;
    };

    if (!isLoaded) {
        return (
            <p>Loading ... </p>
        )
    } else {
        return (        
            <div>
                <div className = 'center direction'>
                    <Link to = {`${root}${prev}`} style = {{textDecoration: 'none'}}>
                        <FastRewindRoundedIcon className = {classes.icon} style = {{marginLeft: '5rem'}} />
                    </Link>
                    <Link to = {`${root}${next}`} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <div style = {{width: '80%', textAlign: 'center'}}>
                        <h2 className = 'center'>4.2 Your Values</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            What are the top five things you value? Feel free to use any of the following examples and describe why they are important for you.
                        </p>
                        <div className = 'line'></div>
                        <p style = {{marginBottom: '-3%'}}>(Fill out at least 5 items)</p>
                        <Paper className = {classes.root}>
                            <Table className = {classes.table} aria-label = 'caption table'>
                                {exampleTable()}
                            </Table>
                        </Paper>
                        <p className = 'text_center' style = {{marginTop: '5%'}}>What are the top five values you’ve had throughout your life?</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Priority</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Values</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Why?</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'values'>
                                            {valuesTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
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
        )
    }
};

export default Values;

