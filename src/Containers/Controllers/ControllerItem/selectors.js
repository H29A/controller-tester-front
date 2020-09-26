import { createSelector } from 'reselect';
import { selectRegistrationController, selectRegistrationControllerStatus } from '../../../store/controllers/selectors';
import { selectVibrationActuatorData } from '../../../store/ui/selectors';

export const selectControllerData = () => createSelector(
    selectRegistrationController(),
    selectRegistrationControllerStatus(),
    selectVibrationActuatorData(),
    (registrationController, registrationControllerStatus, vibrationActuatorData) => ({
        registeredController: registrationController,
        registrationControllerStatus,
        vibrationActuatorData
    })
);