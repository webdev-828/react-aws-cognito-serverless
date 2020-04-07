import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
        width: '70%'
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

const MDeclaration = props => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.careers[7].url, '');
    const prev = props.careers[6].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [approach, setApproach] = React.useState(String);

    const contents = ['To be', 'To have', 'To give'];
    const majors = [
        'Major name',
        'Dream job associated with the major',
        'How does this major satisfy your “To be”, “To have”, “To give” goals?',
        'How relevant the major is to your dream job',
        'A few of “Plan B” jobs if you miss the dream job but earn a degree with the major',
        'Capabilities, experiences, skills that you want to earn/strengthen by majoring this',
        'A fun part of this major :)',
        'Academic skills and/or extracurricular achievements you have demonstrated to prove that you are highly likely qualified to major this',
        'Academic skills and/or extracurriculars you can improve to get closer to the major before applying'

    ];
    const params = ['name', 'asso', 'safety', 'dream', 'plan', 'skill', 'fun', 'prove', 'closer'];

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

        const dreams = [
            document.getElementById('dream1').value,
            document.getElementById('dream2').value,
            document.getElementById('dream3').value
        ];

        var majors = [];
        for (let index = 0; index < 3; index++) {
            var temp = [];
            for (let index1 = 0; index1 < params.length; index1++) {
                temp.push(document.getElementById(`${params[index1]}-${index}`).value);
                if (index === 0) {
                    temp.push(document.getElementById('remark-9').value);
                };
            };
            majors.push(temp);
        };

        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                {
                    goals: goals,
                    dream: dreams,
                    major: majors
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
    
    const dreamTable = () => {        
        return (
            <TableRow id = 'dream'>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'dream1' value = {approach && JSON.parse(approach).dream[0]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'dream2' value = {approach && JSON.parse(approach).dream[1]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'dream3' value = {approach && JSON.parse(approach).dream[2]}/>
                </TableCell>
            </TableRow>
        )
    };

    const majorTable = () => {
        var tables = [];
        for (let index = 0; index < 3; index++) {
            tables.push(
                <Wrapper 
                    key = {index}
                    components = {
                        [
                            <p className = {classes.label}>{`Major #${index + 1}`}</p>,
                            <Table className = {classes.table} aria-label = 'caption table'>
                                <TableBody>
                                    {majors.map((major, index1) => 
                                        <TableRow key = {index1}>
                                            <TableCell className = {classes.tablecell1}>{major}</TableCell>
                                            <TableCell className = {classes.tablecell2}>
                                                <Textfield id = {`${params[index1]}-${index}`} value = {approach && JSON.parse(approach).major[index][index1]}/>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                    {index === 0 &&
                                    <TableRow>
                                        <TableCell className = {classes.tablecell1}>Other/Remark</TableCell>
                                        <TableCell className = {classes.tablecell2}>
                                            <Textfield id = {`remark-9`} value = {approach && JSON.parse(approach).major[0][9]}/>
                                        </TableCell>
                                    </TableRow>
                                    }
                                </TableBody>
                            </Table>, 
                            <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {index + 2} />
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
                    <Link to = {root} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <div style = {{width: '80%', textAlign: 'center'}}>
                        <h2 className = 'center'>5.8 Major declaration</h2>
                        <h3 className = 'center'>(45 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            As you made a decision about your career goal the other day, let’s declare your intended majors as of today. 
                            You can change your major later even after getting into a college, but some selective schools don’t let you change the major once you submit your application form. 
                            Therefore, be bold to make the decision now and take actions based on the decision. There are benefits of making decisions right now. 
                            For example, if it turns out that your intended major is wrong before submitting an application form, you can easily switch to the new one with zero hassle. 
                            Changing major isn’t impossible in most cases but credit transfer and paperwork often are annoying.
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
                            2. Look up <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[4].url}`} value = 'worksheets 5.5'/> and copy/paste your dream jobs.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {dreamTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            3. Review <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[5].url}`} value = 'worksheets 5.6'/> and <Linkto to = {`/worksheet/${props.worksheets[4].worksheet_url}/${props.careers[6].url}`} value = 'worksheets 5.7'/>. You’ve explored majors from different angles. 
                            Take a moment and think deeply what majors resonate with you most.
                        </p>
                        <p className = 'mt-5'>
                            4. Write the top three majors that you believe you should pursue. 
                            Then, evaluate each of them on how these jobs satisfy your ‘To be’, ‘To have’, ‘To do’ life goals. 
                            Identify the two relevant college majors to them.
                        </p>
                        {majorTable()}
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

export default MDeclaration;