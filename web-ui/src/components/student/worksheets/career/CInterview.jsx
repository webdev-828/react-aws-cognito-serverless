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

const CInterview = props => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.careers[3].url, '');
    const prev = props.careers[2].url;
    const next = props.careers[4].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [approach, setApproach] = React.useState(String);

    const contents = ['To be', 'To have', 'To give'];
    const careers = [
        'Career name',
        'Interviewee name(s) and their company name',
        'What the career looks like with your own words',
        'How does this career satisfy your “To be”, “To have”, “To give” goals?',
        'Top two relevant college degrees',
        'Capabilities that need to be developed during college',
        'Industry leaders',
        'Industry trends/changes',
        'After interviews, how does your appetite for this career change?'
    ];
    const params = ['name', 'interviewee', 'like', 'career', 'top', 'college', 'leader', 'trend', 'appetite'];

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

        var cross = [];
        for (let index = 0; index < 3; index++) {
            cross.push(document.getElementById(`cross${index + 1}`).value);
        };

        var careers = [];
        for (let index = 0; index < 3; index++) {
            const temp = [
                document.getElementById(`${params[0]}-${index}`).value,
                document.getElementById(`${params[1]}-${index}`).value,
                document.getElementById(`${params[2]}-${index}`).value,
                document.getElementById(`${params[3]}-${index}`).value,
                document.getElementById(`${params[4]}-${index}`).value,
                document.getElementById(`${params[5]}-${index}`).value,
                document.getElementById(`${params[6]}-${index}`).value,
                document.getElementById(`${params[7]}-${index}`).value,
                document.getElementById(`${params[8]}-${index}`).value
            ];
            careers.push(temp);
        };

        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                {
                    goals: goals,
                    cross: cross,
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

    const crossTable = () => {
        return (
            <TableRow id = 'cross'>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'cross1' value = {approach && JSON.parse(approach).cross[0]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'cross2' value = {approach && JSON.parse(approach).cross[1]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'cross3' value = {approach && JSON.parse(approach).cross[2]}/>
                </TableCell>
            </TableRow>
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
                    <Link to = {`${root}${next}`} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <div style = {{width: '80%', textAlign: 'center'}}>
                        <h2 className = 'center'>5.4 Jobs exploration - Career interview</h2>
                        <h3 className = 'center'>(30 min + Interviews)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            Over the past two worksheets, you’ve selected six to nine jobs that you are interested in. 
                            Now, let’s take the action to deepen your understanding of them.
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
                            2. Look up worksheet <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[0].url}`} value = '5.1'/>, <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[1].url}`} value = '5.2'/>, and <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[2].url}`} value = '5.3'/>.
                            Pick up your top three careers across these worksheets. Your selection needs to be aligned with your 'To be', 'To have' and 'To give' life goals. 
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {crossTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            3. Find the interviewees whose careers are close to your selection above. 
                            Find at least one interviewee per job. 
                            Ideally, you should find 3 professionals for each job. 
                            It might be hard to find the careers exactly matching, but try to find the professionals whose job is close to your dream jobs. 
                            Ask them for a 15-30 minute interview about their careers. The following are the tips to reach out to professionals.
                        </p>
                        <ul>
                            <li>
                                Family/friend network: Ask your parents and relatives. Casually talk to your friends because their parents might be in the profession.
                            </li>
                            <li>
                                Try contacting a local office of a large company: Ask to have a short call with their hiring manager discussing career opportunities.
                            </li>
                            <li>
                                Searching for local companies: Local small-to-medium sized companies often respond to local students as a good neighborhood. Go to their website, find out a phone number and/or online contact form. Reach out to them, introduce yourself, and request an interview for your learning purpose.
                            </li>
                            <li>
                                Referral: When you interview a professional, make sure to ask them to introduce you their colleagues and/or friends. You may luckily find the next interviewees on the spot.
                            </li>
                            <li>
                                Social media: Go to LinkedIn and browse people in the profession. Send direct messages to 20-50 people. The response rate is pretty low but don’t be discouraged. Keep sending the DMs. You’ll get connected with someone in the end. Once you get connected, ask them to have a phone/Skype interview. You can also find people via Reddit, Twitter and so on.
                            </li>
                        </ul>
                        <p>
                            If none of the above works for you, try the following. 
                            Keep in mind that this is a plan “Plan B” -  in-person interviews where professionals give you full attention are always better. 
                            Therefore, try to avoid these seemingly easier routes. 
                        </p>
                        <ul>
                            <li>
                                Ask your LC to get an introduction.
                            </li>
                            <li>
                                Post questions on CareerVillage.org and crowdsource answers.
                            </li>
                            <li>
                                Find some videos on YouTube, Netflix, etc. and fill out the following table as if you actually interviewed them.
                            </li>
                        </ul>
                        <p className = 'mt-5'>
                            4. Conduct interviews. There are no template questions, but you should cover all of the following items.
                        </p>
                        <ol>
                            <li>How they got interested in their jobs</li>
                            <li>What their job looks like</li>
                            <li>What aspects of the job are thrilling</li>
                            <li>What capabilities they need for the job (or in the industry) in order to survive</li>
                            <li>How satisfactory is the job’s wage (No need to ask specific annual income amount)</li>
                            <li>What undergraduate degrees they earned</li>
                            <li>Which company/organization is leading the industry</li>
                            <li>Most recent trends/significant changes in the industry (e.g. Technological advancement, globalization, labor conditions)</li>
                        </ol>
                        <p className = 'mt-5'>
                            5. Summarize your interview using the following template.
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

export default CInterview;