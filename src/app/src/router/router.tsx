import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import React from 'react';

import { ConfigRoutes, Routes } from './types';
import { MainUI } from '../ui/main-ui';

interface RouterProps {
  leftNavOpen?: boolean;
  routes: ConfigRoutes;
}

const NavContext = createContext(null);

const initializeRoutes = (
  routes: ConfigRoutes
): { activeRoute: string; routes: Routes } => {
  let initialRoute: string;

  const initializeRoutes = routes.map((route, index) => {
    if (index === 0 || route.default) {
      initialRoute = route.path;
    }
    return { active: !!route.default, ...route };
  });

  return {
    activeRoute: initialRoute,
    routes: initializeRoutes,
  };
};

export const Router: FC<PropsWithChildren<RouterProps>> = ({
  children,
  routes,
}) => {
  const routesContextData = useMemo(() => {
    return initializeRoutes(routes);
  }, [routes]);
  const [activePath, setActivePath] = useState(routesContextData.activeRoute);
  const [isLeftNavOpen, setIsLeftNavOpen] = useState();

  const ActivePageComponent = useMemo(() => {
    console.log(activePath);
    return routesContextData.routes.find((route) => route.path === activePath)
      ?.component;
  }, [routesContextData]);

  return (
    <>
      <NavContext.Provider value={routesContextData}>
        <MainUI>{activePath && <ActivePageComponent />}</MainUI>
      </NavContext.Provider>
    </>
  );
};
