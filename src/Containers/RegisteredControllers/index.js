import React, {useEffect, useState} from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { loadRegisteredControllersRequested } from '../../store/controllers/actions';
import { LOAD_CONTROLLERS_LIST_PROCESSING } from '../../store/controllers/constants';
import { selectRegisteredControllersData as mapStateToProps } from './selectors';

import {
    CircularProgress, TableContainer, Table, TableHead,
    TableRow, TableCell, TableBody, Paper, Grid, Typography
} from '@material-ui/core';

import { useStyles } from './styles';

const mapDispatchToProps = (dispatch) => ({
    loadControllersList: () => dispatch(loadRegisteredControllersRequested())
});

const enhancer = compose(
    connect(mapStateToProps, mapDispatchToProps)
);

const { string, func } = PropTypes;
const { list: immutableList } = ImmutablePropTypes;

function RegisteredControllers(props) {
    const { wrapper, cell, loaderWrapper, nil } = useStyles();
    const { controllersList, controllersListStatus, loadControllersList } = props;

    const [isLoaderDisplaying, setIsLoaderDisplaying] = useState(true);

    useEffect(() => {
        loadControllersList();
        const loaderInterval = setInterval(() => setIsLoaderDisplaying(controllersListStatus === LOAD_CONTROLLERS_LIST_PROCESSING), 1000);
        return () => {
            loaderInterval && clearInterval(loaderInterval);
        }
    }, []); // eslint-disable-line

    return(
        <Grid container>
            <TableContainer className={wrapper} component={Paper}>
                { isLoaderDisplaying
                    ? <div className={loaderWrapper}><CircularProgress /></div>
                    : controllersList.size
                        ? <Table>
                             <TableHead>
                                 <TableRow>
                                     <TableCell className={cell}>#</TableCell>
                                     <TableCell>Name</TableCell>
                                     <TableCell className={cell}>Count</TableCell>
                                 </TableRow>
                             </TableHead>
                             <TableBody>
                                 { controllersList.map((controller, index) => (
                                     <TableRow key={index}>
                                         <TableCell className={cell}>{index + 1}</TableCell>
                                         <TableCell>{controller.id}</TableCell>
                                         <TableCell className={cell}>{controller.count}</TableCell>
                                     </TableRow>
                                 ))}
                             </TableBody>
                          </Table>
                        : <Grid item xs={12} className={nil}>
                            <Typography variant="h5">No data on registered controllers</Typography>
                          </Grid>
                }
            </TableContainer>
        </Grid>
    );
}

RegisteredControllers.propTypes = {
    loadControllersList: func,
    controllersList: immutableList,
    controllersListStatus: string
};

export default enhancer(RegisteredControllers);