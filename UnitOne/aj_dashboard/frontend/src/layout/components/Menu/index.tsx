import React, { useState } from "react";
import getMenuItems from "./partials/list";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as OtherIcon } from "../../../images/icons/other.svg";

const AppMenu: React.FC = () => {
  const items = getMenuItems();
  // Get the current pathname from the React Router location
  const { pathname } = useLocation();
  // Define state variable 'showSelect' to manage the visibility of a submenu
  const [showSelect, setShowSelect] = useState(false);
  // Function to handle clicking on a list item
  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    route: string
  ) => {
    // Toggle the 'showSelect' state when clicking on a specific route
    setShowSelect(route === "others" ? !showSelect : false);
  };

  // Function to check if a menu item is selected based on the current pathname
  const checkSelectedItem = (path: string) => {
    if (path === pathname) return true;
    return (
      path.replace("/", "").trim() !== "" &&
      pathname.replace("/", "").includes(path.replace("/", "") ?? "")
    );
  };

  return (
    <List>
      {items.map((item: MenuItem) => (
        <NavLink
          to={item.route?.path ?? ""}
          key={item.key}
          className="menu-item-nav"
          state={{ name: item?.route?.name }}
        >
          <ListItem disablePadding className="list-item" key={item.key}>
            {/* Render a selected item indicator if the item is selected */}
            {checkSelectedItem(item.route?.path ?? "") && (
              <span className="selected-item-indicator"></span>
            )}
            {/* Render the menu item button */}
            <ListItemButton
              className={[
                "menu-item",
                checkSelectedItem(item.route?.path ?? "") ? "selected" : "",
              ].join(" ")}
              selected={checkSelectedItem(item.route?.path ?? "")}
              onClick={(event) =>
                handleListItemClick(event, item.route?.name ?? "")
              }
            >
              <ListItemIcon>
                {React.createElement(item.icon, { className: "logo" })}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        </NavLink>
      ))}
      {/* Render a menu item for "Other" */}
      <ListItem disablePadding className="list-item">
        <ListItemButton
          className={[
            "menu-item",
            checkSelectedItem("others") ? "selected" : "",
          ].join(" ")}
          onClick={(event) => handleListItemClick(event, "others")}
        >
          {/* Render an icon for "Other" */}
          <ListItemIcon>{<OtherIcon></OtherIcon>}</ListItemIcon>
          {/* Render the label for "Other" */}
          <ListItemText primary="Other" />
        </ListItemButton>
      </ListItem>
      {/* Render additional submenu items if 'showSelect' is true */}
      {showSelect && (
        <>
          {/* Render a submenu item for "/smell/" */}
          <NavLink to="/smell/" className="menu-item-nav">
            <ListItem disablePadding className="list-item">
              {checkSelectedItem("/smell/") && (
                <span className="selected-item-indicator"></span>
              )}
              <ListItemButton
                className={[
                  "menu-item",
                  checkSelectedItem("/smell/") ? "selected" : "",
                ].join(" ")}
                selected={checkSelectedItem("/smell/")}
              >
                {/* Render the label for "/smell/" */}
                <ListItemText
                  primary="CACT"
                  style={{ marginLeft: "80px" }}
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          </NavLink>
          {/* Render a submenu item for "/option2" */}
          <NavLink to="/option2" className="menu-item-nav">
            <ListItem disablePadding className="list-item">
              {checkSelectedItem("/option2") && (
                <span className="selected-item-indicator"></span>
              )}
              <ListItemButton
                className={[
                  "menu-item",
                  checkSelectedItem("/option2") ? "selected" : "",
                ].join(" ")}
                selected={checkSelectedItem("/option2")}
              >
                <ListItemText
                  primary="Option 2"
                  style={{ marginLeft: "80px" }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </>
      )}
    </List>
  );
};
export default AppMenu;
