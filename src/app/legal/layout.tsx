
import Logo from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
       <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center">
        <Logo />
      </header>
      <main className="flex-1 py-8 sm:py-12">
        <div className="container mx-auto max-w-4xl">
            <div className="mb-6">
                <Button asChild variant="outline">
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
            {children}
        </div>
      </main>
       <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Okidex. All rights reserved.</p>
      </footer>
    </div>
  );
}
