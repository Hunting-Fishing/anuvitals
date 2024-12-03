import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function GettingStartedGuide() {
  const navigate = useNavigate();
  
  return (
    <section className="mt-12" aria-label="Getting started guide">
      <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New to Health Companion?</CardTitle>
            <CardDescription>
              Follow these steps to get the most out of your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              <li>Complete your health profile</li>
              <li>Set your dietary preferences</li>
              <li>Try scanning your first product</li>
              <li>Chat with our AI assistant for personalized advice</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
            <CardDescription>
              Resources to help you navigate the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={() => navigate("/about")}
                variant="link"
                className="w-full justify-start p-0 h-auto font-normal"
                aria-label="Learn how to use the application"
              >
                → How to use Health Companion
              </Button>
              <Button 
                onClick={() => navigate("/about?tab=features")}
                variant="link"
                className="w-full justify-start p-0 h-auto font-normal"
                aria-label="View application features"
              >
                → Feature overview
              </Button>
              <Button 
                onClick={() => navigate("/about?tab=integrations")}
                variant="link"
                className="w-full justify-start p-0 h-auto font-normal"
                aria-label="Learn about our integrations"
              >
                → Available integrations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}