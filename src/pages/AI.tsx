import { AIAssistant } from "@/components/ai/AIAssistant";
import { AIProvider } from "@/components/ai/AIContext";

export default function AIPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <AIProvider>
        <AIAssistant />
      </AIProvider>
    </div>
  );
}