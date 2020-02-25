import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import {fetchUserDetail, addUser, editUser,} from '../../service'
import Form from './components/Form';

class Page extends Component {
  static displayName = 'UserPage'
  static propTypes = {
    loggedUser: PropTypes.object.isRequired,
    dispatch: PropTypes.any.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleParamChange = this.handleParamChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    const inputValidations = {
      firstName: 'required|max:30',
      lastName: 'required|max:20',
      middleName: 'required|max:20',
      address: 'required',
      phoneNumber: 'required',
      username: 'required|max:20|min:6',
      email: 'email',
      password: 'required|min:6',
      passwordConfirmation: 'required|min:6'
    };

    if (_.isNil(props.id)) {
      inputValidations.passcode = 'required';
      inputValidations.securityCode = 'required';
    }

    this.validator = new ReeValidate(inputValidations);

    this.state = {
      credentials: {
        passcode: '',
        securityCode: '',
        firstName: '',
        lastName: '',
        middleName: '',
        address: '',
        phoneNumber: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
      mode: 'create',
      openModal: false,
      errors: this.validator.errors,
      fields: this.validator.fields,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleParamChange();
  }

  setCredentials(user, name) {
    this.setState({
      credentials: {
        ...this.state.credentials,
        ...user,
      },
      errors: this.validator.errors,
      fields: this.validator.fields,
    });
  }

  handleParamChange() {
    const userId = this.props.id;
    if (!_.isNil(userId)) {
      this.setState({ mode: 'edit' });
      this.props.dispatch(fetchUserDetail(userId))
      .then((data) => {
        this.setState({
          credentials: {
            ...this.state.credentials,
            ...data,
          }
        });
      });
    }
  }

  handleChange(name, value) {
    const {errors} = this.validator;
    this.setState({credentials: {...this.state.credentials, [name]: value}});
    errors.remove(name);
    this.validator.validate(name, value)
        .then(() => {
          this.setState({errors});
        });
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
      .catch(err => console.log(err))
  }

  submit(credentials) {
    if (this.state.mode === 'create') {
      this.props.dispatch(addUser(credentials))
      .then(() => {
        this.props.history.push('/admin/users');
      })
      .catch(({error, statusCode}) => {
        this.catchErrors(error, statusCode);
      });
    } else {
      this.props.dispatch(editUser(credentials, this.props.id))
      .then(() => {
        this.props.history.push('/admin/users');
      })
      .catch(({error, statusCode}) => {
        this.catchErrors(error, statusCode);
      });
    }
  }

  catchErrors(error, statusCode) {
    const {errors} = this.validator;
    if (statusCode === 422) {
      _.forOwn(error, (message, field) => {
        errors.add(field, message);
      });
    } else if (statusCode === 401) {
      errors.add('password', error);
    }
    this.setState({errors});
  }

  render() {
    const {
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
      passwordConfirmation
    } = this.state.credentials;
    const props = {
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
      mode: this.state.mode,
      dispatch: this.props.dispatch,
      handleSubmit: this.handleSubmit,
      errors: this.state.errors,
      onChange: this.handleChange,
      history: this.props.history,
    };

    return (
      <React.Fragment>
        <Form {...props}/>
      </React.Fragment>
    );
  }
}

export default Page;
