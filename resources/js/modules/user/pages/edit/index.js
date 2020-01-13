import { connect } from 'react-redux'
import User from '../../User'

import Page from './Page'

const mapStateToProps = state => {
  return {
    user: new User(state.user)
  }
}

export default connect(mapStateToProps)(Page)
