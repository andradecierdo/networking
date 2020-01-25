import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const displayName = 'RegistrationForm'

const propTypes = {
  passcode: PropTypes.string.isRequired,
  securityCode: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  middleName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirmation: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const RegistrationForm = ({
  passcode,
  securityCode,
  firstName,
  lastName,
  middleName,
  address,
  phoneNumber,
  username,
  email,
  password,
  passwordConfirmation,
  errors,
  handleChange,
  handleSubmit
}) => {
  return (
    <Form role="form" onSubmit={handleSubmit} noValidate>
      <h2 className="card-title text-center">Registration Form</h2>
      <Form.Group>
        <Form.Control
          type="text"
          className={`form-control form-control-lg ${errors.has('passcode') && 'is-invalid'}`}
          name="passcode"
          id="passcode"
          placeholder="Passcode"
          value={passcode || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          autoFocus/>
        {errors.has('passcode') && <div className="invalid-feedback">{errors.first('passcode')}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          className={`form-control form-control-lg ${errors.has('securityCode') && 'is-invalid'}`}
          name="securityCode"
          id="securityCode"
          placeholder="Security Code"
          value={securityCode || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          autoFocus/>
        {errors.has('securityCode') && <div className="invalid-feedback">{errors.first('securityCode')}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          className={`form-control form-control-lg ${errors.has('username') && 'is-invalid'}`}
          name="username"
          id="username"
          placeholder="Username"
          value={username || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          autoFocus/>
        {errors.has('username') && <div className="invalid-feedback">{errors.first('username')}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          className={`form-control form-control-lg ${errors.has('firstName') && 'is-invalid'}`}
          name="firstName"
          id="firstName"
          placeholder="First Name"
          value={firstName || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          autoFocus/>
        {errors.has('firstName') && <div className="invalid-feedback">{errors.first('firstName')}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          className={`form-control form-control-lg ${errors.has('lastName') && 'is-invalid'}`}
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          value={lastName || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          autoFocus/>
        {errors.has('lastName') && <div className="invalid-feedback">{errors.first('lastName')}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          className={`form-control form-control-lg ${errors.has('middleName') && 'is-invalid'}`}
          name="middleName"
          id="middleName"
          placeholder="Middle Name"
          value={middleName || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          autoFocus/>
        {errors.has('middleName') && <div className="invalid-feedback">{errors.first('middleName')}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          className={`form-control form-control-lg ${errors.has('address') && 'is-invalid'}`}
          name="address"
          id="address"
          placeholder="Address"
          value={address || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          autoFocus/>
        {errors.has('address') && <div className="invalid-feedback">{errors.first('address')}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          className={`form-control form-control-lg ${errors.has('phoneNumber') && 'is-invalid'}`}
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          autoFocus/>
        {errors.has('phoneNumber') && <div className="invalid-feedback">{errors.first('phoneNumber')}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="email"
          className={`form-control form-control-lg ${errors.has('email') && 'is-invalid'}`}
          name="email"
          id="email"
          placeholder="Email address"
          value={email || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          autoFocus/>
        {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          className={`form-control form-control-lg ${errors.has('password') && 'is-invalid'}`}
          id="password"
          name="password"
          placeholder="Password"
          value={password || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required/>
        {errors.has('password') && <div className="invalid-feedback">{errors.first('password')}</div>}
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          className={`form-control form-control-lg ${errors.has('passwordConfirmation') && 'is-invalid'}`}
          id="passwordConfirmation"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          value={passwordConfirmation || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required/>
        {errors.has('passwordConfirmation') &&
          <div className="invalid-feedback">{errors.first('passwordConfirmation')}</div>
        }
      </Form.Group>
      <Button
        variant="dark"
        className="btn-lg btn-block"
        type="submit"
        disabled={errors.any()}>
        Register
      </Button>
    </Form>
  )
}

RegistrationForm.displayName = displayName
RegistrationForm.propTypes = propTypes

export default RegistrationForm
