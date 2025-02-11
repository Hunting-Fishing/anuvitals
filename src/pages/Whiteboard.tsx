
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function WhiteboardPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Miro Whiteboard</h1>
        <p className="text-muted-foreground mb-6">
          Click below to access Miro's collaborative whiteboard platform in a new tab. Miro offers a powerful set of tools for visual collaboration, brainstorming, and planning.
        </p>
        <div className="space-y-4">
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
      </Card>
    </div>
  );
}
