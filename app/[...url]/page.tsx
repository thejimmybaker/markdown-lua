"use client";

import MarkdownDisplay from "@/components/MarkdownDisplay";
import { Scale, Brain } from "lucide-react";
import Image from "next/image";

interface DynamicPageProps {
  params: Promise<{ url: string[] }>;
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { url } = await params;
  
  // Reconstruct the URL from the path segments
  // Handle the case where the first segment is the protocol (like "https:")
  let fullUrl = '';
  if (url.length > 0) {
    // If the first segment looks like a protocol, reconstruct as "protocol://rest"
    if (url[0].endsWith(':')) {
      fullUrl = url[0] + '//' + url.slice(1).join('/');
    } else {
      fullUrl = url.join('/');
    }
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/full_logo.png"
              alt="Lua Legal AI Notetaker"
              width={120}
              height={40}
              className="object-contain h-8 sm:h-10 lg:h-12 w-auto"
              priority
            />
            <div className="text-center mt-2">
              <span className="block text-base sm:text-lg text-gray-700 font-medium opacity-80">
                A privacy-first AI meeting notetaker for lawyers
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Display the URL being processed */}
          <div className="mb-4 p-3 sm:p-4 bg-emerald-50 rounded-lg border border-emerald-200">
            <p className="text-xs sm:text-sm text-emerald-700 break-all">
              <strong>Processing URL:</strong> {fullUrl}
            </p>
          </div>
          
          {/* Markdown Display Component */}
          <MarkdownDisplay initialUrl={fullUrl} />
        </div>
      </main>
    </div>
  );
} 