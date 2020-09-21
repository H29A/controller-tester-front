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
        },
        MuiCircularProgress: {
            circle: {
                color: '#f50057'
            }
        }
    },
    palette: {
        type: 'dark'
    },
    font: {
        family: '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Roboto\', \'Oxygen\', \'Ubuntu\', \'Cantarell\', \'Fira Sans\', \'Droid Sans\', \'Helvetica Neue\', sans-serif',
        webkitSmoothing: { '-webkit-font-smoothing': 'antialiased' },
        mozSmoothing: { '-moz-osx-font-smoothing': 'grayscale' }
    }
});

export default theme;