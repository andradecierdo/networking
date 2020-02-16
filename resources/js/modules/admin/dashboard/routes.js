import Loadable from 'react-loadable'
import LoadingComponent from '../../../common/loader/index'

export default [
  {
    path: '/admin/dashboard',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/home/index'),
      loading: LoadingComponent,
    }),
  },
]
