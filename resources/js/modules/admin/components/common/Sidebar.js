import React, {Component} from 'react'
import classNames from 'classnames'
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  withStyles
} from '@material-ui/core'
import {
  ChevronLeft,
  FormatListNumbered,
  Dashboard,
  LocalMovies,
  Settings,
  CardTravel,
  VpnKey,
  AccountCircle
} from '@material-ui/icons'
import PropTypes from 'prop-types'
import {Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

const drawerWidth = 240;
const styles = theme => ({
  root: {
    height: 'inherit',
  },
  drawer: {
    height: 'inherit',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class Sidebar extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleDrawerClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  };

  render() {
    const {classes, handleDrawerClose, open, user} = this.props;
    const isAdmin = user.id === 1;

    return <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        className={classes.drawer}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft/>
          </IconButton>
        </div>
        <Divider/>
        <List>
          <Link to="/admin/dashboard">
            <ListItem button>
              <ListItemIcon>
                <Dashboard/>
              </ListItemIcon>
              <ListItemText primary="Dashboard"/>
            </ListItem>
          </Link>
          <Divider/>
          {isAdmin && (
            <div>
              <ListSubheader inset>Transactions</ListSubheader>
              <Link to="/admin/transactions">
                <ListItem button>
                  <ListItemIcon>
                    <LocalMovies/>
                  </ListItemIcon>
                  <ListItemText primary="Transactions"/>
                </ListItem>
              </Link>
              <Divider/>
            </div>
          )}
          <ListSubheader inset>subheader</ListSubheader>
          <ListItem button>
            <ListItemIcon>
              <FormatListNumbered/>
            </ListItemIcon>
            <ListItemText primary="Primary"/>
          </ListItem>
          <Divider/>
        </List>
        <List>
          <Divider/>
          <ListSubheader inset>Users</ListSubheader>
          <Link to="/admin/users">
            <ListItem button>
              <ListItemIcon>
                <CardTravel/>
              </ListItemIcon>
              <ListItemText primary="Users"/>
            </ListItem>
          </Link>
        </List>
        <List>
          <Divider/>
          <ListSubheader inset>Registration Codes</ListSubheader>
          <Link to="/admin/registration-codes">
            <ListItem button>
              <ListItemIcon>
                <Settings/>
              </ListItemIcon>
              <ListItemText primary="Registration Codes"/>
            </ListItem>
          </Link>
          <Link to="/admin/change-password">
            <ListItem button>
              <ListItemIcon>
                <VpnKey/>
              </ListItemIcon>
              <ListItemText primary="Change Password"/>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user,
  }
};

export default connect(mapStateToProps)(withStyles(styles)(Sidebar))
