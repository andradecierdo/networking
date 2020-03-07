import { connect } from 'react-redux'
import Page from './Page'

const mapStateToProps = (state, router) => {
  const {userId} = router.match.params;
  return {
    user: state.user,
    userId,
  };
};

export default connect(mapStateToProps)(Page)
