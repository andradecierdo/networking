import moment from 'moment'
import Model from '../../utils/Model'
import User from '../user/User'

class Experience extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.id = props.id || null;
    this.position = props.position || '';
    this.company = props.company || '';
    this.address = props.address || '';
    this.description = props.description || '';
    this.startDate = props.startDate ? moment(props.startDate) : null;
    this.endDate = props.endDate ? moment(props.endDate) : null;

    // User relationship model
    this.user = props.user ? new User(props.user) : null
  }
}

export default Experience
