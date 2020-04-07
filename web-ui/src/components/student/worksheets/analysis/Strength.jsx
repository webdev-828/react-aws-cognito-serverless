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
const Strength = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.analysis[6].url, '');
    const prev = props.analysis[5].url;

    const params1 = ['strength', 'downside'];
    const params2 = ['pro', 'inter'];

    const [strengthid, setStrengthID] = React.useState(0);
    const [weaknessid, setWeaknessID] = React.useState(0);
    const [weakness, setWeakness] = React.useState(String);
    const [strength, setStrength] = React.useState(String);

    React.useEffect(() => {
        props.client.query({query: GET_SELF, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data.self.length > 0) {
                setWeaknessID(data.self[0].id);
                setWeakness(data.self[0].value);
            };
        });
    
        props.client.query({query: GET_SELF, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data.self.length > 0) {
                setStrengthID(data.self[0].id);
                setStrength(data.self[0].value);
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var strengths = [];
        for (var index = 0; index < document.getElementById('strength').childElementCount; index++) {
            var str = document.getElementById(`${params1[0]}-${index}`).value;
            var downside = document.getElementById(`${params1[1]}-${index}`).value;
            const strength_obj = {
                id: index,
                strength: str,
                downside: downside
            };
            strengths.push(strength_obj);
        };
        const strength_obj = {
            strengths: strengths
        };
        const str_obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(strength_obj)
        };
        if (strengthid !== 0) {
            str_obj.id = strengthid;
        };
        
        var pros = [];
        for (var index2 = 0; index2 < document.getElementById('weakness').childElementCount; index2++) {
            var id = document.getElementById('weakness').childNodes[index2].childNodes[0].getAttribute('data-index');
            var pro = document.getElementById(`${params2[0]}-${index2}`).value;
            var examples = JSON.parse(weakness).problems[index2].example;
            const problem = {
                id: id,
                problems: pro,
                example: examples
            };        
            pros.push(problem);
        };

        var inters = [];
        for (var index1 = 0; index1 < document.getElementById('weakness').childElementCount; index1++) {
            var inter_id = document.getElementById('weakness').childNodes[index1].childNodes[1].getAttribute('data-index');
            var personal = document.getElementById(`${params2[1]}-${index1}`).value;
            var inter_examples = JSON.parse(weakness).interpers[index1].example;
            const inter = {
                id: inter_id,
                interper: personal,
                example: inter_examples
            };
            inters.push(inter);
        };
        const weakness_obj = {
            problems: pros,
            interpers: inters
        };
        
        const weak_obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(weakness_obj)
        };
        if (weaknessid !== 0) {
            weak_obj.id = weaknessid;
        };

        props.client.mutate({
            mutation: INSEERT_SELF,
            variables: {
                self: str_obj
            }
        }).then(res => {
            const data = res.data;
           if (data.self.affected_rows > 0) {         
                props.client.mutate({
                    mutation: INSEERT_SELF,
                    variables: {
                        self: weak_obj
                    }
                }).then(res1 => {
                    const data1 = res1.data;
                    if (data1.self.affected_rows > 0) {
                        props.history.push(root);
                    }
                });
           }
        });
   };

    const strengthTable = () => {
        var tbody = [];
        for (var index = 0; index < 5; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1} >
                        <Textfield id = {`${params1[0]}-${index}`} value = {strength && JSON.parse(strength).strengths[index].strength}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2} >
                        <Textfield id = {`${params1[1]}-${index}`} value = {strength && JSON.parse(strength).strengths[index].downside}/>
                    </TableCell>
                </TableRow>
            );            
       };
        return tbody;
   };

    const weaknessTable = () => {
        var tbody = [];
        for (var index = 0; index < 5; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1} data-index = {weakness && JSON.parse(weakness).problems[index].id}>
                        <Textfield id = {`${params2[0]}-${index}`} value = {weakness && JSON.parse(weakness).problems[index].problems}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2} data-index = {weakness && JSON.parse(weakness).interpers[index].id}>
                        <Textfield id = {`${params2[1]}-${index}`} value = {weakness && JSON.parse(weakness).interpers[index].interper}/>
                    </TableCell>
                </TableRow>
            );
        }
        return tbody;
    };
    
    return(
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
                    <h2 className = 'center'>2.7 Your Strength</h2>
                    <h3 className = 'center'>(15 min)</h3>
                </div>
            </div>
            <div className = 'center'>
                <div className = 'p-60'>
                    <p>
                        Describe your strengths. 
                        Knowing yourself as a rounded person - both weaknesses and strengths - is very valuable to forming a complete picture of yourself in your mind and can boost self-confidence. 
                    </p>
                    <div className = 'line'></div>
                    <p>(Fill out 5 items)</p> 
                    <Wrapper 
                        components = {
                            [
                                <Table className = {classes.table} aria-label = 'caption table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className = {classes.tablecell} align = 'center'>Your Strength</TableCell>
                                            <TableCell className = {classes.tablecell} align = 'center'>Potential downsides of the strengths</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody id = 'strength'>
                                        {strengthTable()}
                                    </TableBody>
                                </Table>,
                                <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0}/>
                            ]
                        } 
                    /> 
                    <br/>
                    <p>
                        Review the weaknesses that you identified in the previous worksheet.
                        Feel free to update based on the findings above. Summarize your weaknesses regarding problem-solving skills and interpersonal skills.
                    </p>   
                    <Wrapper 
                        components = {
                            [
                                <Table className = {classes.table} aria-label = 'caption table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className = {classes.tablecell} align = 'center'>Weakness: Problem-solving skills</TableCell>
                                            <TableCell className = {classes.tablecell} align = 'center'>Weakness: Interpersonal skills</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody id = 'weakness'>
                                        {weaknessTable()}
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
export default Strength;