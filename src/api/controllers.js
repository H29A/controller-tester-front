import { call } from 'redux-saga/effects';
import { requestCall } from '../utils/request';

import { BACKEND_URL, BACKEND_API_URL } from '../constants';

export function* getRegisteredControllersList() {
    const requestURL = `${BACKEND_URL}/${BACKEND_API_URL}/controllers/list`;
    const requestOptions = { method: 'GET' };
    return yield call(requestCall, requestURL, requestOptions);
}

export function* registerController(controllerData) {
    const requestURL = `${BACKEND_URL}/${BACKEND_API_URL}/controllers/register`;
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(controllerData)
    };
    return yield call(requestCall, requestURL, requestOptions);
}