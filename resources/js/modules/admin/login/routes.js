import Loadable from 'react-loadable'
import LoadingComponent from '../../../common/loader/index'

export default [
  {
    path: '/admin/login',
    exact: true,
    component: Loadable({
      loader: () => import('./index'),
      loading: LoadingComponent,
    }),
  },
]
