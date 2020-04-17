import React from 'react';
import { Route } from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';
import { createStyles, withStyles } from '@material-ui/core/styles';
import SidebarComponent from './ui/sidebar/SidebarComponent';
import LcProfile from './pages/lcprofile'
import SmsSender from './pages/smsSender';
import EmailSender from './pages/emailSender';
import LcStudents from './lc/LcStudents';
import LcSchedule from './lc/LcSchedule';
import VideoChat from './twilio/VideoChat';
import Document from './lc/document';
import Logout from './auth/Logout';


const styles = theme => createStyles({
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
        width: '100%',
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
        const { classes } = this.props;
        return (
            <Row className = {classes.container}>
                <SidebarComponent selectedItem = {selectedItem} onChange = {(selectedItem) => this.setState({selectedItem})} content = {this.props.content} type = 'lc'/>
                <Column flexGrow = {1} className ={classes.mainBlock}>
                    <div>
                        <Route path = {this.props.content[1].url} component ={SmsSender} />
                        <Route path = {this.props.content[2].url} component = {EmailSender} />
                        <Route path = {this.props.content[3].url} component ={LcStudents} />
                        <Route path = {this.props.content[4].url} component = {LcSchedule} />
                        <Route path = {this.props.content[5].url} component = {VideoChat} />
                        <Route path = {this.props.content[6].url} component = {Document} />
                        <Route path = '/logout' component = {Logout} />
                        <Route exact path = {this.props.content[0].url} render = {() => <LcProfile sub={this.props.sub} />} />
                    </div>
                </Column>
            </Row>
        );
    };
};

export default withStyles(styles)(Lc);
