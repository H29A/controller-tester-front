import { createSelector } from 'reselect';
import { selectRegistrationController, selectRegistrationControllerStatus } from '../../../store/controllers/selectors';

export const selectControllerData = () => createSelector(
    selectRegistrationController(),
    selectRegistrationControllerStatus(),
    (registrationController, registrationControllerStatus) => ({
        registeredController: registrationController,
        registrationControllerStatus
    })
);