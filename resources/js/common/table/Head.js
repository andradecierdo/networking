import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { TableCell, TableHead as Head, TableRow, TableSortLabel, Tooltip } from '@material-ui/core'

class TableHead extends Component {

  static propTypes = {
    onRequestSort: PropTypes.func,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    rows: PropTypes.array.isRequired,
  };

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, rows } = this.props;
    return (
      <Head>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                {row.sortable ?
                  (
                    <Tooltip
                      title="Sort"
                      placement={'bottom-start'}
                      enterDelay={300}
                    >
                      <TableSortLabel
                        active={orderBy === row.id}
                        direction={order}
                        onClick={this.createSortHandler(row.id)}
                      >
                        {row.label}
                      </TableSortLabel>
                    </Tooltip>
                  ) : row.label}
              </TableCell>
            );
          }, this)}
        </TableRow>
      </Head>
    );
  }
}

export default TableHead
