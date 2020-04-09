import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Wrapper from './../../../ui/wrapper/Wrapper';
import Comment from './../../../ui/comment/Comment';
import Textfield from './../../../ui/textfield/Textfield';
import { GET_IMPLEMENTATION, INSEERT_IMPLEMENTATION } from './../../../../graphql/student/worksheets/implementation/Implementation';
import Recommender from './helperComponents/Recommender';

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
        width: '15%'
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
    }
}));

const Recommend = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.implementation[8].url, '');
    const prev = props.implementation[7].url;
    const next = props.implementation[9].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [letters, setLetters] = React.useState(Array);
    const [total, setTotal] = React.useState(String);
    const [recommenders, setRecommenders] = React.useState(Array);

    const cols = ['School Name', '# of letters required', 'Instructions about recommenders, letters, etc', 'Submission de date'];
    const params1 = ['name', 'letter', 'recommender', 'date'];
    const params2 = ['name', 'relationship', 'submit', 'aspect', 'chose', 'draft', 'notes'];
    const rows = [
        'Recommender name', 
        'Relationship to you(subject/team)',
        'What schools you want to submit there letter to',
        'What aspect of yourself you want them to highlight',
        'Why you chose them',
        'Email draft for the recommender (It is recommended',
        'Notes'
    ];
    const recommendations = [
        {key: rows[0], value: '', placeholder: false},
        {key: rows[1], value: '', placeholder: false},
        {key: rows[2], value: '', placeholder: false},
        {key: rows[3], value: '', placeholder: false},
        {key: rows[4], value: '', placeholder: false},
        {key: rows[5], value: '', placeholder: true},
        {key: rows[6], value: '', placeholder: false}
    ];

    React.useEffect(() => {
        props.client.query({query: GET_IMPLEMENTATION, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.implementation.length > 0) {
                    setID(data.implementation[0].id);
                    setLetters(JSON.parse(data.implementation[0].value).letter);
                    setTotal(JSON.parse(data.implementation[0].value).total);
                    setRecommenders(JSON.parse(data.implementation[0].value).recommender);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify (
                {
                    letter: getValues()[0],
                    total: getValues()[1],
                    recommender: getValues()[2]
                }
            )
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_IMPLEMENTATION,
            variables: {
                implementation: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.implementation.affected_rows > 0) {
                props.history.push(root);
            };
        });
    };

    const handleClickAdd = () => {
        setLetters(getValues()[0]);
        setTotal(getValues()[1])
        setRecommenders([...getValues()[2], recommendations])
    };

    const lettersTable = () => {
        var rows = [];
        for (let index = 0; index < 14; index++) {
            rows.push(
                <TableRow key = {index}>
                    {params1.map((param, index1) =>
                        <TableCell className = {classes.tablecell1} key = {index1}>
                            <Textfield id = {`${param}-${index}-${index1}`} value = {letters.length > 0 ? letters[index][index1] : ''}/>
                        </TableCell>
                    )}
                </TableRow>
            );
        };
        return rows;
    };

    const getValues = () => {
        var letters = [];
        for (let index = 0; index < 14; index++) {
            var temp = [
                document.getElementById(`${params1[0]}-${index}-0`).value,
                document.getElementById(`${params1[1]}-${index}-1`).value,
                document.getElementById(`${params1[2]}-${index}-2`).value,
                document.getElementById(`${params1[3]}-${index}-3`).value
            ];
            letters.push(temp);
        };

        var total = document.getElementById('total').value;

        var recommenders = [];
        for (let index1 = 0; index1 < document.getElementById('recommend').childElementCount; index1++) {
            var temp1 = [];
            for (let index2 = 0; index2 < params2.length; index2++) {
                if (index2 === 5) {
                    temp1.push(
                        {key: rows[index2], value: document.getElementById(`${params2[index2]}-${index1}`).value, placeholder: true}
                    );
                } else {
                    temp1.push(
                        {key: rows[index2], value: document.getElementById(`${params2[index2]}-${index1}`).value, placeholder: false}
                    );
                }
            };
            recommenders.push(temp1);
        };
        return [letters, total, recommenders];
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
                        <h2 className = 'center'>7.9 Recommendation Letter Planning</h2>
                        <h3 className = 'center'>(60 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            Recommendation letters are a critical yet often overlooked part of every school application. 
                            While some schools may only require one letter, others will ask for 3 or even 4 from specific counselors, teachers, etc. 
                            Use this worksheet to analyze what the requirements are for your schools and how to prepare yourself best for them. 
                            Also, <a href = '#'>check out our blog article</a> about this!
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Fill out the table below to figure out how many recommendation letters you need for each school. 
                            You should consult their admissions website for these details - here’s Princeton’s website. See part 2.
                        </p>  
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                {cols.map((col, index) =>
                                                    <TableCell className = {classes.tablecell} key = {index}>{col}</TableCell>
                                                )}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {lettersTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p className = 'mt-5, text_center'>
                            How many recommendation letters do you need in total? 
                            Remember you can reuse recommendation letters for all your schools as long as they satisfy the requirements 
                            (for example: <a href = '#'>MIT needs 1 from group A and one from group B</a>, which can be used for <a href = '#'>Princeton’s requirement</a> for two different subject teachers) 
                        </p>   
                        <Wrapper 
                            style = {{marginTop: 0}}
                            components = {
                                [
                                    <Textfield id = 'total' value = {total}/>,
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
                        <p className = 'mt-5, text_center'>
                            Now it’s time to choose your recommenders - who do you think will speak best about you? 
                            List down a few teachers below and what sets them apart - why would they write a glowing recommendation for you? 
                            <a href = '#'>Review our 5 steps to get a perfect letter of recommendation</a>:
                        </p>      
                        <ol>
                            <li>Gather your information</li>
                            <li>Write an email/letter asking for the recommendation</li>
                            <li>Ask in advance!</li>
                            <li>Follow up</li>
                            <li>Thank your teacher/counselor!</li>
                        </ol>      
                        <p>
                            Let’s organize your recommenders in these tables. 
                            Fill out their name, relationship (what subject they taught or team they coached), 
                            what schools you’ll need their letter for, what you want them to write about, and why you chose them.
                        </p>                     
                        <div id = 'recommend'>
                            <Recommender recommender = {recommenders} type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid}/>
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

export default Recommend;