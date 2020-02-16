import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from '@material-ui/core'

const propTypes = {
  classes: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.object,
}

const Loader = ({ isLoading, error }) => {

  if (isLoading) {
    return <CircularProgress/>
  } else if (error) {
    return <div>Something went wrong!</div>
  } else {
    return null
  }
};

Loader.propTypes = propTypes
Loader.displayName = 'AdminLoader'

export default Loader
