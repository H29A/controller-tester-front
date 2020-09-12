import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    overrides: {
        MuiSlider: {
            thumb:{
                color: '#f50057',
            },
            track: {
                color: '#f50057'
            },
            rail: {
                color: '#f50057'
            }
        }
    },
    palette: {
        type: 'dark'
    },
});

export default theme;