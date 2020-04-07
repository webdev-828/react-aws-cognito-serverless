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
import { GET_SELF, INSEERT_SELF } from './../../../../graphql/student/worksheets/self-analysis/Self';

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
        padding: '2%',
        fontSize: '1rem',
        border: 'solid',
        borderWidth: '1px'
    },
    tablecell2: {
        border: 'solid',
        borderWidth: '1px',
        width: '60%'
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

const Favorites = (props) => {
    const classes = useStyles();

    const root = props.location.pathname.replace(props.analysis[4].url, '');
    const prev = props.analysis[3].url;
    const next = props.analysis[5].url;

    const params1 = ['like', 'like_example'];
    const params2 = ['unlike', 'unlike_example'];

    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [favorites, setFavorites] = React.useState(String);

    React.useEffect(() => {
        props.client.query({query: GET_SELF, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.self.length > 0) {
                    setID(data.self[0].id);
                    setFavorites(data.self[0].value);
                };
            };
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        var likes = [];
        var unlikes = [];
        var tbody = document.getElementById('like');
        var count = tbody.childElementCount;
        for (var index = 0; index < count; index++) {
            var like = document.getElementById(`${params1[0]}-${index}`).value;
            var like_example = document.getElementById(`${params1[1]}-${index}`).value;
            const like_obj = {
                id: index,
                like: like,
                example: like_example
            };
            likes.push(like_obj)
        };

        var unliketbody = document.getElementById('unlike');
        var count1 = unliketbody.childElementCount;
        for (var index1 = 0; index1 < count1; index1++) {
            var unlike = document.getElementById(`${params2[0]}-${index1}`).value;
            var unlike_example = document.getElementById(`${params2[1]}-${index1}`).value;
            const unlike_obj = {
                id: index,
                unlike: unlike,
                example: unlike_example
            };
            unlikes.push(unlike_obj)
        };

        const favorite_obj = {
            like: likes,
            unlike: unlikes
        };
        
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: JSON.stringify(favorite_obj)
        };
        if (id !== 0) {
            obj.id = id;
        };

        props.client.mutate({
            mutation: INSEERT_SELF,
            variables: {
                self: obj
            }
        }).then(res => {
            if (res.data.self.affected_rows > 0) {
                props.history.push(root);
            }
        });
    };

    const likesTable = () => {
        var tbody = [];
        for (var index = 0; index < 5; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1} >
                        <Textfield id = {`${params1[0]}-${index}`} value = {favorites && JSON.parse(favorites).like[index].like}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2} >
                        <Textfield id = {`${params1[1]}-${index}`} value = {favorites && JSON.parse(favorites).like[index].example}/>
                    </TableCell>
                </TableRow>
            );            
       };
        return tbody;
    };

    const unlikesTable = () => {
        var tbody = [];
        for (var index = 0; index < 5; index++) {
            tbody.push(
                <TableRow key = {index}>
                    <TableCell className = {classes.tablecell1} >
                        <Textfield id = {`${params2[0]}-${index}`} value = {favorites && JSON.parse(favorites).unlike[index].unlike}/>
                    </TableCell>
                    <TableCell className = {classes.tablecell2} >
                        <Textfield id = {`${params2[1]}-${index}`} value = {favorites && JSON.parse(favorites).unlike[index].example}/>
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
        return(
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
                        <h2 className = 'center'>2.5 What you like/dislike about yourself</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>
                            Be truthful and write honestly; do not write superficially.
                        </p>
                        <div className = 'line'></div>
                        <p>(Fill out 5 items)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Things you like about yourself</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Examples (how these have manifested in your life)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'like'>
                                            {likesTable()}
                                        </TableBody>
                                    </Table>,
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {0}/>
                                ]
                            } 
                        />
                        <br/>
                        <p>(Fill out 5 items)</p>    
                        <Wrapper 
                            components = {
                                [
                                    <Table className = {classes.table} aria-label = 'caption table'>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className = {classes.tablecell} align = 'center'>Things you dislike about yourself</TableCell>
                                                <TableCell className = {classes.tablecell} align = 'center'>Examples (how these have manifested in your life)</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody id = 'unlike'>
                                            {unlikesTable()}
                                        </TableBody>
                                    </Table>,
                                    <Comment type = {props.type} client = {props.client} student = {props.student} worksheet = {props.worksheet_id} sub = {props.subid} item = {1}/>
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
}
export default Favorites;