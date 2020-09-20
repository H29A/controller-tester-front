import { take, call, fork, delay } from 'redux-saga/effects';

/**
 * Метод вызываемый на каждой итерации приема action
 * должен быть отменен в случае перевызова менее чем за время выполения
 * @param {object} action объект для передачи в вызов generator'а
 * @param {function} generator метод вызываемый после задержки
 * @param {int} time время задержки
 * @return {void}
 */
function* throttle(action, generator, time) {
    yield call(delay, time);
    yield call(generator, action);
}

/**
 * Генератор - watcher нужен для зацикливания ожидания action и вызова адаптера саги
 * @param {string} actionType имя action для подписки
 * @param {function} generator метод - генератор для вызова.
 * @return {void}
 */
function* watcher(actionType, generator) {
    let action;
    while (action = yield take(actionType)) {
        yield call(generator, action);
    }
}

/**
 * Генератор - watcher нужен для зацикливания приема action с отложенным выполнением
 * @param {string} actionType имя action для подписки
 * @param {function} generator метод вызываемый после задержки
 * @param {int} time время задержки
 * @return {void}
 */
function* watcherDelay(actionType, generator, time) {
    let action;
    let task;
    while (action = yield take(actionType)) {
        if (task && task.isRunning()) {
            task.cancel();
        }

        task = yield fork(throttle, action, generator, time);
    }
}
/**
 * Адаптер саги позволяет навешивать доп действия на саги
 * (раньше саги отменялись по смене пути)
 * @param {string} actionType  имя action для подписки
 * @param {function} generator метод - генератор для вызова.
 * @param {int} delayTime время задержки перед выполнением, для пропуска множественных вызовов
 * @return {void}
 */
export default function* adapter(actionType, generator, delayTime = 0) {
    if (delayTime) {
        yield fork(watcherDelay, actionType, generator, delayTime);
    } else {
        yield fork(watcher, actionType, generator);
    }
}
