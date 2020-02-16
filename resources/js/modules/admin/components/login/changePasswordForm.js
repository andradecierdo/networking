import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import SuccessDialog from "./successDialog"
import FormHelperText from '@material-ui/core/FormHelperText';
import {styles} from '../../utils/styles';

import classNames from 'classnames'

const displayName = 'AdminChangePassForm';

const propTypes = {
  oldPassword: PropTypes.string,
  newPassword: PropTypes.string,
  newPassword_confirmation: PropTypes.string,
  errors: PropTypes.object.isRequired,
  success: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const FormHeader = ({id, value, onchange, label, errors}) => (

  <FormControl margin="normal"
               {...errors.has(id) ? {'error': true} : ''}
               {...(id === "newPassword" || id === "newPassword_confirmation")
               && errors.has("both") ? {'error': true} : ""}
               aria-describedby="component-error-text" required fullWidth>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <Input id={id}
           type="password"
           name={id}
           value={value || ""}
           onChange={onchange}/>
    <FormHelperText id="component-error-text">
      {errors.has(id) ? errors.first(id) : ''}
      {(id === "newPassword" || id === "newPassword_confirmation")
      && errors.has("both") ? errors.first("both") : ""}
    </FormHelperText>
  </FormControl>
)

class SignIn extends Component {
  static displayName = displayName;
  static propTypes = propTypes;

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    return this.props.handleChange(e.target.name, e.target.value);
  }

  render() {
    const {classes, errors, success} = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Typography className={classNames(classes.title, classes.logo)} variant="h6" color="inherit" noWrap>
            CM STUDIO ADMIN
          </Typography>
          <Typography className={classes.login} component="h6" variant="h6">
            パスワード変更
          </Typography>
          <form className={classes.form} onSubmit={this.props.handleSubmit}>
            <FormHeader id="oldPassword"
                        value={this.props.oldPassword}
                        onchange={this.onChange}
                        label="古いパスワード"
                        errors={errors}
            />
            <FormHeader id="newPassword"
                        value={this.props.newPassword}
                        onchange={this.onChange}
                        label="パスワード"
                        errors={errors}
            />
            <FormHeader id="newPassword_confirmation"
                        value={this.props.newPassword_confirmation}
                        onchange={this.onChange}
                        label="パスワード（確認）"
                        errors={errors}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              パスワード変更
            </Button>
          </form>
        </Paper>
        <div>
          {this.props.success && (
            <SuccessDialog success={success}/>)}
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(SignIn);
