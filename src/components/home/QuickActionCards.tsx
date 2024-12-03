import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActionCards() {
  const navigate = useNavigate();
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Quick Scan</CardTitle>
          <CardDescription>
            Scan product barcodes to get instant health insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => navigate("/scan")}
            className="w-full"
            size="lg"
            aria-label="Go to product scanner"
          >
            Start Scanning
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            Customize your health preferences and dietary needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => navigate("/profile")}
            className="w-full"
            variant="outline"
            size="lg"
            aria-label="Go to your profile"
          >
            View Profile
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Assistant</CardTitle>
          <CardDescription>
            Get personalized nutrition advice and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => navigate("/ai")}
            className="w-full"
            variant="secondary"
            size="lg"
            aria-label="Chat with AI assistant"
          >
            Start Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}