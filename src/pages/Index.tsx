import React from "react";
import { WelcomeHeader } from "@/components/home/WelcomeHeader";
import { QuickActionCards } from "@/components/home/QuickActionCards";
import { HealthOverview } from "@/components/home/HealthOverview";
import { GettingStartedGuide } from "@/components/home/GettingStartedGuide";

export function Index() {
  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <WelcomeHeader />
      <QuickActionCards />
      <HealthOverview />
      <GettingStartedGuide />
    </div>
  );
}