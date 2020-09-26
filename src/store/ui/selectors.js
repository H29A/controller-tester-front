import { createSelector } from 'reselect';
import { Map } from 'immutable';

const selectUi = () => state => Map(state.get('ui'));

const selectVibrationActuatorData = () => createSelector(
    selectUi(),
    ui => ui.get('vibrationActuatorData') ? ui.get('vibrationActuatorData').toJS() : {}
);

export {
    selectVibrationActuatorData
}