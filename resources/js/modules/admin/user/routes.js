import Loadable from 'react-loadable'
import LoadingComponent from '../../../common/loader'

export default [
  {
    path: '/admin/users',
    admin: true,
    auth: true,
    exact: true,
    forAdmin: true,
    component: Loadable({
      loader: () => import('./pages/list'),
      loading: LoadingComponent,
    }),
  },
];
