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

const Search = (props) => {
    const classes = useStyles();
    const root = props.location.pathname.replace(props.college[1].url, '');
    const prev = props.college[0].url;
    const next = props.college[2].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [college, setCollege] = React.useState(String);
    
    const contents1 = ['To be', 'To have', 'To give'];
    const heads = ['School Name', 'Available intended majors', 'Meet criteria2?', 'Meet criteria3?', 'Remarks'];
    const params = ['school', 'major', 'meet2', 'meet3', 'remarks'];

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

    const criteriaTable = () => {
        var trows = [];
        for (let index = 0; index < 3; index++) {
            trows.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        {index === 0 && 'Intended Majors'}
                        {index !== 0 && <Textfield id = {`criteria${index}`} value = {college ? JSON.parse(college)[2][index][0] : ''}/>}
                    </TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`look${index}`} value = {college ? JSON.parse(college)[2][index][1] : ''}/>
                    </TableCell>
                </TableRow>
            );
        };
        return (
            trows
        );
    };

    const relaxTable = () => {
        var tbody = [];
        for (let index1 = 0; index1 < 36; index1++) {
            tbody.push(
                <TableRow key = {index1}>
                    {params.map((param, index2) =>
                        <TableCell className = {classes.tablecell1} key = {index2}>
                            <Textfield id = {`${param}-${index1}`} value = {college ? JSON.parse(college)[3][index1][index2] : ''}/>
                        </TableCell>
                    )}
                </TableRow>
            )        
        }       
        return (
            <Table className = {classes.table} aria-label = 'caption table'>
                <TableHead>
                    <TableRow>
                        {heads.map((head, index) =>
                            <TableCell className = {classes.tablecell} key = {index}>{head}</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tbody}
                </TableBody>
            </Table>
        );
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

        var criterias = [];
        for (let index2 = 0; index2 < 3; index2++) {
            var temp = [];
            if (index2 === 0) {
                temp.push('');
            } else {
                temp.push(document.getElementById(`criteria${index2}`).value);
            };
            temp.push(document.getElementById(`look${index2}`).value);
            criterias.push(temp);
        };

        var relaxes = [];
        for (let index3 = 0; index3 < 36; index3++) {
            const temp = [
                document.getElementById(`${params[0]}-${index3}`).value,
                document.getElementById(`${params[1]}-${index3}`).value,
                document.getElementById(`${params[2]}-${index3}`).value,
                document.getElementById(`${params[3]}-${index3}`).value,
                document.getElementById(`${params[4]}-${index3}`).value
            ];
            relaxes.push(temp);
        };

        return [summaries, dreams, criterias, relaxes]
    };

    if (!isLoaded) {
        return (
            <p>Loading ... </p>
        )
    } else {
        if (college) {
            console.log(JSON.parse(college)[2][0][1])
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
                        <h2 className = 'center'>6.2 Preliminary college shortlisting</h2>
                        <h3 className = 'center'>(90 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            Congrats! You’ve finally arrived at this thrilling moment! 
                            It’s technically possible anytime to check college rankings, college search engines randomly. 
                            However, you’ve completed a long long way to understand yourself and how the college world really works. 
                            Now, you know what/how/where you want to learn. 
                            Let’s go to the next huge step: searching for a best-fit college for you.
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
                            3. Look up worksheet <Linkto to = {`${props.pathname}/${props.worksheets[5].worksheet_url}/${props.college[0].url}`} value = '6.1'/> and write your top three college search criteria. 
                            Write your choice of options for each criterion. 
                            Regarding intended majors, look up worksheet <Linkto to = {`${props.pathname}/${props.worksheets[4].worksheet_url}/${props.careers[7].url}`} value = '5.8'/> and copy-paste your declared intended majors. 
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell}>Criteria</TableCell>
                                                <TableCell className = {classes.tablecell}>What you are looking for</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {criteriaTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
                                ]
                            }
                        />
                        <p className = 'mt-5'>
                            4. With reminding all of the above to yourself, go to any online/offline college search engines. 
                            You may be urged to check colleges you’ve heard of or visited in the past. 
                            But you should broaden your mind for now. 
                            Check as many colleges as you can and quickly scan the school information to see whether the schools meet with all of your criteria. 
                            If you feel good, add these college names to the following list for later research purposes. 
                            No need to think about priority for now. Stick to your criteria.
                        </p>
                        <p><Href href = 'https://bigfuture.collegeboard.org/college-search' /></p>
                        <p><Href href = 'https://www.petersons.com/college-search.aspx' /></p>
                        <p><Href href = 'https://www.princetonreview.com/college-search' /></p>
                        <p><Href href = 'https://www.usnews.com/best-colleges/college-search' /></p>
                        <p><Href href = 'https://www.niche.com/colleges/search/all-colleges/' /></p>
                        <p><Href href = 'https://www.cappex.com/colleges' /></p>
                        <p>(Enter at least 20 schools. If you can’t find a sufficient number of schools, it implies that your criteria are too niche. If that’s the case, try to relax the criteria so that you can find fair enough candidates)</p>
                        <Wrapper 
                            components = {
                                [
                                    relaxTable(), 
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
};

export default Search;