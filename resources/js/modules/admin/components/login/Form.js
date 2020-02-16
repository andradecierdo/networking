import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AlertDialog from "./AlertDialog";
import classNames from 'classnames'
import {styles} from '../../utils/styles';

const displayName = 'AdminLoginForm';

const propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  remember: PropTypes.bool,
  errors: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};


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
    const { classes, errors } = this.props;
    return (
        <main className={classes.main}>
          <CssBaseline/>
          <Paper className={classes.paper}>
            <Typography className={classNames(classes.title, classes.logo)} variant="h6" color="inherit" noWrap>
              CM STUDIO ADMIN
            </Typography>
            <Typography className={classes.login} component="h6" variant="h6">
              ログインしましょう
            </Typography>
            <form className={classes.form} onSubmit={this.props.handleSubmit} noValidate>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">メールアドレス</InputLabel>
                <Input id="email"
                       name="email"
                       autoComplete="email"
                       value={this.props.email || ""}
                       onChange={this.onChange}
                       autoFocus/>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">パスワード</InputLabel>
                <Input name="password"
                       type="password"
                       id="password"
                       autoComplete="current-password"
                       value={this.props.password || ""}
                       onChange={this.onChange}
                />
              </FormControl>
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary"/>}
                  label="ログインを維持する"
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
              >
                Sign in
              </Button>
            </form>
          </Paper>
          <div>
            {this.props.errors.has('password') && (
                <AlertDialog errors={errors}/>
            )}
          </div>
        </main>
    );
  }
}

export default withStyles(styles)(SignIn);
