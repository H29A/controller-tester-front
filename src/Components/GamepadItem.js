import React, { useState, useEffect } from 'react';

import {
    Grid, Slider, Button, Switch, FormControlLabel,
    makeStyles, Typography, LinearProgress, FormHelperText
} from '@material-ui/core';

import GamepadIcon from './GamepadIcon'

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: '550px',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        padding: '0 40px 25px 40px'
    },
    button: {
        maxWidth: '110px',
        minWidth: '95px'
    },
    switch: {
        minWidth: '190px'
    }
}));

const initialState = {
    delay: 0,
    duration: 1000,
    weakMagnitude: 0.5,
    strongMagnitude: 0,
    isNeedRepeat: false,
    pressedButtons: []
};

const maxValues = {
    delay: 2000,
    duration: 5000,
    weakMagnitude: 1.0,
    strongMagnitude: 1.0
};

export default function GamepadItem(props) {
    const classes = useStyles();

    const [state, setState] = useState(initialState);

    const [pulseInterval, setPulseInterval] = useState(null);
    const [isStarted, setIsStarted] = useState(false);

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
            setPulseInterval(setInterval(pulse, duration + delay));
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
        const sum = delay + duration;
        switch (name) {
            case 'delay':
                if (sum >= maxValues.duration) {
                    setState({ ...state, delay: value, duration: maxValues.duration - delay });
                    break;
                }
            // eslint-disable-next-line no-fallthrough
            case 'duration':
                if (sum >= maxValues.duration) {
                    setState({ ...state, delay: delay - (sum - maxValues.duration), duration: value });
                    break;
                }
            // eslint-disable-next-line no-fallthrough
            default:
                setState({ ...state, [name]: value });
        }

        if (isStarted) {
            handleStop();
            handleStart();
        }
    };

    useEffect(() => {
        return () => {
            pulseInterval && clearInterval(pulseInterval);
        }
    }, []); // eslint-disable-line

    return(
        <Grid container spacing={3} className={classes.root}>
            <div className={classes.paper}>
                <Grid container justify="center">
                    <GamepadIcon />
                </Grid>

                <FormHelperText style={{ marginBottom: '20px', textAlign: 'center' }}>{instance.id}</FormHelperText>

                <Typography gutterBottom>Delay: {delay} ms</Typography>
                <Slider aria-labelledby="input-slider"
                        value={delay} defaultValue={0} step={10} min={0} max={maxValues.delay}
                        onChange={(e, value) => handleChange("delay", value)} />

                <Typography gutterBottom>Duration: {duration} ms</Typography>
                <Slider aria-labelledby="input-slider"
                        value={duration} defaultValue={1000} step={100} min={100} max={maxValues.duration}
                        onChange={(e, value) => handleChange("duration", value)} />

                <Typography gutterBottom>Weak magnitude</Typography>
                <Slider aria-labelledby="input-slider"
                        value={weakMagnitude} defaultValue={1} step={0.01} min={0} max={maxValues.weakMagnitude}
                        onChange={(e, value) => handleChange("weakMagnitude", value)}/>

                <Typography gutterBottom>Strong magnitude</Typography>
                <Slider aria-labelledby="input-slider"
                        value={strongMagnitude} defaultValue={1} step={0.01} min={0} max={maxValues.strongMagnitude}
                        onChange={(e, value) => handleChange("strongMagnitude", value)} />

                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={5} className={classes.switch}>
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
            </div>
        </Grid>
    );
}