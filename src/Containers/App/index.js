import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { LinearProgress, FormHelperText, Grid } from '@material-ui/core';

import { selectAppData as mapStateToProps }  from  './selectors';
import { useStyles } from './styles';

import Controller from '../Controller';

import { loadRegisteredControllersRequested } from '../../store/controllers/actions';

const mapDispatchToProps = (dispatch) => ({
    loadRegisteredControllers: () => dispatch(loadRegisteredControllersRequested())
});

const enhancer = compose(
    connect(mapStateToProps, mapDispatchToProps)
);

const { string, func } = PropTypes;

function App(props) {
    const classes = useStyles();

    const [gamepads, setGamepads] = useState([]);

    const { controllersList, controllersListStatus, loadRegisteredControllers } = props;

    const handleGamepadConnected = (e) => {
        console.log(`Gamepad connected at index ${ e.gamepad.index}`);
        setGamepads([...gamepads, e.gamepad]);
    };

    const handleGamepadDisconnected = (e) => {
        console.log(`Gamepad disconnected from index ${ e.gamepad.index}`);
        delete gamepads[e.gamepad.index];
        setGamepads(gamepads);
    };

    useEffect(() => {
        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);
        loadRegisteredControllers();
        return () => {
            window.removeEventListener('gamepadconnected', handleGamepadConnected);
            window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
        }
    }, []); // eslint-disable-line

  return (
      <header className={classes.header}>
          { gamepads.length
              ? <Grid container spacing={0} className={classes.root}>
                  {
                      map(gamepads, gamepad =>
                          <Grid key={gamepad.index} className={classes.gamepad} item xs="auto">
                            <Controller instance={gamepad} />
                          </Grid>
                      )
                  }
                </Grid>
              : <div className={classes.paper}>
                  Waiting for gamepad connection
                  <FormHelperText style={{ textAlign: 'center' }}>
                      (If your gamepad is already connected - press any button)
                  </FormHelperText>
                  <LinearProgress color="secondary" className={classes.progress} />
                  <FormHelperText style={{ marginTop: '20px', textAlign: 'center' }}>Version {process.env.BUILD_VERSION}</FormHelperText>
                </div>
          }
      </header>
  );
}

App.propTypes = {
    controllersList: PropTypes.instanceOf(List),
    controllersListStatus: string,
    loadRegisteredControllers: func
};

export default enhancer(App);
