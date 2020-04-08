import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Wrapper from './../../../ui/wrapper/Wrapper';
import Comment from './../../../ui/comment/Comment';
import Textfield from '../../../ui/textfield/Textfield';
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
        borderWidth: '1px',
    },
    tablecell2: {
        border: 'solid',
        borderWidth: '1px',
        width: '60%'
    },
    textfield: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%',
        color: 'black'
    },
    disable: {
        width: '100%',
        color: 'black'
    },
    title: {
       marginTop: '10%'
    }
}));

const History = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.cores[1].url, '');
    const prev = props.cores[0].url;
    const next = props.cores[2].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [history, setHistory] = React.useState(String);
    
    const params1 = ['academic', 'extra', 'hobby', 'friend', 'teacher', 'parent', 'people', 'dream', 'time'];
    const params2 = ['academic', 'extra', 'hobby', 'friend', 'teacher', 'parent', 'people', 'dream', 'time'];
    const params3 = ['academic', 'extra', 'hobby', 'tip', 'reading', 'friend', 'teacher', 'parent', 'people', 'dream', 'time'];
    const params4 = ['academic', 'extra', 'hobby', 'tip', 'reading', 'friend', 'teacher', 'parent', 'people', 'dream', 'time'];

    React.useEffect(() => {
        props.client.query({query: GET_CORE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.core.length > 0) {
                    setID(data.core[0].id);
                    setHistory(data.core[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var elementary = [];
        for (var index = 0; index < 9; index++) {
            elementary.push(document.getElementById(`el-${params1[index]}`).value);
        };

        var middle = [];
        for (var index1 = 0; index1 < 9; index1++) {
            middle.push(document.getElementById(`mi-${params2[index1]}`).value);
        };

        var fresh = [];
        for (var index2 = 0; index2 < 11; index2++) {
            fresh.push(document.getElementById(`fr-${params3[index2]}`).value);
        };

        var sopho = [];
        for (var index3 = 0; index3 < 11; index3++) {
            sopho.push(document.getElementById(`so-${params4[index3]}`).value)
        };

        const history_obj = {
            elementary: elementary,
            middle: middle,
            fresh: fresh,
            sopho: sopho
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(history_obj)
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

    const TimeTextfield = (props) => {
            return (
                <form className = {classes.container} noValidate autoComplete = 'off' style = {{border: 'solid', borderWidth: '1px'}}>
                    <div style = {{width: '100%', padding: '0 2% 0 2%'}}>
                        <TextField
                            id = {props.id}
                            className = {classes.textfield} 
                                                        
                            defaultValue = {props.value}
                            multiline
                            InputProps = {{
                                disableUnderline: true
                        }}
                        />
                    </div>
                </form>
            )
    }

    const elementaryTable = () => {
        const trs = [
            'Academic', 
            'Extracurricular', 
            'Hobbies, pasttime', 
            'Relationship with friends', 
            'Relationship with teachers', 
            'Relationship with parents', 
            'People who inspired you', 
            'Dreams, goals'
        ];

        return (
            <TableBody id = 'element'>          
                {trs.map((tr, index) =>
                    <TableRow key = {index}>
                        <TableCell className = {classes.tablecell1}>
                            {tr}
                        </TableCell>
                        <TableCell className = {classes.tablecell2}>
                            <Textfield id = {`el-${params1[index]}`} value = {history && JSON.parse(history).elementary[index]}/>
                        </TableCell>
                    </TableRow>
                )}                
            </TableBody>
        )
    };

    const middleTable = () => {
        const trs = [
            'Academic', 
            'Extracurricular', 
            'Hobbies, pasttime, boy/girl friend', 
            'Relationship with friends', 
            'Relationship with teachers', 
            'Relationship with parents', 
            'People who inspired you', 
            'Dreams, goals'
        ];

        return (
            <TableBody id = 'middle'>          
                {trs.map((tr, index) =>
                    <TableRow key = {index}>
                        <TableCell className = {classes.tablecell1}>
                            {tr}
                        </TableCell>
                        <TableCell className = {classes.tablecell2}>
                            <Textfield id = {`mi-${params2[index]}`} value = {history && JSON.parse(history).middle[index]}/>
                        </TableCell>
                    </TableRow>
                )}
                
            </TableBody>
        )
    };

    const freshmanTable = () => {
        const trs = [
            'Academic', 
            'Extracurricular', 
            'Hobbies, pasttime, boy/girl friend', 
            'Tip, study abroad', 
            'Reading book', 
            'Relationship with friends', 
            'Relationship with teachers', 
            'Relationship with parents', 
            'People who inspired you', 
            'Dreams, goals'
        ];
        return (
            <TableBody id = 'fresh'>          
                {trs.map((tr, index) =>
                    <TableRow key = {index}>
                        <TableCell className = {classes.tablecell1}>
                            {tr}
                        </TableCell>
                        <TableCell className = {classes.tablecell2}>
                            <Textfield id = {`fr-${params3[index]}`} value = {history && JSON.parse(history).fresh[index]}/>
                        </TableCell>
                    </TableRow>
                )}
                
            </TableBody>
        )
    };

    const sophomoreTable = () => {
        const trs = [
            'Academic', 
            'Extracurricular', 
            'Hobbies, pasttime, boy/girl friend', 
            'Tip, study abroad', 
            'Reading book', 
            'Relationship with friends', 
            'Relationship with teachers', 
            'Relationship with parents', 
            'People who inspired you', 
            'Dreams, goals'
        ];
        return (
            <TableBody id = 'sopho'>          
                {trs.map((tr, index) =>
                    <TableRow key = {index}>
                        <TableCell className = {classes.tablecell1}>
                            {tr}
                        </TableCell>
                        <TableCell className = {classes.tablecell2}>
                            <Textfield id = {`so-${params4[index]}`} value = {history && JSON.parse(history).sopho[index]}/>
                        </TableCell>
                    </TableRow>
                )}
                
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
                        <h2 className = 'center text_center'>3.2 Your life history and what matters the most to you</h2>
                        <h3 className = 'center'>(60 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>Reflect on your life history. This chronological table will help you find clues as to how you have developed your expressed/hidden core values over time.</p>
                        <div className = 'line'></div>
                        <p>[Kindergarten/Elementary school (1-5th grade)]</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Items</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>What did your life look life?</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {elementaryTable()}
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p className = 'center'>What did you value most at that time?</p>
                        <Wrapper 
                            components = {
                                [
                                    <TimeTextfield id = {`el-${params1[8]}`} value = {history && JSON.parse(history).elementary[8]}/>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
                        <p className = {classes.title}>[Middle school (6-8th grade)]</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Items</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>What did your life look life?</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {middleTable()}
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
                                ]
                            } 
                        />
                        <p className = 'center'>What did you value most at that time?</p>
                        <Wrapper 
                            components = {
                                [
                                    <TimeTextfield id = {`mi-${params2[8]}`} value = {history && JSON.parse(history).middle[8]}/>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {3} />
                                ]
                            } 
                        />                        
                        <p className = {classes.title}>[Freshman year in High school (9th grade)]</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Items</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>What did your life look life?</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {freshmanTable()}
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {4} />
                                ]
                            } 
                        />  
                        <p className = 'center'>What did you value most at that time?</p>
                        <Wrapper 
                            components = {
                                [
                                    <TimeTextfield id = {`fr-${params3[10]}`} value = {history && JSON.parse(history).fresh[10]}/>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {5} />
                                ]
                            } 
                        />  
                        <p className = {classes.title}>[Sophomore year in High school (10th grade)]</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Items</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>What did your life look life?</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {sophomoreTable()}
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {6} />
                                ]
                            } 
                        />  
                        <p className = 'center'>What did you value most at that time?</p>
                        <Wrapper 
                            components = {
                                [
                                    <TimeTextfield id = {`so-${params4[10]}`} value = {history && JSON.parse(history).sopho[10]}/>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {7} />
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

export default History;