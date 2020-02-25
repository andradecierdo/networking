import { connect } from 'react-redux'

import Page from './Page'

const mapStateToProps = (state, router) => {
  const {params} = router.match
  return {
    isAuthenticated: state.auth.isAuthenticated,
    type: params.type,
  }
}

export default connect(mapStateToProps)(Page)
