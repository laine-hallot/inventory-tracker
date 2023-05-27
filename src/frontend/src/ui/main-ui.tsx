import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { LeftNav } from '../components/left-nav/left-nav';
import { ConfigRoutes, ScreenLayoutProps } from '../router/types';
import './main-ui.css';

interface MainUIProps extends ScreenLayoutProps {
  leftNavOpen?: boolean;
}

export const MainUI: FC<PropsWithChildren<MainUIProps>> = ({
  children,
  sideBarRoutes,
}) => {
  return (
    <div className="flex min-w-screen min-h-screen dark:bg-zinc-700">
      <LeftNav navOptions={sideBarRoutes} />
      <div className="screen-container flex-1">{children}</div>
    </div>
  );
};
