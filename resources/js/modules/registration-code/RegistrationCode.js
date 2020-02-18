import moment from 'moment'
import Model from '../../utils/Model'
import User from '../user/User'

class RegistrationCode extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.id = props.id || null;
    this.passcode = props.passcode || '';
    this.securityCode = props.securityCode || '';
    this.status = props.status || '';
    this.createdAt = props.createdAt ? moment(props.createdAt) : null
    this.updatedAt = props.updatedAt ? moment(props.updatedAt) : null
    // User relationship model
    this.user = props.user ? new User(props.user) : null
  }
}

export default RegistrationCode
