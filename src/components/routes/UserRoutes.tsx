import { Route } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import Profile from "@/pages/Profile";
import SettingsPage from "@/pages/Settings";
import NotificationsPage from "@/pages/Notifications";

export function UserRoutes() {
  return [
    <Route
      key="profile"
      path="/profile"
      element={
        <MainLayout>
          <Profile />
        </MainLayout>
      }
    />,
    <Route
      key="settings"
      path="/settings"
      element={
        <MainLayout>
          <SettingsPage />
        </MainLayout>
      }
    />,
    <Route
      key="notifications"
      path="/notifications"
      element={
        <MainLayout>
          <NotificationsPage />
        </MainLayout>
      }
    />
  ];
}