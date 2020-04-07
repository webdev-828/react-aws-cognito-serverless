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
import Textfield from './../../../ui/textfield/Textfield';
import Linkto from './../../../ui/linkto/Linkto';
import { GET_CAREER, INSEERT_CAREER } from './../../../../graphql/student/worksheets/career/Career';

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
        width: '65%'
    },
    textfield: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
    label: {
        fontWeight: 'bold',
        paddingTop: 10,
        marginLeft: 20,
        marginBottom: -20
    },
    input: {
        border: 0,
        outline: 0,
        background: 'transparent',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    }
}));

const Approach = props => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.careers[0].url, '');
    const next = props.careers[1].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [approach, setApproach] = React.useState(String);

    const params = ['be', 'have', 'give', 'interest', 'top'];
    const contents1 = ['To be', 'To have', 'To give'];
    const contents2 = [
        'How does this job help you achieve your “To be” goal?',
        'How does this job help you achieve your “To have” goal?',
        'How does this job help you achieve your “To give” goal?',
        'How did you get interested in this job?',
        'Top two relevant college degrees'
    ];

    React.useEffect(() => {
        props.client.query({query: GET_CAREER, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.career.length > 0) {
                    setID(data.career[0].id);
                    setApproach(data.career[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        const goals = [
            document.getElementById(contents1[0]).value,
            document.getElementById(contents1[1]).value,
            document.getElementById(contents1[2]).value
        ];

        var jobs = [];
        for (let index = 0; index < 3; index++) {
            const temp = [
                document.getElementById(`${params[0]}-${index}`).value,
                document.getElementById(`${params[1]}-${index}`).value,
                document.getElementById(`${params[2]}-${index}`).value,
                document.getElementById(`${params[3]}-${index}`).value,
                document.getElementById(`${params[4]}-${index}`).value
            ];
            jobs.push(temp);
        };

        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                {
                    goals: goals,
                    jobs: jobs
                }
            )
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_CAREER,
            variables: {
                career: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.career.affected_rows > 0) {
                props.history.push(root);
            };
        });
    };

    const summaryTable = () => {
        return (
            contents1.map((content, index) =>
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>{content}</TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {content} value = {approach  && JSON.parse(approach).goals[index]}/>
                    </TableCell>
                </TableRow>
            )
        )
    };

    const jobsTable = () => {
        var tables = [];
        for (let index = 0; index < 3; index++) {
            tables.push(
                <Wrapper 
                    key = {index}
                    components = {
                        [
                            <p className = {classes.label}>{`Job #${index + 1}`}</p>,
                            <Table className = {classes.table} aria-label = 'caption table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className = {classes.tablecell}>Job Name</TableCell>
                                        <TableCell className = {classes.tablecell}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {contents2.map((content, index1) => 
                                        <TableRow key = {index1}>
                                            <TableCell className = {classes.tablecell1}>{content}</TableCell>
                                            <TableCell className = {classes.tablecell2}>
                                                <Textfield id = {`${params[index1]}-${index}`} value = {approach && JSON.parse(approach).jobs[index][index1]}/>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>, 
                            <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {index + 1} />
                        ]
                    } 
                />
            )
        };
        return tables;
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
                        <h2 className = 'center'>5.1 Jobs exploration - Introspective approach</h2>
                        <h3 className = 'center'>(20 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            Now you know who you are and who you want to become. 
                            The next step is to learn about the outside world and to introduce yourself to the most relevant careers and majors.
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Go back to <Linkto to = {`${props.pathname}/${props.worksheets[3].worksheet_url}/${props.lifes[5].url}`} value = 'worksheets 4.6'/> and copy-paste the ten-word version of your ‘To be’, ‘To have’ and ‘To give’ life goals here.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {summaryTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            2. Write three jobs that you are most interested in at this time. 
                            Don’t worry about the reasons for these choices. 
                            Then, evaluate each of them on how these jobs satisfy your ‘To be’, ‘To have’, ‘To do’ life goals. 
                            Search online and find out the top two relevant college degrees to the job.
                        </p>
                        {jobsTable()}
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
}

export default Approach;