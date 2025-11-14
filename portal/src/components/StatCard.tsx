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

export function StatCard({ 
  title, 
  value, 
  data, 
  icon,
  trend,
  trendValue,
  gradient
}: { 
  title: string; 
  value: string | number; 
  data: number[]; 
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  gradient?: string;
}) {
  const labels = data.map((_, i) => String(i + 1));
  const maxValue = Math.max(...data, 1);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  
  const getGradientColors = () => {
    if (gradient) {
      const gradients: Record<string, { border: string; fill: string }> = {
        purple: { border: "rgb(147, 51, 234)", fill: "rgba(147, 51, 234, 0.15)" },
        blue: { border: "rgb(59, 130, 246)", fill: "rgba(59, 130, 246, 0.15)" },
        pink: { border: "rgb(236, 72, 153)", fill: "rgba(236, 72, 153, 0.15)" },
        emerald: { border: "rgb(16, 185, 129)", fill: "rgba(16, 185, 129, 0.15)" },
      };
      return gradients[gradient] || gradients.purple;
    }
    
    if (trend === "up") {
      return { border: "rgb(16, 185, 129)", fill: "rgba(16, 185, 129, 0.15)" };
    } else if (trend === "down") {
      return { border: "rgb(239, 68, 68)", fill: "rgba(239, 68, 68, 0.15)" };
    }
    return { border: "rgb(147, 51, 234)", fill: "rgba(147, 51, 234, 0.15)" };
  };
  
  const colors = getGradientColors();
  
  return (
    <div className="glass-strong rounded-2xl p-6 lg:p-8 shadow-premium hover:shadow-premium-lg transition-all duration-500 group hover-lift relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            {title}
          </div>
          <div className="flex items-baseline gap-3 mb-1">
            <div className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100">
              {value}
            </div>
            {trendValue && (
              <span className={`text-sm font-bold px-2 py-1 rounded-lg ${
                trend === "up" ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400" :
                trend === "down" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
                "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}>
                {trend === "up" && "↑"} {trend === "down" && "↓"} {trendValue}
              </span>
            )}
          </div>
        </div>
        {icon && (
          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient || "from-purple-500 to-pink-500"} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
        )}
      </div>
      <div className="relative z-10 h-24 -mx-2">
        <Line
          data={{ 
            labels, 
            datasets: [{ 
              data, 
              fill: true, 
              tension: 0.6,
              borderWidth: 3,
              borderColor: colors.border,
              backgroundColor: colors.fill,
              pointRadius: 0,
              pointHoverRadius: 6,
              pointHoverBackgroundColor: colors.border,
              pointHoverBorderColor: "#fff",
              pointHoverBorderWidth: 3,
            }] 
          }}
          options={{ 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: { 
              legend: { display: false }, 
              tooltip: { 
                enabled: true,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                padding: 12,
                cornerRadius: 12,
                displayColors: false,
                titleFont: { size: 12, weight: "bold" },
                bodyFont: { size: 14, weight: 600 },
              } 
            }, 
            scales: { 
              x: { 
                display: false,
                grid: { display: false },
              }, 
              y: { 
                display: false,
                grid: { display: false },
                min: minValue - range * 0.15,
                max: maxValue + range * 0.15,
              } 
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
          }} 
        />
      </div>
    </div>
  );
}
