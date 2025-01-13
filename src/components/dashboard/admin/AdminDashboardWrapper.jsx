import React from "react";
import Sidebar from "./Sidebar";
import DashData from "./DashData";

const AdminDashboardWrapper = () => {
  return (
    <div className="flex flex-col   lg:flex-row  justify-start align-center">
      <Sidebar />
      <DashData />
    </div>
  );
};

export default AdminDashboardWrapper;
