import React from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const displayName = 'LoginForm'
const propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

const LoginForm = ({ username, password, errors, handleChange, handleSubmit }) => (
  <Form className="form" role="form" onSubmit={handleSubmit} noValidate>
    <h2 className="card-title text-center">SnowballEffect</h2>
    <Form.Group>
      <Form.Control
        type="text"
        className={`form-control-lg ${errors.has('username') && 'is-invalid'}`}
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
        type="password"
        className={`form-control-lg ${errors.has('password') && 'is-invalid'}`}
        id="password"
        name="password"
        placeholder="Password"
        value={password || ''}
        onChange={e => handleChange(e.target.name, e.target.value)}
        required/>
      {errors.has('password') && <div className="invalid-feedback">{errors.first('password')}</div>}
    </Form.Group>
    <Button
      variant="dark"
      className="btn-lg btn-block"
      type="submit"
      disabled={errors.any()}>
      Login
    </Button>
  </Form>
)

LoginForm.displayName = displayName
LoginForm.propTypes = propTypes

export default LoginForm
