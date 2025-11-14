"use client";
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CodeSnippet({ lang, code }: { lang: string; code: string }) {
  const [copied, setCopied] = useState(false);
  
  function copy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-900/50 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{lang}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono overflow-auto whitespace-pre-wrap text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-950">
        <code>{code}</code>
      </pre>
    </div>
  );
}


