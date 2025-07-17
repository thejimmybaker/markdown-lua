"use client";

import { useState, useEffect } from "react";
import MarkdownDisplay from "@/components/MarkdownDisplay";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Brain, FileText, Sparkles } from "lucide-react";
import Image from "next/image";
import TermsOfServiceModal from "@/components/TermsOfServiceModal";

export default function Home() {
  const [showTos, setShowTos] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accepted = localStorage.getItem("tosAccepted");
      if (!accepted) setShowTos(true);
    }
  }, []);

  const handleTosClose = () => {
    localStorage.setItem("tosAccepted", "true");
    setShowTos(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <TermsOfServiceModal isOpen={showTos} onClose={handleTosClose} />
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
          {/* Markdown Display Component */}
          <MarkdownDisplay initialUrl="https://raw.githubusercontent.com/microsoft/vscode/main/README.md" />
        </div>
      </main>
    </div>
  );
}
