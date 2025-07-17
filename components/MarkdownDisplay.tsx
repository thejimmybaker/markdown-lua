"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Scale, AlertCircle, Brain, FileText } from "lucide-react";

interface MarkdownDisplayProps {
  initialUrl?: string;
}

export default function MarkdownDisplay({ initialUrl = "" }: MarkdownDisplayProps) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const fetchMarkdown = async (targetUrl: string) => {
    if (!targetUrl.trim()) return;
    
    setLoading(true);
    setError(null);
    setCurrentUrl(targetUrl);
    
    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      setMarkdown(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch document");
      setMarkdown("");
    } finally {
      setLoading(false);
    }
  };

  // Set mounted state on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-load content from initialUrl on component mount
  useEffect(() => {
    if (mounted && initialUrl) {
      fetchMarkdown(initialUrl);
    }
  }, [mounted, initialUrl]);

  // Don't render until mounted (prevents hydration issues)
  if (!mounted) {
    return <div className="space-y-4 sm:space-y-6 animate-pulse">
      <div className="p-4 sm:p-6 bg-emerald-50 rounded-lg">
        <div className="h-3 sm:h-4 bg-emerald-200 rounded mb-2"></div>
        <div className="h-3 sm:h-4 bg-emerald-200 rounded mb-2"></div>
        <div className="h-3 sm:h-4 bg-emerald-200 rounded"></div>
      </div>
    </div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Loading State */}
      {loading && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center gap-2 text-blue-600">
              <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">Loading document...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-start gap-2 text-red-600">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-sm sm:text-base">Error:</span>
                <span className="text-sm sm:text-base ml-1 break-words">{error}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Markdown Content Display */}
      {currentUrl && markdown && (
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-200 p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="leading-tight">AI-Processed Legal Document</span>
              </div>
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground break-all">
              Source: {currentUrl}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
                <Brain className="h-3 w-3" />
                <span>AI Analysis Ready</span>
              </div>
              <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                <Scale className="h-3 w-3" />
                <span>Legal Processing</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="prose prose-slate prose-sm sm:prose-base max-w-none">
              <ReactMarkdown
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !props.node || props.node.tagName !== 'pre';
                    return !isInline && match ? (
                      <div className="overflow-x-auto">
                        <SyntaxHighlighter
                          style={tomorrow as { [key: string]: React.CSSProperties }}
                          language={match[1]}
                          PreTag="div"
                          className="text-sm"
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className={`${className} text-sm px-1 py-0.5 bg-gray-100 rounded`} {...props}>
                        {children}
                      </code>
                    );
                  },
                  h1: ({ children }) => (
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-emerald-800 border-b border-emerald-200 pb-2 leading-tight">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 text-emerald-700 border-b border-emerald-100 pb-1 leading-tight">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-2 text-emerald-600 leading-tight">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 text-emerald-600 leading-tight">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="mb-3 sm:mb-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-3 sm:mb-4 space-y-1 text-gray-700 text-sm sm:text-base pl-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-3 sm:mb-4 space-y-1 text-gray-700 text-sm sm:text-base pl-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="mb-1 leading-relaxed">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-emerald-500 pl-3 sm:pl-4 italic text-gray-600 mb-3 sm:mb-4 bg-emerald-50 py-2 text-sm sm:text-base">
                      {children}
                    </blockquote>
                  ),
                  a: ({ children, href }) => (
                    <a
                      href={href}
                      className="text-emerald-600 hover:text-emerald-800 underline break-words"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full border-collapse border border-gray-300 text-sm">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-gray-300 bg-gray-50 px-2 sm:px-4 py-2 text-left font-semibold text-xs sm:text-sm">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-gray-300 px-2 sm:px-4 py-2 text-xs sm:text-sm">
                      {children}
                    </td>
                  ),
                }}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 