import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
// import { Providers } from "./providers"; <-- Remove this static import

// Use Next.js dynamic import with ssr disabled
import dynamic from 'next/dynamic';

const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), {
  ssr: false, // This is the key: prevents server-side rendering/evaluation during build
});

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Okidex",
  description: "The Nexus for Innovation and Investment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="h-full">
        {/* The Providers component is now only loaded in the browser */}
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
