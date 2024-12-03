import { Route } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import DietCategory from "@/pages/DietCategory";
import DietOverview from "@/pages/DietOverview";

export function DietRoutes() {
  return [
    <Route
      key="diet-category"
      path="/diets/category/:slug"
      element={
        <MainLayout>
          <DietCategory />
        </MainLayout>
      }
    />,
    <Route
      key="diet-overview"
      path="/diets/category/all"
      element={
        <MainLayout>
          <DietOverview />
        </MainLayout>
      }
    />
  ];
}