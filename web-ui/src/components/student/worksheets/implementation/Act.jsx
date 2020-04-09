import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Wrapper from './../../../ui/wrapper/Wrapper';
import Comment from './../../../ui/comment/Comment';
import Textfield from './../../../ui/textfield/Textfield';
import Href from './../../../ui/href/Href';
import { GET_IMPLEMENTATION, INSEERT_IMPLEMENTATION } from './../../../../graphql/student/worksheets/implementation/Implementation';

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
        width: '60%'
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

const Act = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.implementation[1].url, '');
    const prev = props.implementation[0].url;
    const next = props.implementation[2].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [act, setAct] = React.useState(String);

    const rows1 = ['Total', 'Math', 'English', 'Notes(time spent studying/test conditions)'];
    const rows2 = ['Composite', 'Math', 'English', 'Reading', 'Science', 'Notes(time spent studying/test conditions)'];
    const rows3 = ['Math Common Mistakes:', 'Reading Common Mistakes:'];
    const rows4 = ['Math Common Mistakes:', 'English Common Mistakes:', 'Reading Common Mistakes', 'Science Common Mistakes:'];
    const rows5 = ['March 9', 'May 4', 'June 1', 'August 24', 'October 5', 'November 2', 'December 7'];
    const weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    React.useEffect(() => {
        props.client.query({query: GET_IMPLEMENTATION, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.implementation.length > 0) {
                    setID(data.implementation[0].id);
                    setAct(data.implementation[0].value)
                };
            }
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                {
                    psat: getPSAT(),
                    sat: getSAT(),
                    act: getACT(),
                    score: getScore(),
                    circum: getCircum(),
                    boxsat: getBoxSat(),
                    boxact: getBoxAct(),
                    mistake: getMistake()
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

    const psatTable = () => {
        var tables = [];
        for (let index = 0; index < 3; index++) {
            tables.push(
                <React.Fragment key = {index}>
                    <p style = {{marginTop: 24, marginBottom: -20}}>{index === 0 ? `PSAT ${9 + index}th Grade (if taken)` : `PSAT ${9 + index}th Grade`}</p>
                    <Wrapper 
                        components = {
                            [
                                <Table className = {classes.table} aria-label = 'caption table'>
                                    <TableBody id = {`psat-${index}`}>
                                        {rows1.map((row, index1) => 
                                            <TableRow key = {index1}>
                                                <TableCell className = {classes.tablecell1}>{row}</TableCell>
                                                <TableCell className = {classes.tablecell2}>
                                                    <Textfield id = {`psat-${index}-${index1}`} value = {act && JSON.parse(act).psat[index][index1]}/>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>, 
                                <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {index} />
                            ]
                        } 
                    />
                </React.Fragment>
            );
        };
        return tables;
    };

    const satTable = () => {
        var tables = [];
        for (let index = 0; index < 2; index++) {
            tables.push(
                <React.Fragment key = {index}>
                    <p style = {{marginTop: 24, marginBottom: -20}}>{index === 0 ? 'SAT - 1st try' : 'SAT - 2nd try'}</p>
                    <Wrapper 
                        components = {
                            [
                                <Table className = {classes.table} aria-label = 'caption table'>
                                    <TableBody>
                                        {rows1.map((row, index1) =>
                                            <TableRow key = {index1}>
                                                <TableCell className = {classes.tablecell1}>{row}</TableCell>
                                                <TableCell className = {classes.tablecell2}>
                                                    <Textfield id = {`sat-${index}-${index1}`} value = {act && JSON.parse(act).sat[index][index1]}/>
                                                </TableCell>
                                            </TableRow>                                
                                        )}
                                    </TableBody>
                                </Table>, 
                                <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {index + 3} />
                            ]
                        } 
                    />
                </React.Fragment>
            );
        };
        return tables;
    };

    const actTable = () => {
        var tables = [];
        for (let index = 0; index < 2; index++) {
            tables.push(
                <React.Fragment key = {index}>
                    <p style = {{marginTop: 24, marginBottom: -20}}>{index === 0 ? 'ACT - 1st try' : 'ACT - 2nd try'}</p>
                    <Wrapper 
                        components = {
                            [
                                <Table className = {classes.table} aria-label = 'caption table'>
                                    <TableBody>
                                        {rows2.map((row, index1) => 
                                            <TableRow key = {index1}>
                                                <TableCell className = {classes.tablecell1}>{row}</TableCell>
                                                <TableCell className = {classes.tablecell2}>
                                                    <Textfield id = {`act-${index}-${index1}`} value = {act && JSON.parse(act).act[index][index1]}/>
                                                </TableCell>
                                            </TableRow>                                
                                        )}
                                    </TableBody>
                                </Table>, 
                                <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {index + 5} />
                            ]
                        } 
                    />
                </React.Fragment>
            );
        };
        return tables;
    };

    const circumTable = () => {
        const rows = rows5.map((row, index) => {
            return (
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        {row}
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`circum-${index}`} value = {act && JSON.parse(act).circum[index]}/>
                    </TableCell>
                </TableRow>
            );
        });
        return rows;
    };

    const testTable = () => {
        return (
            <TableBody>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>
                        <Href href = 'https://www.amazon.com/SAT-Prep-Black-Book-Strategies/dp/0692916164/' />
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Href href = 'https://www.amazon.com/ACT-Prep-Black-Book-Strategies/dp/0692078398/' />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>
                        <Href href = 'https://www.amazon.com/Official-SAT-Study-Guide-Second/dp/0874478529' />
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Href href = 'https://www.amazon.com/ACT-Prep-Red-Book-Strategies/dp/1494253879' />
                    </TableCell>
                </TableRow>
            </TableBody>
        )  
    };

    const weekTable = () => {
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell className = {classes.tablecell1} colSpan = {5}>Throughout the week, work on one full exam.</TableCell>
                    <TableCell className = {classes.tablecell1} colSpan = {2}>Complete one full timed exam.</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className = {classes.tablecell1} colSpan = {5}>Complete 2 ~ 3 test sections (Math/English) everyday.</TableCell>
                    <TableCell className = {classes.tablecell1} colSpan = {2}>4 ~ 5 test sections, as time permits.</TableCell>
                </TableRow>
            </React.Fragment>
        )
    };

    const getPSAT = () => {
        var psats = [];
        for (let index = 0; index < 3; index++) {
            var temp = [];
            for (let index1 = 0; index1 < 4; index1++) {
                temp.push(document.getElementById(`psat-${index}-${index1}`).value);
            };
            psats.push(temp);
        };
        return psats;
    };

    const getSAT = () => {
        var sats = [];
        for (let index = 0; index < 2; index++) {
            var temp = [];
            for (let index1 = 0; index1 < 4; index1++) {
                temp.push(document.getElementById(`sat-${index}-${index1}`).value);
            };
            sats.push(temp);
        };
        return sats;
    };

    const getACT = () => {
        var acts = [];
        for (let index = 0; index < 2; index++) {
            var temp = [];
            for (let index1 = 0; index1 < 6; index1++) {
                temp.push(document.getElementById(`act-${index}-${index1}`).value)
            };
            acts.push(temp);
        };
        return acts;
    };

    const getScore = () => {
        return (document.getElementById('score').value);
    };

    const getCircum = () => {
        var circums = [];
        for (let index = 0; index < rows5.length; index++) {
            circums.push(document.getElementById(`circum-${index}`).value);
        };
        return circums;
    };

    const getBoxSat = () => {
        var boxs = [];
        for (let index = 0; index < rows3.length; index++) {
            boxs.push(document.getElementById(`box-sat-${index}`).value);
        };
        return boxs;
    };

    const getBoxAct = () => {
        var boxs = [];
        for (let index = 0; index < rows4.length; index++) {
            boxs.push(document.getElementById(`box-act-${index}`).value);
        };
        return boxs;
    };

    const getMistake = () => {
        return (document.getElementById('mistake').value);
    }

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
                        <h2 className = 'center'>7.2 SAT/ACT Analysis/Study Planning Worksheet</h2>
                        <h3 className = 'center'>(120 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            This worksheet will help you plan out your SAT/ACT, from when to take it/how many times to how to study for them most effectively. 
                            We will reflect on your available scores (if any) to try to improve as much as possible in future exams. 
                            The time required is long because it includes a SAT/ACT diagnostic test. 
                            Discuss with your LC to see if it makes sense for you to take it.
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Look over <a href = '#'>this website</a> and take <a href = '#'>this test</a>. 
                            Reflect on the differences between the tests and how they relate to your personal test-taking strengths. 
                            Are you better at answering easier questions quickly or harder questions with a bit more time? 
                            Do you feel comfortable with the science section of the ACT? 
                            These are all questions you should ask yourself before making the choice to pick a test. 
                        </p>
                        {psatTable()}
                        {satTable()}
                        {actTable()}
                        <p className = 'mt-5'>
                            What do you notice about your current scores? Are there any trends that you notice? How can you work to improve them?
                        </p>
                        <div style = {{border: 'solid', borderWidth: '1px'}}>
                            <Textfield id = 'score' value = {act && JSON.parse(act).score}/>
                        </div>
                        <p className = 'mt-5'>
                            2. We recommend that everybody takes the SAT/ACT twice, and no more than 3 times in any circumstance. 
                            Choose the dates that work best for you considering your current confidence in your abilities on the test and the time that you’ll be able to allocate the months leading up to the exam.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell}>Test Date</TableCell>
                                                <TableCell className = {classes.tablecell}>Check if you chose this date(X)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {circumTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {7} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            3. To prepare for the tests, you’ll need material resources. 
                            We recommend the following. 
                            If you can’t afford these books, talk to your LC. Although these books are superior, WeAdmit has tests and resources available as well.
                        </p>
                        <Paper className = {classes.root}>
                            <Table className = {classes.table} aria-label = 'caption table'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className = {classes.tablecell}>SAT:</TableCell>
                                        <TableCell className = {classes.tablecell}>ACT:</TableCell>
                                    </TableRow>
                                </TableHead>
                                {testTable()}
                            </Table>
                        </Paper>
                        <p>Notable mentions:</p>
                        <p><Href href = 'https://www.amazon.com/Dr-John-Chungs-Math-Fifth/dp/1725732734/' /></p>
                        <p><Href href = 'https://www.amazon.com/Barrons-SAT-1600-Online-Test/dp/1438009992/' /></p>
                        <p><Href href = 'https://www.amazon.com/Barrons-Reading-Workbook-NEW-Critical/dp/1438005768/' /></p>
                        <p><Href href = 'https://www.amazon.com/Barrons-Writing-Workbook-NEW-SAT/dp/1438006233/' /></p>
                        <p><Href href = 'https://www.amazon.com/Barrons-Online-Tests-Sharon-Weiner/dp/1438009984/' /></p>
                        <p><Href href = 'https://www.amazon.com/Barrons-6-SAT-Practice-Tests/dp/1438009968/' /></p>
                        <p className = 'mt-5'>
                            4. Use the black book for strategies and the blue/red books for practice. 
                            Don’t bother reading strategies from the blue/red books. 
                            Your focus should be on absorbing all of the strategies in the black book and applying them to as many practice tests as possible. 
                            <a href= '#'> CrackSAT.net</a> and <a href = '#'>CrackACT.net</a> are great resources for extra practice tests. 
                            Make sure to carefully review every problem you’re unsure of/mistake that you’ve made on every test you take. 
                            This is important for not making the same or similar mistakes on the date of the actual exam. 
                            Keep a log of common mistakes so you know which topics to review in the week leading up to the exam. 
                            Feel free to come back to this worksheet later in your prep process to update this table. 
                            Write in both boxes if you run out of room.
                        </p>
                        <p style = {{marginTop: 24, marginBottom: -20}}>SAT:</p>
                        <Paper className = {classes.root}>
                            <Table className = {classes.table} aria-label = 'caption table'>
                                <TableBody>
                                    {rows3.map((row, index) =>
                                        <TableRow key = {index}>
                                            <TableCell className = {classes.tablecell1}>{row}</TableCell>
                                            <TableCell className = {classes.tablecell1}>
                                                <Textfield id = {`box-sat-${index}`} value = {act && JSON.parse(act).boxsat[index]}/>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Paper>
                        <p style = {{marginTop: 24, marginBottom: -20}}>ACT:</p>
                        <Paper className = {classes.root}>
                            <Table className = {classes.table} aria-label = 'caption table'>
                                <TableBody>
                                    {rows4.map((row, index) =>
                                        <TableRow key = {index}>
                                            <TableCell className = {classes.tablecell1}>{row}</TableCell>
                                            <TableCell className = {classes.tablecell1}>
                                                <Textfield id = {`box-act-${index}`} value = {act && JSON.parse(act).boxact[index]}/>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Paper>
                        <p className = 'mt-5 text_center'>
                            What types of mistakes are you making? Are they content-based or process-based errors? 
                            Do you know the material but make silly mistakes or do you struggle with the actual questions? 
                            How can you correct these errors/minimize them?
                        </p>
                        <div style = {{border: 'solid', borderWidth: '1px'}}>
                            <Wrapper 
                                components = {
                                    [
                                        <Textfield id = 'mistake' value = {act && JSON.parse(act).mistake}/>, 
                                        <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {8} />
                                    ]
                                } 
                            />
                        </div>
                        <p className = 'mt-5'>
                            5. To help manage your time, let’s work out a sample prep week schedule. 
                            Here is our recommended schedule, but feel free to change it with your LC’s advice to tailor your schedule.
                        </p>
                        <Paper className = {classes.root}>
                            <Table className = {classes.table} aria-label = 'caption table'>
                                <TableHead>
                                    <TableRow>
                                        {weeks.map((week, index) =>
                                            <TableCell className = {classes.tablecell} key = {index}>{week}</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {weekTable()}
                                </TableBody>
                            </Table>
                        </Paper>
                        <p className = 'mt-5'>
                            This testing schedule accounts for both content absorption through the everyday topic-specific sections as well as timing with the timed weekend exams. 
                            Working through an entire exam through the week exposes you to more problems of all kinds even while you’re focusing on a specific topic for the sections. 
                        </p>
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

export default Act;