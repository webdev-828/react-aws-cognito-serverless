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
import { GET_SELF, INSEERT_SELF } from './../../../../graphql/student/worksheets/self-analysis/Self';

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
        padding: '2%',
        fontSize: '1rem',
        border: 'solid',
        borderWidth: '1px'
    },
    tablecell2: {
        border: 'solid',
        borderWidth: '1px',
        width: '60%'
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

const Weakness = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.analysis[5].url, '');
    const prev = props.analysis[4].url;
    const next = props.analysis[6].url;

    const params1 = ['pro', 'pro_examp'];
    const params2 = ['inter', 'inter_examp'];

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [weakness, setWeakness] = React.useState(String);

    React.useEffect(() => {
        props.client.query({query: GET_SELF, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.self.length > 0) {
                    setID(data.self[0].id);
                    setWeakness(data.self[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var problems = [];
        var tbody = document.getElementById('problem');
        for (var index = 0; index < tbody.childElementCount; index++) {
            var pro = document.getElementById(`${params1[0]}-${index}`).value;
            var pro_example = document.getElementById(`${params1[1]}-${index}`).value;
            const problem = {
                id: index,
                problems: pro,
                example: pro_example
            };
            problems.push(problem);
        };

        var interpers = [];
        var intertbody = document.getElementById('inter');
        for (var index1 = 0; index1 < intertbody.childElementCount; index1++) {
            var personal = document.getElementById(`${params2[0]}-${index1}`).value;
            var per_example = document.getElementById(`${params2[1]}-${index1}`).value;
            const inter = {
                id: index,
                interper: personal,
                example: per_example
            };
            interpers.push(inter);
        };

        const weakness_obj = {
            problems: problems,
            interpers: interpers
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(weakness_obj)
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_SELF,
            variables: {
                self: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.self.affected_rows > 0) {
                props.history.push(root);
            }
        });
    };

    const problemsTable = () => {
        var tbody = [];
        for (var index = 0; index < 5; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1} >
                        <Textfield id = {`${params1[0]}-${index}`} value = {weakness && JSON.parse(weakness).problems[index].problems}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2} >
                        <Textfield id = {`${params1[1]}-${index}`} value = {weakness && JSON.parse(weakness).problems[index].example}/>
                    </TableCell>
                </TableRow>
            );            
        };
        return tbody;
    };

    const interpersTable = () => {
        var tbody = [];
        for (var index = 0; index < 5; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1} >
                        <Textfield id = {`${params2[0]}-${index}`} value = {weakness && JSON.parse(weakness).interpers[index].interper}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2} >
                        <Textfield id = {`${params2[1]}-${index}`} value = {weakness && JSON.parse(weakness).interpers[index].example}/>
                    </TableCell>
                </TableRow>
            );            
        };
        return tbody;
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
                        <h2 className = 'center'>2.6 Your Weakness</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                        Although you do not have to strengthen your weaknesses immediately in this worksheet, deeply analyzing them is a crucial first step in becoming resilient and conquering life events later in life.
                        </p>
                        <div className = 'line'></div>
                        <p>(Fill out as many items as you can)</p> 
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Weakness: Problem-solving skills</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Examples</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'problem'>
                                            {problemsTable()}
                                        </TableBody>
                                    </Table>,
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0}/>
                                ]
                            } 
                        />  
                        <br/>   
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Weakness: Interpersonal skills</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Examples</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'inter'>
                                            {interpersTable()}
                                        </TableBody>
                                    </Table>,
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1}/>
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
}
export default Weakness;