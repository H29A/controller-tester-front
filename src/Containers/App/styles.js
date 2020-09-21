import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    app: {
        padding: '16px',
        backgroundColor: '#282c34',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
        background: 'transparent',
        fontFamily: theme.font.family,
        [Object.keys(theme.font.webkitSmoothing)[0]]: Object.values(theme.font.webkitSmoothing)[0],
        [Object.keys(theme.font.mozSmoothing)[0]]: Object.values(theme.font.mozSmoothing)[0],
    }
}));