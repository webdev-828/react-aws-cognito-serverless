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
import { GET_COLLEGE, INSEERT_COLLEGE } from './../../../../graphql/student/worksheets/college/College';

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
        width: '72%'
    },
    textfield: {
        width: '100%',
        padding: '0.5rem'
    },
    title: {
        marginBottom: '-1.5rem'
    },
    content: {
        marginTop: '2.5rem',
        fontWeight: 'bold'
    }
}));

const Interview = (props) => {
    const classes = useStyles();
    const root = props.location.pathname.replace(props.college[3].url, '');
    const prev = props.college[2].url;
    const next = props.college[4].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [college, setCollege] = React.useState(String);

    const rows = [
        'School name',
        'Interviewee name(s) and their major name(s)',
        'What the school looks like with your own words',
        'How relevant the school is to your life vision, career goal, and intended major',
        'Hot career paths after graduation',
        'Requirements and preparations you need to do before applying to it',
        'Rivals of the school. (Which schools you can alternately go as plan B)',
        'After the interview(s), are you still excited to apply to this school?',
        'Other/Remarks'
    ];

    const params = ['school', 'major', 'own', 'life', 'after', 'need', 'rival', 'still', 'remark'];

    React.useEffect(() => {
        props.client.query({query: GET_COLLEGE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.college.length > 0) {
                    setID(data.college[0].id);
                    setCollege(data.college[0].value);
                };
            }
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {              
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(getValues())
        };

        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_COLLEGE,
            variables: {
                college: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.college.affected_rows > 0) {
                props.history.push(root);
            };
        });
    };

    const schoolTable = () => {
        var trows = [];
        for (let index = 0; index < 3; index++) {
            trows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`school-${index}-${0}`} value = {college ? JSON.parse(college)[0][index][0] : ''}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`school-${index}-${1}`} value = {college ? JSON.parse(college)[0][index][1] : ''}/>
                    </TableCell>
                </TableRow>
            );
        };
        return trows
    };

    const summarizeTable = () => {
        var tables = [];
        for (let index = 0; index < 5; index++) {
            tables.push(
                <React.Fragment key = {index}>
                    <p className = {classes.label} style = {{marginTop: 20, marginBottom: -20, marginLeft: 20}}>{`School #${index + 1}`}</p>
                    <Wrapper 
                        components = {
                            [
                                <Table className = {classes.table} aria-label = 'caption table'>
                                    <TableBody>
                                        {rows.map((row, index1) => 
                                            <TableRow key = {index1}>
                                                <TableCell className = {classes.tablecell1}>{row}</TableCell>
                                                <TableCell className = {classes.tablecell2}>
                                                    <Textfield id = {`${params[index1]}-${index}`} value = {college ? JSON.parse(college)[1][index][index1] : ''}/>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>, 
                                <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {index + 1} />
                            ]
                        } 
                    />
                </React.Fragment>
            );
        };
        return tables;
    };

    const getValues = () => {
        var schools = [];
        for (let index = 0; index < 3; index++) {
            var temp = [
                document.getElementById(`school-${index}-${0}`).value,
                document.getElementById(`school-${index}-${1}`).value
            ];
            schools.push(temp);
        };

        var summarizes = [];
        for (let index1 = 0; index1 < 5; index1++) {
            var temp = [];
            for (let index2 = 0; index2 < rows.length; index2++) {
                temp.push(document.getElementById(`${params[index2]}-${index1}`).value);
            };
            summarizes.push(temp);
        };

        return [schools, summarizes];
    };

    if (!isLoaded) {
        return (
            <p>Loading ... </p>
        )
    } else {
        if (college) {
            console.log(JSON.parse(college))
        }
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
                        <h2 className = 'center'>6.4 In-depth college research-Interview</h2>
                        <h3 className = 'center'>(60 min + Interview time)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            You’ve already familiar with interviewing people. This time, you’ll interview college students to ask about life at their school. 
                            In the previous worksheet, you’ve expressed college you’re interested in. 
                            Now, let’s deepen your understanding of them and validate if the colleges are worth pursuing.
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Check the Spreadsheet <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}`} value = '6.a'/>. So far, you’ve completed an in-depth analysis of 10 schools. In the next step, you’ll pick up 5 colleges and find interviewees in these colleges. 
                            Therefore, if you want to select colleges that you haven’t done in-depth research yet, fill out all the information on the spreadsheet first and then go to the next step of this worksheet.
                        </p>     
                        <p className = 'mt-5'>
                            2. Select 5 schools that you want to learn more by interviewing current students there. Don’t limit your choice by the chances of finding interviewees. You’ll find a way to reach out to them for sure.
                        </p>    
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {schoolTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />   
                        <p className = 'mt-5'>
                            3. Find at least one interviewee per school (the more interviews the better). 
                            Interviewees should be current college students, but it’s acceptable to interview working professionals who recently graduated from them. 
                            Ask them for a 15-30 minute interview about their colleges. 
                            Interviewing admission officers is acceptable, but since their position is biased to provide you with positive information, it’s not recommended at this time. 
                            The following are the tips to reach out to interviewees.
                        </p>  
                        <ul style = {{marginLeft: 25}}>
                            <li><p>Family/friend network: If your older siblings are in the colleges, definitely ask them. Your older siblings may also have friends in colleges you’re interested in, so please share these school names with them. Also, ask your older relatives the same way you ask your siblings. Otherwise, casually talk to your friends because they might know somebody in the colleges.</p></li>
                            <li><p>High school resources: Ask alumni network, outreach center, or something like that kind of department of your high school. Talk to your school counselors or teachers to introduce you to alumni who are in these colleges.</p></li>
                            <li><p>Referral: When you interview, make sure to ask interviewees to introduce you to their friends who are in colleges you’re interested in. You may luckily find the next interviewees on the spot.</p></li>
                            <li><p>Visit the campuses: If colleges you’re interested in are located in your driving distance, definitely go there when you have free time. Join on-site info session and campus tours led by the student body. You will have a high chance to talk with current students.</p></li>
                            <li><p>Ask WeAdmit Admin team: We may be able to find your interviewer from our network. Please feel free to ask! But don’t go with this easy option from the beginning. Your own network and efforts always bring you better results!</p></li>
                        </ul>
                        <p className = 'mt-5'>
                            4. Conduct interviews. There are no template questions, but you should consider covering the following items.
                        </p>
                        <ol style = {{marginLeft: 25}}>
                            <li><p>How they got interested in their schools</p></li>
                            <li><p>What their school lives look like</p></li>
                            <li><p>What aspects of the school are compelling</p></li>
                            <li><p>What preparation they did in order to get into the schools</p></li>
                            <li><p>What potential major/career paths they are considering</p></li>
                            <li><p>Hot career paths after graduation for their schools</p></li>
                            <li><p>Whether your 3 important criteria (major + 2 of your choice) are met </p></li>
                            <li><p>What colleges earn similar reputations to the schools (Who are the rivals of their schools?)</p></li>
                        </ol>  
                        <p className = 'mt-5'>
                            5. Summarize your interview using the following template.
                        </p> 
                        {summarizeTable()}
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

export default Interview;