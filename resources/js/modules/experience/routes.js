import Loadable from 'react-loadable'

import LoadingComponent from '../../common/loader/index'

export default [
  {
    path: '/experiences',
    exact: true,
    auth: true,
    strict: true,
    component: Loadable({
      loader: () => import('./pages/list/index'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/experiences/create',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./pages/add/index'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/experiences/:id/edit',
    exact: true,
    auth: true,
    strict: true,
    component: Loadable({
      loader: () => import('./pages/edit/index'),
      loading: LoadingComponent,
    }),
  },
]
