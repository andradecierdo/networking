import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { register } from '../../service'
import ReeValidate from 'ree-validate'

import Form from './components/Form'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

class Page extends Component {
  static displayName = 'RegisterPage'
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
      firstName: 'required|min:6',
      lastName: 'required|min:6',
      email: 'required|email',
      password: 'required|min:6',
      passwordConfirmation: 'required|min:6'
    })
    
    this.state = {
      credentials: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      errors: this.validator.errors,
      fields: this.validator.fields
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  componentDidMount() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }
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
    this.props.dispatch(register(credentials))
        .then(() => {
          this.props.history.push('/login');
        })
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
    if (this.props.isAuthenticated) {
      return <Redirect to="/"/>
    }
    const {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation
    } = this.state.credentials
    const props = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
      errors: this.state.errors,
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
