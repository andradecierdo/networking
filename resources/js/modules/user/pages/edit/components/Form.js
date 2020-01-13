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
          <Form.Label htmlFor="firstName" column={true} sm={2}>First Name</Form.Label>
          <Col sm={8}>
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
        <Form.Label htmlFor="lastName" column={true} sm={2}>Last Name</Form.Label>
        <Col sm={8}>
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
        <Form.Label htmlFor="email" column={true} sm={2}>Email</Form.Label>
        <Col sm={8}>
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
        <Form.Label htmlFor="phone" column={true} sm={2}>Phone</Form.Label>
        <Col sm={8}>
          <Form.Control type="text"
                        id="phone"
                        name="phone"
                        className={`${errors.has('phone') && 'is-invalid'}`}
                        placeholder="Phone"
                        value={user.phone || ''}
                        onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('phone') && <div className="invalid-feedback">{errors.first('phone')}</div>}
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={10} md={10} xs={12} className="ml-auto">
          <Button className="col-lg-4 col-xs-12 col-sm-6 col-md-4" variant="dark" disabled={errors.any()} type="submit">Update</Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

EditForm.displayName = displayName
EditForm.propTypes = propTypes

export default EditForm
