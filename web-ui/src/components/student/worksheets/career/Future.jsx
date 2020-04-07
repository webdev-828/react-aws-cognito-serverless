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

const Future = props => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.careers[2].url, '');
    const prev = props.careers[1].url;
    const next = props.careers[3].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [approach, setApproach] = React.useState(String);

    const contents = ['To be', 'To have', 'To give'];
    const params = ['careers', 'interest', 'top'];

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
        
        var figures = [];
        for (let index = 0; index < 3; index++) {
            const temp = [
                document.getElementById(`fig-${params[0]}-${index}`).value,
                document.getElementById(`fig-${params[1]}-${index}`).value,
                document.getElementById(`fig-${params[2]}-${index}`).value

            ];
            figures.push(temp);
        };

        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                {
                    goals: goals,
                    figure: figures
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

    const figureTable = () => {
        var trows = [];
        for (let index = 0; index < 3; index++) {
            trows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`fig-${params[0]}-${index}`} value = {approach && JSON.parse(approach).figure[index][0]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`fig-${params[1]}-${index}`} value = {approach && JSON.parse(approach).figure[index][1]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`fig-${params[2]}-${index}`} value = {approach && JSON.parse(approach).figure[index][2]}/>
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
                        <h2 className = 'center'>5.3 Jobs exploration - Future - pull approach</h2>
                        <h3 className = 'center'>(45 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            The world is changing all the time. 
                            After graduating from college, you may eventually find a job that never exists today. 
                            Let’s discover careers that will shape the world in 5 to 10 years.
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
                            2. Search with any keywords such as “cool job 2030”, “trendy careers 2019” and “future occupations”. 
                            You will find a bunch of articles, websites, and so forth to learn some current jobs never existed and jobs are emerging quickly these days. 
                            You may be fascinated by these totally innovative jobs. 
                            If you get interested in too many jobs, come back to the life goal that you wrote above. ‘To be’, ‘To have’ and ‘To give’ life goal is like a compass that allows you to survive in the changing world.
                            <br/>
                            <br/>
                            FYI, we found the following articles. Feel free to look at them, but don’t limit your work to the following URLs.
                        </p>
                        <p><Href href = 'https://www.glassdoor.com/blog/jobs-that-didnt-exist-15-years-ago/' /></p>
                        <p><Href href = 'https://www.trade-schools.net/articles/best-careers-for-the-future.asp/' /></p>
                        <p><Href href = 'https://www.csus.edu/careercenter/students/cool%20careers%20-%20emerging%20trends/' /></p>
                        <p><Href href = 'https://www.crimsoneducation.org/za/blog/jobs-of-the-future/' /></p>
                        <p><Href href = 'https://economicgraph.linkedin.com/research/linkedin-2018-emerging-jobs-report/' /></p>
                        <p className = 'mt-5'>
                            3. List three careers that are thrilling. 
                            Figure out relevant college majors to the jobs. 
                            Some articles may suggest the relevant degrees but others may not. 
                            If there is no reference, think through by yourself and put your best guess.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Careers</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Brief description of how the career is eye-opening and why it is interesting for you.</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Top two relevant college degrees</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {figureTable()}
                                        </TableBody>
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
        )
    }
}

export default Future;