import React from 'react'
import * as PropTypes from 'prop-types'
import { InputBase, withStyles } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import {toolbarStyles} from '../../../../../../../common/table/toolbarStyles';

const MenuProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right"
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left"
  },
  getContentAnchorEl: null,
};

let TableToolbar = props => {
  const { classes, handleChangeText } = props;

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon/>
        </div>
        <InputBase
          placeholder="Search…"
          onChange={handleChangeText}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    </div>
  );
};

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangeText: PropTypes.func,
  handleCategorySearch: PropTypes.func,
};

export default withStyles(toolbarStyles)(TableToolbar);
