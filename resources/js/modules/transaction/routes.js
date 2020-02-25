import Loadable from 'react-loadable'
import LoadingComponent from '../../common/loader/index'

export default [
  {
    path: '/transactions/:type',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/register/index'),
      loading: LoadingComponent,
    }),
  },
]
