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
import Textfield from './../../../ui/textfield/Textfield';
import TextfieldWithBorder from './../../../ui/textfield/TextfieldWithBorder';
import Linkto from './../../../ui/linkto/Linkto';
import Href from './../../../ui/href/Href';
import { GET_COLLEGE, INSEERT_COLLEGE } from './../../../../graphql/student/worksheets/college/College';
import Online2 from './../../../../assets/student/worksheets/college/online2.png';

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
    },
    img: {
        width: '100%'
    }
}));

const Online = (props) => {
    const classes = useStyles();
    const root = props.location.pathname.replace(props.college[2].url, '');
    const prev = props.college[1].url;
    const next = props.college[3].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [college, setCollege] = React.useState(String);

    const rows = [
        'Hard Reach School (0 ~ 5% of chance to get in)',
        'Reach School (5 ~ 20% of chance to get in)',
        'Match School (20 ~ 80% of chance to get in)',
        'Safety School (80 ~ 100% of chance to get in)'
    ];
    
    React.useEffect(() => {
        props.client.query({query: GET_COLLEGE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.college.length > 0) {
                    setID(data.college[0].id);
                    setCollege(data.college[0].value);
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

    const schoolsTable = () => {
        var trows = [];
        for (let index = 0; index < 8; index++) {
            trows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`school-${index}-${0}`} value = {college ? JSON.parse(college)[0][index][0] : ''}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`school-${index}-${1}`} value = {college ? JSON.parse(college)[0][index][1] : ''}/>
                    </TableCell>
                </TableRow>
            );
        };
        return trows
    };

    const baseTable = () => {
        return (
            rows.map((row, index) => 
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        {row}
                    </TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`base${index}`} value = {college ? JSON.parse(college)[1][index] : ''}/>
                    </TableCell>
                </TableRow>
            )
        )
    };

    const getValues = () => {
        var schooles = [];
        for (let index = 0; index < 8; index++) {
            var temp = [
                document.getElementById(`school-${index}-${0}`).value,
                document.getElementById(`school-${index}-${1}`).value
            ];
            schooles.push(temp);
        };

        var bases = [];
        for (let index1 = 0; index1 < rows.length; index1++) {
            bases.push(document.getElementById(`base${index1}`).value);
        };

        var observe = document.getElementById('observe').value;

        return [schooles, bases, observe];
    };

    if (!isLoaded) {
        return (
            <p>Loading ... </p>
        )
    } else {
        if (college) {
            console.log(JSON.parse(college))
        }
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
                        <h2 className = 'center'>6.3 In-depth college research-online</h2>
                        <h3 className = 'center'>(120 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            You shortlisted colleges you’re interested in on the previous worksheet. 
                            The natural next step is to deep dive to research them one by one. 
                            Yes, it’s time-consuming. However, this is your life decision. 
                            Your next four (or two) years will be determined by what colleges you choose. 
                            Don’t underestimate the importance of this step. 
                            There are many approaches to research colleges. 
                            Let’s begin with the easiest way: online research. 
                            Most of the schools’ information is available online. 
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Look up worksheet <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}/${props.college[1].url}`} value = '6.2'/>. 
                            Schools are listed randomly. Take a moment and pick up the top 15 colleges that you feel like to perform in-depth research. 
                            List all of them to the table below.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {schoolsTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            2. Research each of the colleges above in detail and fill out the Spreadsheet <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}`} value = '6.a'/>. You can extend the research up to 30 schools. 
                            Of course, you can go beyond that point. However, focus is also important. 
                            Try to limit to 30 schools so that you can move fast.
                        </p>
                        <p>
                            It sounds boring but checking individual school websites gives you the fastest and richest information about their schools. 
                            Check every single page of the schools you’re interested in.
                        </p>
                        <p>
                            Also, the following tools aid your online research.
                        </p>
                        <p><Href href = 'https://www.youvisit.com/collegesearch' /></p>
                        <p><Href href = 'https://www.collegedata.com/en/' /></p>
                        <p><Href href = 'https://www.cappex.com/' /></p>
                        <p><Href href = 'https://student.naviance.com/auth/fclookup' /> -> If your school has it.</p>
                        <p>
                            An important thing to note is your chance of admissions. (See column V of worksheet <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}`} value = '6.a'/>). 
                            You can get an estimate from the PrepScholar blog. 
                            These numbers don’t determine everything, but you can get an idea of reality. Here are the steps.
                        </p>
                        <ol style = {{marginLeft: 15}}>
                            <li><p>{`Google the following keywords: prepscholar admission requirements {college name}`}</p></li>
                            <li><p>Find the relevant prepscholar page. For example, this page.</p></li>
                            <li><p>Fill out your GPA and SAT/ACT scores. Find the average GPA and SAT/ACT scores to get into the college.</p></li>
                            <li><p>Scroll down to find “Admissions Calculator”. Plug in your GPA and SAT/ACT scores to get the chances of admission.</p></li>
                        </ol>
                        <img alt = "online_img" className = {classes.img} src = {Online2}/>
                        <p className = 'mt-5'>
                            3. Check column W (Reach/Match/Safety analysis) of Spreadsheet <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}`} value = '6.a'/>). 
                            Categorize the schools based on the following table.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {baseTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
                        <p className = 'center'>What are your observations from the table above?</p>
                        <p>
                            <u>For those who see most of the schools in Hard Reach or Reach schools categories</u>: What’s your next move? Do you want to check out some more Match Schools? 
                            Or, do you want to take a high-risk approach and only focus on those schools?
                        </p>
                        <p>
                            <u>For those who see most of the schools in Match Reach or Safety schools categories</u>: Are you still excited to apply to these schools? Do you want to check out more schools that are even more selective? 
                            Or, do you believe that selectivity doesn’t matter and you want to keep the list as it is?
                        </p>
                        <p>
                            <u>For those who see colleges are nicely distributed in each category</u>: Are you pretty much done with school selection? 
                            Do you want to start writing essays? Or, do you want to spend some more time researching?
                        </p>      
                        <Wrapper 
                            components = {
                                [
                                    <TextfieldWithBorder id = 'observe' value = {college ? JSON.parse(college)[2] : ''}/>,
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
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

export default Online;