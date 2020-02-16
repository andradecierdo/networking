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

import Transaction from '../../../../../modules/transaction/Transaction';

import {
  // fetchTransactionDetail,
  fetchTransactionDetail,
  clearCompanyDetail,
  deleteCompany
} from '../../service';

class CompanyModal extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    company: PropTypes.object,
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.id,
      open: false,
      openDialog: false,
      message: [
        '*企業の全てのアカウントも削除されます。',
        '削除してよろしいですか？',
      ],
      transaction: {},
    };

    this.handleAcceptDialog = this.handleAcceptDialog.bind(this);
    this.handleCancelDialog = this.handleCancelDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // this.props.dispatch(fetchTransactionDetail(this.state.id));
    this.handleFetchTransactionDetail();
  }

  componentWillUnmount() {
    this.props.dispatch(clearCompanyDetail());
  }

  componentDidUpdate() {
    // const { company } = this.props;
    // if (company.loaded && company.deleted) {
    //   this.setState({ openDialog: false });
    //   this.props.onClose();
    // }
  }
  
  handleFetchTransactionDetail = () => {
    this.props.dispatch(fetchTransactionDetail(this.state.id)).then(data => {
       this.setState({
         transaction: {
           ...(new Transaction(data)),
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
    this.props.dispatch(deleteCompany(this.state.id));
  };

  handleCancelDialog = () => {
    this.setState({ openDialog: false });
  };

  handleEdit = () => {
    this.props.history.push(`/admin/transactions/${this.state.id}`);
  };

  handleDelete = () => {
    this.setState({ openDialog: true });
  };

  render() {
    const { classes, onClose, open } = this.props;
    const { message, openDialog, transaction } = this.state;
    console.log('render modal', transaction);
    if (transaction.loaded) {
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
                Transaction Detail
              </Typography>
              <br/>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Account Name</TableCell>
                    <TableCell>{`${transaction.user.firstName} ${transaction.user.lastName} `}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>User Contact No.</TableCell>
                    <TableCell>{transaction.user.phoneNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Amount</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Transcation No.</TableCell>
                    <TableCell>{transaction.transactionNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Status</TableCell>
                    <TableCell>{transaction.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Type</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Date Created</TableCell>
                    <TableCell>{transaction.createdAt.format('MMMM, DD YYYY')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.labelCell}>Approved By</TableCell>
                    <TableCell>{`${transaction.approver.firstName} ${transaction.approver.lastName} `}</TableCell>
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
          {/*<DeleteDialog*/}
            {/*open={openDialog}*/}
            {/*message={message}*/}
            {/*onClose={this.handleCloseDialog}*/}
            {/*onAccept={this.handleAcceptDialog}*/}
            {/*onCancel={this.handleCancelDialog}/>*/}
        </div>
      );
    }
    return null;
  }
}

export default withStyles(styles)(CompanyModal);
