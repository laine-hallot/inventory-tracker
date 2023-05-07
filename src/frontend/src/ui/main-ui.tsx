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
    name: 'Supplies',
    path: '/items',
  },
];

export const MainUI: FC<PropsWithChildren<MainUIProps>> = ({ children }) => {
  return (
    <div className="flex min-w-screen min-h-screen dark:bg-zinc-700">
      <LeftNav navOptions={TopLevelRoutes} />
      <div className="screen-container flex-1">{children}</div>
    </div>
  );
};
