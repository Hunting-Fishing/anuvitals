import { Route } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import Index from "@/pages/Index";
import ScanPage from "@/pages/Scan";
import NutritionPage from "@/pages/Nutrition";
import BloodWorkPage from "@/pages/BloodWork";
import AIPage from "@/pages/AI";
import AboutPage from "@/pages/About";

export function MainRoutes() {
  return [
    <Route
      key="home"
      path="/"
      element={
        <MainLayout>
          <Index />
        </MainLayout>
      }
    />,
    <Route
      key="scan"
      path="/scan"
      element={
        <MainLayout>
          <ScanPage />
        </MainLayout>
      }
    />,
    <Route
      key="nutrition"
      path="/nutrition"
      element={
        <MainLayout>
          <NutritionPage />
        </MainLayout>
      }
    />,
    <Route
      key="bloodwork"
      path="/bloodwork"
      element={
        <MainLayout>
          <BloodWorkPage />
        </MainLayout>
      }
    />,
    <Route
      key="ai"
      path="/ai"
      element={
        <MainLayout>
          <AIPage />
        </MainLayout>
      }
    />,
    <Route
      key="about"
      path="/about"
      element={
        <MainLayout>
          <AboutPage />
        </MainLayout>
      }
    />
  ];
}