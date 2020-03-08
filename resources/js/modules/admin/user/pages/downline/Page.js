import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import {deleteUser, searchUsers} from '../../service'
import { fetchUserDetail } from '../../../user/service'
import Table from './components/table';
import UserModal from '../detail/Modal';
import _ from 'lodash'

import CardHeader from './components/card'

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
      routeUserId: props.routeUserId,
      user: new User({}),
    };

    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleViewUser = this.handleViewUser.bind(this);
    this.handleCloseUserModal = this.handleCloseUserModal.bind(this);
    this.handleFetchUsers = this.handleFetchUsers.bind(this);
    this.handleDeleteSuccess = this.handleDeleteSuccess.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    console.log(this.state.routeUserId);
    this.props.dispatch(fetchUserDetail(this.state.routeUserId)).then((data) => {
      const user = new User(data)
      this.setState({
        ...this.state,
        user,
      });
    })
      .catch(() => this.props.history.push('/admin/users'));
    this.handleFetchUsers();
  }

  handleDeleteUser = (id) => {
    this.props.dispatch(deleteUser(id)).then(() => {
      this.handleDeleteSuccess();
    });
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
    const {order, orderBy, keyword, page, relations, exceptions, routeUserId} = this.state;
    if (_.isEmpty(params)) {
      queryParams = {
        exceptions,
        relations,
        order,
        orderBy,
        keyword,
        page,
        parentId: routeUserId,
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
    const {openUserModal, userId, users, user} = state;

    if (_.isEmpty(users)) {
      return <div/>;
    }

    return (
      <React.Fragment>
        <div className={"col-lg-12"}>
          <CardHeader user={user}/>
        </div>
        <Table
          list={users}
          handleChangeText={this.handleChangeText}
          handleChangePage={this.handleChangePage}
          handleRequestSort={this.handleRequestSort}
          onViewUser={this.handleViewUser}
          onDeleteUser={this.handleDeleteUser}
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
