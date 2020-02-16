import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  footer: {
    backgroundColor: `#3d50b60a`,
    padding: `${theme.spacing.unit * 6}px 0`,
    marginTop: `${theme.spacing.unit * 8}px`
  },
  footerFont: {
    fontFamily: '"Oswald", sans-serif',
    fontWeight: 400,
    fontStyle: 'normal',
    letterSpacing: '0.05em',
    fontSize: 20,
  },
});

class Footer extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    return (<footer className={classes.footer}>
        <Typography className={classes.footerFont} variant="h6" align="center" gutterBottom>
          NETWORKING SITE
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          COPYRIGHT &copy; ALL RIGHTS RESERVED
        </Typography>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer)
