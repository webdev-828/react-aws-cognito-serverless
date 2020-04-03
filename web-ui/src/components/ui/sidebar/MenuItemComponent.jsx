import React from 'react';
import { bool, func, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import { Avatar} from '@material-ui/core';
import './style.css'; 

const styles = StyleSheet.create({
    activeBar: {
        height: 24,
        width: 2,
        backgroundColor: '#2c7be5',
        position: 'absolute',
        left: 0
    },
    activeContainer: {
        borderLeft: 'solid',
        backgroundColor: 'rgba(221,226,255, 0.08)'
    },
    activeTitle: {
        color: '#0F78FF'
    },
    container: {
        height: 24,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(221,226,255, 0.08)'
        },
        marginTop: '1rem',
        marginBottom: '1rem',
        paddingLeft: 32,
        paddingRight: 32
    },
    title: {
        fontSize: '0.9375rem',
        lineHeight: '20px',
        letterSpacing: '0.2px',
        color: '#6e84a3',
        marginLeft: 10
    },
    sub: {
        fontSize: '0.8125rem'
    },
    centerTitle: {
        marginLeft: '0px !important',
        marginTop: '-2rem'
    },
    popover: {
        pointerEvents: 'none'
    },
    avatar: {
        backgroundColor: '#9ca27e'
    }
});

const MenuItemComponent = (props) => {
    const [anchorEL, setAnchorEL] = React.useState(null);
    const { sub, active, icon, title, isCenter, ...otherProps } = props;
    var Icon;
    var IconActive;
    if (icon) {
        Icon = icon[0];
        IconActive = icon[1];
    };
    const handlePopoverOpen = event => {
        setAnchorEL(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEL(null);
    };

    const open = Boolean(anchorEL);

    return (
        <Row className={css(styles.container, (active && !sub) && styles.activeContainer)} vertical="center" {...otherProps}>
            {(icon && (active === false)) && <Icon active = {false} />}
            {(icon && (active === true)) && <IconActive active = {true} />}
            {!isCenter && <span className={css(styles.title, active && styles.activeTitle, sub && styles.sub)}>{title}</span>}
            {(isCenter && props.type === 'lc') && 
                <div className = {css(styles.centerTitle)} id = 'tooltip'>
                    <span className = 'tooltiptext_lc'>
                        <Link to = '/logout' style = {{color: '#6e84a3'}}>
                            Logout
                        </Link>
                    </span>
                    <span className={css(styles.title)}>
                        <Avatar className = {css(styles.avatar)}>{title.substr(0, 2).toUpperCase()}</Avatar>
                    </span>
                </div>
            }
            {(isCenter && props.type === 'student') && 
                <div id = 'tooltip' style = {{marginTop: -56, marginLeft: 46}}>
                    <span className = 'tooltiptext_student'>
                        <Link to = '/logout' style = {{color: '#6e84a3'}}>
                            Logout
                        </Link>
                    </span>
                    <span className={css(styles.title)}>
                        <Avatar className = {css(styles.avatar)}>{title.substr(0, 2).toUpperCase()}</Avatar>
                    </span>
                </div>
            }
            
        </Row>
    );
}

MenuItemComponent.propTypes = {
    sub: bool,
    active: bool,
    icon: func,
    title: string,
    isCenter: bool
};

export default MenuItemComponent;