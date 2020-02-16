import React, {Component} from 'react'
import PropTypes from 'prop-types'
// import {blobToDataURL} from 'blob-util'
import _ from 'lodash'
import ReeValidate from 'ree-validate'
import {fetchCompanyDetail, addCompany, editCompany, clearCompanyDetail} from '../../service'
// import {fetchCustomTemplates, fetchRestrictedTemplates} from "../../../template/service";
// import {camelToSnakeCase} from '../../../../../utils/Common';
import Form from './components/Form';
import Modal from './components/Modal'
// import { confirmAlert } from 'react-confirm-alert';

class Page extends Component {
  static displayName = 'CompanyPage'
  static propTypes = {
    company: PropTypes.object.isRequired,
    // customTemplates: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.any.isRequired,
    accountDetail: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.handleParamChange = this.handleParamChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOnFileChange = this.handleOnFileChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleDeleteTemplateList = this.handleDeleteTemplateList.bind(this);
    this.handleSubmitTemplateList = this.handleSubmitTemplateList.bind(this);
    this.handleResetDownloadLimit = this.handleResetDownloadLimit.bind(this);
    this.handleChangeDownloadLimit = this.handleChangeDownloadLimit.bind(this);
    this.handleChangeAccountSetting = this.handleChangeAccountSetting.bind(this);
    this.handleDownloadLimitTypeChange = this.handleDownloadLimitTypeChange.bind(this);

    this.validator = new ReeValidate({
      last_name: 'required',
      first_name: 'required',
      download_limit_type: 'required',
      download_limit: 'numeric',
      remaining_download_count: 'numeric',
      email_address: 'required|email',
      email_address_confirmation: 'required|email',
      password: 'required',
      password_confirmation: 'required',
      company_name: 'required',
      address: 'required',
      tel_number: 'required',
      restrictions: 'required',
      company_description: '',
      accessAmana: '',
      accessAudiostock: '',
      enableCreateChild: '',
      showEmailAdd: '',
      showPassword: '',
      hasChild: '',
    });
    const dictionary = {
      custom: {
        last_name: {
          required: () => '姓を入力してください。'
        },
        first_name: {
          required: () => '名を入力してください。'
        },
        download_limit_type: {
          required: () => 'チケット配布方法を選択してください。'
        },
        download_limit: {
          numeric: () => '数字で入力してください。',
        },
        remaining_download_count: {
          numeric: () => '数字で入力してください。',
        },
        email_address: {
          required: () => 'メールアドレスを入力してください。',
          email: () => '正しいメールアドレスにしてください。'
        },
        email_address_confirmation: {
          required: () => 'メールアドレスを入力してください。',
          email: () => '正しいメールアドレスにしてください。'
        },
        password: {
          required: () => 'パスワードを入力してください。'
        },
        password_confirmation: {
          required: () => 'パスワードは確認用項目と一致していません。',
        },
        company_name: {
          required: () => '会社名を入力してください。',
        },
        address: {
          required: () => '会社の住所を入力してください。',
        },
        tel_number: {
          required: () => '会社の電話番号を入力してください。',
        },
        restrictions: {
          required: () => 'テンプレートの権限設定を一つも選択してください。',
        },
      }
    };

    this.validator.localize('ja', dictionary);

    this.state = {
      credentials: {
        last_name: '',
        first_name: '',
        download_limit_type: '',
        download_limit: '',
        remaining_download_count: '',
        email_address: '',
        email_address_confirmation: '',
        password: '',
        password_confirmation: '',
        company_name: '',
        company_description: '',
        address: '',
        tel_number: '',
        accessAmana: 'false',
        accessAudiostock: 'false',
        enableCreateChild: 'true',
        logo: '',
        banner: '',
        restrictions: [],
        customTemplateList: [],
        showEmailAdd: 'false',
        showPassword: 'false',
        hasChild:'',
      },
      holder: {
        download_limit_type: '',
        download_limit: '',
        accessAmana: 'false',
        accessAudiostock: 'false',
        enableCreateChild: 'true',
        restrictions: [],
        customTemplateList: [],
      },
      restrictedTemplates: [],
      temporaryTemplateList: [],
      mode: 'create',
      openModal: false,
      errors: this.validator.errors,
      fields: this.validator.fields,
      userEmailAdd: '',
      totalSharedDownload: null,
      totalSharedRemaining: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleParamChange();
    // this.props.dispatch(fetchCustomTemplates({
    //   orderBy: 'ins_time',
    //   order: 'desc',
    //   limit: 5,
    //   restriction: 3
    // }));
    // this.props.dispatch(fetchRestrictedTemplates()).then((res) => {
    //   this.setState({restrictedTemplates: res})
    // })
  }

  componentWillUnmount() {
    this.props.dispatch(clearCompanyDetail());
  }

  setCredentials(company, name) {
    this.setState({
      credentials: {
        ...this.state.credentials,
        last_name: name[0],
        first_name: name[1],
        download_limit_type: company.downloadLimitType,
        download_limit: company.downloadLimit,
        remaining_download_count: company.remainingDownloadCount,
        email_address: company.mailAddress,
        password: '',
        password_confirmation: '',
        company_name: company.companyName,
        address: company.address,
        tel_number: company.telNumber,
        company_description: company.companyDescription,
        accessAmana: company.accessAmana === 1 ? 'true' : 'false',
        accessAudiostock: company.accessAudiostock === 1 ? 'true' : 'false',
        enableCreateChild: company.enableCreateChild === 1 ? 'true' : 'false',
        logo: company.logoUrl,
        banner: company.bannerUrl,
        hasChild: company.hasChild,
      },
      errors: this.validator.errors,
      fields: this.validator.fields,
      userEmailAdd: company.mailAddress
    });
  }

  handleParamChange() {
    const companyId = this.props.match.params.id;
    if (!_.isNil(companyId)) {
      this.setState({ mode: 'edit' });
      this.props.dispatch(fetchCompanyDetail(companyId))
      .then(() => {
        const {company, accountDetail} = this.props;
        if (company.id) {
          let displayName = company.displayName;
          let name = displayName.replace('　', ' ').split(" ");
          this.setCredentials(company, name);
          this.getAccountRestrictionsValue(company.accountRestrictions);
          this.getAccountCustomTemplates(company.accountCustomTemplates);
          this.getUsageLimitationHolders();
          this.setTotalSharedDownload(accountDetail, company);
        }
      });
    }
  }

  setTotalSharedDownload(accountDetail, company) {
    const totalShared = accountDetail.children.reduce((total, data) => total + data.downloadLimit, 0)

    this.setState({
      totalSharedDownload: totalShared,
      origDownloadLimit: company.downloadLimit,
      origRemainingDownloadCount: company.remainingDownloadCount,
    })
  }

  getUsageLimitationHolders() {
    const {accountRestrictions, accountCustomTemplates, accessAmana, accessAudiostock, downloadLimit, enableCreateChild} = this.props.company;
    this.setState({
      holder: {
        ...this.state.holder,
        download_limit: downloadLimit,
        accessAmana: accessAmana === 1 ? 'true' : 'false',
        accessAudiostock: accessAudiostock === 1 ? 'true' : 'false',
        enableCreateChild: enableCreateChild === 1 ? 'true' : 'false',
      },
    });
    if (!_.isEmpty(accountCustomTemplates)) {
      accountCustomTemplates.map(template => {
        this.state.holder.customTemplateList.push(template.templateId.toString());
      });
    }
    if (!_.isEmpty(accountRestrictions)) {
      accountRestrictions.map(restriction => {
        this.state.holder.restrictions.push(restriction.restrictionId.toString());
      });
    }
  }

  getAccountCustomTemplates(templates) {
    if (!_.isEmpty(templates)) {
      templates.map(template => {
        this.state.credentials.customTemplateList.push(template.templateId.toString());
      });
      this.setState({customTemplateList: this.state.credentials.customTemplateList});
    }
  }

  getAccountRestrictionsValue(restrictions) {
    if (!_.isEmpty(restrictions)) {
      restrictions.map(restriction => {
        this.state.credentials.restrictions.push(restriction.restrictionId.toString());
      });
      this.setState({restrictions: this.state.credentials.restrictions});
    }
  }

  handleDownloadLimitTypeChange(value, errors) {
    const {remaining_download_count, download_limit} = this.state.credentials;
    let remainingDownloadCount = remaining_download_count;
    if (value === 'common') {
      remainingDownloadCount = download_limit;
      if (_.isNil(download_limit) || _.isNaN(parseInt(download_limit))) {
        remainingDownloadCount = '';
      }
      errors.remove('remaining_download_count');
    }
    this.setState({
      credentials: {
        ...this.state.credentials,
        download_limit_type: value,
        remaining_download_count: remainingDownloadCount,
      }
    });
  }

  handleChange(name, value) {
    const {errors} = this.validator;
    if (name === 'restrictions') {
      let i = this.state.credentials.restrictions.indexOf(value);
      if (i !== -1) {
        this.state.credentials.restrictions.splice(i, 1);
      } else {
        this.state.credentials.restrictions.push(value);
      }
      this.setState({restrictions: this.state.credentials.restrictions});
    } else if (name === 'download_limit_type') {
      this.handleDownloadLimitTypeChange(value, errors);
    } else {
      this.setState({credentials: {...this.state.credentials, [name]: value}});
    }
    errors.remove(name);
    this.validator.validate(name, value)
        .then(() => {
          if (name === 'password' || name === 'password_confirmation') {
            this.passwordChecking(name, value, errors);
          } else if (name === 'download_limit' || name === 'remaining_download_count') {
            this.downloadLimitChecking(name, value, errors)
          } else if (name === 'showEmailAdd' && value === 'false') {
            errors.remove('email_address');
            errors.remove('email_address_confirmation');
          } else if (name === 'showPassword' && value === 'false') {
            errors.remove('password');
            errors.remove('password_confirmation');
          }
          this.setState({errors});
        });
  }

  handleOnFileChange = (event) => {
    event.persist();
    const {name, files} = event.target;
    const [image] = files;
    // blobToDataURL(image).then((value) => {
    //   let key = `${name}`;
    //   this.setState({credentials: {...this.state.credentials, [key]: value}});
    // });
  };

  handleDeleteTemplateList(value) {
    let i = this.state.credentials.customTemplateList.indexOf(value);
    if (i !== -1) {
      this.state.credentials.customTemplateList.splice(i, 1);
    }
    this.setState({customTemplateList: this.state.credentials.customTemplateList});
  }

  handleSubmitTemplateList(tempList) {
    this.setState({credentials: {...this.state.credentials, ['customTemplateList']: tempList},
        openModal: false});
  }

  handleOpenModal() {
    this.setState({openModal: !this.state.openModal})
  }

  handleErrorMessage() {
    // confirmAlert({
    //   message: '限定公開テンプレートを選択してください',
    //   buttons: [
    //     {
    //       label: 'はい',
    //       onClick: () => {
    //       }
    //     },
    //   ]
    // });
  }

  handleChangeDownloadLimit(name, value) {
    // if (this.state.mode === 'edit') {
    //   const alertConfig = {
    //     customUI: ({onClose}) => (
    //       <div className="react-confirm-alert-body" style={{width: '425px'}}>
    //         <p>チケット配布方法を変更しますと、チケット残数が初期化されます。</p>
    //         <p>変更してもよろしいですか？</p>
    //         <p>(確定ボタンを押す時に変更が反映されます。)</p>
    //         <div className="react-confirm-alert-button-group">
    //           <button onClick={() => {
    //             this.handleChange(name, value);
    //             onClose();
    //           }}>はい
    //           </button>
    //           <button onClick={onClose}>いいえ</button>
    //         </div>
    //       </div>
    //     )
    //   };
    //   confirmAlert(alertConfig);
    // } else {
    //   this.handleChange(name, value);
    // }

    this.handleChange(name, value);
  }

  handleChangeAccountSetting(name, value) {
    // const { hasChild } = this.state.credentials;
    // if (this.state.mode === 'edit' && hasChild) {
    //   const config = {
    //     message: '子アカウントが存在するために無効できまません',
    //     buttons: [
    //       {
    //         label: 'はい',
    //         onClick: () => {}
    //       }
    //     ],
    //   };
    //   confirmAlert(config);
    // } else {
      this.handleChange(name, value);
    // }
  }

  handleSubmit(e) {
    e.preventDefault();
    const {credentials} = this.state;
    const credentialsCopy = _.cloneDeep(credentials);
    const {errors} = this.validator;

    if (this.state.mode === 'edit') {
      if (credentialsCopy.showEmailAdd === 'false') {
        credentialsCopy.email_address = this.state.userEmailAdd
        delete credentialsCopy.email_address_confirmation
      }

      if (credentialsCopy.showPassword === 'false') {
        delete credentialsCopy.password
        delete credentialsCopy.password_confirmation
      }
    }
    this.validator.validateAll(credentialsCopy)
    .then((success) => {
      if (success) {
        if (credentialsCopy.restrictions.includes('3') && _.isEmpty(credentialsCopy.customTemplateList)) {
          this.handleErrorMessage()
        } else {
          this.handleWarningMessage(credentialsCopy);
        }
      } else {
        this.setState({errors});
      }
    });
  }

  handleWarningMessage(credentialsCopy) {
    // if (this.showWarningMessage()) {
    //   const config = {
    //     message: '子アカウントの権限設定が変更される場合があります。変更してもよろしいですか？',
    //     buttons: [
    //       {
    //         label: 'はい',
    //         onClick: () => this.submit(credentialsCopy)
    //       },
    //       {
    //         label: 'いいえ',
    //         onClick: () => {}
    //       },
    //     ],
    //   };
    //   confirmAlert(config);
    // } else {
      this.submit(credentialsCopy);
    // }
  }

  showWarningMessage() {
    const {credentials, holder} = this.state;
    return (holder.download_limit > credentials.download_limit)
      || (holder.accessAmana === 'true' && credentials.accessAmana === 'false')
      || (holder.accessAudiostock === 'true' && credentials.accessAudiostock === 'false')
      || (holder.restrictions.length > credentials.restrictions.length)
      || (holder.customTemplateList.length > credentials.customTemplateList.length)
      || (holder.customTemplateList.length === credentials.customTemplateList.length
          && _.difference(holder.customTemplateList, credentials.customTemplateList).length !== 0)
      || (holder.restrictions.length === credentials.restrictions.length
          && _.difference(holder.restrictions, credentials.restrictions).length !== 0);
  }

  handleResetDownloadLimit() {
    const config = {
      customUI: ({onClose}) => (
        <div className="react-confirm-alert-body" style={{width: '425px'}}>
          <p>チケット残数を初期化します。よろしいですか？</p>
          <p>チケット配布方法が振分けの場合は、子アカウントのチケット数を付与し直す必要があります。</p>
          <div className="react-confirm-alert-button-group">
            <button onClick={() => {
              this.onResetDownloadLimit();
              onClose();
            }}>はい
            </button>
            <button onClick={onClose}>いいえ</button>
          </div>
        </div>
      )
    };
    // confirmAlert(config);

  }

  onResetDownloadLimit() {
    const {download_limit} = this.state.credentials;
    this.setState({credentials: {...this.state.credentials, ['remaining_download_count']: download_limit === null ? '' : download_limit}});
    const {errors} = this.validator;
    errors.remove('remaining_download_count')
  }

  downloadLimitChecking(name, value, errors) {
    const {download_limit, remaining_download_count, download_limit_type} = this.state.credentials;
    if (name === 'remaining_download_count'
      && !_.isNull(download_limit)
      && download_limit !== ''
      && this.state.mode ==='edit') {

      if (download_limit_type === 'shared' && (parseInt(value) + this.state.totalSharedDownload) > download_limit
        && this.props.company.downloadLimitType !== 'common') {
        errors.add(name, 'チケット合計数を超えるために付与できません')
      }

      if (parseInt(value) > parseInt(download_limit)) {
        errors.add(name, 'ケット残数にチケット合計数を超えない数字を入力してください。')
      }
    }

    if (name === 'download_limit') {
      if (!_.isNull(remaining_download_count)
        && remaining_download_count !== ''
        && this.state.mode ==='edit') {
        if (download_limit_type === 'shared') {
          if (download_limit < this.state.totalSharedDownload) {
            errors.add('download_limit', '合計数は ' + this.state.totalSharedDownload + ' まで入力できます')
          } else {
            this.setState({
              credentials:{
                ...this.state.credentials,
                remaining_download_count: (download_limit - this.state.origDownloadLimit) + this.state.origRemainingDownloadCount
              }
            }, () => {
              if(this.state.credentials.remaining_download_count < 0 || parseInt(value) < parseInt(remaining_download_count)) {
                errors.add('remaining_download_count', 'チケット残数にチケット合計数を超えない数字を入力してください。')
              } else {
                errors.remove('remaining_download_count')
              }
            })
          }
        } else {
          if(parseInt(value) < parseInt(remaining_download_count)) {
            errors.add('remaining_download_count', 'チケット残数にチケット合計数を超えない数字を入力してください。')
          } else {
            errors.remove('remaining_download_count')
          }
        }
      } else {
        errors.remove('remaining_download_count')
      }
    }

  }

  submit(credentials) {
    if (this.state.mode === 'create') {
      credentials.id = this.props.company.id;
      this.props.dispatch(addCompany(credentials))
      .then(() => {
        this.props.history.push('/admin/companies');
      })
      .catch(({error, statusCode}) => {
        this.catchErrors(error, statusCode);
      });
    } else {
      credentials.account_id = this.props.company.accountId;
      credentials.id = this.props.company.id;
      this.props.dispatch(editCompany(credentials, this.props.company.id))
      .then(() => {
        this.props.history.push('/admin/companies');
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
        // field = camelToSnakeCase(field);
        switch (field) {
          case 'firstName':
            field = 'first_name';
            break;
          case 'lastName':
            field = 'last_name';
            break;
          case 'downloadLimitType':
            field = 'download_limit_type';
            break;
          case 'downloadLimit':
            field = 'download_limit';
            break;
          case 'remainingDownloadCount':
            field = 'remaining_download_count';
            break;
          case 'emailAddress':
            field = 'email_address';
            break;
          case 'companyName':
            field = 'company_name';
            break;
          case 'telNumber':
            field = 'tel_number';
            break;
        }
        errors.add(field, message);
      });
    } else if (statusCode === 401) {
      errors.add('password', error);
    }
    this.setState({errors});
  }

  render() {
    const {
      last_name,
      first_name,
      download_limit_type,
      download_limit,
      remaining_download_count,
      email_address,
      email_address_confirmation,
      password,
      password_confirmation,
      company_name,
      company_description,
      address,
      tel_number,
      accessAmana,
      accessAudiostock,
      enableCreateChild,
      restrictions,
      customTemplateList,
      logo,
      banner,
      showEmailAdd,
      showPassword,
      hasChild,
    } = this.state.credentials;
    const props = {
      last_name,
      first_name,
      download_limit_type,
      download_limit,
      remaining_download_count,
      email_address,
      email_address_confirmation,
      password,
      password_confirmation,
      company_name,
      company_description,
      address,
      tel_number,
      accessAmana,
      accessAudiostock,
      enableCreateChild,
      restrictions,
      logo,
      banner,
      hasChild,
      customTemplateList,
      showEmailAdd,
      showPassword,
      mode: this.state.mode,
      dispatch: this.props.dispatch,
      // customTemplates: this.props.customTemplates,
      handleSubmit: this.handleSubmit,
      handleOpenModal: this.handleOpenModal,
      handleDeleteTemplateList: this.handleDeleteTemplateList,
      handleResetDownloadLimit: this.handleResetDownloadLimit,
      errors: this.state.errors,
      onChange: this.handleChange,
      fileOnChange: this.handleOnFileChange,
      onHandleChangeDownloadLimit: this.handleChangeDownloadLimit,
      onHandleChangeAccountSetting: this.handleChangeAccountSetting,
      history: this.props.history,
      restrictedTemplates: this.state.restrictedTemplates,
    };

    const modalProps = {
      openModal: this.state.openModal,
      dispatch: this.props.dispatch,
      history: this.props.history,
      // customTemplates: this.props.customTemplates,
      temporaryTemplateList: this.state.temporaryTemplateList,
      // customTemplateList: this.state.credentials.customTemplateList,
      handleOpenModal: this.handleOpenModal,
      handleSubmitTemplateList: this.handleSubmitTemplateList,
    }

    return (<div>
        <Form {...props} />
        { this.state.openModal && <Modal {...modalProps}/>}
      </div>
    );
  }
}

export default Page;
