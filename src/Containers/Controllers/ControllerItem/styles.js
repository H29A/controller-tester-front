import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    root: {
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
    },
    infoWrapper: {
        marginTop: '20px',
        marginBottom: '20px'
    }
}));