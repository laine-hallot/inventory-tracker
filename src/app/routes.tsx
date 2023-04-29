import React, { FC, PropsWithChildren } from 'react';
import { HomeDashboard } from './src/pages/home-dashboard/home-dashboard';
import { ConfigRoutes } from './src/router/types';

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
    component: () => <>Entities Page</>,
  },
  {
    name: 'Inventory',
    path: '/inventory',
    component: () => <>Inventory Page</>,
  },
];
