import React from 'react';
import type { FC, PropsWithChildren } from 'react';

interface LeftNavProps {
  navOptions: { name: string; path: string }[];
}

export const LeftNav: FC<PropsWithChildren<LeftNavProps>> = ({
  children,
  navOptions,
}) => {
  return (
    <div className="w-64 px-6 py-8 border-r border-r-slate-300">
      {navOptions.map((option) => (
        <div>
          <span className="text-sm">{option.name}</span>
        </div>
      ))}
    </div>
  );
};
