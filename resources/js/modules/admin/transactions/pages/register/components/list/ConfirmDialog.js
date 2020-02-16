import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmDialog extends React.Component {

  deleteTemplate(id) {
    this.props.handleDeleteTemplateList(id.toString())
    this.props.handleCloseConfirmation();
  }
  render() {
    const {open, id, message} = this.props.params;
    return (
      <div>
        <Dialog
          open={open}
          keepMounted
          onClose={this.props.close}
          aria-labelledby={id}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {message}
          </DialogTitle>
          <DialogActions>
            <Button onClick={
              () => this.deleteTemplate(id)}
                    variant="contained" color="primary">
              はい
            </Button>
            <Button onClick={this.props.close} variant="outlined" color="primary">
              キャンセル
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog;
