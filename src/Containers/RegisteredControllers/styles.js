import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    wrapper: {
        minHeight: '56px'
    },
    loaderWrapper: {
        minHeight: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: '$fadeinout 1s linear forwards'
    },
    '@keyframes fadeinout': {
        '0%, 100%': {
            opacity: 0
        },
        '50%': {
            opacity: 1
        }
    },
    cell: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    nil: {
        minHeight: '600px',
        padding: theme.spacing(2)
    }
}));