import React, { Component } from 'react'
import { SubmissionError } from 'redux-form'
import _ from 'lodash'
import Form from './components/Form'

class Page extends Component {
  static displayName = 'CompanyEditor';

  constructor(props) {
    super(props);

    this.state = {
      mode: 'create',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleParamChange = this.handleParamChange.bind(this);
    this.verifyAccount = this.verifyAccount.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.handleParamChange();
  }

  componentWillUnmount() {
    this.props.clearCompanyDetail();
  }

  handleSubmit(values) {
    const { company } = this.props;

    if (this.state.mode === 'create') {
      return this.props.addCompany(values)
        .then((res) => {
          this.props.history.push('/admin/companies');
        }).catch((error) => {
          throw new SubmissionError(error);
        });
    } else {
      return this.props.updateCompany(values, company.id)
        .then(() => {
          this.props.history.push('/admin/companies');
        }).catch((error) => {
          throw new SubmissionError(error);
        });
    }
  }

  verifyAccount(data) {
    let { email_address } = data;
    this.props.verify({ email_address });
  }

  handleParamChange() {
    const companyId = this.props.match.params.id;
    if (!_.isNil(companyId)) {
      this.setState({ mode: 'edit' });
      this.props.fetchCompany(companyId);
    }
  }

  render() {
    const { mode } = this.state;
    const { company } = this.props;

    const props = {
      mode,
      company,
      history: this.props.history,
      onSubmit: this.handleSubmit,
    };

    return (<Form {...props}  />);
  }
}

export default Page;
