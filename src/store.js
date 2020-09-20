import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import createReducer from './reducers';
import sagas from './store/controllers/sagas';

const injectSyncSagas = (inject) => (sagas) => sagas.forEach(inject);
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
    // Create the store with N middlewares
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

    /* Saving state to local storage
    store.subscribe(throttle(() => {
        saveState({
            controllers: store.getState().get('controllers')
        });
    }, 1000));
    */

    store.runSaga = sagaMiddleware.run;

    const syncInjector = injectSyncSagas(store.runSaga);
    syncInjector(sagas);

    // Async reducer registry
    store.asyncReducers = {};
    // Async saga registry
    store.asyncSagas = {};

    return store;
}
