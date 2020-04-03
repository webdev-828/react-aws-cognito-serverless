import { connect } from 'react-redux';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CommentIcon from './../../../../assets/comments/icon-comment';
import Edit from './Edit';
import { fetchUser } from './../../../../reducers/user';
import { GET_DASHBOARD_COMMENT1, INSERT_DASHBOARD_COMMENT } from './../../../../graphql/student/worksheets/dashboard/Dashboard';
import { GET_SELF_COMMENT1, INSERT_SELF_COMMENT } from './../../../../graphql/student/worksheets/self-analysis/Self';
import { GET_CORE_COMMENT1, INSERT_CORE_COMMENT } from './../../../../graphql/student/worksheets/core-value/Core';
import { GET_LIFE_COMMENT1, INSERT_LIFE_COMMENT } from './../../../../graphql/student/worksheets/life-vision/Life';
import { GET_CAREER_COMMENT1, INSERT_CAREER_COMMENT } from './../../../../graphql/student/worksheets/career/Career';
import { GET_COLLEGE_COMMENT1, INSERT_COLLEGE_COMMENT } from './../../../../graphql/student/worksheets/college/College';
import { GET_IMPLEMENTATION_COMMENT1, INSERT_IMPLEMENTATION_COMMENT } from './../../../../graphql/student/worksheets/implementation/Implementation';

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

const Comment = (props) => {
    const classes = useStyles();
    const [isFilled, setFilled] = React.useState(false);
    const [isOpened, setOpened] = React.useState(false);
    const [comments, setComments] = React.useState(String);

    const queries = [
        GET_DASHBOARD_COMMENT1, GET_SELF_COMMENT1, GET_CORE_COMMENT1, GET_LIFE_COMMENT1, GET_CAREER_COMMENT1, GET_COLLEGE_COMMENT1, GET_IMPLEMENTATION_COMMENT1
    ];

    const mutations = [
        INSERT_DASHBOARD_COMMENT, INSERT_SELF_COMMENT, INSERT_CORE_COMMENT, INSERT_LIFE_COMMENT, INSERT_CAREER_COMMENT, INSERT_COLLEGE_COMMENT, INSERT_IMPLEMENTATION_COMMENT
    ];

    React.useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        props.client.query({
            query: queries[props.worksheet], 
            variables: {student_sub: props.user.sub, moduleid: props.sub, itemid: props.item}})
        .then(res => {
            setComments(res.data.comments);
        });
    };

    const toogleComment = () => {
        if (!isOpened) {
            setOpened(true);
            setFilled(false);
        };      
    };

    const handleAction = () => {
        fetchData();
    }

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
            {(isOpened && comments.length > 0) &&
                <div style = {{marginTop: 10}}>
                    {comments.map((comment) =>
                        <Edit key = {comment.id} comment = {comment} mutation = {mutations[props.worksheet]} client = {props.client} action = {handleAction}/>
                    )}
                </div>
            }
        </div>
    );
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (Comment);