import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Button,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Divider,
} from '@material-ui/core';

const displayName = 'RegisterForm';

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
  mode: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.any,
};

function TabContainer({children, dir}) {
  return (
    <Typography component="div" dir={dir} style={{padding: 10 * 3}}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    width: 1000,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    color: 'white',
    width: 120,
  },
  cancel: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 3,
    width: 120,
  },
  customButton: {
    color: 'white',
    width: 170,
    height: 40,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    width: '90%'
  },
  customLabel: {
    color: '#0000008a',
    marginBottom: '0rem',
    fontSize: '1rem',
    fontWeight: 300
  },
  customDivider: {
    paddingTop: 20
  },
  imageContainer: {
    textAlign: 'center',
  },
});

const InputWrapper = ({errors, name, value, onChange, label, type, isRequired, className, focus = false}) => (
  <FormControl
      required={isRequired !== false} fullWidth
      error={errors.has(name)} className={className}>
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <Input id={name}
           name={name}
           type={type}
           autoComplete={name}
           value={value}
           onChange={onChange}
           autoFocus={focus}/>
    <FormHelperText id="component-error-text">
      {errors.has(name) ? errors.first(name) : ''}
    </FormHelperText>
  </FormControl>
)


const EmailAddField = ({mode, state, onchange, ...props}) => {
  return (
    <div>
    <InputWrapper name="email" type="email" errors={props.errors}
                  value={props.email}
                  onChange={onchange}
                  label="Email"/>
    {/*<InputWrapper name="email_address_confirmation" type="email" errors={props.errors}*/}
                  {/*value={props.email_confirmation}*/}
                  {/*onChange={onchange}*/}
                  {/*label="メールアドレス (確認)"/>*/}
  </div>
  )
}

const PasswordField = ({mode, onchange, ...props}) => {
  return (
    <div>
    <InputWrapper name="password" type="password" errors={props.errors}
                  value={props.password}
                  onChange={onchange}
                  label="Password"/>
    <InputWrapper name="passwordConfirmation" type="password" errors={props.errors}
                  value={props.passwordConfirmation}
                  onChange={onchange}
                  label="Password confirmation"/>
  </div>
  )
}

class Form extends Component {
  static displayName = displayName;
  static propTypes = propTypes;
  state = {
    value: 0,
  };

  handleChangeTab = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = index => {
    this.setState({value: index});
  };

  handleCancel = () => {
    this.props.history.push('/admin/users')
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(e) {
    return this.props.onChange(e.target.name, e.target.value);
  }

  render() {
    const {value} = this.state;
    const {
      classes,
      theme,
      errors,
      dispatch,
      history,
      password,
      passwordConfirmation,
      mode,
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
      handleSubmit,
    } = this.props;
    const props = {
      dispatch,
      history,
      email,
      password,
      passwordConfirmation,
      errors,
    };
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Account Registration"/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={this.handleChangeIndex}>
          <TabContainer dir={theme.direction}>
            <form
              className={classes.container}
              noValidate
              autoComplete="off"
              role="form"
              onSubmit={handleSubmit}
            >
              <Divider/>
              {mode === 'create' &&
              <React.Fragment>
                <InputWrapper
                  name="passcode"
                  type="text"
                  errors={errors}
                  value={passcode}
                  onChange={this.handleChange}
                  label="Passcode" focus={true}
                />
                <InputWrapper
                  name="securityCode"
                  type="text"
                  errors={errors}
                  value={securityCode}
                  onChange={this.handleChange}
                  label="Security Code"
                />
              </React.Fragment>
              }
              <InputWrapper
                name="username"
                type="text"
                errors={errors}
                value={username}
                onChange={this.handleChange}
                label="Username"
              />
              <Divider/>
              <InputWrapper
                name="lastName"
                type="text"
                errors={errors}
                value={lastName}
                onChange={this.handleChange}
                label="Last Name"
              />
              <InputWrapper
                name="firstName"
                type="text"
                errors={errors}
                value={firstName}
                onChange={this.handleChange}
                label="First Name"
              />
              <InputWrapper
                name="middleName"
                type="text"
                errors={errors}
                value={middleName}
                onChange={this.handleChange}
                label="Middle Name"
              />
              <InputWrapper
                name="balance"
                type="number"
                errors={errors}
                value={balance}
                onChange={this.handleChange}
                label="Balance"
              />
              <InputWrapper
                name="rebate"
                type="number"
                errors={errors}
                value={rebate}
                onChange={this.handleChange}
                label="Rebate"
              />
              <InputWrapper
                name="address"
                type="text"
                errors={errors}
                value={address}
                onChange={this.handleChange}
                label="Address"
              />
              <InputWrapper
                name="phoneNumber"
                type="text"
                errors={errors}
                value={phoneNumber}
                onChange={this.handleChange}
                label="Phone Number"
              />
              <EmailAddField
                mode={mode}
                onchange={this.handleChange}
                {...props}
              />
              <PasswordField
                mode={mode}
                onchange={this.handleChange}
                {...props}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                type="submit"
                disabled={errors.any()}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.handleCancel}
                className={classes.cancel}>
                Cancel
              </Button>
            </form>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Form);
