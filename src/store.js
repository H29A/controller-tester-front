import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import { throttle } from 'lodash';

import { saveState } from './utils/persist';

import createReducer from './reducers';
import sagas from './store/controllers/sagas';

const injectSyncSagas = (inject) => (sagas) => sagas.forEach(inject);
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
    // Create the store with 1 middleware
    // 1. sagaMiddleware: Makes redux-sagas work
    const middlewares = [
        sagaMiddleware
    ];

    const enhancers = [
        applyMiddleware(...middlewares)
    ];

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            : compose;

    const store = createStore(
        createReducer(),
        fromJS(initialState),
        composeEnhancers(...enhancers)
    );

    store.subscribe(throttle(() => {
        saveState({
            ui: store.getState().get('ui')
        });
    }, 1000));

    store.runSaga = sagaMiddleware.run;

    const syncInjector = injectSyncSagas(store.runSaga);
    syncInjector(sagas);

    // Async reducer registry
    store.asyncReducers = {};
    // Async saga registry
    store.asyncSagas = {};

    return store;
}
