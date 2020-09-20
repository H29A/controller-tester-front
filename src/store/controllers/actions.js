import {
    LOAD_CONTROLLERS_LIST_REQUESTED, LOAD_CONTROLLERS_LIST_PROCESSING, LOAD_CONTROLLERS_LIST_SUCCEED, LOAD_CONTROLLERS_LIST_FAILED,
    REGISTER_CONTROLLER_REQUESTED, REGISTER_CONTROLLER_PROCESSING, REGISTER_CONTROLLER_SUCCEED, REGISTER_CONTROLLER_FAILED
} from './constants';

export function loadRegisteredControllersRequested() {
    return {
        type: LOAD_CONTROLLERS_LIST_REQUESTED,
    };
}

export function loadRegisteredControllersProcessing() {
    return {
        type: LOAD_CONTROLLERS_LIST_PROCESSING
    };
}

export function loadRegisteredControllersSucceed(response) {
    return {
        type: LOAD_CONTROLLERS_LIST_SUCCEED,
        payload: response
    };
}

export function loadRegisteredControllersFailed(error) {
    return {
        type: LOAD_CONTROLLERS_LIST_FAILED,
        error
    };
}

export function registerControllerRequested(controller) {
    return {
        type: REGISTER_CONTROLLER_REQUESTED,
        payload: controller
    };
}

export function registerControllerProcessing() {
    return {
        type: REGISTER_CONTROLLER_PROCESSING
    };
}

export function registerControllerSucceed(response) {
    return {
        type: REGISTER_CONTROLLER_SUCCEED,
        payload: response
    };
}

export function registerControllerFailed(error) {
    return {
        type: REGISTER_CONTROLLER_FAILED,
        error
    };
}
