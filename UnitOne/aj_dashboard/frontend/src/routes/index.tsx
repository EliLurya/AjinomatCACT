import RouteList from "./list";
import { Routes, Route, Router } from "react-router-dom";
import React from "react";
import { CircularProgress } from "@mui/material";
import protocols from "../pages/protocols/components/protocols";
import SmellMainComponent from "../pages/smell/smellMainComponent";
import PCADistributionComponent from "../pages/smell/PCADistributionComponent";
import DescriptorVarianceComponent from "../pages/smell/descriptorVarianceComponent";
import ClusterByPCAComponent from "../pages/smell/clusterByPCAComponent";
import UserClusterByPCAComponent from "../pages/smell/userClusterByPCAComponent";

/**
 * loader appears before loading the route's component
 * @constructor
 * @author Amr
 */
const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <CircularProgress color="inherit" />
  </div>
);

/**
 * app routes
 * @constructor
 * @author Amr
 */
const AppRoutes: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="smell"
          element={React.createElement(SmellMainComponent)}
        ></Route>
        <Route
          path="pca-distribution"
          element={React.createElement(PCADistributionComponent)}
        ></Route>
        <Route
          path="descriptor-variance"
          element={React.createElement(DescriptorVarianceComponent)}
        ></Route>
        <Route
          path="cluster-by-pca"
          element={React.createElement(ClusterByPCAComponent)}
        ></Route>
        <Route
          path="submit"
          element={React.createElement(UserClusterByPCAComponent)}
        ></Route>
        {RouteList?.map((parentRoute) => {
          return (
            <Route path={parentRoute?.path} key={parentRoute?.path}>
              {parentRoute?.children?.map((route) => (
                <Route
                  key={parentRoute?.path + route.path}
                  path={parentRoute?.path + route.path}
                  element={React.createElement(route.component)}
                />
              ))}
            </Route>
          );
        })}
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
