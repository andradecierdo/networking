import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {styles} from './styles';
import {theme} from '../../../../../common/table/AdminModalStyles';

import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { HighlightOff as CloseIcon, Image } from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import User from '../../../../../modules/user/User';
import CustomDialog from '../../../components/dialog';

import {
  fetchUserDetail,
  deleteUser,
} from '../../service';

class CompanyModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    company: PropTypes.object,
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onDeleteSuccess: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      open: false,
      openDialog: false,
      user: {},
    };

    this.handleAcceptDialog = this.handleAcceptDialog.bind(this);
    this.handleCancelDialog = this.handleCancelDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.handleFetchUserDetail();
  }
  
  handleFetchUserDetail = () => {
    this.props.dispatch(fetchUserDetail(this.state.id)).then(data => {
       this.setState({
         user: {
           ...(new User(data)),
           loaded: true,
         }
       })
    });
  }

  handleClose = () => {
    this.props.onClose();
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleAcceptDialog = () => {
    this.props.dispatch(deleteUser(this.state.id)).then(() => {
      this.props.onClose();
      this.props.onDeleteSuccess()
      this.setState({openDialog: false});
    });
  };

  handleCancelDialog = () => {
    this.setState({ openDialog: false });
  };

  handleEdit = () => {
    this.props.history.push(`/admin/users/${this.state.id}`);
  };

  handleDelete = () => {
    this.setState({ openDialog: true });
  };

  render() {
    const { classes, onClose, open } = this.props;
    const { message, openDialog, user } = this.state;
    if (user.loaded) {
      return (
        <div>
          <Modal
            onClose={onClose}
            aria-labelledby="simple-dialog-title"
            open={open}>
            <Paper className={classes.paper}>
              <Tooltip title="Close">
                <IconButton
                  onClick={this.handleClose}
                  aria-label="Close"
                  className={classes.close}>
                  <CloseIcon/>
                </IconButton>
              </Tooltip>
              <Typography
                style={{ padding: '20px' }}
                variant="h5"
                id="modal-title">
                User Detail
              </Typography>
              <br/>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Username</TableCell>
                    <TableCell>{user.username}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>First Name</TableCell>
                    <TableCell>{user.firstName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Last Name</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Middle Name</TableCell>
                    <TableCell>{user.middleName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Phone Number</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Email</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Status</TableCell>
                    <TableCell>{user.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Balance</TableCell>
                    <TableCell>{user.balance}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Rebate</TableCell>
                    <TableCell>{user.rebate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Date Created</TableCell>
                    <TableCell>{user.createdAt.format('MMMM, DD YYYY')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Upline</TableCell>
                    <TableCell>
                      {user.parent && `${user.parent.firstName} ${user.parent.lastName} `}
                      </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className={classes.buttonDiv}>
                <MuiThemeProvider theme={theme}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={this.handleDelete}>
                    Delete
                  </Button>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={this.handleEdit}>
                    Edit
                  </Button>
                </MuiThemeProvider>
              </div>
            </Paper>
          </Modal>
          {openDialog &&
            <CustomDialog
              acceptBtnLabel={'Delete'}
              title={['Delete']}
              message={['Are you sure you want to delete？']}
              open={openDialog}
              onClose={this.handleCloseDialog}
              onAccept={this.handleAcceptDialog}
              onCancel={this.handleCancelDialog}
            />
          }
        </div>
      );
    }
    return null;
  }
}

export default withStyles(styles)(CompanyModal);
