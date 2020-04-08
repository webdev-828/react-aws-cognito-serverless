import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Wrapper from './../../../ui/wrapper/Wrapper';
import Comment from './../../../ui/comment/Comment';
import Textfield from './../../../ui/textfield/Textfield';
import {GET_DASHBOARD, INSEERT_DASHBOARD} from './../../../../graphql/student/worksheets/dashboard/Dashboard';

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
        fontSize: '1rem',
        backgroundColor: 'lightgrey',
        border: 'solid',
        borderWidth: '1px'
    },
    tablecell1: {
        fontSize: '1rem',
        borderLeft: 'solid',
        borderRight: 'solid',
        borderWidth: '1px'
    },
    tablecell2: {
        fontSize: '1rem',
        backgroundColor: 'lightblue',
        fontWeight: 'bold'
    },
    tablecell3: {
        fontWeight: 'normal',
        fontSize: '1rem',
        borderLeft: 'solid',
        borderRight: 'solid',
        borderWidth: '1px'
    },
    tablecell4: {
        fontSize: '1rem',
        borderLeft: 'solid',
        borderRight: 'solid',
        borderWidth: '1px',
        backgroundColor: 'lightgrey'
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
    formControl: {
        minWidth: '100%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    select: {
        fontWeight: 'normal'
    },
    li: {
        border: 'solid',
        borderWidth: '0.1rem',
        borderRight: 'none',
        borderColor: 'lightgrey',
        padding: '0.5rem',
        width: '3rem',
        textAlign: 'center',
        backgroundColor: 'white',
        cursor: 'pointer'
    },
    active: {
        backgroundColor: 'grey',
    },
    activeLink: {
        color: 'white !important'
    },
    last: {        
        border: 'solid',
        borderWidth: '0.1rem',
        borderColor: 'lightgrey',
        marginBottom: 8
    },
    link: {
        color: 'black',
        cursor: 'pointer'
    }
}));
  
const Sheet1 = (props) => {
    const classes = useStyles();
    
    const root = props.location.pathname.replace(props.dashboard[1].url, '');
    const prev = props.dashboard[0].url;
    const next = props.dashboard[2].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [sheet, setSheet] = React.useState(String);
    const [activePage, setActivepage] = React.useState(1);

    const categories = ['Top down', 'Bottom up'];
    const items = [
        'Strength', 'Weakness', 'Life vision', 'Career goal', 
        'Intended major', 'College search criteria', 'Colleges interested in',
        'PSAT', 'SAT', 'ACT', 'SAT ||', 'GPA', 'AP classes',
        'Extracurricular 1', 'Extracurricular 2', 'Extracurricular 3', 'Extracurricular 4', 'Extracurricular 5'
    ];
    const emp_arr = [];

    for (let index = 0; index < items.length; index++) {
        emp_arr.push(null);
    };
    
    const subs = [
        ['Problem solving', 'Interpersonal skill'],
        ['Problem solving', 'Interpersonal skill'],
        ['To be', 'To have', 'To give'],
        ['Career1', 'Career2', 'Career3'],
        ['Major1', 'Major2', 'Major3'],
        ['Criterion1', 'Criterion2', 'Criterion3'],
        ['College 1', 'College 2', 'College 3', 'College 4', 'College 5', 'College 6', 'College 7', 'College 8', 'College 9', 'College 10'],
        ['Total'],
        ['Total', 'Math', 'Reading/Writing'],
        ['Total', 'English', 'Math', 'Reading', 'Science'],
        [
            'Subject 1 name', 'Subject 1 score', 
            'Subject 2 name', 'Subject 2 score', 
            'Subject 3 name', 'Subject 3 score',
            'Subject 4 name', 'Subject 4 score',
            'Subject 5 name', 'Subject 5 score'
        ],
        ['Overall', '9th', '10th', '11th', '12th'],
        [
            '# of courses taken', 
            'Course 1 name', 'Course 1 grade', 
            'Course 2 name', 'Course 2 grade', 
            'Course 3 name', 'Course 3 grade', 
            'Course 4 name', 'Course 4 grade', 
            'Course 5 name', 'Course 5 grade', 
            'Course 6 name', 'Course 6 grade', 
            'Course 7 name', 'Course 7 grade'
        ],
        [
            'Club/activity name',
            'Type of activity',
            'Months served',
            'Highest position',
            'Achievement',
            'Insight/skill aquired'
        ],
        [
            'Club/activity name',
            'Type of activity',
            'Months served',
            'Highest position',
            'Achievement',
            'Insight/skill aquired'
        ],
        [
            'Club/activity name',
            'Type of activity',
            'Months served',
            'Highest position',
            'Achievement',
            'Insight/skill aquired'
        ],
        [
            'Club/activity name',
            'Type of activity',
            'Months served',
            'Highest position',
            'Achievement',
            'Insight/skill aquired'
        ],
        [
            'Club/activity name',
            'Type of activity',
            'Months served',
            'Highest position',
            'Achievement',
            'Insight/skill aquired'
        ]
    ];

    React.useEffect(() => {
        props.client.query({query: GET_DASHBOARD, variables: {usersub: props.sub, sub_id: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.dashboard.length > 0) {
                    setID(data.dashboard[0].id);
                    setSheet(data.dashboard[0].value);
                } else {
                    setSheet(JSON.stringify(emp_arr));
                }
            }
        });
    }, [props.client, props.sub, props.subid, props.location.pathname, activePage, emp_arr]);

    const handleClick = () => {
        var arr = [];
        for (let index1 = 0; index1 < subs[activePage - 1].length; index1++) {
            const temp = [];
            for (let index2 = 0; index2 < 8; index2++) {
                temp.push(document.getElementById(`sheet-${index1}-${index2}`).value);
            };
            arr.push(temp);
        };
        var init_arr = [];
        if (sheet) {
            init_arr = JSON.parse(sheet);
        } else {
            for (let index = 0; index < items.length; index++) {
                init_arr.push(null);
            }
        };
        init_arr[activePage - 1] = arr;
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(init_arr)
        };
        if (id !== 0) {
            obj.id = id;
        };
        props.client.mutate({
            mutation: INSEERT_DASHBOARD,
            variables: {
                dashboard: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.dashboard.affected_rows > 0) {
                props.history.push(root);
            }
        });
    };

    const handlePageChange = (pageNumber) => {
        setActivepage(pageNumber)
    };
    
    const TableBody = () => {
        var mysheets = JSON.parse(sheet)[activePage - 1];
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell className = {classes.tablecell3} align = 'left'>-</TableCell>
                    <TableCell className = {classes.tablecell3} align = 'left'>Date</TableCell>
                    <TableCell className = {classes.tablecell3}></TableCell>
                    <TableCell className = {classes.tablecell3} align = 'right'>2019-12-15</TableCell>
                    <TableCell className = {classes.tablecell3} align = 'right'>2019-12-15</TableCell>
                    <TableCell className = {classes.tablecell3} align = 'right'>2019-12-15</TableCell>
                    <TableCell className = {classes.tablecell3} align = 'right'>2019-12-15</TableCell>
                    <TableCell className = {classes.tablecell3} align = 'right'>2019-12-15</TableCell>
                    <TableCell className = {classes.tablecell3} align = 'right'>2019-12-15</TableCell>
                    <TableCell className = {classes.tablecell3} align = 'right'>2019-12-15</TableCell>
                    <TableCell className = {classes.tablecell3} align = 'right'>2019-12-15</TableCell>
                </TableRow>
                {subs[activePage - 1].map((sub, index) => 
                    <TableRow key = {index}>
                        {activePage <7 && <TableCell className = {classes.tablecell3}>{categories[0]}</TableCell>}
                        {activePage > 6 && <TableCell className = {classes.tablecell3}>{categories[1]}</TableCell>}
                        {index === 0 && <TableCell className = {classes.tablecell3}>{items[activePage - 1]}</TableCell>}
                        {index !== 0 && <TableCell className = {classes.tablecell3}></TableCell>}
                        <TableCell className = {classes.tablecell3}>{sub}</TableCell>
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`sheet-${index}-0`} value = {mysheets && mysheets[index][0]}/>
                        </TableCell>                      
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`sheet-${index}-1`} value = {mysheets && mysheets[index][1]}/>
                        </TableCell>                      
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`sheet-${index}-2`} value = {mysheets && mysheets[index][2]}/>
                        </TableCell>                      
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`sheet-${index}-3`} value = {mysheets && mysheets[index][3]}/>
                        </TableCell>                      
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`sheet-${index}-4`} value = {mysheets && mysheets[index][4]}/>
                        </TableCell>                      
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`sheet-${index}-5`} value = {mysheets && mysheets[index][5]}/>
                        </TableCell>                      
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`sheet-${index}-6`} value = {mysheets && mysheets[index][6]}/>
                        </TableCell>                      
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`sheet-${index}-7`} value = {mysheets && mysheets[index][7]}/>
                        </TableCell>                      
                    </TableRow>
                )}
            </React.Fragment>
        )
    }
    
    if (!sheet || !isLoaded) {
        return (
            <p>Loading...</p>
        )
    } else {
        return(
            <div>
                <div className = 'center direction'>
                    <Link to = {`${root}${prev}`} style = {{textDecoration: 'none'}}>
                        <FastRewindRoundedIcon className = {classes.icon} style = {{marginLeft: '5rem'}}/>
                    </Link>
                    <Link to = {root} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                        <Pagination
                            activePage = {activePage}
                            itemsCountPerPage = {1}
                            totalItemsCount = {18}
                            pageRangeDisplayed = {9}
                            activeClass = {classes.active}
                            activeLinkClass = {classes.activeLink}
                            itemClass = {classes.li}
                            itemClassLast = {classes.last}
                            linkClass = {classes.link}
                            onChange = {handlePageChange}
                        />
                    </div>
                <div className = 'center'>
                    <Paper className = {classes.root}>
                        <Table className = {classes.table} aria-label = 'caption table' style = {{width: '2000px'}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className = {classes.tablecell}>Category</TableCell>
                                    <TableCell className = {classes.tablecell} colSpan = '2'>Items</TableCell>
                                    <TableCell className = {classes.tablecell}>1st snapshot</TableCell>
                                    <TableCell className = {classes.tablecell}>2nd snapshot</TableCell>
                                    <TableCell className = {classes.tablecell}>3rd snapshot</TableCell>
                                    <TableCell className = {classes.tablecell}>4st snapshot</TableCell>
                                    <TableCell className = {classes.tablecell}>5st snapshot</TableCell>
                                    <TableCell className = {classes.tablecell}>6st snapshot</TableCell>
                                    <TableCell className = {classes.tablecell}>7st snapshot</TableCell>
                                    <TableCell className = {classes.tablecell}>8st snapshot</TableCell>
                                </TableRow>
                                <TableBody />
                            </TableHead>
                        </Table>
                    </Paper>
                </div>     
                <div className = 'center'>
                    <div className = 'p-60'>
                        <Wrapper 
                            components = {
                                [
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {activePage - 1} />
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

export default Sheet1;