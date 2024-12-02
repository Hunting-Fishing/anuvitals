import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/AppSidebar";
import Index from "./pages/Index";
import AuthPage from "./pages/Auth";
import ScanPage from "./pages/Scan";
import DietCategory from "./pages/DietCategory";
import DietOverview from "./pages/DietOverview";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-1">
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
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
    </Routes>
  );
}