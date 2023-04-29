import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { LeftNav } from '../components/left-nav/left-nav';
import { ConfigRoutes } from '../router/types';
import './main-ui.css';

interface MainUIProps {
  leftNavOpen?: boolean;
}

const TopLevelRoutes = [
  {
    name: 'Dashboard',
    path: '/',
  },
  {
    name: 'Entities',
    path: '/entities',
  },
  {
    name: 'Inventory',
    path: '/inventory',
  },
];

export const MainUI: FC<PropsWithChildren<MainUIProps>> = ({ children }) => {
  return (
    <div className="flex min-w-screen min-h-screen">
      <LeftNav navOptions={TopLevelRoutes} />
      <div className="screen-container">{children}</div>
    </div>
  );
};
