import Loadable from 'react-loadable'
import LoadingComponent from '../../../common/loader'

export default [
  {
    path: '/admin/transactions',
    admin: true,
    auth: true,
    exact: true,
    forAdmin: true,
    component: Loadable({
      loader: () => import('./pages/list'),
      loading: LoadingComponent,
    }),
  },
  {
    path: '/admin/transactions/user/:userId',
    admin: true,
    auth: true,
    exact: true,
    forAdmin: true,
    component: Loadable({
      loader: () => import('./pages/user'),
      loading: LoadingComponent,
    }),
  },
  // {
  //   path: '/admin/transactions/create',
  //   admin: true,
  //   auth: true,
  //   exact: true,
  //   forAdmin: true,
  //   component: Loadable({
  //     loader: () => import('./pages/register'),
  //     loading: LoadingComponent,
  //   }),
  // },
  // {
  //   path: '/admin/transactions/:id',
  //   admin: true,
  //   auth: true,
  //   exact: true,
  //   forAdmin: true,
  //   component: Loadable({
  //     loader: () => import('./pages/register'),
  //     loading: LoadingComponent,
  //   }),
  // }
];
