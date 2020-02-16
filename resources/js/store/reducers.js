import { combineReducers } from 'redux'

import auth from '../modules/auth/store/reducer'
import user from '../modules/user/store/reducer'
import experiences from '../modules/experience/store/reducer'
// import company from '../modules/admin/transactions/store/reducer'

export default combineReducers({ auth, user, experiences })
