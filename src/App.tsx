import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import DashboardPage from "@/pages/dashboard/DashboardPage";
import LoginPage from "@/pages/login/LoginPage";
import ProtectedRoute from "@/routes/ProtectedRoute";

import { ME } from "@/apollo/user";

import "./App.css";

function App() {
  const { data: user, loading } = useQuery(ME);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/dashboard"} replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAllowed={!!user} redirectTo="/login">
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
