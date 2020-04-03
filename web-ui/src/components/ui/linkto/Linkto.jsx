import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    return (
        <Link to = {props.to}>{props.value}</Link>
    );
}