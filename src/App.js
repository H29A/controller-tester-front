import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import { makeStyles, LinearProgress, FormHelperText, Grid } from '@material-ui/core';

import GamepadItem from './Components/GamepadItem';

const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: '#282c34',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white'
    },
    root: {
        width: '1500px',
        justifyContent: 'center'
    },
    paper: {
        padding: '25px 25px 15px 25px'
    },
    progress: {
        margin: '20px 0 0 0'
    },
    gamepad: {
        margin: '70px'
    }
}));

function App() {
    const classes = useStyles();

    const [gamepads, setGamepads] = useState([]);

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
                            <GamepadItem instance={gamepad} />
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

export default App;
