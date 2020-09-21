import React from 'react';
import { Grid, Paper, Container, Typography } from '@material-ui/core';

import Information from '../Information';
import Controllers from '../Controllers'
import RegisteredControllers from '../RegisteredControllers';

import { useStyles } from './styles';

function App() {
    const { app } = useStyles();

    return(
        <Container maxWidth="lg" className={app} disableGutters={true}>
            <Grid container spacing={2}>
                <Grid item sm={12}>
                    <Paper>
                        <Controllers />
                    </Paper>
                </Grid>
                <Grid item sm={8}>
                    <Paper>
                        <Information />
                    </Paper>
                </Grid>
                <Grid item sm={4}>
                    <Paper>
                        <RegisteredControllers />
                    </Paper>
                </Grid>
                <Grid item sm={12}>
                    <Typography>Copyright 2020-2021</Typography>
                    <Typography>Version {process.env.BUILD_VERSION}</Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default App;