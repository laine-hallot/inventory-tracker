import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import { NavItem } from './nav-item';

interface LeftNavProps {
  navOptions: { name: string; path: string }[];
}

export const LeftNav: FC<PropsWithChildren<LeftNavProps>> = ({
  children,
  navOptions,
}) => {
  return (
    <div className="w-64 px-6 py-8 border-r border-r-slate-300 flex flex-col">
      {navOptions.map((option, index) => (
        <NavItem key={index} name={option.name} path={option.path} />
      ))}
    </div>
  );
};
