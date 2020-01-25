import Loadable from 'react-loadable'
import LoadingComponent from '../../common/loader/index'

export default [
  {
    path: '/users/:id/edit',
    exact: true,
    auth: true,
    strict: true,
    component: Loadable({
      loader: () => import('./pages/edit/index'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/dashboard',
    exact: true,
    auth: true,
    strict: true,
    component: Loadable({
      loader: () => import('./pages/dashboard/index'),
      loading: LoadingComponent,
    }),
  },
]
