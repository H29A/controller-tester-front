import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { map, assign } from 'lodash';

import {
    Grid, Slider, Button, Switch, FormControlLabel,
    Typography, LinearProgress, FormHelperText
} from '@material-ui/core';

import { useStyles } from './styles';
import { maxValues } from './constants';

import { registerControllerRequested } from '../../../store/controllers/actions';
import { changeVibrationActuatorData } from '../../../store/ui/actions';
import { selectControllerData as mapStateToProps }  from  './selectors';

const mapDispatchToProps = (dispatch) => ({
    registerController: controllerData => dispatch(registerControllerRequested(controllerData)),
    changeVibrationActuatorData: data => dispatch(changeVibrationActuatorData(data))
});

const enhancer = compose(
    connect(mapStateToProps, mapDispatchToProps)
);

const { object, string, func } = PropTypes;

function ControllerItem(props) {
    const classes = useStyles();

    const [pulseInterval, setPulseInterval] = useState(null);
    const [isStarted, setIsStarted] = useState(false);
    const [isNeedRepeat, setIsNeedRepeat] = useState(false);

    const { instance, registerController, vibrationActuatorData, changeVibrationActuatorData } = props;
    const { startDelay, duration, weakMagnitude, strongMagnitude } = vibrationActuatorData;

    const pulse = () => {
        const pulseParams = vibrationActuatorData;
        console.log('Vibration pulse started with parameters: %o', pulseParams);
        return instance.vibrationActuator.playEffect('dual-rumble', pulseParams);
    };

    const handleStart = () => {
        if (isNeedRepeat) {
            handleStop();
            pulse();
            setPulseInterval(setInterval(pulse, duration + startDelay - 20));
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
        const sum = startDelay + duration;
        let data = {};

        switch (name) {
            case 'startDelay':
                if (sum >= maxValues.duration) {
                    data = { startDelay: value, duration: maxValues.duration - startDelay };
                    break;
                }
            // eslint-disable-next-line no-fallthrough
            case 'duration':
                if (sum >= maxValues.duration) {
                    data = { duration: value, startDelay: startDelay - (sum - maxValues.duration) };
                    break;
                }
            // eslint-disable-next-line no-fallthrough
            default:
                data = { [name]: value };
        }

        changeVibrationActuatorData(assign(vibrationActuatorData, data));

        if (isStarted) {
            handleStop();
            handleStart();
        }
    };

    useEffect(() => {
        registerController({ id: instance.id, buttons: instance.buttons.length, axes: instance.axes.length });
        return () => {
            pulseInterval && clearInterval(pulseInterval);
        }
    }, []); // eslint-disable-line

    return(
        <Grid container>
            <Typography variant="h5">{instance.id}</Typography>
            <Grid item className={classes.infoWrapper} sm={12}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Typography>Index</Typography>
                        <FormHelperText>{instance.index}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <Typography>Connected</Typography>
                        <FormHelperText>{instance.connected ? 'Yes' : 'n/a'}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <Typography>Mapping</Typography>
                        <FormHelperText>{instance.mapping}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <Typography>Timestamp</Typography>
                        <FormHelperText>{instance.timestamp.toFixed(4)}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <Typography>Pose</Typography>
                        <FormHelperText>
                            { instance.pose && Object.keys(instance.pose).length > 0
                                ? 'Yes'
                                : 'n/a'
                            }
                        </FormHelperText>
                    </Grid>
                    <Grid item>
                        <Typography>Hand</Typography>
                        <FormHelperText>{instance.hand ? instance.hand : 'n/a'}</FormHelperText>
                    </Grid>
                    <Grid item>
                        <Typography>HapticActuators</Typography>
                        <FormHelperText>{instance.hapticActuators && Object.keys(instance.hapticActuators).length > 0
                            ? 'Yes'
                            : 'n/a'}
                        </FormHelperText>
                    </Grid>
                    <Grid item>
                        <Typography>Vibration</Typography>
                        <FormHelperText>{instance.vibrationActuator && instance.vibrationActuator.type
                            ? 'Yes'
                            : 'n/a'}
                        </FormHelperText>
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    { map(instance.buttons, (button, index) => {
                        return <Grid item key={index}>
                                    <Typography>B{index + 1}</Typography>
                                    <FormHelperText>{button.value.toFixed(2)}</FormHelperText>
                                </Grid>
                        })
                    }
                </Grid>
                <Grid container spacing={2}>
                    { map(instance.axes, (axis, index) => {
                        return <Grid item key={index}>
                                    <Typography>Axis {index + 1}</Typography>
                                    <FormHelperText>{axis.toFixed(4)}</FormHelperText>
                                </Grid>
                        })
                    }
                </Grid>
            </Grid>

            <Grid item sm={12}>
                <Typography gutterBottom>Delay: {startDelay} ms</Typography>
                <Slider aria-labelledby="input-slider"
                        value={startDelay} defaultValue={0} step={10} min={0} max={maxValues.startDelay}
                        onChange={(e, value) => handleChange("startDelay", value)} />
            </Grid>

            <Grid item sm={12}>
                <Typography gutterBottom>Duration: {duration} ms</Typography>
                <Slider aria-labelledby="input-slider"
                        value={duration} defaultValue={1000} step={10} min={100} max={maxValues.duration}
                        onChange={(e, value) => handleChange("duration", value)} />
            </Grid>

            <Grid item sm={12}>
                <Typography gutterBottom>Weak magnitude</Typography>
                <Slider aria-labelledby="input-slider"
                        value={weakMagnitude} defaultValue={1} step={0.01} min={0} max={maxValues.weakMagnitude}
                        onChange={(e, value) => handleChange("weakMagnitude", value)}/>
            </Grid>

            <Grid item sm={12}>
                <Typography gutterBottom>Strong magnitude</Typography>
                <Slider aria-labelledby="input-slider"
                        value={strongMagnitude} defaultValue={1} step={0.01} min={0} max={maxValues.strongMagnitude}
                        onChange={(e, value) => handleChange("strongMagnitude", value)} />
            </Grid>

            <Grid container justify="flex-end" spacing={2}>
                <Grid item>
                    <FormControlLabel
                        control={<Switch checked={isNeedRepeat} disabled={isStarted} onChange={() => setIsNeedRepeat(!isNeedRepeat)}/>}
                        label="Interval repeat"
                    />
                </Grid>

                <Grid item>
                    <Button className={classes.button} variant="contained" onClick={handleStart} disabled={isStarted}>Start</Button>
                </Grid>

                <Grid item>
                    <Button className={classes.button} variant="contained" onClick={handleStop} disabled={!isStarted}>Stop</Button>
                </Grid>

                <Grid item xs={12}>
                    { isStarted &&
                        <LinearProgress color="secondary" />
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}

ControllerItem.propTypes = {
    vibrationActuatorData: object,
    registerController: func,
    changeVibrationActuatorData: func,
    registrationControllerStatus: string
};

export default enhancer(ControllerItem);