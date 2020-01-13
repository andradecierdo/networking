import React from 'react'
import PropTypes from 'prop-types'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const displayName = 'ExperienceForm'
const propTypes = {
  buttonLabel: PropTypes.string,
  experience: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

const ExperienceForm = ({ experience, errors, onChange, onSubmit, buttonLabel }) => {
  function handleChange(name, value) {
    if (value !== experience[name]) {
      onChange(name, value)
    }
  }

  return (
    <Form onSubmit={e => onSubmit(e)}>
      <Form.Group as={Row}>
        <Form.Label htmlFor="position" column={true} sm={2}>Position</Form.Label>
        <Col sm={8}>
          <Form.Control
            type="text"
            id="position"
            name="position"
            className={`${errors.has('position') && 'is-invalid'}`}
            placeholder="Position"
            value={experience.position || ''}
            onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('position') &&
          <div className="invalid-feedback">{errors.first('position')}</div>
          }
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label htmlFor="company" column={true} sm={2}>Company</Form.Label>
        <Col sm={8}>
          <Form.Control
            type="text"
            id="company"
            name="company"
            className={`${errors.has('company') && 'is-invalid'}`}
            placeholder="Company"
            value={experience.company || ''}
            onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('company') &&
          <div className="invalid-feedback">{errors.first('company')}</div>
          }
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label htmlFor="address" column={true} sm={2}>Address</Form.Label>
        <Col sm={8}>
          <Form.Control
            type="text"
            id="address"
            name="address"
            className={`${errors.has('address') && 'is-invalid'}`}
            placeholder="Address"
            value={experience.address || ''}
            onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('address')
          && <div className="invalid-feedback">{errors.first('address')}</div>
          }
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label htmlFor="description" column={true} sm={2}>Description</Form.Label>
        <Col sm={8}>
          <textarea
            id="description"
            name="description"
            className={`form-control ${errors.has('description') && 'is-invalid'}`}
            rows="3"
            placeholder="Description"
            value={experience.description}
            onChange={e => handleChange(e.target.name, e.target.value)} />
          {errors.has('description') &&
          <div className="invalid-feedback">{errors.first('description')}</div>
          }
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label htmlFor="start-date" column={true} sm={2}>Start Date</Form.Label>
        <Col sm={8}>
          <Form.Control
            type="text"
            id="start-date"
            name="startDate"
            className={`${errors.has('startDate') && 'is-invalid'}`}
            placeholder="yyyy-mm-dd"
            value={experience.startDate || ''}
            onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('startDate') &&
          <div className="invalid-feedback">{errors.first('startDate')}</div>
          }
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label htmlFor="end-date" column={true} sm={2}>End Date</Form.Label>
        <Col sm={8}>
          <Form.Control
            type="text"
            id="end-date"
            name="endDate"
            className={`${errors.has('endDate') && 'is-invalid'}`}
            placeholder="yyyy-mm-dd"
            value={experience.endDate || ''}
            onChange={e => onChange(e.target.name, e.target.value)} />
          {errors.has('endDate') &&
          <div className="invalid-feedback">{errors.first('endDate')}</div>
          }
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Col sm={10} md={10} xs={12} className="ml-auto">
          <Button
            className="col-lg-4 col-xs-12 col-sm-6 col-md-4"
            variant="dark"
            disabled={errors.any()}
            type="submit">
            {buttonLabel || 'Save'}
          </Button>
        </Col>
      </Form.Group>
    </Form>
  )
}

ExperienceForm.displayName = displayName
ExperienceForm.propTypes = propTypes

export default ExperienceForm
