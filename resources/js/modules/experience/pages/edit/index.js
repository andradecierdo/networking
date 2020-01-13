import { connect } from 'react-redux'
import Experience from '../../Experience'

import Page from './Page'

const mapStateToProps = (state, router) => {
  const { params } = router.match
  const experience = state.experiences.data.find(experience => experience.id === Number(params.id))
  return {
    experience: experience ? new Experience(experience) : new Experience({})
  }
}

export default connect(mapStateToProps)(Page)
