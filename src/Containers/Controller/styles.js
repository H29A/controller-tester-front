import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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