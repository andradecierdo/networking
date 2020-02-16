import React from "react";
import SearchIcon from '@material-ui/icons/Search'
import { InputBase} from "@material-ui/core";
import * as PropTypes from 'prop-types'

const searchText = props => {
  return (
    <div className={props.classes.search}>
      <div className={props.classes.searchIcon}>
        <SearchIcon/>
      </div>
      <InputBase
        placeholder="Search…"
        onChange={props.handleChangeText}
        classes={{
          root: props.classes.inputRoot,
          input: props.classes.inputInput,
        }}
      />
    </div>
  )
}

searchText.propTypes = {
  classes: PropTypes.object.isRequired,
  handleChangeText: PropTypes.func,
};

export default searchText;
