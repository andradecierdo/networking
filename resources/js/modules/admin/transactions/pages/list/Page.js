import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { fetchTransactions } from '../../service'
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
      transactions: [],
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleViewTranscation = this.handleViewTranscation.bind(this);
    this.handleCloseTransactionModal = this.handleCloseTransactionModal.bind(this);
    this.handleFetchTransactions = this.handleFetchTransactions.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleFetchTransactions();
  }

  componentDidUpdate() {}

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
    let params = Object.assign(this.state, { page: page + 1 });
    this.handleFetchTransactions(params);
  }

  handleViewTranscation = (id = null) => {
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

    if (_.isEmpty(transactions.data)) {
      return <div/>;
    }

    return (
      <React.Fragment>
        <Table
          list={transactions}
          handleChangeText={this.handleChangeText}
          handleChangePage={this.handleChangePage}
          handleRequestSort={this.handleRequestSort}
          onViewTransaction={this.handleViewTranscation}
          {...state}
          {...props}
        />
          {openTransactionModal && !_.isNil(transactionId) &&
            <TransactionModal
              {...props}
              // transaction={transactions}
              id={transactionId}
              onClose={this.handleCloseTransactionModal}
              open={openTransactionModal}
            />
          }
      </React.Fragment>
    );
  }
}

export default Page
