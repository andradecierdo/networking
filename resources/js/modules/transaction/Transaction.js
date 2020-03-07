import moment from 'moment'
import Model from '../../utils/Model'
import User from '../user/User'

class Transaction extends Model {
  constructor(props) {
    super(props)

    this.initialize(props)
  }

  initialize(props) {
    super.initialize(props)

    this.id = props.id || null;
    this.username = props.username || '';
    this.lastName = props.lastName || '';
    this.firstName = props.firstName || '';
    this.transactionNumber = props.transactionNumber || '';
    this.type = props.type || '';
    this.amount = props.amount || '';
    this.status = props.status || '';
    this.createdAt = props.createdAt ? moment(props.createdAt) : null
    this.updatedAt = props.updatedAt ? moment(props.updatedAt) : null
    // User relationship model
    this.user = props.user ? new User(props.user) : null
    // User relationship model
    this.approver = props.approver ? new User(props.approver) : null
  }
}

export default Transaction
