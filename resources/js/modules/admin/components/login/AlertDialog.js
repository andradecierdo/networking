import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import PropTypes from 'prop-types'

//TODO not being used (login)
class AlertDialog extends Component {
  static propTypes = {
    errors: PropTypes.object,
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
      errors: this.props.errors,
      open: this.props.errors.items.length > 0,
    });
  }

  render() {
    const {errors} = this.props;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"エラー"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {errors.items.length > 0 && errors.items.map((item) => {
                return item.msg
              })}
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

export default AlertDialog;
