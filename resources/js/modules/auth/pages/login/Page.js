import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { login } from '../../service'
import ReeValidate from 'ree-validate'
import Form from './components/Form'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class Page extends Component {
  static displayName = 'LoginPage'

  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.validator = new ReeValidate({
      username: 'required|min:6|max:20',
      password: 'required|min:6'
    })

    this.state = {
      credentials: {
        username: '',
        password: '',
      },
      errors: this.validator.errors
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(name, value) {
    const { errors } = this.validator

    this.setState({
      credentials: {
        ...this.state.credentials,
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
    const { credentials } = this.state
    const { errors } = this.validator

    this.validator.validateAll(credentials)
      .then((success) => {
        if (success) {
          this.submit(credentials)
        } else {
          this.setState({ errors })
        }
      })
  }

  submit(credentials) {
    this.props.dispatch(login(credentials))
      .catch(({ error, statusCode }) => {
        const { errors } = this.validator

        if (statusCode === 422) {
          _.forOwn(error, (message, field) => {
            errors.add(field, message);
          });
        } else if (statusCode === 401) {
          errors.add('password', 'Invalid credentials.');
        }

        this.setState({ errors })
      })
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
    const {credentials, errors} = this.state
    const {username, password} = credentials;
    const props = {
      username,
      password,
      errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    }

    return (
      <div className="container py-5">
        <Row>
          <Col md={"12"}>
            <Row>
              <div className="mx-auto col-lg-5">
                <span className="anchor"/>
                <Card className="has-shadow">
                  <Card.Body>
                    <Form {...props} />
                  </Card.Body>
                </Card>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Page
