import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Wrapper from './../../../ui/wrapper/Wrapper';
import Comment from './../../../ui/comment/Comment';
import { GET_SELF, INSEERT_SELF } from './../../../../graphql/student/worksheets/self-analysis/Self';

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
        width: '75%'
    },
    textfield: {
        width: '100%',
        padding: '0.5rem'
    },
    title: {
        marginBottom: '-1.5rem'
    },
    content: {
        marginTop: '2.5rem',
        fontWeight: 'bold'
    }
}));

const Pleasants = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.analysis[2].url, '');
    const prev = props.analysis[1].url;
    const next = props.analysis[3].url;

    const params = ['pleasant', 'reason'];

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [pleasant, setPleasant] = React.useState(String);

    React.useEffect(() => {
        props.client.query({query: GET_SELF, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.self.length > 0) {
                    setID(data.self[0].id);
                    setPleasant(data.self[0].value);
                };
            }
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var pleasants = [];
        var tbody = document.getElementById('pleasant');
        var count = tbody.childElementCount;
        for (var index = 0; index < count; index++) {
            var name = document.getElementById(`${params[0]}-${index}`).value;
            var reason = document.getElementById(`${params[1]}-${index}`).value;
            const pleasant = {
                id: index,
                pleasant: name,
                reason : reason
            };
            pleasants.push(pleasant);
        };

        const pleasant_obj = {
            pleasants: pleasants,
            events: document.getElementById('events').value
        };

        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(pleasant_obj)
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_SELF,
            variables: {
                self: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.self.affected_rows > 0) {
                props.history.push(root);
            }
        });
    };

    const Textfield = (props) => {
        return (
            <form className = {classes.container} noValidate autoComplete = 'off'>
                <div style = {{width: '100%', border: 'solid', borderWidth: '0.05rem'}}>
                    <TextField
                        id = {props.id}
                        className = {classes.textfield}                        
                        defaultValue = {props.value}
                        multiline
                        InputProps = {{
                            disableUnderline: true
                        }}
                    />
                </div>
            </form>
        )
    };

    const TableTextfield = (props) => {
        return (
            <form className = {classes.container} noValidate autoComplete = 'off'>
                <div style = {{width: '100%'}}>
                    <TextField
                        id = {props.id}
                        className = {classes.textfield}                        
                        defaultValue = {props.value}
                        multiline
                        InputProps = {{
                            disableUnderline: true
                        }}
                    />
                </div>
            </form>
        )
    };

    const pleasantsTable = () => {
        var tbody = [];
        for (var index = 0; index < 15; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1} >
                        <TableTextfield id = {`${params[0]}-${index}`} value = {pleasant && JSON.parse(pleasant).pleasants[index].pleasant}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2} >
                        <TableTextfield id = {`${params[1]}-${index}`} value = {pleasant && JSON.parse(pleasant).pleasants[index].reason}/>
                    </TableCell>
                </TableRow>
            );            
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
                        <h2 className = 'center'>2.3 Pleasant Events</h2>
                        <h3 className = 'center'>(20 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>You must have some happy memories that you enjoyed and/or are proud of. List as many events as possible and briefly describe them. Be authentic, as this worksheet is designed to help you organize your thought process!</p>
                        <div className = 'line'></div>
                        <p>(Fill out at least 15 items)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Pleasant events</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Why you felt happy</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'pleasant'>
                                            {pleasantsTable()}
                                        </TableBody>
                                    </Table>,
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0}/>
                                ]
                            } 
                        />  
                        <br/>
                        <p>What are some common themes/factors among these events, and what do they show about what you love, enjoy, and/or are proud of? What kind of fulfillment do you want to pursue for the rest of your life? (Write at least 3 examples)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Textfield id = 'events' value = {pleasant && JSON.parse(pleasant).events}/>,
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1}/>
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

export default Pleasants;
