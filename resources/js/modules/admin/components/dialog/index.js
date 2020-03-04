import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Message = ({message}) => {
  const last = message.length - 1;
  return (
    message.map((value, index) => {
      return (
        <React.Fragment key={`msg-${index}`}>
          {value}
          {index < last ? <br/> : null}
        </React.Fragment>
      );
    })
  );
};

class ConfirmationDialog extends React.PureComponent {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    message: PropTypes.array,
    title: PropTypes.array,
    acceptBtnLabel: PropTypes.string,
    acceptBtnColor: PropTypes.string,
    cancelBtnLabel: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      message: props.message || ['Are you sure？'],
      title: props.title || ['Confirmation'],
      acceptBtnColor: props.acceptBtnColor || 'secondary',
      acceptBtnLabel: props.acceptBtnLabel || 'OK',
      cancelBtnLabel: props.cancelBtnLabel || 'Cancel',
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleCancel = () => {
    this.props.onCancel();
  };

  handleAccept = () => {
    this.props.onAccept();
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { open } = this.props;
    const {
      message,
      title,
      acceptBtnLabel,
      cancelBtnLabel,
      acceptBtnColor,
    } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Message message={message}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleCancel}
            color="default"
            variant="outlined">
            {cancelBtnLabel}
          </Button>
          <Button
            onClick={this.handleAccept}
            color={acceptBtnColor}
            variant="outlined"
            autoFocus>
            {acceptBtnLabel}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Message.propTypes = {
  message: PropTypes.array.isRequired,
};
export default ConfirmationDialog;
