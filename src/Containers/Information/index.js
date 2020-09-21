import React from 'react';
import { Typography } from '@material-ui/core';

import { useStyles } from './styles';

function Information() {
    const { wrapper } = useStyles();
    return(
        <div className={wrapper}>
            <Typography variant="h5">Controller Tester and Debugger</Typography>
            <Typography variant="body1">
                When connected, this tool displays the current state of your controllers,
                inputs, joysticks, and anything else that can be reported by the HTML5 Controller Api.
            </Typography>
            <Typography variant="body1">This is also useful for debugging broken controllers, experimental hardware, and more.</Typography>
        </div>
    )
}

export default Information;