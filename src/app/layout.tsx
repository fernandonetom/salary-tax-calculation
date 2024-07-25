import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "@/app/_providers/QueryClientProvider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tax Calculator",
  description: "Calculate your salary after taxes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider>
      <html lang="en" className="dark scroll-smooth">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </QueryClientProvider>
  );
}
