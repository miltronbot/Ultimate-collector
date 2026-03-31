import type { Metadata } from "next";
import { FounderProvider } from "@/lib/founder-context";
import Sidebar from "@/components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Startup Studio OS",
  description: "Two-founder AI startup studio dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">
        <FounderProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-60">{children}</main>
          </div>
        </FounderProvider>
      </body>
    </html>
  );
}
