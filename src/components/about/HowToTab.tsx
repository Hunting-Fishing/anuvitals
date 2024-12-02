import { Card } from "@/components/ui/card";
import { Workflow } from "lucide-react";

const sections = [
  {
    title: "Scanning Products",
    steps: [
      "Navigate to the Scan Product page",
      "Upload a photo of the product barcode",
      "Review the nutritional information and health analysis",
    ],
  },
  {
    title: "Blood Work Analysis",
    steps: [
      "Go to the Blood Work page",
      "Upload your blood work report (PDF or image)",
      "Verify the extracted data",
      "View analysis and recommendations",
    ],
  },
  {
    title: "Diet Guides",
    steps: [
      "Visit the Diet Guide section",
      "Browse different diet categories",
      "Select a diet to view detailed information",
      "Access food recommendations and restrictions",
    ],
  },
];

export function HowToTab() {
  return (
    <Card className="p-6 bg-gradient-to-br from-secondary/50 to-background border-none shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        <Workflow className="w-6 h-6 text-primary" />
        How to Use
      </h2>
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="group p-6 rounded-xl bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-xl font-medium mb-4 text-primary group-hover:text-accent transition-colors">
              {section.title}
            </h3>
            <ol className="list-decimal list-inside space-y-3">
              {section.steps.map((step, stepIndex) => (
                <li
                  key={stepIndex}
                  className="text-muted-foreground group-hover:text-foreground transition-colors pl-4"
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Card>
  );
}