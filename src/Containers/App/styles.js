import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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