/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import controllersReducer from './store/controllers/reducers';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
    const appReducer = combineReducers({
        controllers: controllersReducer,
        ...asyncReducers
    });

    return (state, action) => {
        return appReducer(state, action);
    };
}
