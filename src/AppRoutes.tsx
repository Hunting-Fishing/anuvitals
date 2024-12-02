import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/AppSidebar";
import { DietNavigation } from "./components/DietNavigation";
import Index from "./pages/Index";
import AuthPage from "./pages/Auth";
import ScanPage from "./pages/Scan";
import DietCategory from "./pages/DietCategory";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <div className="flex flex-1">
        <DietNavigation />
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
    </Routes>
  );
}