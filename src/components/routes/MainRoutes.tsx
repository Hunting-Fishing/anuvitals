import { Route } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import Index from "@/pages/Index";
import ScanPage from "@/pages/Scan";
import NutritionPage from "@/pages/Nutrition";
import BloodWorkPage from "@/pages/BloodWork";
import AIPage from "@/pages/AI";
import AboutPage from "@/pages/About";

export function MainRoutes() {
  return (
    <>
      <Route
        path="/"
        element={
          <MainLayout>
            <Index />
          </MainLayout>
        }
      />
      <Route
        path="/scan"
        element={
          <MainLayout>
            <ScanPage />
          </MainLayout>
        }
      />
      <Route
        path="/nutrition"
        element={
          <MainLayout>
            <NutritionPage />
          </MainLayout>
        }
      />
      <Route
        path="/bloodwork"
        element={
          <MainLayout>
            <BloodWorkPage />
          </MainLayout>
        }
      />
      <Route
        path="/ai"
        element={
          <MainLayout>
            <AIPage />
          </MainLayout>
        }
      />
      <Route
        path="/about"
        element={
          <MainLayout>
            <AboutPage />
          </MainLayout>
        }
      />
    </>
  );
}