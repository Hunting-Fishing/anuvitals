import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/Auth";
import { MainRoutes } from "./components/routes/MainRoutes";
import { DietRoutes } from "./components/routes/DietRoutes";
import { UserRoutes } from "./components/routes/UserRoutes";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <React.Fragment>
        <MainRoutes />
      </React.Fragment>
      <React.Fragment>
        <DietRoutes />
      </React.Fragment>
      <React.Fragment>
        <UserRoutes />
      </React.Fragment>
    </Routes>
  );
}