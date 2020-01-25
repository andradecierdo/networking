import { connect } from 'react-redux'
import User from '../../User'

import Page from './Page'

const mapStateToProps = state => {
  return {
    user: new User(state.user),
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Page)
