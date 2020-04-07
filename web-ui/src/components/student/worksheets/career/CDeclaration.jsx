import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
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

const CDeclaration = props => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.careers[4].url, '');
    const prev = props.careers[3].url;
    const next = props.careers[5].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [approach, setApproach] = React.useState(String);

    const contents = ['To be', 'To have', 'To give'];
    const careers = [
        'Career name',
        'How does this career satisfy your “To be”, “To have”, “To give” goals?',
        'A fun part of this career :)',
        'Top two relevant college degrees'
    ];
    const params = ['name', 'career', 'fun', 'top'];

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
            document.getElementById(contents[0]).value,
            document.getElementById(contents[1]).value,
            document.getElementById(contents[2]).value
        ];

        var careers = [];
        for (let index = 0; index < 3; index++) {
            const temp = [
                document.getElementById(`${params[0]}-${index}`).value,
                document.getElementById(`${params[1]}-${index}`).value,
                document.getElementById(`${params[2]}-${index}`).value,
                document.getElementById(`${params[3]}-${index}`).value
            ];
            careers.push(temp);
        };

        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                {
                    goals: goals,
                    careers: careers
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
            contents.map((content, index) =>
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>{content}</TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {content} value = {approach  && JSON.parse(approach).goals[index]}/>
                    </TableCell>
                </TableRow>
            )
        )
    };

    const careerTable = () => {
        var tables = [];
        for (let index = 0; index < 3; index++) {
            tables.push(
                <Wrapper 
                    key = {index}
                    components = {
                        [
                            <p className = {classes.label}>{`Career #${index + 1}`}</p>,
                            <Table className = {classes.table} aria-label = 'caption table'>
                                <TableBody>
                                    {careers.map((career, index1) => 
                                        <TableRow key = {index1}>
                                            <TableCell className = {classes.tablecell1}>{career}</TableCell>
                                            <TableCell className = {classes.tablecell2}>
                                                <Textfield id = {`${params[index1]}-${index}`} value = {approach && JSON.parse(approach).careers[index][index1]}/>
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
                    <Link to = {`${root}${prev}`} style = {{textDecoration: 'none'}}>
                        <FastRewindRoundedIcon className = {classes.icon} style = {{marginLeft: '5rem'}} />
                    </Link>
                    <Link to = {`${root}${next}`} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <div style = {{width: '80%', textAlign: 'center'}}>
                        <h2 className = 'center'>5.5 Career goal declaration</h2>
                        <h3 className = 'center'>(20min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            To begin with, your career exploration never ends. You will end up updating your career plan from time to time. 
                            You may even feel career planning is a waste of time because the future is unpredictable. 
                            However, in most of the cases, having a game plan is the winning formula. Therefore, let’s make a career decision as of today. 
                            It’s the first brave step to advance your career. 
                            Take a risk. If it turns out that your decision as of today is wrong, don’t worry, you can always start over.
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. To begin with, please go back to <Linkto to = {`${props.pathname}/${props.worksheets[3].worksheet_url}/${props.lifes[5].url}`} value = 'worksheets 4.6'/> and copy/paste the ten-word version of your ‘To be’, ‘To have’ and ‘To give’ life goals here.
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
                            2. Review worksheet from <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[0].url}`} value = '5.1'/>, to <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[3].url}`} value = '5.4'/>. You’ve explored careers from different angles. Take a moment and think deeply about what careers resonate with you most.
                        </p>
                        <p className = 'mt-5'>
                            3. Write the top three jobs that you believe you should pursue. 
                            Then, evaluate each of them on how these jobs satisfy your ‘To be’, ‘To have’, ‘To do’ life goals. 
                            Identify the two relevant college majors to them.
                        </p>
                        {careerTable()}
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

export default CDeclaration;