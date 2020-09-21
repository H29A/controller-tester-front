import { createSelector } from 'reselect';
import { selectControllersList, selectControllersListStatus } from '../../store/controllers/selectors';

export const selectRegisteredControllersData = () => createSelector(
    selectControllersList(),
    selectControllersListStatus(),
    (controllersList, controllersListStatus) => ({
        controllersList,
        controllersListStatus
    })
);