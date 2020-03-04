import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import { searchUsers } from '../../service'
import Table from './components/table';
import UserModal from '../detail/Modal';
import _ from 'lodash'

import User from '../../../../../modules/user/User';

class Page extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      exceptions: [props.user.id],
      relations: ['parent'],
      order: 'desc',
      orderBy: 'created_at',
      keyword: '',
      page: 1,
      openUserModal: false,
      userId: null,
      users: {},
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleViewUser = this.handleViewUser.bind(this);
    this.handleCloseUserModal = this.handleCloseUserModal.bind(this);
    this.handleFetchUsers = this.handleFetchUsers.bind(this);
    this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleFetchUsers();
  }

  handleDeleteSuccess = () => {
    const {users, page} = this.state;
    if (users.data.length === 1 && page > 1) {
      this.setState({
        ...this.state,
        page: page - 1,
      }, () => this.handleFetchUsers());
    } else {
      this.handleFetchUsers();
    }
  }

  handleFetchUsers = (params) => {
    let queryParams = _.clone(params);
    const {order, orderBy, keyword, page, relations, exceptions} = this.state;
    if (_.isEmpty(params)) {
      queryParams = {
        exceptions,
        relations,
        order,
        orderBy,
        keyword,
        page,
      }
    }
    this.props.dispatch(searchUsers(queryParams)).then(data => {
      data.data = data.data.map((user) => new User(user));
      this.setState({
        users: {
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
      this.handleFetchUsers();
    });
  };

  handleChangeText = event => {
    this.setState({
      page: 1,
      order: 'desc',
      orderBy: 'created_at',
      keyword: event.target.value,
    }, () => {
      this.handleFetchUsers();
    });
  };

  handleChangePage(event, page) {
    this.setState({
      ...this.state,
      page: page + 1,
    }, () => this.handleFetchUsers());
  }

  handleViewUser = (id = null) => {
    this.setState({
      openUserModal: true,
      userId: id,
    });
  };

  handleCloseUserModal = () => {
    this.setState({
      openUserModal: false,
    });
  };

  render() {
    const props = this.props;
    const state = this.state;
    const {openUserModal, userId, users} = state;

    if (_.isEmpty(users)) {
      return <div/>;
    }

    return (
      <React.Fragment>
        <Table
          list={users}
          handleChangeText={this.handleChangeText}
          handleChangePage={this.handleChangePage}
          handleRequestSort={this.handleRequestSort}
          onViewUser={this.handleViewUser}
          {...state}
          {...props}
        />
          {openUserModal && !_.isNil(userId) &&
            <UserModal
              {...props}
              id={userId}
              onDeleteSuccess={this.handleDeleteSuccess}
              onClose={this.handleCloseUserModal}
              open={openUserModal}
            />
          }
      </React.Fragment>
    );
  }
}

export default Page
