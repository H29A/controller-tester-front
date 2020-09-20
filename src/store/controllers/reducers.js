import { fromJS, Map, List } from 'immutable';

import {
    LOAD_CONTROLLERS_LIST_PROCESSING, LOAD_CONTROLLERS_LIST_SUCCEED, LOAD_CONTROLLERS_LIST_FAILED,
    REGISTER_CONTROLLER_PROCESSING, REGISTER_CONTROLLER_SUCCEED, REGISTER_CONTROLLER_FAILED
} from './constants';

const initialState = fromJS({
    controllersList: List([]),
    controllersListStatus: undefined,
    registeredController: Map({}),
    registeringControllerStatus: undefined,
    error: undefined
});

export default function controllersReducer(state = initialState, action = {}) {
    const { type, payload, error } = action;
    switch (type) {
        case LOAD_CONTROLLERS_LIST_PROCESSING:
            return state.set('controllersListStatus', LOAD_CONTROLLERS_LIST_PROCESSING)
                        .set('controllersList', List([]));

        case LOAD_CONTROLLERS_LIST_SUCCEED:
            return state.set('controllersListStatus', LOAD_CONTROLLERS_LIST_SUCCEED)
                        .set('controllersList', List(payload));

        case LOAD_CONTROLLERS_LIST_FAILED:
            return state.set('controllersListStatus', LOAD_CONTROLLERS_LIST_FAILED)
                        .set('error', error);

        case REGISTER_CONTROLLER_PROCESSING:
            return state.set('registeringControllerStatus', REGISTER_CONTROLLER_PROCESSING)
                        .set('registeredController', Map({}));

        case REGISTER_CONTROLLER_SUCCEED:
            return state.set('registeringControllerStatus', REGISTER_CONTROLLER_SUCCEED)
                        .set('registeredController', Map(payload));

        case REGISTER_CONTROLLER_FAILED:
            return state.set('registeringControllerStatus', REGISTER_CONTROLLER_FAILED)
                        .set('error', error);

        default:
            return state;
    }
};