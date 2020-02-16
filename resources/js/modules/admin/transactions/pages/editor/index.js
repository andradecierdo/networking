import { connect } from 'react-redux';
import Page from './Page';
import {fetchCompanyDetail, addCompany, editCompany, clearCompanyDetail} from '../../service'
// import {verifyAccount} from '../../../../auth/service'

//TODO to be edited to transaction form editor (check if used)
const mapStateToProps = (state) => {
  return {
    company: state.company.detail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCompany: (id) => dispatch(fetchCompanyDetail(id)),
    addCompany: (company) => dispatch(addCompany(company)),
    updateCompany: (company, id) => dispatch(editCompany(company, id)),
    clearCompanyDetail: () => dispatch(clearCompanyDetail()),
    // verify: (email) => dispatch(verifyAccount(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
