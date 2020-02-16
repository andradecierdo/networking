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
    title: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = {
      message: props.message || ['Are you sure you want to delete？'],
      title: props.title || ['Delete'],
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
    const { message, title } = this.state;
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
            いいえ
          </Button>
          <Button
            onClick={this.handleAccept}
            color="primary"
            variant="outlined"
            autoFocus>
            はい
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
