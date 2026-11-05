import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "My Website",
  description: "My Next.js Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased"
      ><div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Header  />
      </div>
        <div className="site-content flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}