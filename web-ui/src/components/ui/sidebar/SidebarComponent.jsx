import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css } from 'aphrodite';
import LogoComponent from './LogoComponent';
import MenuItemComponent from './MenuItemComponent';
import IconBurger from '../../../assets/icon-burger';
import { fetchUser } from '../../../reducers/user';

const styles = StyleSheet.create({
    burgerIcon: {
        cursor: 'pointer',
        position: 'absolute',
        left: 24,
        top: 34,
    },
    container: {
        backgroundColor: '#FFFFFF',
        width: 300,
        paddingTop: 32,
        height: '100%',
        overflow: 'auto',
    },
    containerMobile: {
        transition: 'left 0.5s, right 0.5s',
        position: 'absolute',
        width: 300,
        height: '100%',
        zIndex: 901,
        overflow: 'auto',
    },
    mainContainer: {
        height: '100%',
        minHeight: '100vh',
        border: 'solid',
        borderWidth: '0 1px 0 0',
        borderColor: '#e3ebf6',
    },
    mainContainerMobile: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    mainContainerExpanded: {
        width: '100%',
        minWidth: '100vh',
    },
    menuItemList: {
        marginTop: 36,
    },
    outsideLayer: {
        position: 'absolute',
        width: '100vw',
        minWidth: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,.50)',
        zIndex: 900,
    },
    separator: {
        borderTop: '1px solid #e3ebf6',
        marginTop: 16,
        marginBottom: 16,
    },
    hide: {
        left: -300,
    },
    show: {
        left: 0,
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchUser: (_) => dispatch(fetchUser),
    };
};
class SidebarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props.onFetchUser();
    }
    state = { expanded: false };
    onItemClicked = (item) => {
        this.setState({ expanded: false });
        return this.props.onChange(item);
    };

    isMobile = () => window.innerWidth <= 768;
    toggleMenu = () =>
        this.setState((prevState) => ({ expanded: !prevState.expanded }));

    renderBurger = () => {
        return (
            <div onClick={this.toggleMenu} className={css(styles.burgerIcon)}>
                <IconBurger />
            </div>
        );
    };

    render() {
        const { expanded } = this.state;
        const isMobile = this.isMobile();
        return (
            <div style={isMobile ? { width: '0px' } : { width: '300px' }}>
                <Row
                    className={css(styles.mainContainer)}
                    breakpoints={{
                        768: css(
                        styles.mainContainerMobile,
                        expanded && styles.mainContainerExpanded,
                        ),
                    }}
                >
                {isMobile && !expanded && this.renderBurger()}
                    <Column
                        className={css(styles.container)}
                        breakpoints={{
                            768: css(
                                styles.containerMobile,
                                expanded ? styles.show : styles.hide,
                            ),
                        }}
                    >
                        <LogoComponent />
                        <Column className={css(styles.menuItemList)}>
                            {this.props.content.map((content, index) => (
                                <React.Fragment key={index}>
                                    <Link to={content.url} style={{ textDecoration: 'none' }}>
                                        <MenuItemComponent
                                            sub={false}
                                            icon={content.icon && content.icon}
                                            title={content.title}
                                            onClick={() => this.onItemClicked(content.url)}
                                            active={this.props.selectedItem === content.url}
                                            isCenter={false}
                                        />
                                    </Link>
                                </React.Fragment>
                            ))}
                            <div className={css(styles.separator)} />
                            <MenuItemComponent
                                className="center"
                                title={this.props.user.email}
                                onClick={() => this.onItemClicked('Logout')}
                                active={this.props.selectedItem === 'Logout'}
                                isCenter={true}
                                type={this.props.type}
                            />
                        </Column>
                    </Column>
                    {isMobile && expanded && (
                        <div
                            className={css(styles.outsideLayer)}
                            onClick={this.toggleMenu}
                        />
                    )}
                </Row>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarComponent);
