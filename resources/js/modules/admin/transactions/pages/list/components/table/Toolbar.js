import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import * as PropTypes from 'prop-types'
import { IconButton, SvgIcon, Toolbar, Tooltip, Typography, withStyles } from '@material-ui/core'
import {toolbarStyles} from '../../../../../../../common/table/toolbarStyles';
import SearchTool from '../../../../../../../common/table/SearchTool'

let TableToolbar = props => {
  const { classes, handleChangeText } = props;
  const path = 'M18,15H16V17H18M18,11H16V13H18M20,19H12V17H14V15H12V13H14V11H12V9H20M10,7H8V5H10M10,11H8V9H10M10,' +
    '15H8V13H10M10,19H8V17H10M6,7H4V5H6M6,11H4V9H6M6,15H4V13H6M6,19H4V17H6M12,7V3H2V21H22V7H12Z';

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
                <SvgIcon>
                  <path d={path}/>
                </SvgIcon>
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
