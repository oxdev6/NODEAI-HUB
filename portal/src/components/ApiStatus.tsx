"use client";
import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import { CheckCircle, XCircle, Loader } from "lucide-react";

export function ApiStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "disconnected">("checking");

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${API_BASE}/v1/health`);
        if (res.ok) {
          setStatus("connected");
        } else {
          setStatus("disconnected");
        }
      } catch (error) {
        setStatus("disconnected");
      }
    };
    check();
    const interval = setInterval(check, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs">
      {status === "checking" && <Loader size={14} className="animate-spin text-slate-400" />}
      {status === "connected" && <CheckCircle size={14} className="text-emerald-500" />}
      {status === "disconnected" && <XCircle size={14} className="text-red-500" />}
      <span className={`font-medium ${
        status === "connected" ? "text-emerald-600 dark:text-emerald-400" :
        status === "disconnected" ? "text-red-600 dark:text-red-400" :
        "text-slate-500"
      }`}>
        API {status === "connected" ? "Connected" : status === "disconnected" ? "Disconnected" : "Checking..."}
      </span>
      <span className="text-slate-400">({API_BASE})</span>
    </div>
  );
}

