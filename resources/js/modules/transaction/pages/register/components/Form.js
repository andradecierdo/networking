import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const displayName = 'TransactionForm'

const propTypes = {
  value: PropTypes.number.isRequired,
  typeLabel: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const RegistrationForm = ({
  value,
  typeLabel,
  errors,
  handleChange,
  handleSubmit
}) => {
  return (
    <Form role="form" onSubmit={handleSubmit} noValidate>
      <h2 className="card-title text-center">{typeLabel}</h2>
      <Form.Group>
        <Form.Control
          type="number"
          className={`form-control form-control-lg ${errors.has('value') && 'is-invalid'}`}
          name="value"
          id="value"
          placeholder="Value"
          value={value || ''}
          onChange={e => handleChange(e.target.name, e.target.value)}
          required
          autoFocus/>
        {errors.has('value') && <div className="invalid-feedback">{errors.first('value')}</div>}
      </Form.Group>
      <Button
        variant="dark"
        className="btn-lg btn-block"
        type="submit"
        disabled={errors.any()}>
        Submit
      </Button>
    </Form>
  )
}

RegistrationForm.displayName = displayName
RegistrationForm.propTypes = propTypes

export default RegistrationForm
