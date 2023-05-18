import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import "./AdminSidebar.css";
const AdminSidebar = () => {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar
        rootStyles={{
          backgroundColor: "rgb(11, 41, 72)",
          height: "100vh",
          position: "absolute",
          left: "0px",
          top: "0px",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
          width="245"
          className="mt-5"
        />
        <hr />
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              return {
                color: "rgb(139, 161, 185)",
                backgroundColor: "rgb(11, 41, 72)",
              };
            },
          }}
        >
          <MenuItem component={<Link to="/admin/home" />}> Home</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};
export default AdminSidebar;
