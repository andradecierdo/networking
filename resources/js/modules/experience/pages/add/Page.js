import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { experienceAddRequest } from '../../service'
import ReeValidate from 'ree-validate'

import Form from '../form'

class Page extends Component {
  static displayName = 'AddExperience'
  static propTypes = {
    experience: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }
  
  constructor(props) {
    super(props)
    
    this.validator = new ReeValidate({
      position: 'required|min:2',
      company: 'required',
      address: 'required',
      description: 'min:10',
      startDate: 'required',
      endDate: 'required',
    });
    
    const experience = this.props.experience.toJson()
    
    this.state = {
      experience,
      errors: this.validator.errors
    }
    
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  
  componentWillReceiveProps(nextProps) {
    const experience = nextProps.experience.toJson()
    
    if (!_.isEqual(this.state.experience, experience)) {
      this.setState({ experience })
    }
  }
  
  handleChange(name, value) {
    const { errors } = this.validator
  
    this.setState({
      experience: {
        ...this.state.experience,
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
    const experience = this.state.experience
    const { errors } = this.validator
    
    this.validator.validateAll(experience)
      .then((success) => {
        if (success) {
          this.submit(experience)
        } else {
          this.setState({ errors })
        }
      })
  }
  
  submit(experience) {
    this.props.dispatch(experienceAddRequest(experience))
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
      <main className="col-sm-9 ml-sm-auto ml-lg-auto col-md-9 pt-3">
        <h1>Add Experience</h1>
        <section className="row">
          <div className="col-12 col-md-9 col-sm-12">
            <Form {...this.state}
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
