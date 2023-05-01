import type { FC, PropsWithChildren } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

import { ConfigRoutes, RouterContext, Routes } from './types';
import { MainUI } from '../ui/main-ui';

export const NavContext = createContext<{
  routerContextData: RouterContext;
  setRouterContextData: (value: React.SetStateAction<RouterContext>) => void;
}>(null);

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

const useNavigatorRoot = (routes) => {
  const [routerContextData, setRouterContextData] = useState<RouterContext>({
    activeRoute: '',
    routes: [],
  });

  useEffect(() => {
    setRouterContextData(initializeRoutes(routes));
  }, [routes]);

  return { routerContextData, setRouterContextData };
};

export const useNavigator = () => {
  const { routerContextData, setRouterContextData } = useContext(NavContext);

  const updatePage = useCallback(
    (path) => {
      setRouterContextData({
        ...routerContextData,
        activeRoute: path,
      });
    },
    [routerContextData, setRouterContextData]
  );

  return { updatePage };
};

interface RouterProps {
  leftNavOpen?: boolean;
  routes: ConfigRoutes;
  layout: React.FC<PropsWithChildren>;
}

export const Router: FC<RouterProps> = ({ layout: Layout, routes }) => {
  const { routerContextData, setRouterContextData } = useNavigatorRoot(routes);

  const ActivePageComponent = useMemo(() => {
    return routerContextData.routes.find(
      (route) => route.path === routerContextData.activeRoute
    )?.component;
  }, [routerContextData.activeRoute]);

  return (
    <>
      <NavContext.Provider value={{ routerContextData, setRouterContextData }}>
        <Layout>
          {routerContextData.activeRoute && <ActivePageComponent />}
        </Layout>
      </NavContext.Provider>
    </>
  );
};
