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

const Sat = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.implementation[2].url, '');
    const prev = props.implementation[1].url;
    const next = props.implementation[3].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [sat, setSat] = React.useState(String);

    const rows1 = ['Topic:', 'Score:'];
    const rows2 = ['Literature', 'US History', 'World History', 'Math 1', 'Math 2', 'Biology E/M', 'Chemistry', 'Physics', 'Language 1', 'Language 2'];
    const rows3 = ['March 9', 'May 4', 'June 1', 'August 24', 'October 5', 'November 2', 'December 7'];
    const rows4 = ['Topic:', 'Common Mistakes:'];
    const weeks = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    React.useEffect(() => {
        props.client.query({query: GET_IMPLEMENTATION, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.implementation.length > 0) {
                    setID(data.implementation[0].id);
                    setSat(data.implementation[0].value)
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
                    subject: getSubject(),
                    score: getScore(),
                    test: getTest(),
                    testing: getTesting(),
                    factor: getFactor(),
                    reveal: getReveal(),
                    charts: getCharts(),
                    date: getDate(),
                    content: getContent()
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

    const subjectTable = () => {
        var tables = [];
        for (let index = 0; index < 3; index++) {
            tables.push(
                <React.Fragment key = {index}>
                    <p style = {{marginTop: 24, marginBottom: -20}}>SAT Subject Test:</p>
                    <Wrapper 
                        components = {
                            [
                                <Table className = {classes.table} aria-label = 'caption table'>
                                    <TableBody>
                                        {rows1.map((row, index1) => 
                                            <TableRow key = {index1}>
                                                <TableCell className = {classes.tablecell1}>{row}</TableCell>
                                                <TableCell className = {classes.tablecell2}>
                                                    <Textfield id = {`subject-${index}-${index1}`} value = {sat && JSON.parse(sat).subject[index][index1]}/>
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

    const testTable = () => {
        var rows = [];
        for (let index = 0; index < 9; index++) {
            rows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`test-${index}-0`} value = {sat && JSON.parse(sat).test[index][0]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`test-${index}-1`} value = {sat && JSON.parse(sat).test[index][1]}/>
                    </TableCell>
                </TableRow>
            );
        };
        return rows;
    };

    const factorTable = () => {
        const rows = rows2.map((row, index) =>
            <TableRow key = {index}>
                <TableCell className = {classes.tablecell1}>{row}</TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = {`factor-${index}-0`} value = {sat && JSON.parse(sat).factor[index][0]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = {`factor-${index}-1`} value = {sat && JSON.parse(sat).factor[index][1]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = {`factor-${index}-2`} value = {sat && JSON.parse(sat).factor[index][2]}/>
                </TableCell>
            </TableRow>
        );
        return rows;
    };

    const dateTable = () => {
        const rows = rows3.map((row, index) =>
            <TableRow key = {index}>
                <TableCell className = {classes.tablecell1}>{row}</TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = {`date-${index}-0`} value = {sat && JSON.parse(sat).date[index][0]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = {`date-${index}-1`} value = {sat && JSON.parse(sat).date[index][1]}/>
                </TableCell>
            </TableRow>
        );
        return rows;
    };

    const contentTable = () => {
        var tables = [];
        for (let index = 0; index < 5; index++) {
            tables.push(
                <React.Fragment key = {index}>
                    <p style = {{marginTop: 24, marginBottom: -20}}>{`SAT Subject Test ${index + 1}:`}</p>
                    <Wrapper 
                        components = {
                            [
                                <Table className = {classes.table} aria-label = 'caption table'>
                                    <TableBody>
                                        {rows4.map((row, index1) => 
                                            <TableRow key = {index1}>
                                                <TableCell className = {classes.tablecell1}>{row}</TableCell>
                                                <TableCell className = {classes.tablecell2}>
                                                    <Textfield id = {`content-${index}-${index1}`} value = {sat && JSON.parse(sat).content[index][index1]}/>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>, 
                                <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {index + 10} />
                            ]
                        } 
                    />
                </React.Fragment>
            );
        };
        return tables;
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

    const getSubject = () => {
        var subjects = [];
        for (let index = 0; index < 3; index++) {
            var temp = [
                document.getElementById(`subject-${index}-0`).value,
                document.getElementById(`subject-${index}-1`).value
            ];
            subjects.push(temp);
        };
        return subjects;
    };

    const getScore = () => {
        return (document.getElementById('score').value);
    };

    const getTest = () => {
        var tests = [];
        for (let index = 0; index < 9; index++) {
            var temp = [
                document.getElementById(`test-${index}-0`).value,
                document.getElementById(`test-${index}-1`).value                
            ];
            tests.push(temp);
        };
        return tests;
    };

    const getTesting = () => {
        return (document.getElementById('testing').value);
    };

    const getFactor = () => {
        var factors = [];
        for (let index = 0; index < rows2.length; index++) {
            var temp = [
                document.getElementById(`factor-${index}-0`).value,
                document.getElementById(`factor-${index}-1`).value,
                document.getElementById(`factor-${index}-2`).value
            ];
            factors.push(temp);
        };
        return factors;
    }

    const getReveal = () => {
        return (document.getElementById('reveal').value);
    };

    const getCharts = () => {
        return (document.getElementById('charts').value);
    };

    const getDate = () => {
        var dates = [];
        for (let index = 0; index < rows3.length; index++) {
            var temp = [
                document.getElementById(`date-${index}-0`).value,
                document.getElementById(`date-${index}-1`).value
            ];
            dates.push(temp);
        };
        return dates;
    };

    const getContent = () => {
        var contents = [];
        for (let index = 0; index < 5; index++) {
            var temp = [
                document.getElementById(`content-${index}-0`).value,
                document.getElementById(`content-${index}-1`).value
            ];
            contents.push(temp);
        };
        return contents;
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
                        <h2 className = 'center'>7.3 SAT subject test analysis/study planning worksheet</h2>
                        <h3 className = 'center'>(90 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            This worksheet will help you plan out your SAT subject tests, 
                            from when to take them/how many times/which ones to take to how to study for them most effectively. 
                            We will reflect on your available scores (if any) to try to improve as much as possible in future exams. 
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Fill out the following. 
                        </p>
                        {subjectTable()}
                        <p className = 'mt-5'>
                            What do you notice about your current scores? Are there any trends that you notice? How can you work to improve them?
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Textfield id = 'score' value = {sat && JSON.parse(sat).score}/>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {3} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            2. To decide which SAT subject tests to take, choose tests which relate to your major that you are confident that you can do well on. 
                            We recommend that all applicants confident in their math skills take Math 2. 
                            You should pick 2-3 more, if you can justify the time commitment. 
                            Also, make sure to check individual colleges’ requirements to make sure you satisfy them (MIT requires 1 math test and 1 science test).
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell}>College Name</TableCell>
                                                <TableCell className = {classes.tablecell}>Testing Requirements</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {testTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {4} />
                                ]
                            } 
                        />
                        <p className = 'mt-5 text_center'>
                            What are the common testing requirements? What tests do you have to take to apply to all of the above schools?
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Textfield id = 'testing' value = {sat && JSON.parse(sat).testing}/>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {5} />
                                ]
                            } 
                        />
                        <p className = 'mt-5 text_center'>
                            Many factors go into choosing which SAT Subject tests to take. 
                            List your quantitative performance in each of the subjects offered below. 
                            SAT Subject tests are a chance to redeem yourself of a bad AP score or bad class average, and are taken much more seriously than the aforementioned scores. 
                            They can also strengthen areas you are already confident in - perfect scores on APs and SAT2s of the same topic are also very impressive to admissions.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell}>Topic</TableCell>
                                                <TableCell className = {classes.tablecell}>Corresponding AP Score</TableCell>
                                                <TableCell className = {classes.tablecell}>Corresponding Class Average</TableCell>
                                                <TableCell className = {classes.tablecell}>Notes</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {factorTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {6} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            What did this analysis reveal? Are there any subjects that are lacking where taking a test would benefit you? 
                            Are you confident in that you can achieve a high score in these subjects? 
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Textfield id = 'reveal' value = {sat && JSON.parse(sat).reveal}/>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {7} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            What tests have you decided to take based on the above charts?
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Textfield id = 'charts' value = {sat && JSON.parse(sat).charts}/>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {8} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            3. As for testing date, we recommend that you get these tests over with as quickly as possible. 
                            If you are currently in an AP class that has a corresponding SAT subject test, schedule it for May 4. 
                        </p>
                        <p className = 'mt-5'>
                            4. This makes sure that you have all of the material fresh in your head so you don’t have to study the same material twice. 
                            If not, we recommend choosing the August or October (at the latest) test date since you’d like to have all scores in by EA/ED deadlines.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell}>Test Date</TableCell>
                                                <TableCell className = {classes.tablecell}>Check if you chose this date (X)</TableCell>
                                                <TableCell className = {classes.tablecell}>Tests you will take (up to 3, recommended up to 2)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dateTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {9} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            5. To prepare for the tests, you’ll need material resources. 
                            We recommend the following. If you can’t afford these books, talk to your LC. 
                            Although these books are superior, WeAdmit has tests and resources available as well.
                        </p>
                        <p className = 'mt-5'>
                            6. Consult this thread for info about companies’ books for different test and their strong points.
                        </p>
                        <p className = 'mt-5'>
                            7. Your focus should be on absorbing all of the content and strategies listed in the books and applying them to as many practice tests/problems as possible. 
                            CrackSAT.net/sat2/ is a great resource for extra practice tests. 
                            Make sure to carefully review every problem you’re unsure of/mistake that you’ve made on every test you take (even when you happen to guess correctly!). 
                            This is important for not making the same or similar mistakes on the date of the actual exam. 
                            Keep a log of common mistakes so you know what to review in the weeks leading up to the exam. 
                            Feel free to come back to this worksheet later in your prep process to update this table.
                        </p>
                        {contentTable()}
                        <p className = 'mt-5'>
                            8 To help manage your time, let’s work out a sample prep week schedule. 
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

export default Sat;