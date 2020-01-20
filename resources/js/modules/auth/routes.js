import Loadable from 'react-loadable'
import LoadingComponent from '../../common/loader/index'

export default [
  {
    path: '/login',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/login/index'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/register',
    auth: true,
    strict: true,
    exact: true,
    component: Loadable({
      loader: () => import('./pages/register/index'),
      loading: LoadingComponent,
    }),
  },
]
