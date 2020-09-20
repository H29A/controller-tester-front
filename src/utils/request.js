import { call, put } from 'redux-saga/effects';
import { set, omit, assign } from 'lodash';
import { IDLE } from '../constants';

/**
 * Из итератора headers объекта response извлечем и соберем в POJO key-value пары хэдеров
 * @param response
 * @returns {*}
 */
function getHeadersFromResponse(response) {
    return [...response.headers.entries()]
        .reduce((headers, header) => set(headers, header[0], header[1]), {});
}

/**
 * @desc Requests a URL, returning a promise
 *
 * @param  {string} url     The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {boolean} skipJsonParse не парсить ответ как JSON
 *
 * @return {object}       An object containing either "data" or "err"
 */
export default function request(url, options, skipJsonParse) {
    let headers;
    return fetch(url, options)
        .then((response) => {
            if (skipJsonParse) {
                return response.blob().then(
                    data => {
                        if (response.ok) {
                            headers = getHeadersFromResponse(response);
                            return data;
                        } else {
                            return Promise.reject({ status: response.status, message: response.statusText, data });
                        }
                    }
                );
            } else {
                return response.text()
                    .then(text => text ? JSON.parse(text) : {})
                    .then(data => {
                        if (response.ok) {
                            headers = getHeadersFromResponse(response);
                            return data;
                        } else {
                            return Promise.reject({ status: response.status, message: response.statusText, data });
                        }
                    });
            }
        })
        .then((data) => ({ data, headers }))
        .catch((err) => ({
            err
        }));
}

/**
 * @desc Generator - wrapper for all server ajax request
 *
 * @param {string} url request url
 * @param {object} incomingOptions for merge with standard options
 * Если в options есть параметр withHeaders, хедеры будут возвращены вместе с телом ответа
 * @param {function} fallbackAction action for error response
 * @param {boolean} skipJsonParse boolean to skip parsing json
 *
 * @return {*} request result or false
 */
export function * requestCall(url, incomingOptions, fallbackAction=defaultFallback, skipJsonParse = false) {
    const { withHeaders } = incomingOptions;
    const options = omit(incomingOptions, 'withHeaders');

    let headers = {
        'Accept': 'application/json; charset=UTF-8',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    };

    const requestOptions = assign(
        {
            method: 'GET',
            headers
        },
        options
    );

    let requestResult = yield call(request, url, requestOptions, skipJsonParse);

    if (requestResult.err !== undefined && requestResult.err !== null) {
        const error = requestResult.err;

        yield put(fallbackAction(error));
        return { error };
    }

    return withHeaders
        ? requestResult
        : requestResult.data;
}

function defaultFallback() {
    return {
        type: IDLE,
    };
}

