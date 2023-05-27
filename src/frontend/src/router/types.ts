export interface ConfigRoute {
  name: string;
  path: string;
  component: React.FC;
  default?: boolean;
  showInSidebar?: boolean;
}

export interface Route extends ConfigRoute {
  active: boolean;
}

export type ConfigRoutes = ConfigRoute[];

export type Routes = Route[];

export interface RouterContext {
  activeRoute: string;
  routes: Routes;
  sideBarRoutes?: { name: string; path: string }[];
}

export interface ScreenLayoutProps {
  sideBarRoutes?: { name: string; path: string }[];
}
