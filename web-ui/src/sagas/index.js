import { takeEvery, call, put } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import { SET_USER, FETCH_USER, RECEIVE_USER, REQEUST_USER } from './../reducers/user';
import { SET_WORKSHEETS, FETCH_WORKSHEETS, RECEIVE_WORKSHEETS, REQUEST_WORKSHEETS } from './../reducers/worksheet';
import { SET_DASHBOARD, FETCH_DASHBOARD, RECEIVE_DASHBOARD, REQEUST_DASHBOARD } from './../reducers/dashboard';
import { SET_ANALYSIS, FETCH_ANALYSIS, RECEIVE_ANALYSIS, REQEUST_ANALYSIS } from './../reducers/analysis';
import { SET_CORE, FETCH_CORE, RECEIVE_CORE, REQEUST_CORE } from './../reducers/core';
import { SET_LIFE, FETCH_LIFE, RECEIVE_LIFE, REQEUST_LIFE } from './../reducers/life';
import { SET_CAREER, FETCH_CAREER, RECEIVE_CAREER, REQEUST_CAREER } from './../reducers/career';
import { SET_COLLEGE, FETCH_COLLEGE, RECEIVE_COLLEGE, REQEUST_COLLEGE } from './../reducers/college';
import { SET_IMPLEMENTATION, FETCH_IMPLEMENTATION, RECEIVE_IMPLEMENTATION, REQEUST_IMPLEMENTATION } from './../reducers/implementation';
import { FETCH_UNIVERSITIES, ADD_UNIVERSITY, EDIT_UNIVERSITY, REQUEST_UNIVERSITIES, RECEIVE_UNIVERSITIES } from './../reducers/university';
import { user, worksheet, dashboard, analysis, core, life, career, college, implementation, university } from './../api';

function* fetchUserAsync() {
    yield put({type: REQEUST_USER});
    const userinfo = yield call(user.fetchUser);
    yield put({type: RECEIVE_USER, userinfo});
};

function* takeAddUser() {
    yield takeEvery(SET_USER, function* (action) {
        yield call(user.setUser, {user: action.user});
        yield fetchUserAsync();
   });
};

function* takeFetchUser() {
    yield takeEvery(FETCH_USER, fetchUserAsync);
};

function* fetchWorksheetsAsync() {
    yield put({type: REQUEST_WORKSHEETS});
    const worksheets = yield call(worksheet.fetchWorksheets);
    yield put({type: RECEIVE_WORKSHEETS, worksheets});
};

function* takeAddWorksheets() {
    yield takeEvery(SET_WORKSHEETS, function* (action) {
        yield call(worksheet.setWorksheet, {worksheets: action.worksheets});
        yield fetchWorksheetsAsync();
   });
};

function* takeFetchWorksheets() {
    yield takeEvery(FETCH_WORKSHEETS, fetchWorksheetsAsync);
};

function* fetchDashboardAsync() {
    yield put({type: REQEUST_DASHBOARD});
    const dash = yield call(dashboard.fetchDashboard);
    yield put({type: RECEIVE_DASHBOARD, dash});
};

function* takeAddDashboard() {
    yield takeEvery(SET_DASHBOARD, function* (action) {
        yield call(dashboard.setDashboard, {dashboard: action.dashboard});
        yield fetchDashboardAsync();
   });
};

function* takeFetchDashboard() {
    yield takeEvery(FETCH_DASHBOARD, fetchDashboardAsync);
};

function* fetchAnalysisAsync() {
    yield put({type: REQEUST_ANALYSIS});
    const analys = yield call(analysis.fetchAnalysis);
    yield put({type: RECEIVE_ANALYSIS, analys});
};

function* takeAddAnalysis() {
    yield takeEvery(SET_ANALYSIS, function* (action) {
        yield call(analysis.setAnalysis, {analysis: action.analysis});
        yield fetchAnalysisAsync();
   });
};

function* takeFetchAnalysis() {
    yield takeEvery(FETCH_ANALYSIS, fetchAnalysisAsync);
};

function* fetchCoreAsync() {
    yield put({type: REQEUST_CORE});
    const cor = yield call(core.fetchCore);
    yield put({type: RECEIVE_CORE, cor});
};

function* takeAddCore() {
    yield takeEvery(SET_CORE, function* (action) {
        yield call(core.setCore, {core: action.core});
        yield fetchCoreAsync();
   });
};

function* takeFetchCore() {
    yield takeEvery(FETCH_CORE, fetchCoreAsync);
};

function* fetchLifeAsync() {
    yield put({type: REQEUST_LIFE});
    const lifes = yield call(life.fetchLife);
    yield put({type: RECEIVE_LIFE, lifes});
};

function* takeAddLife() {
    yield takeEvery(SET_LIFE, function* (action) {
        yield call(life.setLife, {life: action.life});
        yield fetchLifeAsync();
   });
};

function* takeFetchLife() {
    yield takeEvery(FETCH_LIFE, fetchLifeAsync);
};

function* fetchCareerAsync() {
    yield put({type: REQEUST_CAREER});
    const careers = yield call(career.fetchCareer);
    yield put({type: RECEIVE_CAREER, careers});
};

function* takeAddCareer() {
    yield takeEvery(SET_CAREER, function* (action) {
        yield call(career.setCareer, {career: action.career});
        yield fetchCareerAsync();
   });
};

function* takeFetchCareer() {
    yield takeEvery(FETCH_CAREER, fetchCareerAsync);
};

function* fetchCollegeAsync() {
    yield put({type: REQEUST_COLLEGE});
    const colleges = yield call(college.fetchCollege);
    yield put({type: RECEIVE_COLLEGE, colleges});
};

function* takeAddCollege() {
    yield takeEvery(SET_COLLEGE, function* (action) {
        yield call(college.setCollege, {college: action.college});
        yield fetchCollegeAsync();
   });
};

function* takeFetchCollege() {
    yield takeEvery(FETCH_COLLEGE, fetchCollegeAsync);
};

function* fetchImplementationAsync() {
    yield put({type: REQEUST_IMPLEMENTATION});
    const implementations = yield call(implementation.fetchImplementation);
    yield put({type: RECEIVE_IMPLEMENTATION, implementations});
};

function* takeAddImplementation() {
    yield takeEvery(SET_IMPLEMENTATION, function* (action) {
        yield call(implementation.setImplementation, {implementation: action.implementation});
        yield fetchImplementationAsync();
   });
};

function* takeFetchImplementation() {
    yield takeEvery(FETCH_IMPLEMENTATION, fetchImplementationAsync);
};

function* takeFetchUniversities() {
    yield takeEvery(FETCH_UNIVERSITIES, function* (action) {
        yield put({type: REQUEST_UNIVERSITIES});
        const result = yield call(university.fetchUniversities, action.data);
        yield put({type: RECEIVE_UNIVERSITIES, result});
    })
}

function* takeAddUniversity() {
    yield takeEvery(ADD_UNIVERSITY, function* (action) {
        const result = yield call(university.addUniversity, action.data);
        yield put({type: RECEIVE_UNIVERSITIES, result});
    })
}

function* takeEditUniversity() {
    yield takeEvery(EDIT_UNIVERSITY, function* (action) {
        const result = yield call(university.editUniversity, action.data)
        yield put({type: RECEIVE_UNIVERSITIES, result});
    })
}

export default function* rootSaga() {
    yield all([
        takeAddUser(),
        takeFetchUser(),
        takeAddWorksheets(),
        takeFetchWorksheets(),
        takeAddDashboard(),
        takeFetchDashboard(),
        takeAddAnalysis(),
        takeFetchAnalysis(),
        takeAddCore(),
        takeFetchCore(),
        takeAddLife(),
        takeFetchLife(),
        takeAddCareer(),
        takeFetchCareer(),
        takeAddCollege(),
        takeFetchCollege(),
        takeAddImplementation(),
        takeFetchImplementation(),
        takeFetchUniversities(),
        takeAddUniversity(),
        takeEditUniversity()
    ]);
};
