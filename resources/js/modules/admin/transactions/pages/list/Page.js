import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { fetchTransactions, updateTransactionStatus } from '../../service'
import Table from './components/table';
import TransactionModal from '../detail/Modal';
import CustomDialog from '../../../components/dialog';
import _ from 'lodash'

import Transaction from '../../../../../modules/transaction/Transaction';

class Page extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: 'ins_time',
      query: '',
      page: 1,
      openTransactionModal: false,
      openApprovalDialog: false,
      transactionId: null,
      transactions: {},
      approval: {
        id: null,
        status: null,
        userId: null,
      }
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleViewTransaction = this.handleViewTransaction.bind(this);
    this.handleCloseTransactionModal = this.handleCloseTransactionModal.bind(this);
    this.handleFetchTransactions = this.handleFetchTransactions.bind(this);
    this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);

    this.handleAcceptApprovalDialog = this.handleAcceptApprovalDialog.bind(this);
    this.handleCancelApprovalDialog = this.handleCancelApprovalDialog.bind(this);
    this.handleCloseApprovalDialog = this.handleCloseApprovalDialog.bind(this);
    this.setDefaultApproval = this.setDefaultApproval.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleFetchTransactions();
  }

  componentDidUpdate() {}

  setDefaultApproval = () => {
    this.setState({
      openApprovalDialog: false,
      approval: {
        id: null,
        status: null,
        userId: null,
      }
    })
  }

  handleCloseApprovalDialog = () => {
    this.setDefaultApproval()
  };

  handleAcceptApprovalDialog = () => {
    const {id, status, userId} = this.state.approval;
    if (!_.isNil(id) && !_.isNil(status) && !_.isNil(userId)) {
      this.props.dispatch(updateTransactionStatus(id, {status, userId})).then(() => {
        this.setDefaultApproval()
        this.handleFetchTransactions();
      });
    }
  };

  handleCancelApprovalDialog = () => {
    this.setDefaultApproval()
  };

  handleUpdateStatus = (id, status, userId) => {
    this.setState({
      ...this.state,
      openApprovalDialog: true,
      approval: {
        id,
        status,
        userId,
      }
    })
  }

  handleDeleteSuccess = () => {
    const {transactions, page} = this.state;
    if (transactions.data.length === 1 && page > 1) {
      this.setState({
        ...this.state,
        page: page - 1,
      }, () => this.handleFetchTransactions());
    } else {
      this.handleFetchTransactions();
    }
  }

  handleFetchTransactions = (params) => {
    let queryParams = _.clone(params);
    const {order, orderBy, query, page} = this.state;
    if (_.isEmpty(params)) {
      queryParams = {
        order,
        orderBy,
        query,
        page,
      }
    }
    this.props.dispatch(fetchTransactions(queryParams)).then(data => {
      data.data = data.data.map((transaction) => new Transaction(transaction));
      this.setState({
        transactions: {
          ...data,
        }
      });
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy }, () => {
      this.handleFetchTransactions();
    });
  };

  handleChangeText = event => {
    this.setState({
      page: 1,
      order: 'desc',
      orderBy: 'ins_time',
      query: event.target.value,
    }, () => {
      this.handleFetchTransactions();
    });
  };

  handleChangePage(event, page) {
    this.setState({
      ...this.state,
      page: page + 1,
    }, () => this.handleFetchTransactions());
  }

  handleViewTransaction = (id = null) => {
    this.setState({
      openTransactionModal: true,
      transactionId: id,
    });
  };

  handleCloseTransactionModal = () => {
    this.setState({
      openTransactionModal: false,
    });
  };

  render() {
    const props = this.props;
    const state = this.state;
    const {openTransactionModal, transactionId, transactions, openApprovalDialog} = state;

    if (_.isEmpty(transactions)) {
      return <div/>;
    }

    return (
      <React.Fragment>
        <Table
          list={transactions}
          handleChangeText={this.handleChangeText}
          handleChangePage={this.handleChangePage}
          handleRequestSort={this.handleRequestSort}
          onViewTransaction={this.handleViewTransaction}
          onUpdateTransactionStatus={this.handleUpdateStatus}
          {...state}
          {...props}
        />
          {openTransactionModal && !_.isNil(transactionId) &&
            <TransactionModal
              {...props}
              id={transactionId}
              onDeleteSuccess={this.handleDeleteSuccess}
              onClose={this.handleCloseTransactionModal}
              open={openTransactionModal}
            />
          }
        {openApprovalDialog &&
          <CustomDialog
            acceptBtnColor={'primary'}
            acceptBtnLabel={'Approve'}
            title={['Confirmation']}
            message={['Are you sure you want to approve transaction？']}
            open={openApprovalDialog}
            onClose={this.handleCloseApprovalDialog}
            onAccept={this.handleAcceptApprovalDialog}
            onCancel={this.handleCancelApprovalDialog}
          />
        }
      </React.Fragment>
    );
  }
}

export default Page
