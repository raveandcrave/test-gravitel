import { useNavigate } from "react-router-dom";

import client from "@/apollo/client";

import "./styles.css";
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    client.clearStore();
    navigate("/login");
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <h1 className="dashboard-page__title">Сводка</h1>
        <button onClick={logout} className="logout">
          Logout
        </button>
      </header>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
