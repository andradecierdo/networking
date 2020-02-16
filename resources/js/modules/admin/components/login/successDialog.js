import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

class SuccessDialog extends Component {
  static propTypes = {
    success: PropTypes.string,
  };

  state = {
    open: false,
    message: ''
  };

  handleClose = () => {
    this.setState({
      open: false,
      message: '',
    });
  };

  componentDidMount() {
    this.setState({
      success: this.props.success,
      open: true,
    });
  }

  render() {
    const {success} = this.props;
    const {open} = this.state;
    return (
      <div>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"成功"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {success}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default SuccessDialog;
