import { connect } from 'react-redux'
import Page from './Page'

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Page)
