import { Map } from 'immutable';
import { createSelector } from 'reselect';

const selectControllers = () => (state) => Map(state.get('controllers'));

const selectControllersList = () => createSelector(
    selectControllers(),
    (controllers) => controllers.get('controllersList')
);

const selectControllersListStatus = () => createSelector(
    selectControllers(),
    (controllers) => controllers.get('controllersListStatus')
);

const selectRegistrationController = () => createSelector(
    selectControllers(),
    (controllers) => controllers.get('registeredController')
);

const selectRegistrationControllerStatus = () => createSelector(
    selectControllers(),
    (controllers) => controllers.get('registrationStatus')
);

export {
    selectControllersList,
    selectControllersListStatus,
    selectRegistrationController,
    selectRegistrationControllerStatus
};
