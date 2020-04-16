import React from 'react';
import { Route } from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';
import { createStyles, withStyles } from '@material-ui/core/styles';
import SidebarComponent from './ui/sidebar/SidebarComponent';
import HcProfile from './pages/hcprofile';
import HcStudents from './hc/HcStudents';
import HcSchedule from './hc/HcSchedule';
import VideoChat from './twilio/VideoChat';
import Logout from './auth/Logout';

const styles = (theme) =>
  createStyles({
    container: {
      height: '100%',
      minHeight: '100vh',
    },
    content: {
      marginTop: 54,
    },
    mainBlock: {
      backgroundColor: '#F7F8FC',
      padding: 30,
      width: '100%',
      height: '100%',
      overflow: 'scroll',
    },
  });

class Hc extends React.Component {
  constructor(props) {
    super(props);
  }
  state = { selectedItem: this.props.history.location.pathname };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => this.forceUpdate();

  render() {
    const { selectedItem } = this.state;
    const { classes } = this.props;
    console.log('HC', this.props.content);
    return (
      <Row className={classes.container}>
        <SidebarComponent
          selectedItem={selectedItem}
          onChange={(selectedItem) => this.setState({ selectedItem })}
          content={this.props.content}
          type="lc"
        />
        <Column flexGrow={1} className={classes.mainBlock}>
          <div>
            <Route path={this.props.content[1].url} component={HcStudents} />
            <Route path={this.props.content[2].url} component={HcSchedule} />
            <Route path={this.props.content[3].url} component={VideoChat} />
            <Route path="/logout" component={Logout} />
            <Route
              exact
              path={this.props.content[0].url}
              render={() => <HcProfile sub={this.props.sub} />}
            />
          </div>
        </Column>
      </Row>
    );
  }
}

export default withStyles(styles)(Hc);
