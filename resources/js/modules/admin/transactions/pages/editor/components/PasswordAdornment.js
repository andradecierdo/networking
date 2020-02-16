import React from 'react'
import * as PropTypes from 'prop-types'

import {Visibility, VisibilityOff} from '@material-ui/icons'
import { InputAdornment, IconButton } from '@material-ui/core'

const PasswordAdornment = ({ visibility, onClick }) => (
  <InputAdornment position="end">
    <IconButton
      onClick={onClick}
      onMouseDown={e => e.preventDefault()}
    >
      {
        visibility
          ? <Visibility />
          : <VisibilityOff />
      }
    </IconButton>
  </InputAdornment>
);

PasswordAdornment.propTypes = {
  visibility: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default PasswordAdornment;
