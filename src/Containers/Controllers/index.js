import React, { useEffect, useState } from 'react';
import { map, filter } from 'lodash';
import { LinearProgress, Grid, Typography } from '@material-ui/core';

import { useStyles } from './styles';

import Controller from './ControllerItem';

const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function App() {
    const { rootWrapper, loader } = useStyles();
    const [ controllers, setControllers ] = useState([]);

    const tick = () => {
        // Convert to real array and remove nullable elements
        const realArray = filter([...navigator.getGamepads()], Boolean);
        setControllers(realArray);
        requestAnimationFrame(() => tick());
    };

    useEffect(() => tick(), []); // eslint-disable-line

    return (
        <Grid container className={rootWrapper} spacing={2}>
            {   controllers.length
                ? map(controllers, (controller, index) =>
                    <Grid item xs={12} key={index}>
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

export default App;
