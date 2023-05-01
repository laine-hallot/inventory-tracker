import { ConfigRoutes } from './src/router/types';

import { Entities } from './src/pages/entities/entities';
import { HomeDashboard } from './src/pages/home-dashboard/home-dashboard';
import { Items } from './src/pages/items/items';

export const routes: ConfigRoutes = [
  {
    name: 'Dashboard',
    path: '/',
    component: HomeDashboard,
    default: true,
  },
  {
    name: 'Entities',
    path: '/entities',
    component: Entities,
  },
  {
    name: 'Items',
    path: '/items',
    component: Items,
  },
];
