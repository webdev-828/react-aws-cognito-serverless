import { connect } from 'react-redux';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CommentIcon from './../../../../assets/comments/icon-comment';
import Edit from './Edit';
import { fetchUser } from './../../../../reducers/user';
import { GET_DASHBOARD_COMMENT, INSERT_DASHBOARD_COMMENT, DELETE_DASHBOARD_COMMENT } from './../../../../graphql/student/worksheets/dashboard/Dashboard';
import { GET_SELF_COMMENT, INSERT_SELF_COMMENT, DELETE_SELF_COMMENT } from './../../../../graphql/student/worksheets/self-analysis/Self';
import { GET_CORE_COMMENT, INSERT_CORE_COMMENT, DELETE_CORE_COMMENT } from './../../../../graphql/student/worksheets/core-value/Core';
import { GET_LIFE_COMMENT, INSERT_LIFE_COMMENT, DELETE_LIFE_COMMENT } from './../../../../graphql/student/worksheets/life-vision/Life';
import { GET_CAREER_COMMENT, INSERT_CAREER_COMMENT, DELETE_CAREER_COMMENT } from './../../../../graphql/student/worksheets/career/Career';
import { GET_COLLEGE_COMMENT, INSERT_COLLEGE_COMMENT, DELETE_COLLEGE_COMMENT } from './../../../../graphql/student/worksheets/college/College';
import { GET_IMPLEMENTATION_COMMENT, INSERT_IMPLEMENTATION_COMMENT, DELETE_IMPLEMENTATION_COMMENT } from './../../../../graphql/student/worksheets/implementation/Implementation';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    textfield: {
        width: '100%',
        border: 'solid',
        borderColor: '#cdcfd2',
        borderWidth: theme.spacing(0.125),
        borderRadius: 30,
        padding: '1.5%'
    },
    main: {
        paddingLeft: '50px',
        paddingRight: '50px',
        marginTop: '1%',
        border: 'solid 1px grey'
    }
}));

const mapStateToProps = state => {
    return {
      user: state.user.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: _ => dispatch(fetchUser)
    };
};

const LC = (props) => {
    const classes = useStyles();
    const [isOpened, setOpened] = React.useState(false);
    const [comment, setComment] = React.useState(String);
    const [comments, setComments] = React.useState(Array);

    const queries = [
        GET_DASHBOARD_COMMENT, GET_SELF_COMMENT, GET_CORE_COMMENT, GET_LIFE_COMMENT, GET_CAREER_COMMENT, GET_COLLEGE_COMMENT, GET_IMPLEMENTATION_COMMENT
    ];

    const mutations = [
        INSERT_DASHBOARD_COMMENT, INSERT_SELF_COMMENT, INSERT_CORE_COMMENT, INSERT_LIFE_COMMENT, INSERT_CAREER_COMMENT, INSERT_COLLEGE_COMMENT, INSERT_IMPLEMENTATION_COMMENT
    ];

    const delete_mutations = [
        DELETE_DASHBOARD_COMMENT, DELETE_SELF_COMMENT, DELETE_CORE_COMMENT, DELETE_LIFE_COMMENT, DELETE_CAREER_COMMENT, DELETE_COLLEGE_COMMENT, DELETE_IMPLEMENTATION_COMMENT
    ];

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        props.client.query({
            query: queries[props.worksheet], 
            variables: {userid: props.user.id, student_sub: props.student.user_cognito_sub, moduleid: props.sub, itemid: props.item}
        }).then(res => {
            console.log(props, res);
            setComments(res.data.comments);
        });
    };

    const toogleComment = () => {
        if (!isOpened) {
            setOpened(true);
        };      
    };

    const onChange = (event) => {
        if (document.getElementById(`comment-${props.worksheet}-${props.sub}-${props.item}`).value === '') {
            document.getElementById('post_btn').disabled = false;
        } else {
            document.getElementById('post_btn').disabled = true;
        };
    };

    const onPost = () => {
        if (document.getElementById(`comment-${props.worksheet}-${props.sub}-${props.item}`).value === '') {
            return;
        };

        const obj = {
            student_sub: props.student.user_cognito_sub,
            userid: props.user.id,
            moduleid: props.sub,
            itemid: props.item,
            comment: document.getElementById(`comment-${props.worksheet}-${props.sub}-${props.item}`).value
        };

        props.client.mutate({
            mutation: mutations[props.worksheet],
            variables: {
                comments: obj
            }
        }).then(res => {
            var temp = Array.from(comments)
            temp.push(res.data.comment.returning[0]);
            setComments(temp);
            setComment('');
        });
    };

    const onDelete = (id) => {
        const newComments = comments.filter(comment => comment.id !== id);
        setComments(newComments);
    }

    const Textfield = (props) => {
        return (
            <form className = {classes.container} noValidate autoComplete = 'off'>
                <div style = {{width: '100%'}}>
                    <TextField
                        id = {props.id}
                        className = {classes.textfield} 
                        defaultValue = {props.value ? props.value : comment}
                        placeholder = 'Add a comment...'
                        multiline
                        InputProps = {{
                            disableUnderline: true
                        }}
                        onChange = {onChange}
                    />
                </div>
            </form>
        )
    };

    const PostButton = () => {
        return (
            <Button
                onClick = {onPost}
                className = 'pl-4 pr-4'
                id = 'post_btn'
                variant = 'contained'
                color = 'primary'                
                style = {{margin: 10, fontSize: 10}}
                // disabled = {true}
            >
                Post
            </Button>
        );
    };
    
    var count = 0;
    if (comments.length > 0) {
        const replies = comments.filter(comment => comment.reply !== null);
        count = replies.length;
    };
    
    return (
        <div className = {classes.main}>
            <div style = {{color: 'grey', marginTop: 10}}>{`${comments.length} comments / ${count} replies`}</div>
            <div style = {{height: 1, backgroundColor: '#cdcfd2'}}></div>
            <div onClick = {toogleComment} style = {{cursor: 'pointer', marginTop: 10, color: 'grey'}}><CommentIcon /><span style = {{marginLeft: 10}}>Comment</span></div>
            {isOpened &&
                <div style = {{marginTop: 10}}>
                    {comments.map((comment) =>
                        <Edit key = {comment.id} comment = {comment} mutation = {mutations[props.worksheet]} delete = {delete_mutations[props.worksheet]} client = {props.client} deleteAction = {onDelete}/>
                    )}
                    <Textfield id = {`comment-${props.worksheet}-${props.sub}-${props.item}`}/>
                    <PostButton />
                </div>
            }
        </div>
    );     
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (LC);