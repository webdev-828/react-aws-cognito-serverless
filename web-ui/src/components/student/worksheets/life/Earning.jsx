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
        width: '40%'
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
    },
    bold: {
        fontWeight: 'bold'
    }
}));

const Earning = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.lifes[4].url, '');
    const prev = props.lifes[3].url;
    const next = props.lifes[5].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [earning, setEarning] = React.useState(String);

    const items = ['average', 'enrich'];
    const titles = [
        'Average annual income',
        'Use of the money. How will these spendings enrich your life?'
    ]

    React.useEffect(() => {
        console.log('here')
        props.client.query({query: GET_LIFE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.life.length > 0) {
                    setID(data.life[0].id);
                    setEarning(data.life[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var earnings = [];
        for (var index = 0; index < document.getElementById('earning').childElementCount; index++) {
            const ear_obj = {
                first: document.getElementById(`f-${items[index]}`).value,
                second: document.getElementById(`s-${items[index]}`).value
            };
            earnings.push(ear_obj);
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(earnings)
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

    const earningTable = () => {        
        return (
            items.map((item, index) => 
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <p>{titles[index]}</p>
                    </TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`f-${item}`} value = {earning && JSON.parse(earning)[index].first}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`s-${item}`} value = {earning && JSON.parse(earning)[index].second}/>
                    </TableCell>
                </TableRow>
            )
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
                    <Link to = {`${root}${prev}`} style = {{textDecoration: 'none'}}>
                        <FastRewindRoundedIcon className = {classes.icon} style = {{marginLeft: '5rem'}}/>
                    </Link>
                    <Link to = {`${root}${next}`} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <div style = {{width: '80%', textAlign: 'center'}}>
                        <h2 className = 'center'>4.5 Earnings and how to use the money</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            It’s often hard to wisely spend than to earn money. You have a few approaches to this topic. One approach is ‘need-based’. Think about how much money you need in order to achieve your dream life that you expressed in the previous worksheets. Another way is ‘outcome-based’. As a result of achieving your goal, how much money do you think you’d earn. Then, think about the best ways to spend that money in order to maximize your happiness mentally and materially. If you have no idea what’s the typical income/prices, just Google them.
                        </p>
                        <div className = 'line'></div>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Items</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>First half of your career(20 ~ 30's)</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Second half of your career(>40's)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'earning'>
                                            {earningTable()}
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

export default Earning;
