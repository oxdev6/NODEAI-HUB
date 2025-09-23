import "./globals.css";
import type { Metadata } from "next";
import { Layout } from "@/components/Layout";
import { ToastProvider } from "@/components/ToastProvider";

export const metadata: Metadata = {
  title: "NodeAI Agents Hub",
  description: "NodeOps-native AI Agents & Models Hub",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const t = localStorage.getItem('theme'); if (t === 'dark' || (!t && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark'); } catch(e) {} })();`,
          }}
        />
        <ToastProvider>
          <Layout>{children}</Layout>
        </ToastProvider>
      </body>
    </html>
  );
}


