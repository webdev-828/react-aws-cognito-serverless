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
import { GET_COLLEGE, INSEERT_COLLEGE } from './../../../../graphql/student/worksheets/college/College';

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

const Building = (props) => {
    const classes = useStyles();
    const root = props.location.pathname.replace(props.college[0].url, '');
    const next = props.college[1].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [college, setCollege] = React.useState(String);

    const params = ['graduation', 'choice', 'reason'];
    const rows = [
        'How does this make a difference to the learning environments of your intended major, friendships,  personal growth, the chance of realizing your dream job after graduation, etc?',
        'What’s your choice? Choose one from the list on the right.',
        'Why is it important to you? Provide specific reasons.'
    ];
    const placeholder = [
        '',
        `
        1. Most selective/U.S. Top 50
        2. Selective/U.S. Top 50-200
        3. Moderate/U.S. Top 200-500
        4. Non-selective
        `,
        `
        Choose from 1 (Doesn’t matter at all) to 5 (Very important):
        Why:
        `
    ];
    const placeholder1 = [
        '',
        `
        1. Large (>15,000)
        2. Medium (2,000 - 15,000)
        3. Small (<2,000)
        `,
        `
        Choose from 1 (Doesn’t matter at all) to 5 (Very important):
        Why:
        `
    ];
    const placeholder2 = [
        '',
        `
        1. Metropolitan cities
        2. Mid-to-Large cities
        3. Smaller cities
        4. Campus town
        5. Middle-of-nowhere
        `,
        `
        Choose from 1 (Doesn’t matter at all) to 5 (Very important):
        Why:
        `
    ];
    const placeholder3 = [
        '',
        `
        1. As far as possible (e.g. Need air ticket to go home)
        2. Driving-distance but live separate (e.g. < 150 miles)
        3. Live together with parents
        `,
        `
        Choose from 1 (Doesn’t matter at all) to 5 (Very important):
        Why:
        `
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

    const selectivityTable = () => {
        return (
            rows.map((row, index) =>
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>{row}</TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`${params[index]}-${0}`} placeholder = {placeholder[index]} value = {college ? JSON.parse(college)[0][index]: ''}/>
                    </TableCell>
                </TableRow>
            )
        );
    };

    const schoolsizeTable = () => {
        return (
            rows.map((row, index) =>
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>{row}</TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`${params[index]}-${1}`} placeholder = {placeholder1[index]} value = {college ? JSON.parse(college)[1][index]: ''}/>
                    </TableCell>
                </TableRow>
            )
        );
    };

    const citysizeTable = () => {
        return (
            rows.map((row, index) =>
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>{row}</TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`${params[index]}-${2}`} placeholder = {placeholder2[index]} value = {college ? JSON.parse(college)[2][index]: ''}/>
                    </TableCell>
                </TableRow>
            )
        );
    };

    const homeTable = () => {
        return (
            rows.map((row, index) =>
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>{row}</TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`${params[index]}-${3}`} placeholder = {placeholder3[index]} value = {college ? JSON.parse(college)[3][index]: ''}/>
                    </TableCell>
                </TableRow>
            )
        );
    };

    const othersTable = () => {
        var trows = [];
        for (let index = 0; index < 3; index++) {
            trows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`criteria-${index}`} value = {college ? JSON.parse(college)[4][index][0]: ''}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`others-${index}`} value = {college ? JSON.parse(college)[4][index][1]: ''}/>
                    </TableCell>
                </TableRow>
            )
        };
        return trows;
    };

    const topTable = () => {
        var trows = [];
        for (let index = 0; index < 3; index++) {
            trows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>{index + 1}</TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`important-${index}`} placeholder = {index === 0 ? `Major (Don't change this.)` : ''} value = {college ? JSON.parse(college)[5][index][0]: ''}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`brief-${index}`} placeholder = {index === 0 ? `(No need to explain. Right major choice helps you to archieve your career/life goal)` : ''} value = {college ? JSON.parse(college)[5][index][1]: ''}/>
                    </TableCell>
                </TableRow>
            )
        };
        return trows;
    };
    
    const getValues = () => {
        var selectivities = [
            document.getElementById(`${params[0]}-${0}`).value,
            document.getElementById(`${params[1]}-${0}`).value,
            document.getElementById(`${params[2]}-${0}`).value
        ];

        var schools = [
            document.getElementById(`${params[0]}-${1}`).value,
            document.getElementById(`${params[1]}-${1}`).value,
            document.getElementById(`${params[2]}-${1}`).value
        ];

        var cities = [
            document.getElementById(`${params[0]}-${2}`).value,
            document.getElementById(`${params[1]}-${2}`).value,
            document.getElementById(`${params[2]}-${2}`).value
        ];

        var homes = [
            document.getElementById(`${params[0]}-${3}`).value,
            document.getElementById(`${params[1]}-${3}`).value,
            document.getElementById(`${params[2]}-${3}`).value
        ];

        var others = [];
        for (let index = 0; index < 3; index++) {
            others.push(
                [
                    document.getElementById(`criteria-${index}`).value,
                    document.getElementById(`others-${index}`).value
                ]
            );
        };

        var tops = [];
        for (let index1 = 0; index1 < 3; index1++) {
            tops.push(
                [
                    document.getElementById(`important-${index1}`).value,
                    document.getElementById(`brief-${index1}`).value
                ]
            );
        };

        return [selectivities, schools, cities, homes, others, tops];
    };

    if (!isLoaded) {
        return (
            <p>Loading ... </p>
        )
    } else {
        return (
            <div>
                <div className = 'center direction'>
                    <Link to = {root} style = {{textDecoration: 'none'}}>
                        <FastRewindRoundedIcon className = {classes.icon} style = {{marginLeft: '5rem'}} />
                    </Link>
                    <Link to = {`${root}${next}`} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <div style = {{width: '80%', textAlign: 'center'}}>
                        <h2 className = 'center'>6.1 College Search Criteria Building</h2>
                        <h3 className = 'center'>(20 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            If you start searching for colleges without having solid criteria, 
                            you will end up getting interested in most of them and have a hard time choosing best-fit colleges for you. 
                            It’s like stepping into a deep forest without a compass and getting lost. 
                            Rather than going that route, let’s make a wise first step to build your college search criteria. 
                            (Note: Think without financial constraint here. You will cover that topic in a separate worksheet)
                        </p>
                        <div className = 'line'></div>
                        <p className="font-weight-bold mt-5">1. Major</p>
                        <p>
                            WeAdmit strongly believes major is the single most important criteria when choosing the right college for you. 
                            Therefore, please understand the principal and skip thinking about this for now and go on to the next item.
                        </p>
                        <p className="font-weight-bold mt-5">2. Selectivity</p>
                        <p>
                            Selectivity refers to how low each college’s acceptance rate is. This concept is close to college rankings that many 3rd party companies indicate. 
                            Being selective means that many other applicants want to get into them, whatever the reasons may be: brand name, average income after graduation, quality of people around you, etc. 
                            You may want to mark this item as one of your top criteria but take a moment to consider fir
                            Think about what selectivity means particularly to you and why you believe it is/isn’t important for you to achieve your life/career goal. 
                            Review your WeAdmit worksheet <Linkto to = {`${props.pathname}/${props.worksheets[3].worksheet_url}/${props.lifes[5].url}`} value = '4.6'/>, <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[2].url}`} value = '5.3'/>, <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[4].url}`} value = '5.5'/>, <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[6].url}`} value = '5.7'/>, and <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[7].url}`} value = '5.8'/> to align your self-analysis to your choice below.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {selectivityTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            }
                        />
                        <p className="font-weight-bold mt-5">3. School size</p>
                        <p>
                            In general, smaller schools offer more specialized programs, higher student-to-faculty ratio, 
                            and a close-knit culture (including their alumni network). 
                            In that sense, this criterion focuses on how you want to interact with friends/faculty, 
                            to overcome the weakness of your interpersonal skill, and to focus on your chosen field of study. 
                            Review your WeAdmit worksheet <Linkto to = {`${props.pathname}/${props.worksheets[1].worksheet_url}/${props.analysis[5].url}`} value = '2.6'/>, <Linkto to = {`${props.pathname}/${props.worksheets[1].worksheet_url}/${props.analysis[6].url}`} value = '2.7'/>, <Linkto to = {`${props.pathname}/${props.worksheets[2].worksheet_url}/${props.cores[4].url}`} value = '3.5'/>, and <Linkto to = {`${props.pathname}/${props.worksheets[2].worksheet_url}/${props.cores[7].url}`} value = '3.8'/> to align your self-analysis to your choice below.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {schoolsizeTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            }
                        />
                        <p className="font-weight-bold mt-5">4. Location - City size</p>
                        <p>
                            City size affects your lifestyle. Metropolitan cities allow you to explore beyond school environments such as internships during semesters, 
                            join sports clubs, go to the art museums and fancy nightclubs. Studying in a rural campus town is just the opposite. 
                            Students can focus on studying and building tight friendships that last for life. 
                            Think about how these options will make a difference in your future college life.
                            Review your WeAdmit worksheet <Linkto to = {`${props.pathname}/${props.worksheets[3].worksheet_url}/${props.lifes[5].url}`} value = '4.6'/>, <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[2].url}`} value = '5.3'/>, <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[4].url}`} value = '5.5'/>, <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[6].url}`} value = '5.7'/>, and <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[7].url}`} value = '5.8'/> to align your self-analysis to your choice below.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {citysizeTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
                                ]
                            }
                        />
                        <p className="font-weight-bold mt-5">5. Location - Distance from home</p>
                        <p>
                            There are a lot of potential reasons for why you would want to study closer or further from home. 
                            Your parents may have their opinion, but please focus on your own personal interest to answer this worksheet. 
                            Review your WeAdmit worksheet <Linkto to = {`${props.pathname}/${props.worksheets[1].worksheet_url}/${props.analysis[4].url}`} value = '2.5'/>, <Linkto to = {`${props.pathname}/${props.worksheets[2].worksheet_url}/${props.cores[0].url}`} value = '3.1'/>, and <Linkto to = {`${props.pathname}/${props.worksheets[2].worksheet_url}/${props.cores[7].url}`} value = '3.8'/> to align your self-analysis to your choice below.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {homeTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {3} />
                                ]
                            }
                        />
                        <p className="font-weight-bold mt-5">6. Others</p>
                        <p>
                            The items above cover the common criteria that most people think about. 
                            On top of them, there are so many other criteria depending on your background, preference, personal challenges, life goal, and etc. 
                            Feel free to add any important criteria and describe why they matter to you. 
                            If there is nothing on your mind, feel free to skip this section. (Again, don’t worry about financials for this worksheet).
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell}>Criteria</TableCell>
                                                <TableCell className = {classes.tablecell}>
                                                    How does this make difference to learning environments of your intended major, friendship, personal growth, and the chance of realizing your dream job after graduation? Why these criteria are important to you?
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {othersTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {4} />
                                ]
                            }
                        />
                        <p className = 'center'>
                            What are your top three criteria when you’re searching for colleges?
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell}>Priority</TableCell>
                                                <TableCell className = {classes.tablecell}>
                                                    Important criteria
                                                </TableCell>
                                                <TableCell className = {classes.tablecell}>
                                                    Briefly describe why you believe they are relatively important among other criteria
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {topTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {5} />
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

export default Building;