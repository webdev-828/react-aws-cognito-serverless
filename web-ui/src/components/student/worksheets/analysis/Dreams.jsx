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
        width: '80%'
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

const Dreams = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.analysis[1].url, '');
    const prev = props.analysis[0].url;
    const next = props.analysis[2].url;

    const params = ['name', 'model'];

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [dreams, setDreams] = React.useState(String);

    React.useEffect(() => {
        props.client.query({query: GET_SELF, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.self.length > 0) {
                    setID(data.self[0].id);
                    setDreams(data.self[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        const dreams = document.getElementById('dream').value;
        var models = [];
        var tbody = document.getElementById('model');
        var count = tbody.childElementCount;
        for (var index = 0; index < count; index++) {
            var name = document.getElementById(`${params[0]}-${index}`).value;
            var reason = document.getElementById(`${params[1]}-${index}`).value;
            const obj = {
                id: index,
                name: name,
                reason: reason
            };
            models.push(obj);
        };

        const dream_obj = {
            dreams: dreams,
            models: models
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(dream_obj)
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
            if (res.data.self.affected_rows > 0) {
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

    const modelTable = () => {
        var tbody = [];
        for (var index = 0; index <= 4; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1} >
                        <TableTextfield id = {`${params[0]}-${index}`} value = {dreams && JSON.parse(dreams).models[index].name}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1} >
                        <TableTextfield id = {`${params[1]}-${index}`} value = {dreams && JSON.parse(dreams).models[index].reason}/>
                    </TableCell>
                </TableRow>
            );            
        };
        return tbody;
    };

    if (!isLoaded) {
        return (
            <p>Loading...</p>
        )
    } else {
        return(
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
                        <h2 className = 'center'>2.2 Your Dreams and Role Models</h2>
                        <h3 className = 'center'>(25 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            Write about your most ambitious dreams, ones that you want to achieve before you die. 
                            Don’t worry about priority, difficulty, size, seriousness, timeline, etc. 
                            Feel free to list personal dreams or professional goals—anything that matters to you. 
                            Be introspective and jot down as many dreams as possible. In the second part of this worksheet, list five of your role models and how/why they inspire you.
                        </p>
                        <div className = 'line'></div>
                        <p className = {classes.content}>[Your Dreams]</p>
                        <p className = {classes.title}>(Enter at least 20 dreams)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Textfield id = 'dream' value = {dreams && JSON.parse(dreams).dreams}/>,
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0}/>
                                ]
                            } 
                        />
                        <p className = {classes.content}>[Your Role Models]</p>
                        <p className = {classes.title}>(List 5 people)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Name</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Why are they your role model? How do they inspire you?</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'model'>
                                            {modelTable()}
                                        </TableBody>
                                    </Table>,
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
}
export default Dreams;