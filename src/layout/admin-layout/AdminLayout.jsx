import PropTypes from "prop-types";
import React from "react";
import "./AdminLayout.scss";
import { AdminHeader } from "./components";

AdminLayout.propTypes = {
  children: PropTypes.element,
};

export function AdminLayout(props) {
  const { children } = props;
  return (
    <div className="admin-layout">
      <AdminHeader />
      {children}
    </div>
  );
}
