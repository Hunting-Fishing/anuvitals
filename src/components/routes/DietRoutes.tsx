import { Route } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import DietCategory from "@/pages/DietCategory";
import DietOverview from "@/pages/DietOverview";

export function DietRoutes() {
  return (
    <>
      <Route
        path="/diets/category/:slug"
        element={
          <MainLayout>
            <DietCategory />
          </MainLayout>
        }
      />
      <Route
        path="/diets/category/all"
        element={
          <MainLayout>
            <DietOverview />
          </MainLayout>
        }
      />
    </>
  );
}