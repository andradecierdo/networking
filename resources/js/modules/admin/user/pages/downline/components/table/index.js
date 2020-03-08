import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from './../../../../../../../common/table/Head';
import TableToolbar from './Toolbar';
import Pagination from '../../../../../../../common/table/Pagination';
import { IconButton, Tooltip } from '@material-ui/core';
import { Edit as EditIcon, Launch as ViewIcon, DeleteForever as DeleteIcon } from '@material-ui/icons';

import CustomDialog from '../../../../../components/dialog';

const fields = [
  { id: 'username', numeric: false, disablePadding: false, sortable: true, label: 'Username' },
  { id: 'first_name', numeric: false, disablePadding: false, sortable: true, label: 'First Name' },
  { id: 'last_name', numeric: false, disablePadding: false, sortable: true, label: 'Last Name' },
  { id: 'phone_number', numeric: false, disablePadding: false, sortable: true, label: 'Contact No.' },
  { id: 'status', numeric: false, disablePadding: false, sortable: true, label: 'Status' },
  { id: 'balance', numeric: true, disablePadding: false, sortable: true, label: 'Balance' },
  { id: 'rebate', numeric: true, disablePadding: false, sortable: true, label: 'Rebate' },
  { id: 'created_at', numeric: false, disablePadding: false, sortable: true, label: 'Date Created' },
  { id: 'action', numeric: false, disablePadding: false, sortable: false, label: '' },
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class UserTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    list: PropTypes.object,
    handleChangePage: PropTypes.func,
    handleRequestSort: PropTypes.func,
    handleChangeText: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    page: PropTypes.number,
    onViewUser: PropTypes.func,
    onDeleteUser: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      openDialog: false,
      id: null,
    };

    this.handleAcceptDialog = this.handleAcceptDialog.bind(this);
    this.handleCancelDialog = this.handleCancelDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }

  handleCloseDialog = () => {
    this.setState({
      id: null,
      openDialog: false
    });
  };

  handleAcceptDialog = () => {
    const id = _.clone(this.state.id);
    this.setState({
      id: null,
      openDialog: false
    }, () => this.props.onDeleteUser(id));
  };

  handleCancelDialog = () => {
    this.setState({
      id: null,
      openDialog: false
    });
  };

  handleViewUser = (id) => {
    this.props.onViewUser(id);
  };

  handleDeleteUser = (id) => {
    this.setState({
      id,
      openDialog: true
    });
  };

  render() {
    const {
      classes,
      list,
      handleChangePage,
      handleRequestSort,
      order,
      orderBy,
      handleChangeText
    } = this.props;

    const {openDialog, id} = this.state;

    return (
      <Paper className={classes.root}>
        <TableToolbar handleChangeText={handleChangeText}/>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead
              rows={fields}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {list.data.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.username}</TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.balance}</TableCell>
                    <TableCell>{row.rebate}</TableCell>
                    <TableCell>{row.createdAt.format('MMMM, DD YYYY')}</TableCell>
                    <TableCell>
                      <Tooltip title="View">
                        <IconButton onClick={() => this.handleViewUser(row.id)} aria-label="View">
                          <ViewIcon/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <Link to={`/admin/users/${row.id}`}>
                          <IconButton aria-label="Edit">
                            <EditIcon/>
                          </IconButton>
                        </Link>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => this.handleDeleteUser(row.id)} aria-label="Delete">
                          <DeleteIcon/>
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={5}
                  count={list.total}
                  rowsPerPage={list.perPage}
                  page={list.currentPage - 1}
                  onChangePage={handleChangePage}
                  ActionsComponent={Pagination}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        {openDialog && id &&
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
      </Paper>
    );
  }
}

export default withStyles(styles)(UserTable);
