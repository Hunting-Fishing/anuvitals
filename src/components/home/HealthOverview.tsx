import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function HealthOverview() {
  // Sample data - in a real app, this would come from your backend
  const data = [
    { date: "Mon", value: 65 },
    { date: "Tue", value: 68 },
    { date: "Wed", value: 70 },
    { date: "Thu", value: 72 },
    { date: "Fri", value: 75 },
    { date: "Sat", value: 74 },
    { date: "Sun", value: 76 },
  ];

  return (
    <Card className="p-6 border-2 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Weekly Health Score</h2>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#8884d8" 
              strokeWidth={2}
              dot={{ fill: "#8884d8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}