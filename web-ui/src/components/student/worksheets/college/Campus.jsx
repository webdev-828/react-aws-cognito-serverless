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
import Tour from './helperComponents/Tour';

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

const Campus = (props) => {
    const classes = useStyles();
    const root = props.location.pathname.replace(props.college[4].url, '');
    const prev = props.college[3].url;
    const next = props.college[5].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [tours, setTours] = React.useState(Array);

    const rows = ['Campuses to visit', 'Duration', 'Budget', 'Available tours', 'Outsource?', 'Go? When?'];
    const params = ['visit', 'duration', 'budget', 'tours', 'outsource', 'when'];
    const places = ['', 'Days', '$', '', 'Yes/No', 'Family decision: Yes/No. When to visit:'];

    const tour = [
        {key: rows[0], value: '', placeholder: places[0], param: params[0]},
        {key: rows[1], value: '', placeholder: places[1], param: params[1]},
        {key: rows[2], value: '', placeholder: places[2], param: params[2]},
        {key: rows[3], value: '', placeholder: places[3], param: params[3]},
        {key: rows[4], value: '', placeholder: places[4], param: params[4]},
        {key: rows[5], value: '', placeholder: places[5], param: params[5]}
    ];

    React.useEffect(() => {
        props.client.query({query: GET_COLLEGE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.college.length > 0) {
                    setID(data.college[0].id);
                    setTours(JSON.parse(data.college[0].value));
                    console.log(JSON.parse(data.college[0].value))
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

    const handleClickAdd = () => {
        setTours([...tours, tour]);
    };

    const getValues = () => {
        var tours = [];
        for (let index = 0; index < document.getElementById('tour').childElementCount; index++) {
            var temp = [];
            for (let index1 = 0; index1 < rows.length; index1++) {
                temp.push(
                    {
                        key: rows[index1],
                        value: document.getElementById(`${params[index1]}-${index}`).value,
                        param: params[index1]
                    }
                );
            };
            tours.push(temp);
        };
        return tours;
    }

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
                        <h2 className = 'center'>6.5 In-depth college research - Campus tour planning</h2>
                        <h3 className = 'center'>(60 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            Seeing is believing. Campus tour gives you a lot of inspirations and information about the college and student life. 
                            Since campus tour often requires travel expenses, plan well and consult to your parents using this worksheet.
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Check the worksheet <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}/${props.college[2].url}`} value = '6.3'/> and <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}/${props.college[3].url}`} value = '6.4'/>. 
                            So far, you’ve completed an in-depth analysis of at least 10 schools. Mark as many colleges to visit as you want.
                        </p>
                        <p className="mt-5">
                            2. Plan the tour in the following steps.
                        </p>
                        <ol style = {{marginLeft: 24}}>
                            <li>
                                <p>
                                    Group colleges by geographical proximity. 
                                    For example, Boston, New York, Philadelphia, Washington D.C. can be clubbed as an East Coast tour. 
                                    A Midwest tour can include a few of colleges in Wisconsin and Illinois. If it’s hard to group, mark them as a single-destination tour. 
                                    To get idea how to organize efficient tours, you can check the following college tour company websites and see how they organize tours.
                                </p>
                                <p><Href href = 'https://www.gocampusing.com' /></p>
                                <p><Href href = 'https://www.collegecampustours.net' /></p>
                                <p><Href href = 'http://www.usuniversitytours.com' /></p>
                            </li>
                            <li>
                                <p>
                                    Figure out the estimated days and budget required for the trip. Use the cost calculator below for budgeting. 
                                    Prioritize the tour since depending on your time and budget you may not be able to visit all of them. 
                                </p>
                                <p><Href href = 'https://docs.google.com/spreadsheets/d/1dSo6Yy749PxqVK3U64W5xie3aM459f1WsyhnGTtYV6A/edit#gid=0' /></p>
                            </li>
                            <li>
                                <p>
                                    Check if there are tour companies that organize group tours to efficiently visit all/most of the campuses you want to visit. 
                                    The cost varies and schedule may be tight but joining tours often saves you time for tour arrangement and money for transportation. 
                                    Compare the option of arranging the tour by yourself or outsource the process to these companies.
                                </p>
                            </li>
                            <li>
                                <p>Leave “Go? When?” decision as blank at this step.</p>
                            </li>
                        </ol>
                        <div id = 'tour'>
                            {tours.map((tour, index) =>
                                <div key = {index}>
                                    <p style = {{marginTop: 20, marginBottom: -20}}>{`Tour#${index + 1}`}</p>
                                    <Wrapper 
                                        components = {
                                            [
                                                <Table className = {classes.table} aria-label = 'caption table'>
                                                    <TableBody>
                                                        <Tour tour = {tour} index = {index}/>
                                                    </TableBody>
                                                </Table>, 
                                                <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {index} />
                                            ]
                                        }
                                    />
                                </div>
                            )}
                        </div>
                        <Button
                            onClick = {handleClickAdd}
                            className = 'pl-4 pr-4'
                            variant = 'contained'
                            color = 'secondary'
                            style = {{marginTop: 10}}
                        >
                            Add More
                        </Button>
                        <p className = 'mt-5'>
                            3. Show this worksheet and cost calculator to your parents. Discuss whether they join the tour and what tours your family invests in.
                        </p>
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

export default Campus;