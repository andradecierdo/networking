import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { fetchTransactions, updateTransactionStatus } from '../../service'
import Table from './components/table';
import TransactionModal from '../detail/Modal';
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
      transactionId: null,
      transactions: {},
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleViewTransaction = this.handleViewTransaction.bind(this);
    this.handleCloseTransactionModal = this.handleCloseTransactionModal.bind(this);
    this.handleFetchTransactions = this.handleFetchTransactions.bind(this);
    this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this);
    this.handleUpdateStatus = this.handleUpdateStatus.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleFetchTransactions();
  }

  componentDidUpdate() {}

  handleUpdateStatus = (id, status, userId) => {
    this.props.dispatch(updateTransactionStatus(id, {status, userId})).then(() => {
      this.handleFetchTransactions();
    });
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
    const {openTransactionModal, transactionId, transactions} = state;

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
      </React.Fragment>
    );
  }
}

export default Page
