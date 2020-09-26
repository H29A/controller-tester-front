import React from 'react';
import {Grid, Typography} from '@material-ui/core';

import { useStyles } from './styles';

function Information() {
    const { wrapper } = useStyles();
    return(
        <Grid container className={wrapper}>
            <Grid item>
                <Typography variant="h5">Controller Tester and Debugger</Typography>
                <Typography variant="body1">
                    When connected, this tool displays the current state of your controllers,
                    inputs, joysticks, and anything else that can be reported by the HTML5 Controller Api.
                </Typography>
                <Typography variant="body1">This is also useful for debugging broken controllers, experimental hardware, and more.</Typography>
            </Grid>
        </Grid>
    )
}

export default Information;