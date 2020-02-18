import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { fetchRegistrationCodes, deleteRegistrationCode } from '../../service'
import Table from './components/table';
import _ from 'lodash'

import RegistrationCode from '../../../../../modules/registration-code/RegistrationCode';
import DeleteDialog from '../../../components/dialog/Delete';

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
      registrationCodes: {},
      openDeleteDialog: false,
      registrationCodeId: null,
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleFetchRegistrationCodes = this.handleFetchRegistrationCodes.bind(this);
    this.handleDeleteRegistrationCode = this.handleDeleteRegistrationCode.bind(this);

    this.handleAcceptDialog = this.handleAcceptDialog.bind(this);
    this.handleCancelDialog = this.handleCancelDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleFetchRegistrationCodes();
  }

  handleCloseDialog = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleAcceptDialog = () => {
    const {registrationCodes, page, registrationCodeId} = this.state;
    if (registrationCodeId) {
      this.props.dispatch(deleteRegistrationCode(registrationCodeId)).then(() => {
        this.handleCloseDialog();
        if (registrationCodes.data.length === 1 && page > 1) {
          this.setState({
            ...this.state,
            page: page - 1,
          }, () => this.handleFetchRegistrationCodes());
        } else {
          this.handleFetchRegistrationCodes();
        }
      });
    }
  };

  handleCancelDialog = () => {
    this.setState({ openDeleteDialog: false });
  };

  handleDeleteRegistrationCode = (id) => {
    this.setState({
      registrationCodeId: id,
      openDeleteDialog: true,
    });
  }

  handleFetchRegistrationCodes = (params) => {
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
    this.props.dispatch(fetchRegistrationCodes(queryParams)).then(data => {
      data.data = data.data.map((registrationCode) => new RegistrationCode(registrationCode));
      this.setState({
        registrationCodes: {
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
      this.handleFetchRegistrationCodes();
    });
  };

  handleChangeText = event => {
    this.setState({
      page: 1,
      order: 'desc',
      orderBy: 'ins_time',
      query: event.target.value,
    }, () => {
      this.handleFetchRegistrationCodes();
    });
  };

  handleChangePage(event, page) {
    this.setState({
      ...this.state,
      page: page + 1,
    }, () => this.handleFetchRegistrationCodes());
  }

  render() {
    const props = this.props;
    const state = this.state;
    const {registrationCodes, openDeleteDialog, registrationCodeId} = state;

    if (_.isEmpty(registrationCodes)) {
      return <div/>;
    }

    return (
      <React.Fragment>
        <Table
          list={registrationCodes}
          handleChangeText={this.handleChangeText}
          handleChangePage={this.handleChangePage}
          handleRequestSort={this.handleRequestSort}
          onDeleteRegistrationCode={this.handleDeleteRegistrationCode}
          {...state}
          {...props}
        />
        {registrationCodeId &&
          <DeleteDialog
            open={openDeleteDialog}
            onClose={this.handleCloseDialog}
            onAccept={this.handleAcceptDialog}
            onCancel={this.handleCancelDialog}
          />
        }
      </React.Fragment>
    );
  }
}

export default Page
