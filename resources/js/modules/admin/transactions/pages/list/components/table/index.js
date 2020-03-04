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
import { Edit as EditIcon, Launch as ViewIcon, CheckCircleOutline } from '@material-ui/icons';

const fields = [
  { id: 'username', numeric: false, disablePadding: false, sortable: true, label: 'Account name' },
  { id: 'user_contact_no', numeric: false, disablePadding: false, sortable: true, label: 'Contact No.' },
  { id: 'amount', numeric: false, disablePadding: false, sortable: true, label: 'Amount' },
  { id: 'transaction_number', numeric: false, disablePadding: false, sortable: false, label: 'Transaction No.' },
  { id: 'status', numeric: false, disablePadding: false, sortable: true, label: 'Status' },
  { id: 'type', numeric: false, disablePadding: false, sortable: true, label: 'Type' },
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

class TransactionTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    list: PropTypes.object,
    handleChangePage: PropTypes.func,
    handleRequestSort: PropTypes.func,
    handleChangeText: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    page: PropTypes.number,
    onViewTransaction: PropTypes.func,
    onUpdateTransactionStatus: PropTypes.func,
  };

  handleViewTransaction = (id) => {
    this.props.onViewTransaction(id);
  };

  handleUpdateTransactionStatus = (id, status, userId) => {
    this.props.onUpdateTransactionStatus(id, status, userId);
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
                    <TableCell component="th" scope="row">
                      {`${row.user.firstName} ${row.user.lastName} `}
                    </TableCell>
                    <TableCell>{row.user.phoneNumber}</TableCell>
                    <TableCell>{row.amount}</TableCell>
                    <TableCell>{row.transactionNumber}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.createdAt.format('MMMM, DD YYYY')}</TableCell>
                    <TableCell>
                      <Tooltip title="View">
                        <IconButton onClick={() => this.handleViewTransaction(row.id)} aria-label="View">
                          <ViewIcon/>
                        </IconButton>
                      </Tooltip>
                      {/*<Tooltip title="Edit">*/}
                        {/*<Link to={`/admin/transactions/${row.id}`}>*/}
                          {/*<IconButton aria-label="Edit">*/}
                            {/*<EditIcon/>*/}
                          {/*</IconButton>*/}
                        {/*</Link>*/}
                      {/*</Tooltip>*/}
                      <Tooltip title="View">
                        <IconButton
                          onClick={() => this.handleUpdateTransactionStatus(row.id,'approved', row.user.id)}
                          aria-label="Approved"
                        >
                          <CheckCircleOutline/>
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
      </Paper>
    );
  }
}

export default withStyles(styles)(TransactionTable);
