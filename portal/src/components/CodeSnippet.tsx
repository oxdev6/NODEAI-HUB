"use client";
import React from "react";

export function CodeSnippet({ lang, code }: { lang: string; code: string }) {
  function copy() {
    navigator.clipboard.writeText(code);
  }
  return (
    <div className="rounded border overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 text-xs bg-gray-50 dark:bg-zinc-900">
        <span>{lang}</span>
        <button onClick={copy} className="border px-2 py-0.5 rounded">Copy</button>
      </div>
      <pre className="p-3 text-xs overflow-auto whitespace-pre-wrap">{code}</pre>
    </div>
  );
}


