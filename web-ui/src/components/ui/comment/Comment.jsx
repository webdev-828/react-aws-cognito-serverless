import React from 'react';
import LC from './lc/LC';
import Student from './student/Student';

const Comment = (props) => {
    if (props.type === 'lc') {
        return (
            <LC {...props} />
        );
    } else if (props.type === 'student') {
        return (
            <Student {...props}/>
        );
    } else {
        return (
            null
        );
    };
};

export default Comment;