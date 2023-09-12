import React from "react";
import "./style.css";

import { useLocation } from "react-router-dom";

const MenuSmell: React.FC = () => {
  const location = useLocation();
// Create a Menu
  return (
    <>
      <ul className="menu">
        <li
          className={
            location.pathname === "/smell" || location.pathname === "/smell/"
              ? "actif"
              : ""
          }
        >
          <a href="/smell">Smell Prediction</a>
        </li>
        <li
          className={location.pathname === "/pca-distribution" ? "actif" : ""}
        >
          <a href="/pca-distribution">PCA Distribution</a>
        </li>
        <li
          className={
            location.pathname === "/descriptor-variance" ? "actif" : ""
          }
        >
          <a href="/descriptor-variance">Descriptor Variance</a>
        </li>
        <li
          className={
            location.pathname === "/cluster-by-pca" ||
            location.pathname === "/submit"
              ? "actif"
              : ""
          }
        >
          <a href="/cluster-by-pca">Cluster by PCA</a>
        </li>
      </ul>
    </>
  );
};
export default MenuSmell;
