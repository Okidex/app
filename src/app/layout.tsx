import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClientProviders } from "./client-providers";
import Script from "next/script";
import { OkidexDebugger } from "@/components/OkidexDebugger"; // Import it here

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Okidex",
  description: "The Nexus for Innovation and Investment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="h-full antialiased">
        <OkidexDebugger /> {/* Add it here */}
        <ClientProviders>
          {children}
        </ClientProviders>
        <Toaster />
        <Script async src="https://beehiiv.com" />
      </body>
    </html>
  );
}
