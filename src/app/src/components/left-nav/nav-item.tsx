import React, { FC, useCallback } from 'react';
import { useNavigator } from '../../router/router';

interface NavItemProps {
  path: string;
  name: string;
}

export const NavItem: FC<NavItemProps> = ({ name, path }) => {
  const { updatePage } = useNavigator();

  const handleClick = useCallback(() => {
    updatePage(path);
  }, [path, updatePage]);

  return (
    <button
      className="
        text-left 
        rounded 
        my-1
        px-2
        py-1
        hover:bg-purple-100
        dark:hover:bg-purple-400
        active:bg-purple-200
      "
      onClick={handleClick}
    >
      <span className="text-normal">{name}</span>
    </button>
  );
};
