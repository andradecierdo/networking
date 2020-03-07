import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import { IconButton, SvgIcon, Toolbar, Tooltip, Typography, withStyles } from '@material-ui/core'
import {toolbarStyles} from '../../../../../../../common/table/toolbarStyles';
import SearchTool from '../../../../../../../common/table/SearchTool'

let TableToolbar = props => {
  const { classes, handleChangeText } = props;

  return (
    <div>
      <Toolbar
        className={classNames(classes.root)}
      >
        <Typography variant="h5" className={classes.title}>
          List of Transactions
        </Typography>
        <div className={classes.spacer}/>
        <div className={classes.actions}>
          <Tooltip title="New Company">
            <Link to="/admin/transactions/create">
              <IconButton aria-label="New Transaction">
                <SvgIcon/>
              </IconButton>
            </Link>
          </Tooltip>
        </div>
      </Toolbar>
      <SearchTool classes={classes} handleChangeText={handleChangeText}/>
    </div>
  );
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangeText: PropTypes.func,
};

export default withStyles(toolbarStyles)(TableToolbar);
