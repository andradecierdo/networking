import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { AppBar, CssBaseline, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { AccountCircle, MoreVert } from '@material-ui/icons'
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from "react-router-dom";

const drawerWidth = 240;
const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuButtonHidden: {
    display: 'none',
  },
  appBar: {
    color: '#ffffff',
    backgroundColor: '#37bcd8',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  header: {
    fontFamily: '"Oswald", sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
    letterSpacing: '0.05em',
    margin: 0,
    fontSize: 20,
  }
});

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, handleDrawerOpen, open, logout } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={this.handleMenuClose}
        >
          <Link to="/admin/change-password">
            <MenuItem onClick={this.handleMenuClose}>Change Password</MenuItem>
          </Link>
          <MenuItem onClick={e => logout(e)}>Logout</MenuItem>
        </Menu>
    );

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={this.handleMobileMenuClose}
        >
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <IconButton color="inherit">
              <AccountCircle/>
            </IconButton>
            <p>Change Password</p>
          </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.root}>
          <CssBaseline/>
          <AppBar
              position="absolute"
              className={classNames(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar variant="regular">
              <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={handleDrawerOpen}
                  className={classNames(
                      classes.menuButton,
                      open && classes.menuButtonHidden,
                  )}
              >
                <MenuIcon/>
              </IconButton>
              <Typography className={classNames(classes.title, classes.header)} variant="h6" color="inherit" noWrap>
                CM STUDIO ADMIN
              </Typography>
              <div className={classes.grow}/>
              <div className={classes.sectionDesktop}>
                <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                    color="inherit"
                >
                  <AccountCircle/>
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                  <MoreVert/>
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMenu}
          {renderMobileMenu}
        </div>
    );
  }
}

export default withStyles(styles)(Header)
