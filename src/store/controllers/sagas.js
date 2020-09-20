import { call, put, select } from 'redux-saga/effects';
import adapter from '../../utils/sagas';

import { getRegisteredControllersList, registerController } from '../../api/controllers';

import {
    loadRegisteredControllersProcessing, loadRegisteredControllersSucceed, loadRegisteredControllersFailed,
    registerControllerProcessing, registerControllerSucceed, registerControllerFailed
} from './actions';

import {
    LOAD_CONTROLLERS_LIST_REQUESTED, LOAD_CONTROLLERS_LIST_PROCESSING,
    REGISTER_CONTROLLER_REQUESTED, REGISTER_CONTROLLER_PROCESSING
} from './constants';

import { selectControllersListStatus, selectRegistrationControllerStatus } from './selectors'

/**
 * Saga for registering a controller
 * @return {void}
 */
export function * registerControllerSaga(action) {
    const status = yield select(selectRegistrationControllerStatus());

    if (status !== REGISTER_CONTROLLER_PROCESSING) {
        yield put(registerControllerProcessing());

        try {
            const { payload } = action;
            const result = yield call(registerController, payload);
            if (result && result.error !== undefined && result.error !== null) {
                yield put(registerControllerFailed(result.error));
            } else {
                yield put(registerControllerSucceed(result));
            }
        } catch (error) {
            yield put(registerControllerFailed());
        }
    }
}

/**
 * Saga for load the list of registered controllers
 * @return {void}
 */
export function * loadControllersListSaga() {
    const status = yield select(selectControllersListStatus());

    if (status !== LOAD_CONTROLLERS_LIST_PROCESSING) {
        yield put(loadRegisteredControllersProcessing());

        try {
            const result = yield call(getRegisteredControllersList);
            if (result && result.error !== undefined && result.error !== null) {
                yield put(loadRegisteredControllersFailed(result.error));
            } else {
                yield put(loadRegisteredControllersSucceed(result));
            }
        } catch (error) {
            yield put(loadRegisteredControllersFailed());
        }
    }
}


export default [
    () => adapter(LOAD_CONTROLLERS_LIST_REQUESTED, loadControllersListSaga),
    () => adapter(REGISTER_CONTROLLER_REQUESTED, registerControllerSaga),
];
