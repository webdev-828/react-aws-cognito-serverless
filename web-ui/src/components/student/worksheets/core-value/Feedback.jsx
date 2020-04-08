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
import Textfield from '../../../ui/textfield/Textfield';
import Linkto from './../../../ui/linkto/Linkto';
import { GET_CORE, INSEERT_CORE } from './../../../../graphql/student/worksheets/core-value/Core';

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
    textfield: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    }
}));

const Feedback = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.cores[3].url, '');
    const prev = props.cores[2].url;
    const next = props.cores[4].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [feedback, setFeedback] = React.useState(String);

    const params1 = ['date', 'interviewee', 'strength', 'weakness'];
    const params2 = ['known', 'unknown'];
    const trs = ['Known to others', 'Not Known to others'];

    React.useEffect(() => {
        props.client.query({query: GET_CORE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.core.length > 0) {
                    setID(data.core[0].id);
                    setFeedback(data.core[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var feedback = [];
        for (var index = 0; index < document.getElementById('feedback').childElementCount; index++) {
            const feedback_obj = {
                date: document.getElementById(`${params1[0]}-${index}`).value,
                interviewee: document.getElementById(`${params1[1]}-${index}`).value,
                strength: document.getElementById(`${params1[2]}-${index}`).value,
                weakness: document.getElementById(`${params1[3]}-${index}`).value
            };
            feedback.push(feedback_obj);
        };

        var self = [];
        for (var index1 = 0; index1 < document.getElementById('self').childElementCount; index1++) {
            const self_obj = {
                known: document.getElementById(`${params2[index1]}-${params2[0]}`).value,
                unknown: document.getElementById(`${params2[index1]}-${params2[1]}`).value
            };
            self.push(self_obj);
        };

        const feed_obj = {
            feedback: feedback,
            self: self
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(feed_obj)
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_CORE,
            variables: {
                core: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.core.affected_rows > 0) {
                props.history.push(root);
            }
        });        
    };

    const feedbackTable = () => {
        var tbody = [];
        for (var index = 0; index < 5; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`${params1[0]}-${index}`} value = {feedback && JSON.parse(feedback).feedback[index].date}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`${params1[1]}-${index}`} value = {feedback && JSON.parse(feedback).feedback[index].interviewee}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`${params1[2]}-${index}`} value = {feedback && JSON.parse(feedback).feedback[index].strength}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`${params1[3]}-${index}`} value = {feedback && JSON.parse(feedback).feedback[index].weakness}/>
                    </TableCell>
                </TableRow>
            )
        };
        return tbody;
    };

    const selfTable = () => {
        return (
            <TableBody id = 'self'>
                {
                    trs.map((tr, index) => 
                        <TableRow key = {index}>
                            <TableCell className = {classes.tablecell1}>{tr}</TableCell>
                            <TableCell className = {classes.tablecell1}>
                                <Textfield id = {`${params2[index]}-${params2[0]}`} value = {feedback && JSON.parse(feedback).self[index].known}/>
                            </TableCell>
                            <TableCell className = {classes.tablecell1}>
                                <Textfield id = {`${params2[index]}-${params2[1]}`} value = {feedback && JSON.parse(feedback).self[index].unknown}/>
                            </TableCell>                            
                        </TableRow>
                    )
               }
            </TableBody>
        )
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
                        <h2 className = 'center'>3.4 Feedback interview</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>There are often differences between your ideas of yourself and others’ impressions of you. Interview five people close to you (parents/guardians, friends, etc.), and ask them about your strengths and weaknesses to seek candid feedback. Each interview should be short, about 5-10 minutes in length.</p>
                        <div className = 'line'></div>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Date</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Interviewee</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Your Strengths</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Your Weaknesses</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'feedback'>
                                            {feedbackTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p className = 'text_center'>
                            Using the “Johari window” framework, summarize your strengths/weaknesses. 
                            Refer to Worksheet <Linkto to = {`${props.pathname}/${props.worksheets[1].worksheet_url}/${props.analysis[5].url}`} value = '2.6 Your Weakness'/> and <Linkto to = {`${props.pathname}/${props.worksheets[1].worksheet_url}/${props.analysis[6].url}`} value = '2.7 Your Strength'/> for the “known to self” column.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'></TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Known to self</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Not known to self</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {selfTable()}
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
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

export default Feedback;