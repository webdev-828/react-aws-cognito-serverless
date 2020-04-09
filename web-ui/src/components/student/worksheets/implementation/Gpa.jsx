import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Wrapper from './../../../ui/wrapper/Wrapper';
import Comment from './../../../ui/comment/Comment';
import Textfield from './../../../ui/textfield/Textfield';
import { GET_IMPLEMENTATION, INSEERT_IMPLEMENTATION } from './../../../../graphql/student/worksheets/implementation/Implementation';
import Choice from './helperComponents/Choice';

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

const Gpa = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.implementation[0].url, '');
    const next = props.implementation[1].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [take, setTakes] = React.useState(Array);
    const [semester, setSemester] = React.useState(String);
    const [reason, setReason] = React.useState(String);
    const [choices, setChoices] = React.useState(Array);

    const rows = [
        'Class Name',
        'Strategic Choice Factors',
        'Enjoyability Choice Factors'
    ];
    const params = ['class', 'strategy', 'enjoyability'];
    const choice = [
        {key: rows[0], value: ''},
        {key: rows[1], value: ''},
        {key: rows[2], value: ''}
    ];

    React.useEffect(() => {
        props.client.query({query: GET_IMPLEMENTATION, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.implementation.length > 0) {
                    setID(data.implementation[0].id);
                    setTakes(JSON.parse(data.implementation[0].value).take);
                    setSemester(JSON.parse(data.implementation[0].value).semester);
                    setReason(JSON.parse(data.implementation[0].value).reason);
                    setChoices(JSON.parse(data.implementation[0].value).choice);
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
                    take: getVal()[0],
                    semester: getVal()[1],
                    reason: getVal()[2],
                    choice: getVal()[3]
                }
            )
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_IMPLEMENTATION,
            variables: {
                implementation: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.implementation.affected_rows > 0) {
                props.history.push(root);
            };
        });
    };

    const getVal = () => {
        var takes = [];
        for (let index = 0; index < document.getElementById('take').childElementCount; index++) {
            var temp = [];
            for (let index1 = 0; index1 < 3; index1++) {
                temp.push(document.getElementById(`take-${index}-${index1}`).value);
            };
            takes.push(temp);
        };

        var semester = document.getElementById('semester').value;
        
        var reason = document.getElementById('reason').value;

        var mychoices = [];
        for (let index1 = 0; index1 < document.getElementById('mychoice').childElementCount; index1++) {
            const temp = [
                {key: rows[0], value: document.getElementById(`${params[0]}-${index1}`).value},
                {key: rows[1], value: document.getElementById(`${params[1]}-${index1}`).value},
                {key: rows[2], value: document.getElementById(`${params[2]}-${index1}`).value}
            ];
            mychoices.push(temp);
        };

        return [takes, semester, reason, mychoices];
    }

    const handleClickAdd = () => {
        setTakes(getVal()[0]);
        setSemester(getVal()[1]);
        setReason(getVal()[2]);
        setChoices([...getVal()[3], choice]);
    };

    const takeTable = () => {
        var tbody = [];
        for (let index = 0; index < 6; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`take-${index}-0`} value = {(take.length > 0) ? take[index][0] : ''}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`take-${index}-1`} value = {(take.length > 0) ? take[index][1] : ''}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`take-${index}-2`} value = {(take.length > 0) ? take[index][2] : ''}/>
                    </TableCell>
                </TableRow>
            );
        };
        return tbody;
    };

    const semesterTable = () => {
        return (
            <TableRow>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'semester' value = {semester}/>
                </TableCell>
            </TableRow>
        );
    };

    const reasonTable = () => {
        return (
            <TableRow>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'reason'  value = {reason}/>
                </TableCell>
            </TableRow>
        );
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
                        <h2 className = 'center'>7.1 GPA/Course selection analysis/planning worksheet</h2>
                        <h3 className = 'center'>(30 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            The purpose of this worksheet is to evaluate your GPA and plan out your course selection for your senior year. 
                            You should know what your major will be in college. Let this help you decide how you should tailor your course-load. 
                            We will figure out how to most efficiently allocate your time on a daily basis to the courses and commitments that you will have for the coming school year.
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Please fill out your transcript using <b>SpreadSheet 7.a.</b> Make a copy of the sheet to edit it.
                        </p>
                        <p className = 'mt-5'>
                            2. List all of the course available to you for next year. Highlight the ones that you want to take:
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody id = 'take'>
                                            {takeTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p className = 'mt-5 text_center'>
                            What is your target GPA for next semester
                        </p>
                        <div className = 'center'>
                            <Wrapper 
                                components = {
                                    [
                                        <Table className = {classes.table} aria-label = 'caption table'>
                                            <TableBody>
                                                {semesterTable()}
                                            </TableBody>
                                        </Table>, 
                                        <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                    ]
                                } 
                            />
                        </div>
                        <p className = 'mt-5 text_center'>
                            Why do you want to take these classes? 
                            Are you willing to commit to the rigor of this course-load while also handling college applications? 
                            How are you planning to allocate your time for these classes?
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {reasonTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            3. Let’s take a deeper look into why you want to take these classes. 
                            The choice can be broken down into two major parts: strategic choice and enjoyability. 
                            Some classes are simply so important to college admissions strategy - like core requirements, or AP Calculus for Math majors - that they must be taken. 
                            Other classes, like electives, are largely based on enjoyability. 
                            For most classes, it is a balance between the two parts. 
                            Fill out the table below to analyze your choices.
                        </p>
                        <label style = {{color: 'black', marginBottom: -10}}>Sample:</label>
                        <Paper className = {classes.root}>
                            <Table className = {classes.table} aria-label = 'caption table'>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className = {classes.tablecell1}>{`${rows[0]}:`}</TableCell>
                                        <TableCell className = {classes.tablecell2}>
                                            Ap Biology
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className = {classes.tablecell1}>{`${rows[1]}:`}</TableCell>
                                        <TableCell className = {classes.tablecell2}>
                                            Major related, I am applying as pre-med. I got a 88 in regular biology, so I hope to redeem that average with a 5 on this test.
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className = {classes.tablecell1}>{`${rows[2]}:`}</TableCell>
                                        <TableCell className = {classes.tablecell2}>
                                            I love biology and would rather take it over AP chemistry, even though AP chemistry is also a major-related class.
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Paper>
                        <p className = 'mt-5'>
                            4. Copy and paste as many boxes as classes you will be registering for. 
                            If you are at all unsure about what classes to take, fill the boxes out. They will help you make a logical decision.
                        </p>
                        <Paper className = {classes.root} id = 'mychoice'>
                            <Choice choices = {choices} type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid}/>
                        </Paper>
                        <Button
                            onClick = {handleClickAdd}
                            className = 'pl-4 pr-4'
                            variant = 'contained'
                            color = 'secondary'
                            style = {{marginTop: 10}}
                        >
                            Add New
                        </Button>
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

export default Gpa;