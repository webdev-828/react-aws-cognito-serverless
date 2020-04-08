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
    }
}));

const Selling = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.cores[6].url, '');
    const prev = props.cores[5].url;
    const next = props.cores[7].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [selling, setSelling] = React.useState(String);

    const params = ['points', 'examples'];

    React.useEffect(() => {
        props.client.query({query: GET_CORE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.core.length > 0) {
                    setID(data.core[0].id);
                    setSelling(data.core[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var sellings = [];
        for (var index = 0; index < document.getElementById('selling').childElementCount; index++) {
            const sell_obj = {
                points: document.getElementById(`${params[0]}${index}`).value,
                examples: document.getElementById(`${params[1]}${index}`).value
            };
            sellings.push(sell_obj);
        };

        const selling_obj = {
            selling: sellings
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(selling_obj)
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

    const sellingTable = () => {
        var tbody = [];
        for (var index = 0; index < 3; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`${params[0]}${index}`} value = {selling && JSON.parse(selling).selling[index].points}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`${params[1]}${index}`} value = {selling && JSON.parse(selling).selling[index].examples}/>
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
                    <div className = 'header'>
                        <h2 className = 'center'>3.7 Selling points</h2>
                        <h3 className = 'center'>(20 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'center'>Reflecting on your past worksheets, summarize your top three qualities that you can use to ‘sell’ or appeal to others. For each selling point, list one example of how you’ve demonstrated this quality in the past. Try to complete this worksheet on your own; don’t ask people close to you for help.</p>
                        <div className = 'line'></div>
                        <p>(Fill out 3 selling points and 3 supporting examples)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Selling points</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Supporting examples</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'selling'>
                                            {sellingTable()}
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

export default Selling;