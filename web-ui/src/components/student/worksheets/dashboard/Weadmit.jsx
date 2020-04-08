import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Wrapper from './../../../ui/wrapper/Wrapper';
import Comment from './../../../ui/comment/Comment';
import Textfield from './../../../ui/textfield/Textfield';
import Linkto from './../../../ui/linkto/Linkto';
import {GET_WORKSHEETS, INSEERT_DASHBOARD} from './../../../../graphql/student/worksheets/dashboard/Dashboard';

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
  
const Weadmit = (props) => {
    const classes = useStyles();
    
    const root = props.location.pathname.replace(props.dashboard[0].url, '');
    const next = props.dashboard[1].url;

    const [id, setID] = React.useState(0);
    const [worksheet, setWorksheet] = React.useState(Object);
    const [weadmit, setWeadmit] = React.useState(String);
    const [activePage, setActivepage] = React.useState(1);
    const [status, setStatus] = React.useState(Array);
    const [lc, setLC] = React.useState(Array);
    const [hc, setHC] = React.useState(Array);
    const [remarks, setRemarks] = React.useState(Array);
    
    React.useEffect(() => {
        props.client.query({query: GET_WORKSHEETS, variables: {usersub: props.sub, sub_id: props.subid}}).then(res => {
            const data = res.data
            if (data) {
                setWorksheet(data);
                if (data.weadmit.length > 0) {
                    setID(data.weadmit[0].id);
                    setWeadmit(data.weadmit[0].value);
                    if (JSON.parse(data.weadmit[0].value)[activePage - 1] != null) {
                        setStatus(JSON.parse(data.weadmit[0].value)[activePage - 1].status);
                        setLC(JSON.parse(data.weadmit[0].value)[activePage - 1].lc);
                        setHC(JSON.parse(data.weadmit[0].value)[activePage - 1].hc);
                        setRemarks(JSON.parse(data.weadmit[0].value)[activePage - 1].remarks);
                    } else {
                        setStatus(null);
                        setLC(null);
                        setHC(null);
                        setRemarks(null);
                    }                 
                }
            }
        });
    }, [props.client, props.sub, props.subid, props.location.pathname, activePage]);

    const handleClick = () => {
        const mydata = {
            status: getData()[0],
            lc: getData()[1],
            hc: getData()[2],
            remarks: getData()[3]
        };
        var init_arr = [];
        if (weadmit) {
            init_arr = JSON.parse(weadmit);
        } else {
            init_arr = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
        };
        init_arr[activePage - 1] = mydata;
        
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

    const handleStatusChange = () => {
        setStatus(getData()[0]);
        setLC(getData()[1])
        setHC(getData()[2]);
        setRemarks(getData()[3])
    };

    const TableBody = () => {
        var unit = worksheet.worksheets[activePage - 1];
        var worksheets = Object.values(worksheet)[activePage - 1];
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell className = {classes.tablecell2} colSpan = '4'>{`Unit ${unit.id}`}</TableCell>
                    <TableCell className = {classes.tablecell2} align = 'right'>{unit.time}</TableCell>
                    <TableCell className = {classes.tablecell2} colSpan = '5'></TableCell>
                </TableRow>
                {worksheets.map((worksheet, index) => 
                    <TableRow key = {index}>
                        <TableCell className = {classes.tablecell3}>{activePage}</TableCell>
                        {(activePage === 1 && index === 0) && <TableCell className = {classes.tablecell3}>0</TableCell>}
                        {(activePage === 1 && (index > 0) && (index < 11)) && <TableCell className = {classes.tablecell3}>1</TableCell>}
                        {(activePage === 1 && index === 11) && <TableCell className = {classes.tablecell3}>2</TableCell>}
                        {(activePage === 1 && index === 12) && <TableCell className = {classes.tablecell3}>3</TableCell>}
                        {activePage !== 1 && <TableCell className = {classes.tablecell3}>{index + 1}</TableCell>}                        
                        <TableCell className = {classes.tablecell3}>
                            <Linkto to = {`${props.pathname}/${unit.worksheet_url}`} value = {unit.worksheet_name} />
                        </TableCell>
                        <TableCell className = {classes.tablecell3}>
                            <Linkto to = {`${props.pathname}/${unit.worksheet_url}/${worksheet.url}`} value = {worksheet.title} />
                        </TableCell>
                        <TableCell className = {classes.tablecell3} align = 'right'>{worksheet.time}</TableCell>
                        <TableCell className = {classes.tablecell3}>2019-12-31</TableCell>
                        <TableCell className = {classes.tablecell3}>
                            <FormControl className = {classes.formControl}>
                                <Select
                                    id = {`status-${index}`}
                                    className = {classes.select}
                                    native
                                    value = {status ? status[index] : 10}
                                    onChange = {handleStatusChange}
                                >
                                    <option value = {10} />
                                    <option value = {20}>To Do</option>
                                    <option value = {30}>In-Progress</option>
                                    <option value = {40}>Submitted</option>
                                    <option value = {50}>Re-work needed</option>
                                </Select>
                            </FormControl>
                        </TableCell>
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`lc-${index}`} value = {lc && lc[index]} />
                        </TableCell>
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`hc-${index}`} value = {hc && hc[index]} />
                        </TableCell>
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`re-${index}`} value = {remarks && remarks[index]} />
                        </TableCell>
                    </TableRow>
                )}
            </React.Fragment>
        )
    };

    const getData = () => {
        var status_arr = [];
        var lc_arr = [];
        var hc_arr = [];
        var re_arr = [];
        for (let index = 0; index < Object.values(worksheet)[activePage - 1].length; index++) {
            status_arr.push(document.getElementById(`status-${index}`).value);
            lc_arr.push(document.getElementById(`lc-${index}`).value);
            hc_arr.push(document.getElementById(`hc-${index}`).value);
            re_arr.push(document.getElementById(`re-${index}`).value);
        };
        return [status_arr, lc_arr, hc_arr, re_arr];
    }

    if (!worksheet.worksheets) {
        return (
            <p>Loading</p>
        )
    } else {
        return(
            <div>
                <div className = 'center direction'>
                    <Link to = {root} style = {{textDecoration: 'none'}}>
                        <FastRewindRoundedIcon className = {classes.icon} style = {{marginLeft: '5rem'}}/>
                    </Link>
                    <Link to = {`${root}${next}`} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <Pagination
                        activePage = {activePage}
                        itemsCountPerPage = {1}
                        totalItemsCount = {7}
                        pageRangeDisplayed = {7}
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
                                    <TableCell className = {classes.tablecell} align = 'center' colSpan = '2'>Index#</TableCell>
                                    <TableCell className = {classes.tablecell} align = 'center'>Unit Name</TableCell>
                                    <TableCell className = {classes.tablecell} align = 'center'>Worksheet Title</TableCell>
                                    <TableCell className = {classes.tablecell} align = 'center'>Estimated Time(min)</TableCell>
                                    <TableCell className = {classes.tablecell} align = 'center'>Submission due date</TableCell>
                                    <TableCell className = {classes.tablecell} align = 'center'>Status</TableCell>
                                    <TableCell className = {classes.tablecell} align = 'center'>LC review meeting date</TableCell>
                                    <TableCell className = {classes.tablecell} align = 'center'>HC review meeting date</TableCell>
                                    <TableCell className = {classes.tablecell} align = 'center'>Remarks</TableCell>
                                </TableRow>
                                <TableBody>
                                </TableBody>
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

export default Weadmit;