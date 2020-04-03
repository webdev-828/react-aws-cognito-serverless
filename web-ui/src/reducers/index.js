import {combineReducers} from 'redux';
import user from './user';
import worksheet from './worksheet';
import dashboard from './dashboard';
import analysis from './analysis';
import core from './core';
import life from './life';
import career from './career';
import college from './college';
import implementation from './implementation';
import student from "./student";
import university from "./university";

export default combineReducers({
    user, worksheet, dashboard, analysis, core, life, career, college, implementation, student, university
});
