import "./globals.css";

import { Inter } from "next/font/google";

import { QueryProvider } from "@/providers/query-provider";

import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <div className="min-h-screen">
            <Navbar />

            {children}

            <Footer />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
