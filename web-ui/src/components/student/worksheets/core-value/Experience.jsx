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
import { GET_CORE, INSEERT_CORE } from './../../../../graphql/student/worksheets/core-value/Core';

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
        width: '45%'
    },
    tablecell3: {
        border: 'solid',
        borderWidth: '1px',
        width: '55%'
    },
    tablecell4: {
        border: 'solid',
        borderWidth: '1px',
        width: '94%'
    },
    textfield: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    }
}));

const Experience = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.cores[2].url, '');
    const prev = props.cores[1].url;
    const next = props.cores[3].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [experience, setExperience] = React.useState(String);

    const params = [
        'thing', 'enjoy', 'hardest', 'mistake', 'heardfelt', 'proud', 'time', 'leadership', 'extre', 'colla', 'cross', 'you', 'someone', 'change'
    ];
    const params1 = ['val_last', 'val_more']

    const trs = [
        'Thing you love to do the most', 
        'Most enjoyable experience',
        'Hardest experience',
        'Biggest failure/mistake',
        'Most heartfelt experience',
        'Experience you were most proud of',
        'Time when you excelled unexpectedly',
        'Leadership experience',
        'Entrepreneurial experience',
        'Collaborative experience',
        'Cross-cultural experience',
        'Time you helped someone',
        'Time when someone helped you',
        'Time when you made a change'
    ];

    React.useEffect(() => {
        props.client.query({query: GET_CORE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.core.length > 0) {
                    setID(data.core[0].id);
                    setExperience(data.core[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var last = [];
        for (var index = 0; index < document.getElementById('last').childElementCount; index++) {
            last.push(document.getElementById(`la-${params[index]}`).value);            
        };

        var lsign = [];
        for (var index1 = 0; index1 < document.getElementById('lsign').childElementCount; index1++) {
            lsign.push(document.getElementById(`${params1[0]}${index1}`).value);
        };

        var more = [];
        for (var index2 = 0; index2 < document.getElementById('more').childElementCount; index2++) {
            more.push(document.getElementById(`mo-${params[index2]}`).value);            
        };

        var msign = [];
        for (var index3 = 0; index3 < document.getElementById('msign').childElementCount; index3++) {
            msign.push(document.getElementById(`${params1[1]}${index3}`).value);
        };

        const experience_obj = {
            last: last,
            more: more,
            lsign: lsign,
            msign: msign
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(experience_obj)
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_CORE,
            variables: {
                core: obj
            }
        }).then(res => {
            const data = res.data;
            if (data.core.affected_rows > 0) {
                props.history.push(root);
            }
        });
    };

    const lastTable = () => {
        return (
            <TableBody id = 'last'>          
                {trs.map((tr, index) =>
                    <TableRow key = {index}>
                        <TableCell className = {classes.tablecell1}>
                            {index + 1}
                        </TableCell>
                        <TableCell className = {classes.tablecell2}>
                            {tr}
                        </TableCell>
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`la-${params[index]}`} value = {experience && JSON.parse(experience).last[index]}/>
                        </TableCell>
                    </TableRow>
                )}
                
            </TableBody>
        )
    };

    const moreTable = () => {
        return (
            <TableBody id = 'more'>          
                {trs.map((tr, index) =>
                    <TableRow key = {index}>
                        <TableCell className = {classes.tablecell1}>
                            {index + 1}
                        </TableCell>
                        <TableCell className = {classes.tablecell2}>
                            {tr}
                        </TableCell>
                        <TableCell className = {classes.tablecell3}>
                            <Textfield id = {`mo-${params[index]}`} value = {experience && JSON.parse(experience).more[index]}/>
                        </TableCell>
                    </TableRow>
                )}
                
            </TableBody>
        )
     };

    const lsignTable = () => {
        const body = [];
        for (var index = 0; index < 3; index++) {
            body.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        {index + 1}
                    </TableCell>
                    <TableCell className = {classes.tablecell4}>
                        <Textfield id = {`${params1[0]}${index}`} value = {experience && JSON.parse(experience).lsign[index]}/>
                    </TableCell>
                </TableRow>
            )
        }
        return (
            <TableBody id = 'lsign'>
                {body}   
            </TableBody>
        )
     };

    const msignTable = () => {
        const body = [];
        for (var index = 0; index < 3; index++) {
            body.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        {index + 1}
                    </TableCell>
                    <TableCell className = {classes.tablecell4}>
                        <Textfield id = {`${params1[1]}${index}`} value = {experience && JSON.parse(experience).msign[index]}/>
                    </TableCell>
                </TableRow>
            )
        }
        return (
            <TableBody id = 'msign'>
                {body}               
            </TableBody>
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
                        <h2 className = 'center'>3.3 Experience mapping</h2>
                        <h3 className = 'center'>(60 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>Throughout your life, you’ve experienced a lot of events which have shaped who you into who you are now. They don’t have to be spectacular, like winning a national championship or traveling to 10 countries; jot down whatever comes to mind.</p>
                        <div className = 'line'></div>
                        <p>[Last 3 years]</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>No</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Items</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Brief description</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {lastTable()}
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p>Which of these experiences were most significant to you? Indicate the number and describe how they shaped your beliefs/core values.</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>No</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>How these experiences shaped your beliefs/philosophy/core values</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {lsignTable()}
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
                                ]
                            } 
                        />
                        <p>[More than 3 years ago]</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>No</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Items</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Brief description</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {moreTable()}
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {2} />
                                ]
                            } 
                        />
                        <p>Which of these experiences were most significant to you? Indicate the number and describe how they shaped your beliefs/core values.</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>No</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>How these experiences shaped your beliefs/philosophy/core values</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {msignTable()}
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
        );
    }
};

export default Experience;