import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { red, green } from '@material-ui/core/colors'
import Header from '../modules/admin/components/common/Header'
import Footer from '../modules/admin/components/common/Footer'
import { withStyles } from '@material-ui/core'
import Sidebar from '../modules/admin/components/common/Sidebar'
// import '../../sass/admin.scss'
// import { logoutUser } from '../utils/Logout';
import {logout} from '../modules/auth/service'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Noto Sans Japanese", sans-serif',
    fontSize: 18,
    fontWeight: 500,
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  palette: {
    primary: {
      main: '#00bcd4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff8a80',
      contrastText: '#ffffff',
    },
    error: red,
    success: green,
  }
});

const styles = theme => ({
  root: {
    paddingTop: '0rem',
    display: 'flex',
    height: '100vh',
  },
  content: {
    flexGrow: 1,
    height: 'inherit',
    overflow: 'auto',
  },
  container: {
    height: 'inherit',
  },
  children: {
    padding: theme.spacing.unit * 3,
  },
  appBarSpacer: theme.mixins.toolbar,
});

class AdminLayout extends Component {
  static displayName = 'Admin Layout';
  static propTypes = propTypes;

  state = {
    open: false,
  };

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleLogout(e) {
    e.preventDefault();
    this.props.dispatch(logout())
  }

  componentDidMount() {}

  render() {
    const {children, classes, isAuthenticated, user} = this.props;
    return <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        {isAuthenticated && (
          <Header open={this.state.open} handleDrawerOpen={this.handleDrawerOpen} logout={this.handleLogout}/>
        )}
        {isAuthenticated && (
          <Sidebar open={this.state.open} user={user} handleDrawerClose={this.handleDrawerClose}/>
        )}
        <div className={classes.content}>
          <div className={classes.appBarSpacer}/>
          <div className={classes.container}>
            <div className={classes.children}>
              {children}
            </div>
            <Footer/>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user,
  }
};

export default connect(mapStateToProps)(withStyles(styles)(AdminLayout))
