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
import Href from './../../../ui/href/Href';
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
        width: '10%'
    },
    tablecell3: {
        border: 'solid',
        borderWidth: '1px',
        width: '35%'
    },
    tablecell4: {
        border: 'solid',
        borderWidth: '1px'
    },
    tablecell5: {
        width: '6%',
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
    }
}));

const Research = props => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.careers[5].url, '');
    const prev = props.careers[4].url;
    const next = props.careers[6].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [approach, setApproach] = React.useState(String);

    const contents = ['To be', 'To have', 'To give'];
    const tiers = ['Tier1', 'Tier2', 'Tier3'];
    const majors = [
        'Major(s) relevant to all three jobs',
        'Major(s) relevant to two jobs',
        'Majors relevant to one of the jobs'
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
            document.getElementById(contents[0]).value,
            document.getElementById(contents[1]).value,
            document.getElementById(contents[2]).value
        ];

        const dreams = [
            document.getElementById('dream1').value,
            document.getElementById('dream2').value,
            document.getElementById('dream3').value
        ];

        const categories = [];
        for (let index = 0; index < tiers.length; index++) {
            categories.push(document.getElementById(`${tiers[index]}${index + 1}`).value);
        };

        const prios = [];
        for (let index = 0; index < 6; index++) {
            prios.push(document.getElementById(`prio${index}`).value);
        };

        const majors = [];
        for (let index = 0; index < 6; index++) {
            const temp = [
                document.getElementById(`major-${index}`).value,
                document.getElementById(`summary-${index}`).value,
            ];
            majors.push(temp);
        };

        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                {
                    goals: goals,
                    dream: dreams,
                    category: categories,
                    prio: prios,
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

    const categoryTable = () => {
        return (
            tiers.map((tier, index) =>
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell2}>{tier}</TableCell>
                    <TableCell className = {classes.tablecell3}>{majors[index]}</TableCell>
                    <TableCell className = {classes.tablecell4}>
                        <Textfield id = {`${tier}${index + 1}`} value = {approach && JSON.parse(approach).category[index]}/>
                    </TableCell>
                </TableRow>
            )
        )
    };

    const prioTable = () => {
        var trows = [];
        for (let index = 0; index < 3; index++) {
            trows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell5}>{index + 1}</TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`prio${index}`} value = {approach && JSON.parse(approach).prio[index]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell5}>{index + 3}</TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`prio${index + 3}`} value = {approach && JSON.parse(approach).prio[index + 3]}/>
                    </TableCell>
                </TableRow>
            );
        };
        return trows;
    };

    const majorTable = () => {
        var trows = [];
        for (let index = 0; index < 6; index++) {
            trows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell5}>{index + 1}</TableCell>
                    <TableCell className = {classes.tablecell3}>
                        <Textfield id = {`major-${index}`} value = {approach && JSON.parse(approach).major[index][0]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                    <Textfield id = {`summary-${index}`} value = {approach && JSON.parse(approach).major[index][1]}/>
                    </TableCell>
                </TableRow>
            );
        };
        return trows;
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
                        <h2 className = 'center'>5.6 Major exploration - Self-research</h2>
                        <h3 className = 'center'>(30min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            Congratulations! You finally discovered strong candidates of your future professional career! 
                            That decision has great meaning in terms of your major exploration as well - you’ve already finished more than half the work required for major selection! 
                            Now you should know what you want to become, what you want to do after completing your undergrad program, and what skills/capabilities you need to gain in college. 
                            The last thing is to identify which majors will help you realize your plan.
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
                            2. Go back to <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[4].url}`} value = 'worksheets 5.5'/> and copy/paste your current dream jobs here.
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
                            3. Go back to <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[4].url}`} value = 'worksheets 5.5'/>. Find two relevant majors from each of the three dream jobs. 
                            Categorize the majors using the following template.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {categoryTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            4. Prioritize your preferred major based on the result at the previous steps. Tier 1 majors should come first. 
                            If you find multiple majors in the same tier, you should prioritize them according to your gut feeling. 
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {prioTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {3} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            5. The “majors” you refer to above may be too vague (e.g. Science) or too specific (e.g. Pediatric Neurotoxicology). 
                            Your understanding of the major based on its name and what you actually learn might not match. 
                            To accurately align what you want to do in the future and what you study in college, research the majors that you listed above. 
                            Then, restate the majors in the order of priority and summarize what you will be able to learn.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell}>#</TableCell>
                                                <TableCell className = {classes.tablecell}>Major name</TableCell>
                                                <TableCell className = {classes.tablecell}>Summary of what you can learn</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {majorTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {4} />
                                ]
                            } 
                        />
                        <p>For your information, the following resource help you to precisely understand about majors.</p>
                        <p><Href href = "https://bigfuture.collegeboard.org/majors-careers" /></p>
                        <p><Href href = "https://www.collegeraptor.com/college-majors/" /></p>
                        <p><Href href = "https://www.jvis.com/uguide/majordesc.htm#media" /></p>
                        <p><Href href = "https://www.youtube.com/channel/UCpCSAcbqs-sjEVfk_hMfY9w" /></p>
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
    };
};

export default Research;