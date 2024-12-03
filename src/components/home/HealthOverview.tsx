import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { MetricsCards } from "@/components/MetricsCards";
import { useUser } from "@supabase/auth-helpers-react";

export function HealthOverview() {
  const user = useUser();

  return (
    <section className="mt-12" aria-label="Your health metrics">
      <h2 className="text-2xl font-semibold mb-6">Your Health Overview</h2>
      <ScrollArea className="h-[300px] rounded-md border p-4">
        {user ? (
          <MetricsCards />
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-[125px] w-full rounded-lg" />
            <Skeleton className="h-[125px] w-full rounded-lg" />
          </div>
        )}
      </ScrollArea>
    </section>
  );
}