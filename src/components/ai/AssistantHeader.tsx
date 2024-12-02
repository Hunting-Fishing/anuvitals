import { useAI } from './AIContext';
import { AssistantType } from './types';

export function AssistantHeader() {
  const { assistantType, setAssistantType } = useAI();
  
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">AI Assistant</h2>
      <select
        value={assistantType}
        onChange={(e) => setAssistantType(e.target.value as AssistantType)}
        className="bg-background border rounded px-2 py-1"
      >
        <option value="health">Health Assistant</option>
        <option value="diet">Diet Assistant</option>
        <option value="nutrition">Nutrition Assistant</option>
      </select>
    </div>
  );
}