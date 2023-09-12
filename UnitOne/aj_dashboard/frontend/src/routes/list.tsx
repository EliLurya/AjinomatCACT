import React from "react";

const routes: Array<RouteType> = [
  {
    path: "/",
    component: React.lazy(() => import("../pages/dashboard")),
    children: [
      {
        path: "",
        component: React.lazy(() => import("../pages/dashboard")),
        name: "dashboard",
        label: "Users",
      },
    ],
  },
  {
    path: "/auth",
    component: React.lazy(() => import("../pages/auth/index")),
    children: [
      {
        path: "/login",
        component: React.lazy(() => import("../pages/auth/index")),
        name: "auth-login",
        label: "auth-login",
      },
    ],
  },
  {
    path: "/projects",
    component: React.lazy(() => import("../pages/projects")),
    children: [
      {
        path: "/",
        component: React.lazy(() => import("../pages/projects")),
        name: "all-projects",
        label: "Projects",
      },
      {
        path: "/create",
        component: React.lazy(() => import("../pages/projects/create_edit")),
        name: "create_project",
        label: "Projects",
      },
      {
        path: "/:id",
        component: React.lazy(() => import("../pages/projects/create_edit")),
        name: "create_project",
        label: "Projects",
      },
    ],
  },
  {
    path: "/plan",
    component: React.lazy(() => import("../pages/planing")),
    children: [
      {
        path: "/",
        component: React.lazy(() => import("../pages/planing")),
        name: "all-plans",
        label: "Projects",
      },
      {
        path: "/create",
        component: React.lazy(() => import("../pages/projects/create_edit")),
        name: "create_plan",
        label: "Projects",
      },
    ],
  },
  {
    path: "/protocols",
    component: React.lazy(() => import("../pages/protocols")),
    children: [
      {
        path: "/",
        component: React.lazy(() => import("../pages/protocols")),
        name: "all-protocols",
        label: "Projects",
      },
      {
        path: "/:project_id/create",
        component: React.lazy(() => import("../pages/protocols/create_edit")),
        name: "create_protocol",
        label: "Projects",
      },
      {
        path: "/create",
        component: React.lazy(() => import("../pages/protocols/create_edit")),
        name: "create_protocol",
        label: "Projects",
      },
      {
        path: "/:id",
        component: React.lazy(() => import("../pages/protocols/create_edit")),
        name: "create_protocol",
        label: "Protocols",
      },
    ],
  },
  {
    path: "/users",
    component: React.lazy(() => import("../pages/users")),
    children: [
      {
        path: "/",
        component: React.lazy(() => import("../pages/users")),
        name: "all-users",
        label: "Users",
      },
      {
        path: "/create",
        component: React.lazy(() => import("../pages/users/create_edit")),
        name: "create_project",
        label: "Users",
      },
      {
        path: "/:id",
        component: React.lazy(() => import("../pages/users/create_edit")),
        name: "create_project",
        label: "Users",
      },
    ],
  },
  {
    path: "/reports",
    component: React.lazy(() => import("../pages/Reports")),
    children: [
      {
        path: "/",
        component: React.lazy(() => import("../pages/Reports")),
        name: "all-reports",
        label: "Users",
      },
      {
        path: "/create",
        component: React.lazy(() => import("../pages/Reports/create_edit")),
        name: "create_report",
        label: "Users",
      },
      {
        path: "/:id",
        component: React.lazy(() => import("../pages/Reports/create_edit")),
        name: "create_report",
        label: "Users",
      },
    ],
  },
  {
    path: "/setup",
    component: React.lazy(() => import("../pages/setup")),
    children: [
      {
        path: "/",
        component: React.lazy(() => import("../pages/setup")),
        name: "all-setups",
        label: "",
      },
      {
        path: "/create",
        component: React.lazy(() => import("../pages/setup/create_edit")),
        name: "create-setups",
        label: "",
      },
      {
        path: "/:id",
        component: React.lazy(() => import("../pages/setup/create_edit")),
        name: "create-setups",
        label: "",
      },
    ],
  },
  // {
  //     path: '/others',
  //     component: React.lazy(() => import('../pages/other')),
  //     children: [
  //         {
  //             path: "/",
  //             component: React.lazy(() => import('../pages/other')),
  //             name: 'others',
  //             label: ''
  //         },
  //     ]
  // },
];

const _findSingleRoute = (routeList: RouteType[], name: string): any => {
  return routeList?.find<RouteType>((route: RouteType): route is RouteType => {
    if (route?.children && route?.children?.length > 0)
      return _findSingleRoute(route?.children, name);
    return route?.name?.toLowerCase() == name?.toLowerCase();
  });
};
export const getRoute = (name: string): any => {
  return _findSingleRoute(routes, name);
};

export default routes;
