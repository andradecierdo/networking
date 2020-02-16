import Model from '../../utils/Model'
import moment from 'moment'

class User extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.username = props.username || ''
    this.firstName = props.firstName || ''
    this.lastName = props.lastName || ''
    this.middleName = props.middleName || ''
    this.address = props.address || ''
    this.phoneNumber = props.phoneNumber || ''
    this.email = props.email || ''
    this.createdAt = props.createdAt ? moment(props.createdAt) : null
    this.updatedAt = props.updatedAt ? moment(props.updatedAt) : null
  }
}

export default User
