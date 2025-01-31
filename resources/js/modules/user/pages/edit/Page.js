import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { userUpdateRequest } from '../../service'
import ReeValidate from 'ree-validate'

import Form from './components/Form'

class Page extends Component {
  static displayName = 'UserPage'
  static propTypes = {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
      'firstName': 'required|max:30',
      'lastName': 'required|max:20',
      'middleName': 'required|max:20',
      'username': 'required|min:6',
      'address': 'required',
      'email': 'email',
      'phoneNumber': 'required|min:8|numeric',
    })
    
    const user = this.props.user.toJson()
    this.state = {
      user,
      errors: this.validator.errors
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    const user = nextProps.user.toJson()

    if (!_.isEqual(this.state.user, user)) {
      this.setState({ user })
    }
  }
  
  handleChange(name, value) {
    const { errors } = this.validator

    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    })
    errors.remove(name)

    this.validator.validate(name, value)
      .then(() => {
          this.setState({ errors })
      })
  }
  
  handleSubmit(e) {
    e.preventDefault()
    const user = this.state.user
    const { errors } = this.validator
    
    this.validator.validateAll(user)
      .then((success) => {
        if (success) {
          this.submit(user)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit(user) {
    this.props.dispatch(userUpdateRequest(user))
      .then(() => this.props.history.push('/dashboard'))
      .catch(({ error, statusCode }) => {
        const { errors } = this.validator
        
        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        }
        
        this.setState({ errors })
      })
  }
  
  render() {
    return (
      <main className="col-sm-9 ml-sm-auto ml-lg-auto col-md-9 pt-3" role="main">
        <h1>Profile</h1>
        <section className="row">
          <div className="col-12 col-md-9 col-sm-12">
            <Form
              {...this.state}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            />
          </div>
        </section>
      </main>
    )
  }
}

export default Page
