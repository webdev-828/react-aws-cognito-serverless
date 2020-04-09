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
import { GET_LIFE, INSEERT_LIFE } from './../../../../graphql/student/worksheets/life-vision/Life';

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
        width: '40%'
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
    },
    bold: {
        fontWeight: 'bold',
        marginBottom: '-3%'
    }
}));

const Summary = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.lifes[5].url, '');
    const prev = props.lifes[4].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [summary, setSummary] = React.useState(String);

    const params = ['express', 'be', 'have', 'give'];    

    React.useEffect(() => {
        props.client.query({query: GET_LIFE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.life.length > 0) {
                    setID(data.life[0].id);
                    setSummary(data.life[0].value);
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
                    real: document.getElementById(params[0]).value,
                    real_des: document.getElementById(`des-${params[0]}`).value,
                    be: document.getElementById(params[1]).value,
                    be_des: document.getElementById(`des-${params[1]}`).value,
                    have: document.getElementById(params[2]).value,
                    have_des: document.getElementById(`des-${params[2]}`).value,
                    give: document.getElementById(params[3]).value,
                    give_des: document.getElementById(`des-${params[3]}`).value,
                }
            )
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_LIFE,
            variables: {
                life: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.life.affected_rows > 0) {
                props.history.push(root);
            }
        });
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
                        <h2 className = 'center'>4.6 Summary of your life vision</h2>
                        <h3 className = 'center'>(45 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            Great work! You’ve done a lot of work on understanding yourself! It’s time to summarize who you really are. This is the final deliverable to conclude chapter one of your college admission journey. Please be thoughtful about this worksheet because you will repeatedly use this later.
                        </p>
                        <div className = 'line'></div>
                        <p id = 'id_express' className = {classes.bold}>|. Who you really are (Up to date)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>
                                                    Express yourself in 10 <br/>
                                                    (Use a single narrative sentence/phrase here such as<br/>
                                                    “Creative leader showing teams the path to success”)
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell1}>
                                                    <Textfield id = {params[0]} value = {summary && JSON.parse(summary).real} />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>
                                                    Describe yourself - core values, selling points, weaknesses. (Limit: 150 words)
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell1}>
                                                    <Textfield id = {`des-${params[0]}`} value = {summary && JSON.parse(summary).real_des} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p id = 'id_dream' className = {classes.bold} style = {{marginTop: '3%'}}>||. Your dream(Life vision)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>
                                                    "To Be" in 10 words <br/>
                                                    (Use a single narrative sentence/phrase here such as above)
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell1}>
                                                    <Textfield id = {params[1]} value = {summary && JSON.parse(summary).be} />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>
                                                    Describe what kind of person you want to become. No need to be job specific. (Limit: 80 words)
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell1}>
                                                    <Textfield id = {`des-${params[1]}`} value = {summary && JSON.parse(summary).be_des} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>
                                                    "To Have" in 10 words <br/>
                                                    (Use a single narrative sentence/phrase here such as above)
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell1}>
                                                    <Textfield id = {params[2]} value = {summary && JSON.parse(summary).have} />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>
                                                    Describe how you want to contribute to people/society/world. What kind of impact do you want to make with what scale? (Limit 80 words)
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell1}>
                                                    <Textfield id = {`des-${params[2]}`} value = {summary && JSON.parse(summary).have_des} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
                                ]
                            } 
                        />
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>
                                                    "To Give" in 10 words <br/>
                                                    (Use a single narrative sentence/phrase here such as above)
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell1}>
                                                    <Textfield id = {params[3]} value = {summary && JSON.parse(summary).give} />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>
                                                    Describe how you want to contribute to people/society/world. What kind of impacts do you want to make with what scale? (Limit: 80 words)
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell1}>
                                                    <Textfield id = {`des-${params[3]}`} value = {summary && JSON.parse(summary).give_des} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {3} />
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
};

export default Summary;

