import Page from './Page'
import {connect} from 'react-redux'
import User from '../../../../../modules/user/User'

const mapStateToProps = (state, router) => {
  const stateUser = state.user ? state.user : {};
  const {params} = router.match
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loggedUser: new User(stateUser),
    id: params.id,
  };
};

export default connect(mapStateToProps)(Page)
