import { CHANGE_VIBRATION_ACTUATOR_DATA } from './constants';

export const changeVibrationActuatorData = (data) => ({
    type: CHANGE_VIBRATION_ACTUATOR_DATA,
    payload: data
});

