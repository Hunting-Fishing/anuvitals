import { Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/AppSidebar";
import Index from "./pages/Index";
import AuthPage from "./pages/Auth";
import ScanPage from "./pages/Scan";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
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
    </Routes>
  );
}