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
    this.status = props.status || ''
    this.isAdmin = props.isAdmin || false
    this.balance = props.balance || 0
    this.rebate = props.rebate || 0
    this.createdAt = props.createdAt ? moment(props.createdAt) : null
    this.updatedAt = props.updatedAt ? moment(props.updatedAt) : null
    // User relationship model
    this.parent = props.parent ? new User(props.parent) : null
  }
}

export default User
