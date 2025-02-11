
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function WhiteboardPage() {
  return (
    <div className="container mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Microsoft Whiteboard</h1>
        <p className="text-muted-foreground mb-6">
          Click below to open Microsoft Whiteboard in a new tab.
        </p>
        <Button
          onClick={() => window.open('https://whiteboard.microsoft.com', '_blank')}
          className="flex items-center gap-2"
        >
          Open Whiteboard
          <ExternalLink className="h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
}
