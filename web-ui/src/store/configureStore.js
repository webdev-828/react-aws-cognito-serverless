import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './../reducers/index';
import storeLogger from './../middlewares/storeLogger';
import rootSaga from './../sagas';

export default () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [storeLogger, thunk, sagaMiddleware];
    const composeEnhancers =
      process.env.NODE_ENV !== 'production'
        ? composeWithDevTools(applyMiddleware(...middlewares))
        : applyMiddleware(...middlewares);

    const store = createStore(rootReducer, composeEnhancers);

    sagaMiddleware.run(rootSaga);

    return store;
}
