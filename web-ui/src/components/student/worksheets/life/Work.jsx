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
        borderWidth: '1px',
        width: '33%'
    },
    tablecell2: {
       border: 'solid',
       borderWidth: '1px',
       width: '75%'
    },
    tablecell3: {
       border: 'solid',
       borderWidth: '1px',
    },
    tablecell4: {
       border: 'solid',
       borderWidth: '1px',
       width: '25%'
    },
    tablecell5: {
       border: 'solid',
       borderWidth: '1px',
       width: '60%'
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
        fontWeight: 'bold'
    }
}));

const Work = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.lifes[2].url, '');
    const prev = props.lifes[1].url;
    const next = props.lifes[3].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [work, setWork] = React.useState(String);

    const items = [
        'career', 'skills', 'nature', 'scale', 'work', 'size', 'salary', 'risk', 'attire', 'residence', 'networking', 'partner'
    ];
    const titles = [
        'Career',
        'Skills you heavily use',
        'Nature of impact',
        'Scale of impact',
        'Work style',
        'Organizational size',
        'Salary',
        'Risk-return profile',
        'Workplace attire',
        'Residence',
        'Networking',
        'Partner & family planning',
    ];

    const examples = [
        'Engineer, Marketer, Researcher, Entrepreneur, Artist, Athlete, Politician, Consultant, Lawyer, Accountant, Freelancer, Investor, Doctor, Celebrity, Educator, Writer, Journalist, Assistant',
        'reativity, Technical expertise, Expressiveness, Management skill, Sensitivity, Interpersonal skill, Imagination, Personal magnetism, Inherit talent, Physical strength',
        'Create economic value, Inspire people, Enrich cultural abundance, Alleviate someone’s pain, Make life more convenient, Settle disputes, Entertain people, Discover and invent something new to the world',
        'Regional, State-level, Nationwide, Worldwide',
        'Work anytime anywhere, Weekdays only, Work from home, Live with passive income, Leave office early, Work late night, Doesn’t matter',
        'Large (>1000 employees), Middle (100-1000 employees), Small (2-100 employees), Solo',
        'At least $200,000 annual income, Achieve one million dollars in personal financial asset by 25 years old',
        'High-risk high-return (e.g. entrepreneur, artist, athlete), Middle-risk middle-return (e.g. pass selective license such as medical license), Low-risk low-return (e.g. regular employee)',
        'Formal business suit, Casual wear, Uniform, Doesn’t matter',
        'Large city (e.g. NY, Chicago, LA), Rularish city, Rural area',
        'Meet as many people as possible, Close friendship with selected people, Don’t want others to disturb my business',
        'Marry with someone by 35 years old and no kid needed, Want to be single for life'

    ];

    React.useEffect(() => {
        props.client.query({query: GET_LIFE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.life.length > 0) {
                    setID(data.life[0].id);
                    setWork(data.life[0].value);
                };
            }
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var works = [];
        for (var index = 0; index < document.getElementById('work').childElementCount; index++) {
            const work_obj = {
                first: document.getElementById(`f-${items[index]}`).value,
                second: document.getElementById(`s-${items[index]}`).value
            };
            works.push(work_obj);
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(works)
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

    const workTable = () => {
        return (
            items.map((item, index) => 
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <p className = {classes.bold}>{titles[index]}</p>
                        <p>[Examples]</p>
                        <p>{examples[index]}</p>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`f-${item}`} value = {work && JSON.parse(work)[index].first}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`s-${item}`} value = {work && JSON.parse(work)[index].second}/>
                    </TableCell>
                </TableRow>
            )
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
                        <h2 className = 'center'>4.3 Life and work style vision mapping</h2>
                        <h3 className = 'center'>(30 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            Describe your preferred future life. This wish list may change over time, but it’s crucial to identify your current preferences so that you will be able to refer to them if you get stuck when selecting colleges and majors later.
                        </p>
                        <div className = 'line'></div>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Items</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>
                                                    First half of your career 
                                                    <br/>
                                                    (20 ~ 30's)
                                                </TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>
                                                    Second half of your career 
                                                    <br/>
                                                    (>40's)
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'work'>
                                            {workTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
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

export default Work;

