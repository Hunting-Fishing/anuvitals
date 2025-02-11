
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function WhiteboardPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Build Utilities</h1>
        <div className="space-y-6">
          {/* Miro Section */}
          <div>
            <h2 className="text-xl font-medium mb-2">Miro Whiteboard</h2>
            <p className="text-muted-foreground mb-4">
              Access Miro's collaborative whiteboard platform for visual collaboration, brainstorming, and planning.
            </p>
            <div className="space-y-2">
              <Button
                onClick={() => window.open('https://miro.com/app/dashboard/', '_blank')}
                className="flex items-center gap-2"
              >
                Open Miro Dashboard
                <ExternalLink className="h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Note: You'll need to sign up for a free Miro account if you haven't already.
              </p>
            </div>
          </div>

          {/* Microsoft Section */}
          <div className="pt-4 border-t">
            <h2 className="text-xl font-medium mb-2">Microsoft Tools</h2>
            <p className="text-muted-foreground mb-4">
              Access Microsoft's suite of collaborative tools including Whiteboard and Office 365.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => window.open('https://whiteboard.microsoft.com', '_blank')}
                className="flex items-center gap-2"
              >
                Open Microsoft Whiteboard
                <ExternalLink className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => window.open('https://www.office.com', '_blank')}
                className="flex items-center gap-2"
              >
                Open Office 365
                <ExternalLink className="h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                Note: Microsoft account required for access.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
