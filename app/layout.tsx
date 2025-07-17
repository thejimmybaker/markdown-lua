import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lua Legal AI Notetaker - Intelligent Legal Document Processor",
  description: "Advanced AI-powered notetaking tool for legal professionals. Transform markdown documents into structured legal notes with intelligent analysis and beautiful formatting.",
  keywords: ["legal", "AI", "notetaker", "legal documents", "markdown", "legal analysis", "document processing", "legal tech"],
  authors: [{ name: "Lua Legal AI" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
