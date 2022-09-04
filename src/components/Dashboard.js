import React from "react";
import UseAuth from "../hooks/UseAuth";

const Dashboard = () => {
  const { logout } = UseAuth();
  return (
    <>
      <div>
        <h3>Dashboard</h3>
        <button className="underline" onClick={logout}>
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Dashboard;
