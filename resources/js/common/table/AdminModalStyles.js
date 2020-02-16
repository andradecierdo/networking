import {createMuiTheme} from '@material-ui/core/styles';
import {cyan, red} from '@material-ui/core/colors';

export const modalStyles  = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  labelCell: {
    whiteSpace: 'nowrap',
    width: '20%',
    fontWeight: 'bold',
  },
  image: {
    maxHeight: '100px',
  },
  buttonDiv: {
    margin: '10px',
    float: 'right',
  },
  button: {
    margin: '5px',
    minWidth: '75px',
    fontSize: '13px',
  },
  close: {
    margin: '5px',
    right: '0%',
    top: '0%',
    float: 'right',
  },
  paper: {
    top: '20%',
    left: '25%',
    width: '50%',
    minHeight: '380px',
    position: 'absolute',
    backgroundColor: 'rgb(251, 251, 251)',
  }
});

export const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: red,
  }
});
