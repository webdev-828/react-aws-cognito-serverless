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

const MInterview = props => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.careers[6].url, '');
    const prev = props.careers[5].url;
    const next = props.careers[7].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [approach, setApproach] = React.useState(String);

    const contents = ['To be', 'To have', 'To give'];
    const majors = [
        'Major name',
        'Interviewee name(s) and their college name(s)',
        'What the major looks like with your own words',
        'How relevant the major is to your dream job',
        'Hot career paths with the major after graduation',
        'Capabilities you can acquire with the major',
        'Requirements and preparations you need to do before majoring',
        'Well-known professors in the field',
        'Well-known colleges in the field',
        'Trends/changes in the major',
        'After the interview(s), are you still passionate about this major?'
    ];
    const params = ['name', 'interviewee', 'own', 'dream', 'paths', 'acquire', 'before', 'prof', 'college', 'trend', 'still'];

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

        const intends = [
            document.getElementById('intend1').value,
            document.getElementById('intend2').value,
            document.getElementById('intend3').value,
            document.getElementById('intend4').value,
            document.getElementById('intend5').value,
            document.getElementById('intend6').value
        ];

        var majors = [];
        for (let index = 0; index < 6; index++) {
            var temp = [];
            for (let index1 = 0; index1 < params.length; index1++) {
                temp.push(document.getElementById(`${params[index1]}-${index}`).value);
                if (index === 0) {
                    temp.push(document.getElementById('remark-11').value);
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
                    intend: intends,
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

    const intendTable = () => {
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'intend1' value = {approach && JSON.parse(approach).intend[0]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'intend2' value = {approach && JSON.parse(approach).intend[1]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'intend3' value = {approach && JSON.parse(approach).intend[2]}/>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'intend4' value = {approach && JSON.parse(approach).intend[3]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'intend5' value = {approach && JSON.parse(approach).intend[4]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = 'intend6' value = {approach && JSON.parse(approach).intend[5]}/>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        ) 
    };

    const majorTable = () => {
        var tables = [];
        for (let index = 0; index < 6; index++) {
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
                                            <Textfield id = {`remark-${11}`} value = {approach && JSON.parse(approach).major[0][11]}/>
                                        </TableCell>
                                    </TableRow>
                                    }
                                </TableBody>
                            </Table>, 
                            <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {index + 3} />
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
                        <h2 className = 'center'>5.7 Major exploration - Interview</h2>
                        <h3 className = 'center'>(60 min + Interview time)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            In the last worksheet, you’ve selected up to six majors that you will most likely pursue. 
                            Now, let’s deepen your understanding of them and validate if the majors are worth pursuing.
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
                            3. Look up <Linkto to = {`/${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[5].url}`} value = 'worksheets 5.6'/>} and copy/paste all of your possible intended majors.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {intendTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            4. Find interviewees whose majors are exactly the same or close to your selections above. 
                            Find at least one interviewee per major (the more interviews the better). 
                            Interviewees should be current college students in your chosen majors above, but it’s acceptable to interview working professionals who recently graduated from them. 
                            Ask them for a 15-30 minute interview about their majors. 
                            The following are the tips to reach out to interviewees.
                        </p>
                        <ul>
                            <li>
                                Family/friend network: If your older siblings are in the majors, definitely ask them. 
                                Your older siblings may also have friends in these majors, so please share your candidate majors with them. 
                                Also, ask your older relatives the same way you ask your siblings. 
                                Otherwise, casually talk to your friends because they might know somebody in the majors.
                            </li>
                            <li>
                                High school resources: Ask alumni network, outreach center, or something like that kind of department of your high school. 
                                Talk to your school counselors or teachers to introduce you to alumni who are in these majors. 
                            </li>
                            <li>
                                Referral: When you interview, make sure to ask interviewees to introduce you to their friends who are in your potential intended majors. 
                                You may luckily find the next interviewees on the spot.
                            </li>
                            <li>
                                Visit the closest university campuses: Currently, you are dealing with majors only. 
                                Thus, it makes sense to take major-specific tours and speak with counselors that can tell you about their daily life. 
                                You can also attend college-specific information sessions to get major information.
                            </li>
                            <li>
                                Ask WeAdmit Admin team: We may be able to find your interviewer from our network. 
                                Please feel free to ask! But don’t go with this easy option from the beginning. 
                                Your own network and efforts always bring you better results!
                            </li>
                        </ul>
                        <p className = 'mt-5'>
                            5. Conduct interviews. There are no template questions, but you should consider covering the following items.
                        </p>
                        <ol>
                            <li>How they got interested in their major</li>
                            <li>What their major looks like</li>
                            <li>What aspects of the major are thrilling</li>
                            <li>What capabilities they can earn with the major</li>
                            <li>What preparation they did in order to get to the major</li>
                            <li>What potential career paths they are considering</li>
                            <li>Hot career paths with the major after graduation</li>
                            <li>How relevant the major is to your dream job</li>
                            <li>Most recent trends/significant changes in the major (e.g. AI comes into play, specific artist dominates trends, totally new theory shocked the experts)</li>
                            <li>Which professors in the major earn high reputations across colleges?</li>
                            <li>What colleges earn high reputations for the major (Not only rankings but also actual outcomes)</li>
                        </ol>
                        <p className = 'mt-5'>
                            6. Summarize your interview using the following template.
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
        );
    };
};

export default MInterview;