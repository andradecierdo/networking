import Page from './Page'
import {connect} from 'react-redux'

//TODO to be edited to transaction form editor (from company cm)
const mapStateToProps = (state) => {
  return {
    company: state.company.detail,
    // customTemplates: state.template.customTemplates,
    user: state.auth.user,
    // accountDetail: state.account.accountDetail,
  };
};

export default connect(mapStateToProps)(Page)
