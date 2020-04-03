import React from 'react';
import './App.css';
import {createBrowserHistory} from 'history';
import {Router, Switch, Route} from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import MomentUtils from '@date-io/moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import "antd/dist/antd.css";
import Home from './components/Home';
import Logout from './components/auth/Logout';
import {configureAmplify} from './Services';

configureAmplify();
const history = createBrowserHistory();

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <SnackbarProvider SnackbarProps={{ autoHideDuration: 3000 }}>
        <Router history={history}>
          <Switch>
            <Route path='/logout' component={Logout} />
            <Route path='/' component={Home} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
