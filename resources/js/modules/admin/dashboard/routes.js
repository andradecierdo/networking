import Loadable from 'react-loadable'
import LoadingComponent from '../../../common/loader/index'

export default [
  {
    path: '/admin/dashboard',
    admin: true,
    auth: true,
    forAdmin: true,
    exact: true,
    component: Loadable({
      loader: () => import('./pages/home/index'),
      loading: LoadingComponent,
    }),
  },
]
