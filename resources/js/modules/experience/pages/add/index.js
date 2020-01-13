import { connect } from 'react-redux'
import Experience from '../../Experience'

import Page from './Page'

const mapStateToProps = () => {
  const experience = new Experience({})
  return {
    experience
  }
}

export default connect(mapStateToProps)(Page)
