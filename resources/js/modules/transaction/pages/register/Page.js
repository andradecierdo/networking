import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
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
      value: 'required|decimal',
    })

    this.state = {
      credentials: {
        value: 0,
        type: props.type,
      },
      typeLabel: props.type === 'encash' ? 'Encashment' : 'Rebate', //TODO make it better
      errors: this.validator.errors,
      fields: this.validator.fields
    }
    
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    console.log('here');
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
          this.props.history.push('/');
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
    const {typeLabel} = this.state;
    const {value} = this.state.credentials
    const props = {
      value,
      typeLabel,
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
