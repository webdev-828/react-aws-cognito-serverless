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

const List = (props) => {
    const classes = useStyles();
    const root = props.location.pathname.replace(props.college[5].url, '');
    const prev = props.college[4].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [college, setCollege] = React.useState(String);
    
    const contents1 = ['To be', 'To have', 'To give'];
    const rows = [
        'School name',
        'Is this choice in line with your life vision and career goal? How does this school satisfy your aspiration of studying your chosen field?',
        'What is unique about this school?',
        'To the best of your knowledge, what quality does this college look for in applicants?',
        'According to PrepScholar admission calculator, what are your chances to get in?',
        'Other/Remarks'
    ];

    const params = ['school', 'choice', 'unique', 'best', 'chance', 'remark'];

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

    const summaryTable = () => {
        return (
            contents1.map((content, index) =>
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>{content}</TableCell>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {content} value = {college ? JSON.parse(college)[0][index] : ''}/>
                    </TableCell>
                </TableRow>
            )
        )
    };

    const dreamTable = () => {
        var trows = [];
        for (let index = 0; index < 3; index++) {
            trows.push(
                <TableCell className = {classes.tablecell1} key = {index}>
                    <Textfield id = {`dream${index}`} value = {college ? JSON.parse(college)[1][index] : ''}/>
                </TableCell>
            );
        };
        return (
            <TableRow id = 'dream'>
                {trows}
            </TableRow>
        )
    };

    const majorTable = () => {
        var trows = [];
        for (let index = 0; index < 3; index++) {
            trows.push(
                <TableCell className = {classes.tablecell1} key = {index}>
                    <Textfield id = {`major${index}`} value = {college ? JSON.parse(college)[2][index] : ''}/>
                </TableCell>
            );
        };
        return (
            <TableRow id = 'major'>
                {trows}
            </TableRow>
        );
    };

    const schoolTable = () => {
        var tables = [];
        for (let index = 0; index < 15; index++) {
            tables.push(
                <React.Fragment key = {index}>
                    <p className = {classes.label} style = {{marginTop: 20, marginBottom: -20, marginLeft: 20}}>{`School #${index + 1}`}</p>
                    <Wrapper 
                        components = {
                            [
                                <Table className = {classes.table} aria-label = 'caption table'>
                                    <TableBody>
                                        {rows.map((row, index1) => 
                                            <TableRow key = {index1}>
                                                <TableCell className = {classes.tablecell1}>{row}</TableCell>
                                                <TableCell className = {classes.tablecell2}>
                                                    <Textfield id = {`${params[index1]}-${index}`} value = {college ? JSON.parse(college)[3][index][index1] : ''}/>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>, 
                                <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {index + 3} />
                            ]
                        } 
                    />
                </React.Fragment>
            );
        };
        return tables;
    };

    const getValues = () => {
        var summaries = [];
        for (let index = 0; index < contents1.length; index++) {
            summaries.push(document.getElementById(contents1[index]).value);
        };

        var dreams = [];
        for (let index1 = 0; index1 < 3; index1++) {
            dreams.push(document.getElementById(`dream${index1}`).value);
        };

        var majors = [];
        for (let index2 = 0; index2 < 3; index2++) {
            majors.push(document.getElementById(`major${index2}`).value);
        };

        var schools = [];
        for (let index3 = 0; index3 < 15; index3++) {
            var temp = [];
            for (let index4 = 0; index4 < rows.length; index4++) {
                temp.push(document.getElementById(`${params[index4]}-${index3}`).value);
            };
            schools.push(temp);
        };

        return [summaries, dreams, majors, schools];
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
                    <Link to = {root} style = {{textDecoration: 'none'}}>
                        <FastForwardRoundedIcon className = {classes.icon} style = {{marginRight: '5rem'}}/>
                    </Link>
                </div>
                <div className = 'center'>
                    <div style = {{width: '80%', textAlign: 'center'}}>
                        <h2 className = 'center'>6.6 College list finalization</h2>
                        <h3 className = 'center'>(45 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            The time has come! This is a monumental moment in the WeAdmit program and even in your life. 
                            All the ‘top-down’ groundwork finally pays off with this worksheet. 
                            With this worksheet, you make the final decision on which colleges you’re applying to. 
                            You know who you really are and who you want to be in the future. 
                            You aspire to study a very specific field and you found colleges that will satisfy your life and academic goals. 
                            This worksheet lets you make the final nod to yourself about your decision. Take a risk and enjoy working on it!
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Go back to <Linkto to = {`${props.pathname}/${props.worksheets[3].worksheet_url}/${props.lifes[5].url}`} value = 'worksheets 4.6'/> and copy-paste the ten-word version of your ‘To be’, ‘To have’ and ‘To give’ life goals here.
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {summaryTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            2. Look up worksheet <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[4].url}`} value = '5.5'/> and copy-paste your dreams job. 
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {dreamTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            3. Look up worksheet <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[7].url}`} value = '5.8'/> and copy-paste your intended majors. 
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableBody>
                                            {majorTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
                                ]
                            } 
                        />
                        <p className = 'mt-5'>
                            4. Reflect worksheet 6.1 to 6.5 and write at least six and at most fifteen schools that you have decided to apply to. 
                            You could apply to less than seven/more than fifteen schools if there is a strong need. 
                            However, applying to too little will increase the risk not to get into any schools. 
                            Conversely, applying to too many will split your attention to each essay and may lower your chances of getting in. 
                            Also, write schools in descending preference order (your top school comes first).
                        </p>
                        {schoolTable()}
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

export default List;