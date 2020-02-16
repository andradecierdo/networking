import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Tooltip} from '@material-ui/core';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableFooter from '@material-ui/core/TableFooter/TableFooter';
import TablePagination from '@material-ui/core/TablePagination/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
import TableToolbar from './Toolbar';
import TableHead from '../../../../../../../common/table/Head';
import Pagination from '../../../../../../../common/table/Pagination';
// import PreviewDialog from '../../../../../../../common/table/PreviewDialog';
// import {fetchCustomTemplates} from "../../../../../template/service";

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
  imageWrap: {
    display: 'block',
    maxWidth: '230px',
    maxHeight: '80px',
    width: 'auto',
    height: 'auto',
    cursor: 'pointer',
  },
});

class TemplateTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    list: PropTypes.object,
    customTemplates: PropTypes.object,
    dispatch: PropTypes.any,
    handleCustomTemplateList: PropTypes.func.isRequired,
    customTemplateList: PropTypes.array.isRequired,
    temporaryTemplateList: PropTypes.array.isRequired
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.list.orderBy === property && this.state.list.order === 'desc') {
      order = 'asc';
    }

    this.setState({list: {...this.state.list, order: order, orderBy: orderBy}}, () => {
      this.fetchTemplates();
    });
  };

  handleChangeText = event => {
    this.setState({list: {...this.state.list, query: event.target.value}}, () => {
      this.fetchTemplates();
    });
  };

  handleCategorySearch = event => {
    this.setState({
      list: {
        ...this.state.list,
        category: event.target.value,
      }
    }, () => {
      this.fetchTemplates();
    });
  };

  handleClickOpen = (preview) => {
    this.setState({
      preview: {
        ...this.state.preview,
        open: true,
        template: preview,
      }
    });
  };

  handleClose = () => {
    this.setState({preview: {...this.state.preview, open: false}});
  };

  constructor(props) {
    super(props);

    this.state = {
      list: {
        orderBy: 'ins_time',
        order: 'desc',
        page: 0,
        limit: 5,
        restriction: 3
      },
      preview: {
        open: false,
        template: {},
      },
    };

    this.handleRequestSort = this.handleRequestSort.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.fetchTemplates = this.fetchTemplates.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    let params = Object.assign({}, this.state.list);
    // this.props.dispatch(fetchCustomTemplates({...params}));
  }

  handleCheck(value) {
    this.props.handleCustomTemplateList(value);
  }

  handleChangePage(event, page) {
    this.setState({list: {...this.state.list, page: page}}, () => {
      this.fetchTemplates();
    });
  }

  fetchTemplates() {
    let params = Object.assign({}, this.state.list, {page: this.state.list.page + 1});
    // this.props.dispatch(fetchCustomTemplates({...params}));
  }

  render() {
    const {classes, fields, list} = this.props;
    const {preview} = this.state;

    return (
      <div>
        <TableToolbar
          {...this}
          handleNewTemplate={this.handleNewTemplate}
          handleChangeText={this.handleChangeText}
          handleCategorySearch={this.handleCategorySearch}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead
              rows={fields}
              order={this.state.list.order}
              orderBy={this.state.list.orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <TableBody>
              {list.data.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <a onClick={() => {
                        this.handleClickOpen(row);
                      }}>
                        <img
                          id={row.id}
                          className={classes.imageWrap}
                          width='100px'
                          height='80px'
                          src={row.thumbnailId.thumbTinyUrl} alt={row.title}/>
                      </a>
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.ownerId.company.companyName}</TableCell>
                    <TableCell>{row.length}</TableCell>
                    <TableCell>{row.aspectRatio.aspectRatio}</TableCell>
                    <TableCell>
                      <Tooltip title="選択">
                        <Checkbox
                          checked={this.props.temporaryTemplateList.includes(row.id.toString())}
                          name="customTemplateList"
                          type="checkbox"
                          color="primary"
                          onClick={()=>this.handleCheck(row.id.toString())}
                          value={row.id.toString()}/>
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
                  colSpan={7}
                  count={list.total}
                  rowsPerPage={parseInt(list.perPage)}
                  page={this.state.list.page}
                  onChangePage={this.handleChangePage}
                  ActionsComponent={Pagination}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        {/*{preview.template && <PreviewDialog*/}
          {/*template={preview.template}*/}
          {/*open={preview.open}*/}
          {/*close={this.handleClose}/>}*/}
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(TemplateTable);
