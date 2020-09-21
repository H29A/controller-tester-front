import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { LinearProgress, Grid, Typography } from '@material-ui/core';

import { useStyles } from './styles';

import Controller from './ControllerItem';

const { string, func } = PropTypes;
const { list } = ImmutablePropTypes;

function App() {
    const { rootWrapper, loader } = useStyles();

    const [controllers, setControllers] = useState([]);

    const handleControllerConnected = (e) => {
        console.log(`Controller connected at index ${ e.gamepad.index}`);
        setControllers([...controllers, e.gamepad]);
    };

    const handleControllerDisconnected = (e) => {
        console.log(`Controller disconnected from index ${ e.gamepad.index}`);
        delete controllers[e.gamepad.index];
        setControllers(controllers);
    };

    useEffect(() => {
        window.addEventListener('gamepadconnected', handleControllerConnected);
        window.addEventListener('gamepaddisconnected', handleControllerDisconnected);
        return () => {
            window.removeEventListener('gamepadconnected', handleControllerConnected);
            window.removeEventListener('gamepaddisconnected', handleControllerDisconnected);
        }
    }, []); // eslint-disable-line

  return (
      <Grid container className={rootWrapper} spacing={2}>
          { controllers.length
              ? map(controllers, controller =>
                      <Grid item xs={12} key={controller.index}>
                        <Controller instance={controller} />
                      </Grid>
                )
              : <Grid container direction="column" spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h5">No controller detected</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>If you have one, make sure it's plugged in or paired, and press buttons to wake it up</Typography>
                  </Grid>
                  <Grid className={loader} item xs={12}>
                    <LinearProgress color="secondary" />
                  </Grid>
                </Grid>
          }
      </Grid>
  );
}

App.propTypes = {
    controllersList: list,
    controllersListStatus: string,
    loadRegisteredControllers: func
};

export default App;
