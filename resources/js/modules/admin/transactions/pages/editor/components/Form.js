import React, {Component} from 'react'
import {blobToDataURL} from 'blob-util'
import * as PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  TextField,
  FormLabel,
  Divider,
  InputAdornment,
  Typography
} from '@material-ui/core'
import {Field, reduxForm} from 'redux-form'
import {confirmation, email, format, required, numericality} from 'redux-form-validators'
import {connect} from 'react-redux'

import PasswordAdornment from './PasswordAdornment'

const FORM = 'companyForm';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  title: {
    padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 2}px 0`,
  },
  next: {
    marginTop: theme.spacing.unit * 3,
    color: 'white',
    width: 60,
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
  imageContainer: {
    textAlign: 'center',
  },
});

const displayName = 'CompanyForm';

const TabContainer = (props) => {
  const {children, dir} = props;
  return (<Typography component="div" dir={dir} style={{padding: 10 * 3}}>
    {children}
  </Typography>);
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const InputWrapper = (props) => {
  const {type, label, input, meta: {touched, error, warning, invalid}, ...rest} = props;

  return (
    <FormControl fullWidth error={touched && invalid}>
      <TextField
        type={type}
        label={label}
        error={touched && invalid}
        {...input}
        {...rest}
        margin="normal"
      />
      {label === 'ダウンロード上限' && (
        <FormHelperText>ダウンロード数制限を無しにする場合は未入力にしてください。</FormHelperText>
      )}
      {touched && ((error && <FormHelperText>{error}</FormHelperText>) || (warning &&
        <FormHelperText>{warning}</FormHelperText>))}
    </FormControl>);
};

const FileInputWrapper = (props) => {
  const {name, handleOnFileChange, label, ...rest} = props;

  return (
    <FormControl fullWidth>
      <TextField
        name={name}
        type="file"
        onChange={handleOnFileChange}
        margin="normal"
        {...rest}
        InputProps={{
          inputProps: {accept: 'image/*',},
          startAdornment: (
            <InputAdornment position="start">
              <FormLabel style={{width: '3em'}}>
                {label}
              </FormLabel>
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
};

class Form extends Component {
  static displayName = displayName;
  static propTypes = {
    classes: PropTypes.object.isRequired,
    mode: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      passwordShow: false,
      passwordConfirmationShow: false,
      logoImage: '',
      bannerImage: '',
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleOnFileChange = this.handleOnFileChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleOnFileChange = (event) => {
    event.persist();
    const {name, files} = event.target;
    const [image] = files;
    blobToDataURL(image).then((value) => {
      let key = `${name}Image`;
      this.setState({[key]: value});
      this.props.change(`${name}`, value);
    });
  };

  handleClickShowPassword(event, field) {
    const key = `${field}Show`;
    this.setState({[key]: !this.state[key]});
  }

  componentWillUnmount() {
    this.setState({logoImage: '', bannerImage: '',});
  }

  handleCancel = () => {
    this.props.history.push('/admin/companies')
  };

  render() {
    const {classes, mode, handleSubmit, pristine, submitting, initialValues: {logoUrl, bannerUrl}} = this.props;
    return (
      <Grid container justify="center" alignItems="center" direction="column">
        <Typography variant="h5" className={classes.title} gutterBottom>
          {mode === 'create' ? '企業登録' : '編集'}
        </Typography>
        <Grid item md={6} xs={12}>
          <form role="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={24}>
              <Grid item>
                <Paper className={classes.paper} elevation={1}>
                  <Typography variant="h6" gutterBottom>
                    会社情報
                  </Typography>
                  <Divider/>
                  <Field
                    type="text"
                    name="companyName"
                    label="企業名"
                    component={InputWrapper}
                    validate={required({msg: '会社名を入力してください。'})}
                  />

                  <Field
                    type="text"
                    name="companyDescription"
                    label="会社概要"
                    component={InputWrapper}
                    validate={required({msg: '会社概要を入力してください。'})}
                  />

                  <FileInputWrapper
                    name="logo"
                    label="ロゴ"
                    handleOnFileChange={this.handleOnFileChange}
                  />
                  {(this.state.logoImage || logoUrl) && (
                    <div className={classes.imageContainer}>
                      <img src={this.state.logoImage || logoUrl} alt="Logo"/>
                    </div>
                  )}

                  <FileInputWrapper
                    name="banner"
                    label="バナー"
                    handleOnFileChange={this.handleOnFileChange}
                  />
                  {(this.state.bannerImage || logoUrl) && (
                    <div className={classes.imageContainer}>
                      <img src={this.state.bannerImage || bannerUrl} alt="Banner"/>
                    </div>
                  )}

                  <Field
                    type="text"
                    name="address"
                    label="住所"
                    component={InputWrapper}
                    validate={required({msg: 'Address を入力してください。'})}
                  />
                  <Field
                    type="text"
                    name="telNumber"
                    label="電話番号"
                    component={InputWrapper}
                    validate={[
                      required({msg: '電話番号を入力してください。'}),
                      format({with: /^[0-9]{2,5}-[0-9]{1,4}-[0-9]{4}$/, msg: '電話番号は数字にしてください。'})
                    ]}
                  />
                </Paper>
              </Grid>
              <Grid item>
                <Paper className={classes.paper} elevation={1}>
                  <Typography variant="h6" gutterBottom>
                    口座情報
                  </Typography>
                  <Divider/>
                  <Field
                    type="text"
                    name="firstName"
                    label="名"
                    component={InputWrapper}
                    validate={required({msg: '名を入力してください。'})}
                  />
                  <Field
                    type="text"
                    name="lastName"
                    label="姓"
                    component={InputWrapper}
                    validate={required({msg: '姓を入力してください。'})}
                  />
                  <Field
                    type="text"
                    name="downloadLimit"
                    label="ダウンロード上限"
                    component={InputWrapper}
                    validate={[
                      numericality({int: true, allowBlank: true, msg: '数字で入力してください。'}),
                      numericality({'>': 0, allowBlank: true, msg: 'ダウンロード上限に数字を入力してください 。'})
                    ]}
                  />
                  <Field
                    type="text"
                    name="mailAddress"
                    label="メールアドレス"
                    component={InputWrapper}
                    validate={[
                      required({msg: 'メールアドレスを入力してください。'}),
                      email({msg: '正しいメールアドレスにしてください。'})
                    ]}
                  />
                  <Field
                    type="text"
                    name="mailAddressConfirmation"
                    label="メールアドレス (Confirm)"
                    component={InputWrapper}
                    validate={[
                      required({msg: 'メールアドレスは確認用項目と一致していません。'}),
                      email({msg: '正しいメールアドレスにしてください。'}),
                      confirmation({field: 'mailAddress', fieldLabel: 'メールアドレス'}),
                    ]}
                  />
                  <Field
                    name="password"
                    label="パスワード"
                    component={InputWrapper}
                    InputProps={{
                      endAdornment: <PasswordAdornment
                        onClick={e => this.handleClickShowPassword(e, 'password')}
                        visibility={this.state.passwordShow}
                      />
                    }}
                    type={this.state.passwordShow ? 'text' : 'password'}
                    validate={mode === 'create' && required({msg: 'パスワードを入力してください。'})}
                  />
                  <Field
                    name="passwordConfirmation"
                    label="パスワード (Confirm)"
                    component={InputWrapper}
                    InputProps={{
                      endAdornment: <PasswordAdornment
                        onClick={e => this.handleClickShowPassword(e, 'passwordConfirmation')}
                        visibility={this.state.passwordConfirmationShow}
                      />
                    }}
                    type={this.state.passwordConfirmationShow ? 'text' : 'password'}
                    validate={mode === 'create' && [
                      confirmation({field: 'password', fieldLabel: 'パスワード'}),
                      required({msg: 'パスワードは確認用項目と一致していません。'}),
                    ]}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    color="primary"
                    className={classes.submit}
                    disabled={pristine || submitting}
                  >
                    送信する
                  </Button>
                  <Button
                    variant="outlined"
                    className={classes.cancel}
                    onClick={this.handleCancel}
                  >
                    キャンセル
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    );
  }
}

const formConfig = {
  form: FORM,
  enableReinitialize: true,
};

const mapStateToProps = (state) => {
  const company = state.company.detail;
  const images = {
    logo: '',
    banner: '',
  };

  if (company) {
    company.downloadLimit = company.downloadLimit !== 0 ? company.downloadLimit : '';
  }

  return {
    initialValues: {...company, ...images}
  };
};

export default connect(mapStateToProps)(reduxForm(formConfig)(withStyles(styles, {withTheme: true})(Form)))
