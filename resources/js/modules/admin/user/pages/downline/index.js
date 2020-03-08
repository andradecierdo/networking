import { connect } from 'react-redux'
import Page from './Page'

const mapStateToProps = (state, router) => {
  const {id} = router.match.params;
  return {
    user: state.user,
    routeUserId: id,
  };
};

export default connect(mapStateToProps)(Page)
