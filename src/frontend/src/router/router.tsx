import type { FC, PropsWithChildren } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';

import {
  ConfigRoutes,
  RouterContext,
  Routes,
  ScreenLayoutProps,
} from './types';
import { MainUI } from '../ui/main-ui';

export const NavContext = createContext<{
  routerContextData: RouterContext;
  setRouterContextData: (value: React.SetStateAction<RouterContext>) => void;
}>(null);

const routeVariableRegex = /:.*$/;

const recursiveRouteThingy = (
  currentTreeBranch: Record<string, any>,
  pathSegments: string[],
  currentSegmentIndex: number = 0
) => {
  const currentSegment = pathSegments[currentSegmentIndex];
  if (currentTreeBranch[currentSegment] === undefined) {
    currentTreeBranch[currentSegment] = {
      isRouteVar: routeVariableRegex.test(currentSegment),
    };
  }
  if (currentSegmentIndex < pathSegments.length - 1) {
    recursiveRouteThingy(
      currentTreeBranch[currentSegment],
      pathSegments,
      currentSegmentIndex + 1
    );
  }
};

const initializeRoutes = (routes: ConfigRoutes): RouterContext => {
  let initialRoute: string;

  const routeTree = {};

  const initializedRoutes = routes.map((route, index) => {
    if (index === 0 || route.default) {
      initialRoute = route.path;
    }

    const pathSegments =
      route.path === '/' ? ['/'] : route.path.replace(/^\/|\/$/, '').split('/');
    console.log('pathSegments', pathSegments);
    recursiveRouteThingy(routeTree, pathSegments);
    return { active: !!route.default, ...route };
  });
  console.log('routeTree', routeTree);

  const sideBarRoutes = routes
    .map((route) =>
      route.showInSidebar ? { name: route.name, path: route.path } : null
    )
    .filter((route) => route !== null);

  console.log({ sideBarRoutes, routes });

  return {
    activeRoute: initialRoute,
    routes: initializedRoutes,
    sideBarRoutes,
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
    (path: string) => {
      const pathSegments = path.split('/');

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
  layout: React.FC<PropsWithChildren<ScreenLayoutProps>>;
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
        <Layout sideBarRoutes={routerContextData.sideBarRoutes}>
          {routerContextData.activeRoute && <ActivePageComponent />}
        </Layout>
      </NavContext.Provider>
    </>
  );
};
