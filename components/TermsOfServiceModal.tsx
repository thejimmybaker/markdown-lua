"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TermsOfServiceModal({
  isOpen,
  onClose,
}: TermsOfServiceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-full mx-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Terms of Service - Lua Legal AI Notetaker
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Please read and accept our terms of service to continue using this legal AI notetaking application.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="space-y-4 text-sm">
            <section>
              <h3 className="font-semibold text-lg mb-2">1. Acceptance of Terms</h3>
              <p className="text-muted-foreground">
                By accessing and using Lua Legal AI Notetaker, you accept and agree to be bound by the terms and provision of this agreement. This application is designed for legal professionals to process and analyze legal documents using AI technology.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-lg mb-2">2. Professional Use License</h3>
              <p className="text-muted-foreground">
                This application is licensed for professional legal use only. You are granted permission to use this AI-powered notetaking tool for legal document analysis, case preparation, and legal research purposes. This license does not constitute legal advice.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-lg mb-2">3. AI Processing Disclaimer</h3>
              <p className="text-muted-foreground">
                The AI analysis and notetaking features are provided as tools to assist legal professionals. All AI-generated content should be reviewed and verified by qualified legal professionals. Lua Legal AI does not guarantee the accuracy, completeness, or legal validity of AI-generated analyses.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-lg mb-2">4. Document Confidentiality</h3>
              <p className="text-muted-foreground">
                We understand the sensitive nature of legal documents. All documents processed through this application are handled with strict confidentiality. However, users are responsible for ensuring they have proper authorization to upload and process legal documents through this system.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-lg mb-2">5. Professional Responsibility</h3>
              <p className="text-muted-foreground">
                Users must comply with all applicable legal professional responsibility rules and regulations. This includes maintaining client confidentiality, avoiding conflicts of interest, and ensuring competent representation. The use of this AI tool does not replace professional legal judgment.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-lg mb-2">6. Data Privacy & Security</h3>
              <p className="text-muted-foreground">
                Your privacy and the security of legal documents are paramount. We implement industry-standard security measures to protect your data. Documents are processed temporarily for AI analysis and are not permanently stored unless explicitly requested. All processing complies with legal data protection requirements.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-lg mb-2">7. Limitations of AI Analysis</h3>
              <p className="text-muted-foreground">
                While our AI provides sophisticated legal document analysis, it cannot replace human legal expertise. Users should independently verify all AI-generated insights, citations, and legal conclusions. The AI may not capture nuanced legal arguments or jurisdiction-specific variations.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold text-lg mb-2">8. Service Updates</h3>
              <p className="text-muted-foreground">
                We continuously improve our AI capabilities and may update features, analysis methods, and terms of service. Users will be notified of significant changes that may affect their use of the application or the interpretation of AI-generated content.
              </p>
            </section>
          </div>
        </ScrollArea>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 sm:flex-none"
          >
            Decline
          </Button>
          <Button
            onClick={onClose}
            className="flex-1 sm:flex-none bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
          >
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 