import React, {Component} from 'react';
import * as PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Tooltip} from '@material-ui/core';
import Table from '@material-ui/core/Table/Table';
import TableBody from '@material-ui/core/TableBody/TableBody';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableCell from '@material-ui/core/TableCell/TableCell';
import Button from '@material-ui/core/Button';
import TableHead from '../../../../../../../common/table/Head';
import ConfirmDialog from './ConfirmDialog';

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
  customButton: {
    color: 'white',
    width: 120,
    backgroundColor: 'red'
  },
});

class TemplateTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    fields: PropTypes.array.isRequired,
    customTemplates: PropTypes.object,
    restrictedTemplates: PropTypes.array,
    dispatch: PropTypes.any,
    customTemplateList: PropTypes.array.isRequired,
  };

  state = {
    confirm: {
      id: '',
      type: '',
      message: '',
      isPublish: '',
      open: false,
    }
  };

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleOpenConfirmation = this.handleOpenConfirmation.bind(this);
    this.handleCloseConfirmation = this.handleCloseConfirmation.bind(this);
  }

  handleDelete = (value) => {
    let message = {
      id: value,
      type: 'delete',
      content: '削除します。よろしいですか？',
    };
    this.handleOpenConfirmation(message);
  }

  handleOpenConfirmation = (message) => {
    this.setState({
      confirm: {
        ...this.state.confirm,
        open: true,
        id: message.id,
        type: message.type,
        message: message.content,
        isPublish: message.isPublish,
      }
    });
  };

  handleCloseConfirmation = () => {
    this.setState({confirm: {...this.state.confirm, open: false}});
  };

  render() {
    const {classes, fields, restrictedTemplates, customTemplateList} = this.props;
    const {confirm} = this.state;
    return (
      <div>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead
              rows={fields}/>
            <TableBody>
              {restrictedTemplates.map(row => {
                if (customTemplateList.includes(row.id.toString())) {
                  return (
                    <TableRow key={row.id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.ownerId.company.companyName}</TableCell>
                      <TableCell>
                        <Tooltip title="削除">
                          <Button
                            onClick={() => this.handleDelete(row.id)}
                            variant="contained"
                            style={{'width': '50px'}}
                            className={classes.customButton}>
                            削除
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                }
                else {
                  return null
                }
              })}
            </TableBody>
          </Table>
        </div>
        {confirm.open && <ConfirmDialog
          {...this}
          {...this.props}
          params={confirm}
          close={this.handleCloseConfirmation}/>}
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(TemplateTable);
