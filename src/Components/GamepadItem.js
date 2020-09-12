import React, { useState, useEffect } from 'react';

import {
    Grid, Slider, Button, Switch, FormControlLabel,
    makeStyles, Paper, Typography, LinearProgress, FormHelperText
} from '@material-ui/core';

import GamepadIcon from './GamepadIcon'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '550px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        padding: '0 40px 25px 40px'
    },
    button: {
        width: '110px'
    },
}));

export default function GamepadItem(props) {
    const classes = useStyles();

    const [state, setState] = useState({
        delay: 0,
        duration: 1000,
        weakMagnitude: 0,
        strongMagnitude: 1.0,
        isNeedRepeat: false,
        pressedButtons: []
    });

    const [pulseInterval, setPulseInterval] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    // const [pressedButtons, setPressedButtons] = useState([]);

    const { instance } = props;
    const { delay, duration, weakMagnitude, strongMagnitude, isNeedRepeat } = state;

    const pulse = () => {
        const pulseParams = {
            startDelay: delay,
            duration: duration,
            weakMagnitude: weakMagnitude,
            strongMagnitude: strongMagnitude
        };
        console.log('Vibration pulse started with parameters: %o', pulseParams);
        return instance.vibrationActuator.playEffect('dual-rumble', pulseParams);
    };

    const handleStart = () => {
        if (isNeedRepeat) {
            handleStop();
            pulse();
            setPulseInterval(setInterval(pulse, 0.6 * duration));
            setIsStarted(true);
        } else {
            pulse();
        }
    };

    const handleStop = () => {
        pulseInterval && clearInterval(pulseInterval);
        setIsStarted(false);
    };

    const handleChange = (name, value) => {
        setState({ ...state, [name]: value });
        if (isStarted) {
            handleStop();
            handleStart();
        }
    };

    useEffect(() => {
        /*
            const buttonsObserver = setInterval(() => {
                const buttons = [];
                each(navigator.getGamepads()[instance.index].buttons, (button, index) => {
                    button.pressed && buttons.push({ index, button });
                });
                setPressedButtons(buttons);
            }, 150);
        */

        return () => {
            // buttonsObserver && clearInterval(buttonsObserver);
            pulseInterval && clearInterval(pulseInterval);
        }
    }, []); // eslint-disable-line

    return(
        <Grid container spacing={3} className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container justify="center">
                    <GamepadIcon />
                </Grid>

                <FormHelperText style={{ marginBottom: '20px', textAlign: 'center' }}>{instance.id}</FormHelperText>

                <Typography gutterBottom>Delay: {delay} ms</Typography>
                <Slider aria-labelledby="input-slider"
                        value={delay} defaultValue={0} step={10} min={0} max={2000}
                        onChange={(e, value) => handleChange("delay", value)} />

                <Typography gutterBottom>Duration: {duration} ms</Typography>
                <Slider aria-labelledby="input-slider"
                        value={duration} defaultValue={1000} step={100} min={100} max={5000}
                        onChange={(e, value) => handleChange("duration", value)} />

                <Typography gutterBottom>Weak magnitude</Typography>
                <Slider aria-labelledby="input-slider"
                        value={weakMagnitude} defaultValue={1} step={0.01} min={0} max={1}
                        onChange={(e, value) => handleChange("weakMagnitude", value)}/>

                <Typography gutterBottom>Strong magnitude</Typography>
                <Slider aria-labelledby="input-slider"
                        value={strongMagnitude} defaultValue={1} step={0.01} min={0} max={1}
                        onChange={(e, value) => handleChange("strongMagnitude", value)} />

                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={5}>
                        <FormControlLabel
                            control={<Switch checked={isNeedRepeat} disabled={isStarted} onChange={() => handleChange("isNeedRepeat", !isNeedRepeat)}/>}
                            label="Interval repeat"
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button className={classes.button} variant="contained" onClick={handleStart} disabled={isStarted}>Start</Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button className={classes.button} variant="contained" onClick={handleStop} disabled={!isStarted}>Stop</Button>
                    </Grid>
                    <Grid item xs={12}>
                        { isStarted &&
                            <LinearProgress color="secondary" />
                        }
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}