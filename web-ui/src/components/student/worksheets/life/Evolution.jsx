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
        borderWidth: '1px'
    },
   tablecell2: {
       border: 'solid',
       borderWidth: '1px',
       width: '75%'
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
  
const Evolution = (props) => {
    const classes = useStyles();
    
    const root = props.location.pathname.replace(props.lifes[0].url, '');
    const next = props.lifes[1].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [evolution, setEvolution] = React.useState(String);

    const params = [
        'Elemantary School', 
        'Middle School', 
        'High School(Freshman & Sophomore year)', 
        'High School(now)'
    ];

    React.useEffect(() => {
        props.client.query({query: GET_LIFE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.life.length > 0) {
                    setID(data.life[0].id);
                    setEvolution(data.life[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);
    
    const handleClick = () => {        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                {
                    elementary: document.getElementById(params[0]).value,
                    middle: document.getElementById(params[1]).value,
                    fresh: document.getElementById(params[2]).value,
                    sopho: document.getElementById(params[3]).value
                }
            )
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
    
    const evolutionTable = () => {
        return (
            <TableBody id = 'evolution'>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>{params[0]}</TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {params[0]} value = {evolution && JSON.parse(evolution).elementary} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>{params[1]}</TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {params[1]} value = {evolution && JSON.parse(evolution).middle} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>{params[2]}</TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {params[2]} value = {evolution && JSON.parse(evolution).fresh} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>{params[3]}</TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {params[3]} value = {evolution && JSON.parse(evolution).sopho} />
                    </TableCell>
                </TableRow>
            </TableBody>
        )
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
                        <h2 className = 'center'>4.1 Evolution of your dream jobs</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            It’s quite common for people to change their dream jobs from time to time. By reviewing the evolution of your dreams, you may find an interesting future dream. List the dream jobs you’ve wanted throughout your life, whether or not they were realistic.
                        </p>
                        <div className = 'line'></div>
                        <p>(Fill out at least 5 items)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Time</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>What was/were your dream job(s), and why?</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {evolutionTable()}
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

export default Evolution;

