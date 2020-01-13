import { connect } from 'react-redux'
import Experience from '../../Experience'

import Page from './Page'

const mapStateToProps = state => {
  const {data, ...meta} = state.experiences
  
  return {
    experiences: data.map((experience) => new Experience(experience)),
    meta: Object.assign({}, meta)
  }
}

export default connect(mapStateToProps)(Page)
