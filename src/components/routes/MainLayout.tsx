import { AppSidebar } from "../AppSidebar";

export function MainLayout({ children }: { children: React.ReactNode }) {
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