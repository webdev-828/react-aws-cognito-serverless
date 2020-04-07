import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import Wrapper from './../../../ui/wrapper/Wrapper';
import Comment from './../../../ui/comment/Comment';
import { GET_SELF, INSEERT_SELF } from './../../../../graphql/student/worksheets/self-analysis/Self';

const useStyles = makeStyles(theme => ({
    icon: {
        fontSize: '3rem',
        color: 'grey'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textfield: {
        width: '100%',
        padding: '0.5rem',
        paddingTop: '1rem'
    }
}));

const Statement = (props) => {  
    const classes = useStyles();
    const root = props.location.pathname.replace(props.analysis[0].url, '');
    const next = props.analysis[1].url;
    
    const [id, setID] = React.useState(0);
    const [isLoaded, setLoaded] = React.useState(false);
    const [statement, setStatement] = React.useState(String);

    React.useEffect(() => {
        props.client.query({query: GET_SELF, variables: {usersub: props.sub, subid: props.subid}}).then(res => {
            const data = res.data;
            if (data) {
                setLoaded(true);
                if (data.self.length > 0) {
                    setID(data.self[0].id);
                    setStatement(data.self[0].value);
                };
            }
        });
    }, [props.client, props.sub, props.subid, props.location.pathname]);

    const handleClick = () => {
        const obj = {
            usersub: props.sub,
            sub_id: props.subid,
            value: document.getElementById('statement').value
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
            const data = res.data;
            if (data.self.affected_rows > 0) {
                props.history.push(root);
            }
        });
    };

    const Textfield = (props) => {
        return (
            <form className = {classes.container} noValidate autoComplete = 'off'>
                <div style = {{width: '100%', border: 'solid', borderWidth: '0.05rem'}}>
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
                        <h2 className = 'center'>2.1 Statement of Commitment</h2>
                        <h3 className = 'center'>(15 min)</h3>
                    </div>
                </div>
                <div className = 'center'>
                    <div className = 'p-60'>
                        <p>Write about why YOU (not your parents) have decided to participate in the WeAdmit college admissions program. Be authentic to yourself and log how you feel now as well as what you ultimately want to achieve through participation in this program. This statement will help you when you get stuck and want to give up by reminding you of your motivation to start in the first place.</p>
                        <div className = 'line'></div>
                        <p>(limit: 200 words)</p>
                        <Wrapper 
                            components = {
                                [
                                    <Textfield id = 'statement' value = {statement && statement}/>, 
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
}
export default Statement;