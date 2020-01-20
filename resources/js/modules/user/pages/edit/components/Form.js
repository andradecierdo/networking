import React from 'react'
import PropTypes from 'prop-types'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const displayName = 'EditUserFrom'
const propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const EditForm = ({ user, errors, onChange, onSubmit }) => {
  return (
    <Form onSubmit={e => onSubmit(e)}>
      <Form.Group as={Row}>
        <Form.Label htmlFor="username" column={true} sm={3}>Username</Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
                        id="username"
                        name="username"
                        className={`${errors.has('username') && 'is-invalid'}`}
                        placeholder="Username"
                        value={user.username || ''}
                        onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('username') && <div className="invalid-feedback">{errors.first('username')}</div>}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
          <Form.Label htmlFor="firstName" column={true} sm={3}>First Name</Form.Label>
          <Col sm={7}>
              <Form.Control type="text"
                     id="firstName"
                     name="firstName"
                     className={`${errors.has('firstName') && 'is-invalid'}`}
                     placeholder="First Name"
                     value={user.firstName || ''}
                     onChange={e => onChange(e.target.name, e.target.value)} />
              {errors.has('firstName') && <div className="invalid-feedback">{errors.first('firstName')}</div>}
          </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label htmlFor="lastName" column={true} sm={3}>Last Name</Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
                 id="lastName"
                 name="lastName"
                 className={`${errors.has('lastName') && 'is-invalid'}`}
                 placeholder="Last Name"
                 value={user.lastName || ''}
                 onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('lastName') && <div className="invalid-feedback">{errors.first('lastName')}</div>}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label htmlFor="middleName" column={true} sm={3}>Middle Name</Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
                        id="middleName"
                        name="middleName"
                        className={`${errors.has('middleName') && 'is-invalid'}`}
                        placeholder="Middle Name"
                        value={user.middleName || ''}
                        onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('middleName') && <div className="invalid-feedback">{errors.first('middleName')}</div>}
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label htmlFor="email" column={true} sm={3}>Email</Form.Label>
        <Col sm={7}>
          <Form.Control type="email"
                        id="email"
                        name="email"
                        className={`${errors.has('email') && 'is-invalid'}`}
                        placeholder="Email"
                        value={user.email || ''}
                        onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('email') && <div className="invalid-feedback">{errors.first('email')}</div>}
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label htmlFor="address" column={true} sm={3}>Address</Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
                        id="address"
                        name="address"
                        className={`${errors.has('address') && 'is-invalid'}`}
                        placeholder="Address"
                        value={user.address || ''}
                        onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('address') && <div className="invalid-feedback">{errors.first('address')}</div>}
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label htmlFor="phoneNumber" column={true} sm={3}>Phone Number</Form.Label>
        <Col sm={7}>
          <Form.Control type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        className={`${errors.has('phoneNumber') && 'is-invalid'}`}
                        placeholder="Phone Number"
                        value={user.phoneNumber || ''}
                        onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('phoneNumber') && <div className="invalid-feedback">{errors.first('phoneNumber')}</div>}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={9} md={9} xs={12} className="ml-auto">
          <Button className="col-lg-4 col-xs-12 col-sm-6 col-md-4" variant="dark" disabled={errors.any()} type="submit">
            Update
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

EditForm.displayName = displayName
EditForm.propTypes = propTypes

export default EditForm
