import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
import Textfield from '../../../ui/textfield/Textfield';
import Linkto from './../../../ui/linkto/Linkto';
import { GET_IMPLEMENTATION, INSEERT_IMPLEMENTATION } from './../../../../graphql/student/worksheets/implementation/Implementation';

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

const Strate = (props) => {
    const classes = useStyles();
    const root = props.location.pathname.replace(props.implementation[7].url, '');
    const prev = props.implementation[6].url;
    const next = props.implementation[8].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [strate, setStrate] = React.useState(String);

    const params = ['react_school', 'reach_date', 'match_school', 'match_date', 'safety_school', 'safety_date'];

    React.useEffect(() => {
        props.client.query({query: GET_IMPLEMENTATION, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.implementation.length > 0) {
                    setID(data.implementation[0].id);
                    setStrate(data.implementation[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(
                getVal()
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

    const edtable = () => {
        return (
            <TableRow>
                <TableCell className = {classes.tablecell2}>ED</TableCell>
                {params.map((param, index) =>
                    <TableCell className = {classes.tablecell1} key = {index}>
                        <Textfield id = {`${param}-0-${index}`} disable = {index > 1 ? true : false} value = {strate && JSON.parse(strate)[0][index]}/>
                    </TableCell>
                )}
            </TableRow>
        );
    };

    const eatable = () => {
        var rows = [];
        for (let index = 0; index < 5; index++) {
            rows.push(
                <TableRow key = {index}>
                    {index === 0 && <TableCell className = {classes.tablecell2} rowSpan = '5'>EA</TableCell>}
                    {params.map((param, index1) =>
                        <TableCell className = {classes.tablecell1} key = {index1}>
                            <Textfield id = {`${param}-${1 + index}-${index1}`} disable = {index1 > 3 ? true : false} value = {strate && JSON.parse(strate)[1 + index][index1]}/>
                        </TableCell>
                    )}
                </TableRow>
            );
        };
        return rows;
    };

    const rdtable = () => {
        var rows = [];
        for (let index = 0; index < 14; index++) {
            rows.push(
                <TableRow key = {index}>
                    {index === 0 && <TableCell className = {classes.tablecell2} rowSpan = '14'>RD</TableCell>}
                    {params.map((param, index1) =>
                        <TableCell className = {classes.tablecell1} key = {index1}>
                            <Textfield id = {`${param}-${6 + index}-${index1}`} value = {strate && JSON.parse(strate)[6 + index][index1]}/>
                        </TableCell>
                    )}
                </TableRow>
            );
        };
        return rows;
    };

    const getVal = () => {
        var strates = [];
        for (let index = 0; index < document.getElementById('tbody').childElementCount; index++) {
            var temp = [];
            for (let index1 = 0; index1 < params.length; index1++) {
                temp.push(document.getElementById(`${params[index1]}-${index}-${index1}`).value);
            };
            strates.push(temp);
        };
        return strates;
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
                        <h2 className = 'center'>7.8 Application Strategy Planning</h2>
                        <h3 className = 'center'>(60 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            By now, you have identified who you are, who you want to be, your life vision, intended major, and what colleges you’d like to apply to. 
                            The final big strategic move will be thoroughly thinking about your application strategy, using this worksheet. 
                            A highlight of this process concerns Early Action (EA)/Early Decision (ED)/Regular Decision(RD). 
                            Also, at this point, project management becomes particularly important. 
                            Always be conscious about due dates and work well in advance. 
                        </p>
                        <div className = 'line'></div>
                        <p className = 'mt-5'>
                            1. Deciding between EA/ED/RD is not exactly rocket science. Let's begin with <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}/${props.college[4].url}`} value = 'worksheet 6.5' />.
                        </p>
                        <p className = 'mt-5'>
                            2. Use the following ED diagnostic.                        
                        </p>
                        <ol>
                            <li>
                                Review <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}/${props.college[4].url}`} value = 'worksheet 6.5' />}. Do you have an absolute number one choice? In other words, would you have no regrets not looking at any other options?
                            </li>
                            <li>
                                Do you have enough time to write quality essays before the ED due date? 
                                It depends on how much time you have to pour into essay writing in a short period, 
                                but it is advisable that to spend at least two weeks and ideally one month working on them before the submission deadline. 
                                To be clear, that doesn’t count the time you need to write the Common App essay. 
                                Writing the Common App essay also takes two weeks at least, so you need to budget your time accordingly if you haven’t started your essays at all yet.
                            </li>
                        </ol>
                        <p>
                            If you answered yes for both of the above conditions, your ED choice should be good!
                        </p>
                        <p>
                            If you said yes for (1) but no for (2), consult with your HC if you should apply for ED. 
                            Once you’ve finished your ED application, start writing your RD school essays.
                            If you said yes for (2) but no for (1), you should consider applying EA.
                        </p>
                        <p className = 'mt-5'>
                            3. If you probably won't apply for ED, use the following EA diagnostic.               
                        </p>
                        <ol>
                            <li>
                                Aside from your Common App essay, how much time do you have left? In general, each EA application takes at least two weeks to complete.                            
                            </li>
                            <li>
                                Do any of your EA schools have restrictions on applying to multiple schools? ‘Restricted EA’ usually prevents you from applying to more than one private EA school, but policies differ from college to college.
                            </li>
                        </ol>
                        <p>Here are some sample cases:</p>
                        <p>Case 1: School C is a Match and your 3rd choice. 
                            Since you want to secure a spot as soon as possible, you’ve decided to apply to School C during the EA round. 
                            Your plan is to potentially finish School B’s application (your #2 choice) and/or School E (your #4 choice) as well depending on how much time you have. 
                            Your #1 and #3 choices don’t offer EA, so you will apply to them during RD anyway.
                        </p>
                        <p>Case 2: You want to apply to 3 EA schools: School S, T, and U. 
                            School S is Restricted EA. Since School S is highly selective and your chances to get into it are low anyway, 
                            you’ve decided to apply to School T and U during EA round so that you bet on the higher chances to get offer letters during EA round.
                        </p>
                        <p>Case 3: You want to apply to 2-3 EA schools, but unfortunately the deadline is in two weeks. 
                            You’ve decided to apply for School X, which is your #1 choice, hoping you’ll conclude your college admissions journey in December, 
                            but still working on your essays for regular admission just in case.
                        </p>
                        <p>Case 4: You have fully taken advantage of WeAdmit program, 
                            so you’ve done most of your assignments even before summer between junior and senior. 
                            Instead of ED school, you want to apply to as many EA schools as you can by writing essays during the summer. 
                            Therefore, you’ve decided to apply to EA round of School H, K, L, M, O, Q, and P.
                        </p> 
                        <p className = 'mt-5'>
                            4. Summarize your application plan using the following table. 
                            Check spreadsheet 6.a and pick your submission due date (since dates differ for RD and EA/ED). 
                            Feel free to add extra rows for EA and/or subtract rows from RD as needed. 
                            Remember you can only apply to one ED school. Once you fill out the following table, ask your LC to set up the next HC meeting to review this list.
                        </p>   
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} rowSpan = '2'>ED/EA/RD</TableCell>
                                                <TableCell className = {classes.tablecell} colSpan = '2'>{`Reach(<20%)`}</TableCell>
                                                <TableCell className = {classes.tablecell} colSpan = '2'>{`Match(20 ~ 80%)`}</TableCell>
                                                <TableCell className = {classes.tablecell} colSpan = '2'>{`Safety(>80%)`}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell}>School Name</TableCell>
                                                <TableCell className = {classes.tablecell}>Due date</TableCell>
                                                <TableCell className = {classes.tablecell}>School Name</TableCell>
                                                <TableCell className = {classes.tablecell}>Due date</TableCell>
                                                <TableCell className = {classes.tablecell}>School Name</TableCell>
                                                <TableCell className = {classes.tablecell}>Due date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'tbody'>
                                            {edtable()}
                                            {eatable()}
                                            {rdtable()}
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
        );
    }
};

export default Strate;