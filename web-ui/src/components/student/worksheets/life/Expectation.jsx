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

const Expectation = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.lifes[3].url, '');
    const prev = props.lifes[2].url;
    const next = props.lifes[4].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [expectation, setExpectation] = React.useState(String);

    React.useEffect(() => {
        props.client.query({query: GET_LIFE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.life.length > 0) {
                    setID(data.life[0].id);
                    setExpectation(data.life[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var expectations = [];
        for (var index = 0; index < document.getElementById('expectation').childElementCount; index++) {
            const exp_obj = {
                expectation: document.getElementById(`expectation${index}`).value,
                accept: document.getElementById(`accept${index}`).value,
                plan: document.getElementById(`plan${index}`).value
            };
            expectations.push(exp_obj);
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(expectations)
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

    const expectationTable = () => {
        return (
            <TableBody id = 'expectation'>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>Parent/Guardian1</TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'expectation0' value = {expectation && JSON.parse(expectation)[0].expectation}></Textfield>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'accept0' value = {expectation && JSON.parse(expectation)[0].accept}></Textfield>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'plan0' value = {expectation && JSON.parse(expectation)[0].plan}></Textfield>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>Parent/Guardian2</TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'expectation1' value = {expectation && JSON.parse(expectation)[1].expectation}></Textfield>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'accept1' value = {expectation && JSON.parse(expectation)[1].accept}></Textfield>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'plan1' value = {expectation && JSON.parse(expectation)[1].plan}></Textfield>
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
                    <Link to = {`${root}${prev}`} style = {{textDecoration: 'none'}}>
                        <FastRewindRoundedIcon className = {classes.icon} style = {{marginLeft: '5rem'}} />
                    </Link>
                    <Link to = {`${root}${next}`} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <div style = {{width: '80%', textAlign: 'center'}}>
                        <h2 className = 'center'>4.4 Expectation from your parents/guardians about your academic/career vision</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            Ultimately, it’s totally up to you when it comes to your life decisions; you should be your own boss because this is your life journey. However, it’s important to recognize what your parents/guardians expect you to become in the future. For example, if one is a family business owner, he/she might want you to take over his/her business someday. If one financially struggled with supporting another when they were young, he/she might strongly encourage you to go to a college that helps you to get a high-wage stable job after graduation.
                        </p>
                        <div className = 'line'></div>
                        <p className = 'text_center'>
                            (An interview is recommended to clarify your understanding of their expectations. Now is a turning point in your life, so use this opportunity to discuss this sensitive topic. If you are uncomfortable with talking to your parents/guardians at this time, that’s totally understandable; just write about your current understanding of their expectations.)
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>From</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Expectation</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Acceptable?</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>How do you plan to deal with that if it's hard to accept</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {expectationTable()}
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

export default Expectation;
