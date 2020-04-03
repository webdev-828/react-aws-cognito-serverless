import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Dropdown, DropdownItem } from '@duik/it'
import ReplyIcon from '@material-ui/icons/Reply';
import EllipsisIcon from './../../../../assets/comments/icon-ellipsis';
import EditIcon from './../../../../assets/comments/icon-edit';
import DeleteIcon from './../../../../assets/comments/icon-delete';

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
        backgroundColor: '#f3f6f8', 
        marginBottom: 10, 
        borderBottomLeftRadius: 30, 
        borderBottomRightRadius: 30, 
        borderTopRightRadius: 30
    },
    text: {
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 10,
        paddingBottom: 10
    },
    menu: {
        marginRight: 20,
        marginTop: 10
    },
    icon: {
        color: 'grey !important'
    },
    button: {
        border: 'none !important',
        borderColor: 'grey !important',
        borderRadius: '50% !important',
        borderWidth: '1px !important',
        padding: '0px !important',
        backgroundColor: '#f3f6f8 !important'
    },
    main1: {
        paddingLeft: '50px',
        paddingRight: '50px',
        marginTop: '1%'
    },
    flex_right: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    student_pic: {
        width: 25,
        border: 'solid',
        borderRadius: 12.5,
        borderWidth: 1,
        borderColor: 'snow'
    }
}));

const Edit = (props) => {
    const classes = useStyles();
    
    const [isReply, setReply] = React.useState(false);
    const [isEdit, setEdit] = React.useState(false);
    const [isFilled, setFilled] = React.useState(true);
    const [comment, setComment] = React.useState(props.comment);

    const onChange = () => {
        // console.log('here');
    };

    const onReply = () => {
        const obj = {
            id: comment.id,
            student_sub: comment.student_sub,
            userid: comment.userid,
            moduleid: comment.moduleid,
            itemid: comment.itemid,
            comment: comment.comment,
            reply: document.getElementById(`reply-${comment.id}`).value
        };

        props.client.mutate({
            mutation: props.mutation,
            variables: {
                comments: obj
            }
        }).then(res => {
            setComment(res.data.comment.returning[0]);
            setEdit(false);
            setReply(false);
            props.action();
        });
    }

    const onCancel = () => {
        setEdit(false);
        setReply(false);
    };

    const handleReply = () => {
        setReply(true);
    };

    const handleEdit = () => {
        setEdit(true)
    };

    const handleDelete = async () => {
        const obj = {
            id: comment.id,
            student_sub: comment.student_sub,
            userid: comment.userid,
            moduleid: comment.moduleid,
            itemid: comment.itemid,
            comment: comment.comment,
            reply: null
        };

        props.client.mutate({
            mutation: props.mutation,
            variables: {
                comments: obj
            }
        }).then(res => {
            setComment(res.data.comment.returning[0]);
            setEdit(false);
            setReply(false);
            props.action();
        });
    };

    const Textfield = (props) => {
        return (
            <form className = {classes.container} noValidate autoComplete = 'off'>
                <div style = {{width: '100%'}}>
                    <TextField
                        id = {props.id}
                        className = {classes.textfield} 
                        defaultValue = {props.value}
                        placeholder = 'Add a comment...'
                        multiline
                        InputProps = {{
                            disableUnderline: true
                        }}
                        onChange = {isFilled ? onChange : null}
                    />
                </div>
            </form>
        )
    };

    const ReplyButton = () => {
        return (
            <Button
                onClick = {onReply}
                className = 'pl-4 pr-4'
                variant = 'contained'
                color = 'primary'
                style = {{margin: 10, fontSize: 10}}
            >
                Reply
            </Button>
        );
    }

    const UpdateButton = () => {
        return (
            <Button
                onClick = {onReply}
                className = 'pl-4 pr-4'
                variant = 'contained'
                color = 'primary'
                style = {{margin: 10, fontSize: 10}}
            >
                Update
            </Button>
        );
    };

    const CancelButton = () => {
        return (
            <Button
                onClick = {onCancel}
                className = 'pl-4 pr-4'
                variant = 'contained'
                style = {{margin:10, fontSize: 10,}}
            >
                Cancel
            </Button>
        );
    };
    
    return (
        <div className = {classes.main}>
            <div className = {classes.flex_right}>
                <Dropdown 
                    className = {classes.menu} 
                    buttonText={<EllipsisIcon />} 
                    menuPosition="bottom-left" 
                    buttonProps={{
                        hideArrows: true,
                        square: true,
                        className: classes.button
                    }}
                >
                    {
                        ( props )=>{
                            const handleClickReply = () => {
                                handleReply();
                                props.handleClose();
                            };

                            const handleClickEditItem = ()=>{
                                handleEdit();
                                props.handleClose();
                            };

                            const handleClickDeleteItem = () => {
                                handleDelete();
                                props.handleClose();
                            }

                            return (
                                <React.Fragment>
                                    {comment.reply === null &&
                                        <DropdownItem className = {classes.icon} onClick = {handleClickReply}><ReplyIcon style = {{color: 'grey', marginRight: 10}} />Reply</DropdownItem>
                                    }                                    
                                    {comment.reply !== null &&
                                        <React.Fragment>
                                            <DropdownItem className = {classes.icon} onClick = {handleClickEditItem}><EditIcon />Edit</DropdownItem>
                                            <DropdownItem className = {classes.icon} onClick = {handleClickDeleteItem}><DeleteIcon />Delete</DropdownItem>                                    
                                        </React.Fragment>
                                    }
                                </React.Fragment>
                            );
                        }
                    }                    
                </Dropdown>
            </div>
            {(!isEdit || !isReply) &&
                <div className = {classes.text}>
                    <p>{`${comment.LC.user_first_name + ' ' + comment.LC.user_last_name} : ${comment.comment}`}</p>
                    {comment.reply !== null && <p><img className = {classes.student_pic} alt = 'student_pic' src = {comment.Student.student_profiles[0].user_pic}/> : {comment.reply}</p>}
                </div>
            }
            {isEdit &&
                <div className = {classes.main1}>
                    <Textfield id = {`reply-${comment.id}`} value = {comment.reply} />
                    <div className = {classes.flex_right}>
                        <UpdateButton />
                        <CancelButton />
                    </div>
                </div>
            }
            {isReply &&
                <div className = {classes.main1}>
                <Textfield id = {`reply-${comment.id}`} />
                <div className = {classes.flex_right}>
                    <ReplyButton />
                    <CancelButton />
                </div>
            </div>
            }
        </div>
    );
};

export default Edit;