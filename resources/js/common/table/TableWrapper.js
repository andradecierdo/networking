import React, {Component} from "react";
import PropTypes from 'prop-types';
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "../../common/table/Head";
import Pagination from "../../common/table/Pagination";

class TableWrapper extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    list: PropTypes.object,
    children: PropTypes.any,
    fetchAccounts: PropTypes.func.isRequired,
  };

  state = {
    orderBy: 'ins_time',
    order: 'desc',
    page: 0,
  };

  constructor(props) {
    super(props);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleRequestSort = this.handleRequestSort.bind(this);
  }

  handleChangePage(event, page) {
    this.setState({page: page}, () => {
      this.fetchAccounts();
    });
  }

  fetchAccounts() {
    const params = Object.assign({}, this.state, {
      accountPlan: 'standard',
      page: this.state.page + 1,
    });
    this.props.fetchAccounts({...params});
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({order, orderBy}, () => {
      this.fetchAccounts();
    });
  };

  render() {
    const {classes, fields, list, children} = this.props;
    return (<React.Fragment>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead
            rows={fields}
            order={this.state.order}
            orderBy={this.state.orderBy}
            onRequestSort={this.handleRequestSort}
          />
          {children}
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[]}
                colSpan={5}
                count={list.total}
                rowsPerPage={list.perPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                ActionsComponent={Pagination}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </React.Fragment>);
  }
}

export default TableWrapper;

