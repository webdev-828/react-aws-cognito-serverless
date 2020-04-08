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
        width: '80%'
   },
    textfield: {
        width: '100%',
        padding: '0.5rem',
        paddingTop: '1rem'
   }
}));

const Community = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.cores[4].url, '');
    const prev = props.cores[3].url;
    const next = props.cores[5].url;

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [community, setCommunity] = React.useState(String);

    const params = ['community', 'value'];

    React.useEffect(() => {
        props.client.query({query: GET_CORE, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.core.length > 0) {
                    setID(data.core[0].id);
                    setCommunity(data.core[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var community = [];
        for (var index = 0; index < document.getElementById('community').childElementCount; index++) {
            const community_obj = {
                community: document.getElementById(`${params[0]}${index}`).value,
                value: document.getElementById(`${params[1]}${index}`).value
            };
            community.push(community_obj);
        };
        const commu_obj = {
            community: community,
            belong: document.getElementById('belong').value
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(commu_obj)
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

    const BelongTextfield = (props) => {
        return (
            <form className = {classes.container} noValidate autoComplete = 'off' style = {{border: 'solid', borderWidth: '0.01rem'}}>
                <div style = {{width: '100%'}}>
                    <TextField
                        id = {props.id}
                        className = {classes.textfield}                        
                        defaultValue = {props.value}
                        multiline
                        InputProps = {{
                            disableUnderline: true
                        }}
                    />
                </div>
            </form>
        )
    };

    const communityTable = () => {
        var tbody = []
        for (var index = 0; index < 10; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1}>
                        <Textfield id = {`${params[0]}${index}`} value = {community && JSON.parse(community).community[index].community}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2}>
                        <Textfield id = {`${params[1]}${index}`} value = {community && JSON.parse(community).community[index].value}/>
                    </TableCell>
                </TableRow>
            );
        };
        return tbody;
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
                        <h2 className = 'center'>3.5 Communities/groups you belong to</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p className = 'text_center'>
                            Communities/groups often unconsciously reflect your interests, beliefs, personality and so forth. In a way, the people with whom you surround yourself mirror who you are. You may only belong to one community, you may be versatile and belong to a wide range of communities. Identify as many communities/groups as possible to which you belong, whether they be classes, extracurriculars, online, or within your neighborhood.
                        </p>
                        <div className = 'line'></div>
                        <p>(Fill out at least 5 items)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Community</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>What does the community look like? How actively are you involved?</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'community'>
                                            {communityTable()}
                                        </TableBody>
                                    </Table>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0} />
                                ]
                            } 
                        />
                        <p>
                            What did you realize about the communities you belong to?
                            Are you a balanced or focused person?
                            How have the people surrounding you shaped your personality?
                        </p>
                        <Wrapper 
                            components = {
                                [
                                    <BelongTextfield id = 'belong' value = {community && JSON.parse(community).belong}/>, 
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1} />
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
    };
};

export default Community;