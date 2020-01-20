import Model from '../../utils/Model'

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
  }
}

export default User
