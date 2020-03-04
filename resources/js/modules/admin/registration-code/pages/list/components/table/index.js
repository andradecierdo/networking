import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import { DeleteForever as DeleteIcon } from '@material-ui/icons';

const fields = [
  { id: 'passcode', numeric: false, disablePadding: false, sortable: true, label: 'Passcode' },
  { id: 'security_code', numeric: false, disablePadding: false, sortable: true, label: 'Security Code' },
  { id: 'account', numeric: false, disablePadding: false, sortable: true, label: 'Account' },
  { id: 'status', numeric: false, disablePadding: false, sortable: false, label: 'Status' },
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

class RegistrationCodeTable extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    list: PropTypes.object,
    handleChangePage: PropTypes.func,
    handleRequestSort: PropTypes.func,
    handleChangeText: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    page: PropTypes.number,
    onDeleteRegistrationCode: PropTypes.func,
  };

  handleDeleteRegistrationCode = (id) => {
    this.props.onDeleteRegistrationCode(id);
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
                let user = '';
                if (row.user) {
                  user = `${row.user.firstName} ${row.user.lastName} `;
                }
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.passcode}</TableCell>
                    <TableCell>{row.securityCode}</TableCell>
                    <TableCell>{user}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.createdAt.format('MMMM, DD YYYY')}</TableCell>
                    <TableCell>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => this.handleDeleteRegistrationCode(row.id)} aria-label="Delete">
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
      </Paper>
    );
  }
}

export default withStyles(styles)(RegistrationCodeTable);
