
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, MessageCircle, FileText, Settings, Users, Layout } from "lucide-react";
import { Link } from "react-router-dom";

export default function WhiteboardPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Quick Setup Guide</h1>
        <div className="space-y-6">
          {/* Profile Setup Section */}
          <div>
            <h2 className="text-xl font-medium mb-2">1. Complete Your Profile</h2>
            <p className="text-muted-foreground mb-4">
              Set up your personal information, preferences, and health goals to get started.
            </p>
            <Button
              asChild
              className="flex items-center gap-2"
            >
              <Link to="/profile">
                <Users className="h-4 w-4" />
                Setup Profile
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Settings Configuration */}
          <div className="pt-4 border-t">
            <h2 className="text-xl font-medium mb-2">2. Configure Settings</h2>
            <p className="text-muted-foreground mb-4">
              Customize your app settings, notifications, and preferences.
            </p>
            <Button
              asChild
              className="flex items-center gap-2"
            >
              <Link to="/settings">
                <Settings className="h-4 w-4" />
                Configure Settings
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Dashboard Setup */}
          <div className="pt-4 border-t">
            <h2 className="text-xl font-medium mb-2">3. Customize Dashboard</h2>
            <p className="text-muted-foreground mb-4">
              Set up your personal health dashboard with the metrics that matter to you.
            </p>
            <Button
              asChild
              className="flex items-center gap-2"
            >
              <Link to="/">
                <Layout className="h-4 w-4" />
                View Dashboard
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Documentation */}
          <div className="pt-4 border-t">
            <h2 className="text-xl font-medium mb-2">4. Review Documentation</h2>
            <p className="text-muted-foreground mb-4">
              Access comprehensive guides and documentation to make the most of your experience.
            </p>
            <Button
              onClick={() => window.open('https://1drv.ms/f/c/beb63686da10b275/EpUER6r2fyBKo5Lm0uzpHx0B1a2h1PJ50x93n5qVIroCvw?e=4JdR67', '_blank')}
              className="flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              View User Guide
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>

          {/* Support and Help */}
          <div className="pt-4 border-t">
            <h2 className="text-xl font-medium mb-2">5. Get Support</h2>
            <p className="text-muted-foreground mb-4">
              Access chat logs and support resources if you need assistance.
            </p>
            <Button
              onClick={() => window.open('https://chatgpt.com/c/673c1804-f58c-800d-b1c8-9160508b3f6d', '_blank')}
              className="flex items-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Access Support
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
