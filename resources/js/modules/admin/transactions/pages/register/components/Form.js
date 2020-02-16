import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {withStyles} from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Checkbox,
  Input,
  InputLabel,
  FormGroup,
  FormHelperText,
  InputAdornment,
  FormLabel,
  TextField,
  Divider,
  Switch,
  Select,
  MenuItem
} from '@material-ui/core';
import Table from './list';

const displayName = 'RegisterForm';

const propTypes = {
  last_name: PropTypes.string.isRequired,
  first_name: PropTypes.string.isRequired,
  email_address: PropTypes.string.isRequired,
  email_address_confirmation: PropTypes.string.isRequired,
  download_limit_type: PropTypes.string.isRequired,
  download_limit: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  remaining_download_count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  password: PropTypes.string.isRequired,
  password_confirmation: PropTypes.string.isRequired,
  company_name: PropTypes.string.isRequired,
  company_description: PropTypes.string,
  address: PropTypes.string.isRequired,
  tel_number: PropTypes.string.isRequired,
  accessAmana: PropTypes.string.isRequired,
  accessAudiostock: PropTypes.string.isRequired,
  enableCreateChild: PropTypes.string.isRequired,
  showEmailAdd: PropTypes.string.isRequired,
  showPassword: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  restrictions: PropTypes.array.isRequired,
  logo: PropTypes.string.isRequired,
  banner: PropTypes.string.isRequired,
  customTemplateList: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fileOnChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  customTemplates: PropTypes.object.isRequired,
  handleDeleteTemplateList: PropTypes.func.isRequired,
  handleResetDownloadLimit: PropTypes.func.isRequired,
  dispatch: PropTypes.any,
  restrictedTemplates: PropTypes.array,
};

const fields = [
  { id: 'title', disablePadding: false, sortable: false, label: 'タイトル' },
  { id: 'template_owner', disablePadding: false, sortable: false, label: '登録会社' },
  { id: 'action', disablePadding: false, sortable: false, label: '削除' },
];

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

const InputWrapper = ({errors, name, value, onChange, label, type, isRequired, className, focus}) => (
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

const FileInputWrapper = ({errors, name, value, onChange, label, type}) => (
  <FormControl
    fullWidth
    error={errors.has({name})}>
    <TextField id={name}
               name={name}
               type={type}
               autoComplete={name}
               onChange={onChange}
               InputProps={{
                 inputProps: {accept: 'image/*',},
                 startAdornment: (
                   <InputAdornment position="start">
                     <FormLabel style={{width: '3em'}}>
                       {label}
                     </FormLabel>
                   </InputAdornment>
                 ),
               }}/>

    <FormHelperText id="component-error-text">
      {errors.has({name}) ? errors.first({name}) : ''}
    </FormHelperText>
  </FormControl>
)

const CheckboxWrapper = ({value, name, values, onChange, label, type}) => (
  <FormControlLabel
    control={<Checkbox
      name={name}
      type={type}
      checked={values.includes(value)}
      onChange={onChange}
      color="primary"
      value={value}/>}
    label={label}/>
)

const ImagePreviewWrapper = ({classes, value, name}) => {
  if (!_.isEmpty(value)) {
    return (
      <div className={classes.imageContainer}>
        <img src={value} alt={name}/>
      </div>
    )
  } else {
    return null
  }
}

const EmailAddField = ({mode, state, onchange, ...props}) => {
  if (mode === 'create' ||
    (mode === 'edit' && state === 'true')) {
    return (<div>
      <InputWrapper name="email_address" type="email" errors={props.errors}
                    value={props.email_address}
                    onChange={onchange}
                    label="メールアドレス"/>
      <InputWrapper name="email_address_confirmation" type="email" errors={props.errors}
                    value={props.email_address_confirmation}
                    onChange={onchange}
                    label="メールアドレス (確認)"/>
    </div>)
  } else {
    return null
  }
}

const PasswordField = ({mode, state, onchange, ...props}) => {
  if (mode === 'create' ||
      (mode === 'edit' && state === 'true')) {
    return (<div>
      <InputWrapper name="password" type="password" errors={props.errors}
                    value={props.password}
                    onChange={onchange}
                    label="パスワード"/>
      <InputWrapper name="password_confirmation" type="password" errors={props.errors}
                    value={props.password_confirmation}
                    onChange={onchange}
                    label="パスワード (確認)"/>
    </div>)
  } else {
    return null
  }
}

const DownloadLimitTypeField = ({errors, name, value, onChange, label, isRequired, className}) => (
  <FormControl
    required={isRequired !== false} fullWidth
    error={errors.has(name)} className={className}>
    <InputLabel htmlFor={name}>チケット配布方法</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      name={name}
      id={name}
    >
      <MenuItem value={'common'}>共同（同じチケット数を親子アカウントでシェアします）</MenuItem>
      <MenuItem value={'shared'}>振分（チケットをアカウント別に分配することができます）</MenuItem>
    </Select>
    <FormHelperText id="component-error-text">
      {errors.has(name) ? errors.first(name) : ''}
    </FormHelperText>
  </FormControl>
)

const AccountSettingFields = ({value, name, onChange, checked, label, classes}) => (
  <React.Fragment>
    <FormLabel component="h6" className={classes}>オプション設定</FormLabel>
    <FormGroup row>
      <FormControlLabel
        control={<Switch
          value={value}
          checked={checked}
          onChange={onChange}
          color="primary"
          name={name}/>}
        label={label}/>
  </FormGroup></React.Fragment>)

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
    this.props.history.push('/admin/companies')
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleFileOnChange = this.handleFileOnChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDownloadChange = this.handleDownloadChange.bind(this);
    this.handleAccountSettingChange = this.handleAccountSettingChange.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'accessAmana' || e.target.name === 'accessAudiostock' ||
        e.target.name === 'showEmailAdd' || e.target.name === 'showPassword' ||
        e.target.name === 'enableCreateChild') {
      e.target.value = e.target.checked;
    }
    return this.props.onChange(e.target.name, e.target.value);
  }

  handleDownloadChange(e) {
    this.props.onHandleChangeDownloadLimit(e.target.name, e.target.value);
  }

  handleAccountSettingChange(e) {
    e.target.value = e.target.checked;
    this.props.onHandleChangeAccountSetting(e.target.name, e.target.value);
  }

  handleFileOnChange(e) {
    return this.props.fileOnChange(e);
  }

  render() {
    const {classes, theme, errors, customTemplates, enableCreateChild, download_limit_type, restrictedTemplates} = this.props;
    const props = {
      customTemplates: customTemplates,
      restrictedTemplates: restrictedTemplates,
      dispatch: this.props.dispatch,
      history: this.props.history,
      customTemplateList: this.props.customTemplateList,
      handleDeleteTemplateList: this.props.handleDeleteTemplateList,
      email_address: this.props.email_address,
      email_address_confirmation: this.props.email_address_confirmation,
      password: this.props.password,
      password_confirmation: this.props.password_confirmation,
      errors: errors,
      fields,
    };
    const mode = this.props.mode;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="アカウント管理: Company Register"/>
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}>
          <TabContainer dir={theme.direction}>
            <form className={classes.container} noValidate autoComplete="off" role="form"
                  onSubmit={this.props.handleSubmit}>
              <Typography variant="h6" gutterBottom>会社情報</Typography>
              <Divider/>
              <InputWrapper name="company_name" type="text" errors={this.props.errors}
                            value={this.props.company_name}
                            onChange={this.handleChange}
                            label="企業名" focus="true"/>
              <InputWrapper name="company_description" type="text" errors={this.props.errors}
                            value={this.props.company_description}
                            onChange={this.handleChange}
                            label="概要" isRequired={false}/>
              <FileInputWrapper name="logo" type="file" errors={this.props.errors}
                                value={this.props.logo}
                                onChange={this.handleFileOnChange}
                                label="ロゴ"/>
              <ImagePreviewWrapper classes={classes} value={this.props.logo} name="logo"/>
              <FileInputWrapper name="banner" type="file" errors={this.props.errors}
                                value={this.props.banner}
                                onChange={this.handleFileOnChange}
                                label="バナー"/>
              <ImagePreviewWrapper classes={classes} value={this.props.banner} name="banner"/>
              <InputWrapper name="address" type="text" errors={this.props.errors}
                            value={this.props.address}
                            onChange={this.handleChange}
                            label="住所"/>
              <InputWrapper name="tel_number" type="text" errors={this.props.errors}
                            value={this.props.tel_number}
                            onChange={this.handleChange}
                            label="電話番号"/>
              <Typography variant="h6" gutterBottom className={classes.customDivider}>テンプレート設定</Typography>
              <Divider/>
              <FormLabel component="h6" className={classes.customLabel}>テンプレート利用権限設定 全公開</FormLabel>
              <FormGroup row>
                <CheckboxWrapper name="restrictions" type="checkbox" values={this.props.restrictions} value="1"
                                 onChange={this.handleChange}
                                 label="月額用テンプレート"/>
                <CheckboxWrapper name="restrictions" type="checkbox" values={this.props.restrictions} value="2"
                                 onChange={this.handleChange}
                                 label="一般用テンプレート"/>
                <CheckboxWrapper name="restrictions" type="checkbox" values={this.props.restrictions} value="3"
                                 onChange={this.handleChange}
                                 label="限定公開テンプレート"/>
                <Button variant="contained" color="primary"
                  onClick={this.props.handleOpenModal}
                  className={classes.customButton}
                  disabled={!this.props.restrictions.includes('3')}>
                  限定公開テンプレート選択
                </Button>
              </FormGroup>
              <FormHelperText id="component-error-text" style={{'color': 'red'}}>
                {errors.has('restrictions') ? errors.first('restrictions') : ''}
              </FormHelperText>
              <FormLabel component="h5" className={classes.customLabel}>Custom Template List</FormLabel>
              <Table {...props}/>
              <FormLabel component="h6" className={classes.customLabel}>オプション設定</FormLabel>
              <FormGroup row>
                <FormControlLabel control={<Switch
                    value={this.props.accessAmana || 'false'}
                    checked={this.props.accessAmana === 'true'}
                    onChange={this.handleChange}
                    color="primary" name="accessAmana"/>} label="amana 素材"/>
                <FormControlLabel control={<Switch
                    value={this.props.accessAudiostock || 'false'}
                    checked={this.props.accessAudiostock === 'true'}
                    onChange={this.handleChange} color="primary"
                    name="accessAudiostock"/>} label="audiostock 素材"/>
              </FormGroup>
              <Typography variant="h6" gutterBottom className={classes.customDivider}>アカウント管理設定</Typography>
              <AccountSettingFields value={enableCreateChild || 'false'} checked={enableCreateChild === 'true'}
                                    name="enableCreateChild" classes={classes.customLabel}
                                    onChange={this.handleAccountSettingChange} label='子アカウント作成・管理'/>
              <Typography variant="h6" gutterBottom className={classes.customDivider}> 担当者情報 </Typography>
              <Divider/>
              <InputWrapper name="last_name" type="text" errors={this.props.errors}
                            value={this.props.last_name}
                            onChange={this.handleChange}
                            label="姓"/>
              <InputWrapper name="first_name" type="text" errors={this.props.errors}
                            value={this.props.first_name}
                            onChange={this.handleChange}
                            label="名"/>
               <DownloadLimitTypeField isRequired={true} name="download_limit_type" errors={errors}
                 value={download_limit_type}
                 onChange = {this.handleDownloadChange}/>

              <InputWrapper name="download_limit" type="text" errors={this.props.errors}
                            value={this.props.download_limit}
                            onChange={this.handleChange}
                            label="チケット合計数" isRequired={false}/>
              {
                this.props.mode === 'edit' &&
                <div>
                  <InputWrapper name="remaining_download_count" type="text" errors={this.props.errors}
                                value={this.props.remaining_download_count}
                                onChange={this.handleChange}
                                label="チケット残数" isRequired={false} className={classes.textField}/>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.margin}
                    onClick={this.props.handleResetDownloadLimit}
                  > リセット
                  </Button>
                </div>
              }
              {this.props.mode === 'edit' &&
              <FormGroup row>
                <FormControlLabel
                    control={<Switch
                        value={this.props.showEmailAdd || 'false'}
                        checked={this.props.showEmailAdd === 'true'}
                        onChange={this.handleChange}
                        color="primary"
                        name="showEmailAdd"/>}
                    label="メールアドレスを変更"/>
              </FormGroup>}
              <EmailAddField mode={mode}
                             state={this.props.showEmailAdd}
                             onchange = {this.handleChange} {...props}/>
              {this.props.mode === 'edit' &&
              <FormGroup row>
                <FormControlLabel
                    control={<Switch
                    value={this.props.showPassword || 'false'}
                    checked={this.props.showPassword === 'true'}
                    onChange={this.handleChange}
                    color="primary"
                    name="showPassword"/>}
                    label="パスワードを変更"/>
              </FormGroup>}
              <PasswordField mode={mode}
                             state={this.props.showPassword}
                             onchange = {this.handleChange} {...props}/>
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                type="submit"
                disabled={errors.any()}
              >
                確定
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={this.handleCancel}
                className={classes.cancel}>
                キャンセル
              </Button>
            </form>
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Form);
