import { Route } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import Profile from "@/pages/Profile";
import SettingsPage from "@/pages/Settings";
import NotificationsPage from "@/pages/Notifications";

export function UserRoutes() {
  return (
    <>
      <Route
        path="/profile"
        element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
      />
      <Route
        path="/settings"
        element={
          <MainLayout>
            <SettingsPage />
          </MainLayout>
        }
      />
      <Route
        path="/notifications"
        element={
          <MainLayout>
            <NotificationsPage />
          </MainLayout>
        }
      />
    </>
  );
}