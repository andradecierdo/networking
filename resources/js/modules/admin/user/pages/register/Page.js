import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import {searchUsers, fetchUserDetail, addUser, editUser,} from '../../service'
import Form from './components/Form';
import User from "../../../../user/User";

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
      parentId: 'required',
      firstName: 'required|max:30',
      lastName: 'required|max:20',
      middleName: 'required|max:20',
      balance: 'required|decimal',
      rebate: 'required|decimal',
      address: 'required',
      phoneNumber: 'required',
      username: 'required|max:20|min:6',
      email: 'email',
      showPassword: '',
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
        parentId: null,
        passcode: '',
        securityCode: '',
        firstName: '',
        lastName: '',
        middleName: '',
        balance: '',
        rebate: '',
        address: '',
        phoneNumber: '',
        username: '',
        email: '',
        showPassword: 'false',
        password: '',
        passwordConfirmation: '',
      },
      users: [],
      loaded: false,
      mode: 'create',
      openModal: false,
      errors: this.validator.errors,
      fields: this.validator.fields,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleParamChange();
    const queryParams = {
      exceptions: [this.props.id],
    }
    this.props.dispatch(searchUsers(queryParams))
      .then((data) => {
        const users = data.data.map((user) => new User(user));
        this.setState({
          ...this.state,
          users,
          loaded: true,
        });
      });
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
          if (name === 'showPassword' && value === 'false') {
            errors.remove('password');
            errors.remove('passwordConfirmation');
          }
          this.setState({errors});
        });
  }

  handleSubmit(e) {
    e.preventDefault()
    const { credentials } = this.state
    const credentialsCopy = _.cloneDeep(credentials);
    const { errors } = this.validator

    if (credentialsCopy.showPassword === 'false') {
      delete credentialsCopy.password
      delete credentialsCopy.passwordConfirmation
    }

    this.validator.validateAll(credentialsCopy)
      .then((success) => {
        if (success) {
          this.submit(credentialsCopy)
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
      parentId,
      passcode,
      securityCode,
      firstName,
      lastName,
      middleName,
      balance,
      rebate,
      address,
      phoneNumber,
      username,
      email,
      showPassword,
      password,
      passwordConfirmation
    } = this.state.credentials;
    const props = {
      parentId,
      passcode,
      securityCode,
      firstName,
      lastName,
      middleName,
      balance,
      rebate,
      address,
      phoneNumber,
      username,
      email,
      showPassword,
      password,
      passwordConfirmation,
      users: this.state.users,
      mode: this.state.mode,
      dispatch: this.props.dispatch,
      handleSubmit: this.handleSubmit,
      errors: this.state.errors,
      onChange: this.handleChange,
      history: this.props.history,
    };

    return (
      <React.Fragment>
        {this.state.loaded &&
        <Form {...props}/>
        }
      </React.Fragment>
    );
  }
}

export default Page;
