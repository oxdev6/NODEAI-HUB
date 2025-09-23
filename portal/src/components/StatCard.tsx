import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

export function StatCard({ title, value, data, icon }: { title: string; value: string | number; data: number[]; icon?: React.ReactNode }) {
  const labels = data.map((_, i) => String(i + 1));
  return (
    <div className="rounded border p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">{title}</div>
        {icon}
      </div>
      <div className="text-2xl font-semibold">{value}</div>
      <div className="h-16">
        <Line
          data={{ labels, datasets: [{ data, fill: true, tension: 0.4, borderColor: "#111827", backgroundColor: "rgba(17,24,39,0.1)" }] }}
          options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } }, scales: { x: { display: false }, y: { display: false } } }}
        />
      </div>
    </div>
  );
}


