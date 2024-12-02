import { DietNavigation } from "@/components/DietNavigation";

export default function DietOverview() {
  return (
    <div className="flex h-full">
      <DietNavigation />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Diet Guide</h1>
        <p className="text-muted-foreground">
          Select a diet category from the sidebar to explore different dietary approaches and their benefits.
        </p>
      </div>
    </div>
  );
}