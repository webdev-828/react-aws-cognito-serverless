import React from 'react';
import { Route } from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';
import { StyleSheet, css} from 'aphrodite';
import SidebarComponent from './ui/sidebar/SidebarComponent';
import AdminHome from './admin/AdminHome';
import AdminStudents from './admin/AdminStudents';
import AdminLeadCoaches from './admin/AdminLeadCoaches';
import AdminHeadCounselors from './admin/AdminHeadCounselors';
import Logout from './auth/Logout';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        minHeight: '100vh'
    },
    content: {
        marginTop: 54
    },
    mainBlock: {
        backgroundColor: '#F7F8FC',
        padding: 30,
        width: 'calc(100% - 300px)',
        height: '100%',
        overflow: 'scroll'
    }
});

class Lc extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {selectedItem: this.props.history.location.pathname};

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    };

    resize = () => this.forceUpdate();

    render() {
        const {selectedItem} = this.state;
        return (
            <Row className = {css(styles.container)}>
                <SidebarComponent selectedItem = {selectedItem} onChange = {(selectedItem) => this.setState({selectedItem})} content = {this.props.content} />
                <Column flexGrow = {1} className = {css(styles.mainBlock)}>
                    <div>
                        <Route path = '/students' component = {AdminStudents} />
                        <Route path = '/lcs' component = {AdminLeadCoaches} />
                        <Route path = '/hcs' component = {AdminHeadCounselors} />
                        <Route path = '/logout' component = {Logout} />
                        <Route exact path = '/' component = {AdminHome} />
                    </div>
                </Column>
            </Row>
        );
    };
};

export default Lc;