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
import Linkto from './../../../ui/linkto/Linkto';
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
    }
}));

const Improvement = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.cores[7].url, '');
    const prev = props.cores[6].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [improvement, setImprovement] = React.useState(String);

    const params = ['weakness', 'happen'];

    React.useEffect(() => {
        props.client.query({query: GET_CORE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.core.length > 0) {
                    setID(data.core[0].id);
                    setImprovement(data.core[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);
    
    const handleClick = () => {
        var improves = [];
        for (var index = 0; index < document.getElementById('improvement').childElementCount; index++) {
            const improve_obj = {
                weakness: document.getElementById(`${params[0]}${index}`).value,
                happen: document.getElementById(`${params[1]}${index}`).value
            };
            improves.push(improve_obj);
        };
        const improvement_obj = {
            improvement: improves
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(improvement_obj)
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
            }
        });
    };    

    const improveTable = () => {
        var tbody = [];
        for (var index = 0; index < 3; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`${params[0]}${index}`} value = {improvement && JSON.parse(improvement).improvement[index].weakness}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`${params[1]}${index}`} value = {improvement && JSON.parse(improvement).improvement[index].happen}/>
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
                    <Link to = {root} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <div style = {{width: '80%', textAlign: 'center'}}>
                        <h2 className = 'center'>3.8 Improvements that could make huge differences to you</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>Reflecting on your past worksheets, summarize your top three weaknesses and the benefits of overcoming them. Focus on the impact rather than the difficulty of improvements.</p>
                        <div className = 'line'></div>
                        <p>(Fill out 3 items. Reference worksheet <Linkto to = {`${props.pathname}/${props.worksheets[1].worksheet_url}/${props.analysis[5].url}`} value = '2.6 Your Weakness'/> and <Linkto to = {`${props.pathname}/${props.worksheets[1].worksheet_url}/${props.analysis[6].url}`} value = '2.7 Your Strength'/>)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Weakness</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>What would happen if you overcame the stated weaknesses</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'improvement'>
                                            {improveTable()}
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
        );
    }
};

export default Improvement;