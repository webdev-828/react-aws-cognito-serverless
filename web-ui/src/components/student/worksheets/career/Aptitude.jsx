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
import { GET_CAREER, INSEERT_CAREER } from './../../../../graphql/student/worksheets/career/Career';
import Aptitude1 from './../../../../assets/student/worksheets/career/aptitude1.png';
import Aptitude3 from './../../../../assets/student/worksheets/career/aptitude3.png';
import Aptitude4 from './../../../../assets/student/worksheets/career/aptitude4.png';
import Aptitude6 from './../../../../assets/student/worksheets/career/aptitude6.png';
import Aptitude7 from './../../../../assets/student/worksheets/career/aptitude7.png';

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
        width: '65%'
    },
    textfield: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
    label: {
        fontWeight: 'bold',
        paddingTop: 10,
        marginLeft: 20,
        marginBottom: -20
    },
    input: {
        border: 0,
        outline: 0,
        background: 'transparent',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1
    },
    img: {
        width: '100%'
    }
}));

const Aptitude = props => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.careers[1].url, '');
    const prev = props.careers[0].url;
    const next = props.careers[2].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [approach, setApproach] = React.useState(String);

    const params = ['careers', 'interest', 'top'];

    React.useEffect(() => {
        props.client.query({query: GET_CAREER, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.career.length > 0) {
                    setID(data.career[0].id);
                    setApproach(data.career[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var exact = [];
        for (let index = 0; index < 3; index++) {
            exact.push(document.getElementById(`exact${index + 1}`).value);
        };
        
        var declar = [];
        for (let index = 0; index < 3; index++) {
            declar.push(document.getElementById(`declar${index + 1}`).value);
        };
        
        var excite = [];
        for (let index = 0; index < 3; index++) {
            const temp = [
                document.getElementById(`ext-${params[0]}-${index}`).value,
                document.getElementById(`ext-${params[1]}-${index}`).value,
                document.getElementById(`ext-${params[2]}-${index}`).value

            ];
            excite.push(temp);
        };
        
        var dislike = [];
        for (let index = 0; index < 3; index++) {
            const temp = [
                document.getElementById(`dis-${params[0]}-${index}`).value,
                document.getElementById(`dis-${params[1]}-${index}`).value,
                document.getElementById(`dis-${params[2]}-${index}`).value

            ];
            dislike.push(temp);
        };

        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                {
                    exact: exact,
                    declar: declar,
                    excite: excite,
                    dislike: dislike
                }
            )
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_CAREER,
            variables: {
                career: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.career.affected_rows > 0) {
                props.history.push(root);
            };
        });
    };

    const exactTable = () => {
        return (
            <TableRow id = 'exact'>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'exact1' value = {approach && JSON.parse(approach).exact[0]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'exact2' value = {approach && JSON.parse(approach).exact[1]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'exact3' value = {approach && JSON.parse(approach).exact[2]}/>
                </TableCell>
            </TableRow>
        )
    };

    const declarTable = () => {
        return (
            <TableRow id = 'declar'>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'declar1' value = {approach && JSON.parse(approach).declar[0]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'declar2' value = {approach && JSON.parse(approach).declar[1]}/>
                </TableCell>
                <TableCell className = {classes.tablecell1}>
                    <Textfield id = 'declar3' value = {approach && JSON.parse(approach).declar[2]}/>
                </TableCell>
            </TableRow>
        )
    };

    const exciteTable = () => {
        var trows = [];
        for (let index = 0; index < 3; index++) {
            trows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`ext-${params[0]}-${index}`} value = {approach && JSON.parse(approach).excite[index][0]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`ext-${params[1]}-${index}`} value = {approach && JSON.parse(approach).excite[index][1]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`ext-${params[2]}-${index}`} value = {approach && JSON.parse(approach).excite[index][2]}/>
                    </TableCell>
                </TableRow>
            );
        };
        return trows;
    };

    const dislikeTable = () => {        
        var trows = [];
        for (let index = 0; index < 3; index++) {
            trows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`dis-${params[0]}-${index}`} value = {approach && JSON.parse(approach).dislike[index][0]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`dis-${params[1]}-${index}`} value = {approach && JSON.parse(approach).dislike[index][1]}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`dis-${params[2]}-${index}`} value = {approach && JSON.parse(approach).dislike[index][2]}/>
                    </TableCell>
                </TableRow>
            );
        };
        return trows;
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
                        <h2 className = 'center'>5.2 Jobs exploration - Career aptitude test</h2>
                        <h3 className = 'center'>(120 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            In the last worksheet, you listed three jobs by an introspective approach. 
                            This time, you will explore potential jobs using a career aptitude test called <Linkto to = '#' value = 'Sokanu'/>. 
                            Please follow the instructions below so that you can effectively use it.
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Go to <Linkto to = '#' value = 'Sokanu'/>. Click “Take the free career test” and begin the test. 
                            There is no need to subscribe to a paid service. 
                            However, as soon as you start the test, click ‘Save Progress’ and register your email. 
                            By doing so, you can come back anytime if you need to leave the test.
                        </p>
                        <img alt = "aptitude_img" className = {classes.img} src = {Aptitude1}/>
                        <p className = 'mt-5'>
                            2. Reflect what you’ve answered for all of the past WeAdmit worksheets. 
                            You’ve already expressed who you really are. Sokanu asks you a ton of questions about you. 
                            Try to be consistent between WeAdmit worksheets and Sokanu questionnaires, and answer each of the questions at Sokanu carefully so that you will get an accurate result. 
                            It may take 1-2 hours to complete the Sokanu test but be patient because random answers won’t help you at all.
                        </p>
                        <p className = 'mt-5'>
                            3. After completing the test, go to the top left “MY RESULT” section.
                        </p>
                        <img alt = "aptitude_img" className = {classes.img} src = {Aptitude3}/>
                        <p className = 'mt-5'>
                            4. Go to <Linkto to = '#' value = 'Your career matches'/> section and click “See more matches” button. 
                            By clicking the button, you’ll see 30 jobs that match you well.
                        </p>
                        <img alt = "aptitude_img" className = {classes.img} src = {Aptitude4}/>
                        <p className = 'mt-5'>
                            5. Look up the three jobs that you selected on the previous WeAdmit worksheet. 
                            Then, find if there is the exact match of jobs from the Sokanu “Your career matches”. 
                            Fill out the following box if you find any.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {exactTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            6. Look up the three jobs that you selected on the previous WeAdmit worksheet. 
                            Then, pick up the 3 most relevant Sokanu matched careers to the three jobs. 
                            If the nature of the Sokanu matched careers are significantly different from the jobs that you declared in the previous WeAdmit worksheet, leave the following boxes blank.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {declarTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            FYI, you can find detailed information about each career. 
                            Look at the following tabs: “Details”, “How to become”, and “Interview,” for narrative guidance about the jobs.
                        </p>
                        <img alt = "aptitude_img" className = {classes.img} src = {Aptitude6}/>
                        <p className = 'mt-5'>
                            7. From the Sokanu matched careers, pick up three careers that you’ve never thought about but looks exciting. 
                            Provide brief reasons why they intrigue you and find the top two relevant college degrees.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Careers</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Brief description of how the career is eye-opening and why it looks interesting for you.</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Top two relevant college degrees</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {exciteTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            {`FYI, you can find relevant college degrees by "How to become" >> "Education History of {selected job}" >> "{selected job} Education History".`}
                        </p>
                        <img alt = "aptitude_img" className = {classes.img} src = {Aptitude7}/>
                        <p className = 'mt-5'>
                            8. From the Sokanu matched careers, pick up three careers that you dislike. 
                            Provide brief reasons why they are not exciting for you and find out the top two relevant college degrees.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Careers</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Brief description of why you aren’t interested in them</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Top two relevant college degrees</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {dislikeTable()}
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
}

export default Aptitude;