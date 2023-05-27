import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { NavItem } from './nav-item';

interface LeftNavProps {
  navOptions: { name: string; path: string }[] | undefined;
}

export const LeftNav: FC<PropsWithChildren<LeftNavProps>> = ({
  children,
  navOptions,
}) => {
  return (
    <div className="w-64 px-6 py-8 flex flex-col bg-slate-200 dark:bg-zinc-800">
      {navOptions !== undefined
        ? navOptions.map((option, index) => (
            <NavItem key={index} name={option.name} path={option.path} />
          ))
        : ''}
    </div>
  );
};
