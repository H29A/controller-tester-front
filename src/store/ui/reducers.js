import { fromJS, Map } from 'immutable';

import { CHANGE_VIBRATION_ACTUATOR_DATA } from './constants';

const initialState = fromJS({
    vibrationActuatorData: Map({
        startDelay: 0,
        duration: 500,
        weakMagnitude: 0.5,
        strongMagnitude: 0.5,
    })
});

export default function uiReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CHANGE_VIBRATION_ACTUATOR_DATA:
            return state.set('vibrationActuatorData', Map(payload));

        default:
            return state;
    }
};