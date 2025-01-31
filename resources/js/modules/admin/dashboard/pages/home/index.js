import { connect } from 'react-redux'

import Page from './Page'

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Page)
