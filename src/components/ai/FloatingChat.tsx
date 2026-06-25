"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, Minus, Loader2, Sparkles, FileText, X, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "bot";
  content: string;
  sourceFile?: string | null;
}

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hi! I'm Anubhav's AI assistant powered by Gemini. Ask me anything about his projects, skills, or experience! 🚀" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [availableFiles, setAvailableFiles] = useState<string[]>([]);
  const [activeFile, setActiveFile] = useState<{ name: string; content: string } | null>(null);
  const [isFileLoading, setIsFileLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch list of available assets on mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch("/api/assets");
        const data = await res.json();
        if (data.files) {
          setAvailableFiles(data.files);
        }
      } catch (err) {
        console.error("Error fetching files:", err);
      }
    };
    fetchFiles();
  }, []);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleCopy = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShowFile = async (fileName: string) => {
    if (fileName.toLowerCase().endsWith(".pdf")) {
      window.open(`/assets/${encodeURIComponent(fileName)}`, "_blank");
      return;
    }
    setIsFileLoading(true);
    try {
      const res = await fetch(`/api/assets?file=${encodeURIComponent(fileName)}`);
      const data = await res.json();
      if (data.content) {
        setActiveFile({ name: data.name, content: data.content });
      } else {
        alert("Failed to load file content.");
      }
    } catch (err) {
      console.error("Error loading file:", err);
      alert("Error loading file content.");
    } finally {
      setIsFileLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const currentInput = input.trim();
    const newMessages = [...messages, { role: "user" as const, content: currentInput }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();

      if (data.text) {
        setMessages(prev => [...prev, { role: "bot", content: data.text, sourceFile: data.sourceFile }]);
      } else {
        const errMsg = data.error || "Sorry, I couldn't get a response. Please try again.";
        setMessages(prev => [...prev, { role: "bot", content: errMsg }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "bot", content: "Network error — please check your connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 w-[360px] sm:w-[420px] h-[520px] max-h-[80vh] bg-[#fbfbfa]/95 dark:bg-[#121210]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-900 dark:text-gray-100"
          >
            {/* Header */}
            <div className="p-4 border-b border-black/8 dark:border-white/8 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-violet-50/50 dark:from-blue-950/20 dark:to-violet-950/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-sm">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">AI Assistant</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">Powered by Gemini</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                aria-label="Minimize Chat"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-black/10">
              {messages.map((msg, i) => (
                <div key={i} className="space-y-1.5">
                  <div className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                    {msg.role === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mr-2 mt-1 shrink-0">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={cn(
                      "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                      msg.role === "user"
                        ? "bg-gradient-to-br from-blue-600 to-violet-700 text-white rounded-tr-sm shadow-sm"
                        : "bg-white dark:bg-[#1c1c18] text-gray-800 dark:text-gray-200 rounded-tl-sm shadow-sm border border-black/6 dark:border-white/6"
                    )}>
                      {msg.content}
                    </div>
                  </div>

                  {/* Show source file button */}
                  {msg.role === "bot" && msg.sourceFile && (
                    <div className="ml-8 mt-1.5 flex gap-2">
                      <button
                        onClick={() => handleShowFile(msg.sourceFile!)}
                        disabled={isFileLoading}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-950/60 rounded-full border border-blue-200/50 dark:border-blue-900/50 transition-colors shadow-sm disabled:opacity-50"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Show {msg.sourceFile}
                      </button>
                    </div>
                  )}

                  {/* Quick-explore files below greeting */}
                  {i === 0 && availableFiles.length > 0 && (
                    <div className="ml-8 mt-2.5">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mb-1.5">Documents you can ask about:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {availableFiles.map((file) => (
                          <button
                            key={file}
                            onClick={() => handleShowFile(file)}
                            className="px-2.5 py-1 text-xs bg-white dark:bg-[#1c1c18] hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 rounded-full border border-black/6 dark:border-white/6 transition-colors font-medium flex items-center gap-1 shadow-sm"
                          >
                            <FileText className="w-3 h-3 text-gray-500" />
                            {file}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-white dark:bg-[#1c1c18] rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-black/6 dark:border-white/6 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-black/8 dark:border-white/8 bg-white dark:bg-[#121210]">
              <form onSubmit={handleSubmit} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Anubhav's skills..."
                  disabled={isLoading}
                  className="flex-1 bg-gray-100 dark:bg-[#1c1c18] border border-black/8 dark:border-white/8 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/50 transition-all placeholder:text-gray-400 disabled:opacity-50 text-gray-900 dark:text-gray-100"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-violet-700 text-white flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-sm"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-violet-700 text-white shadow-xl flex items-center justify-center hover:shadow-blue-400/30 transition-shadow relative"
            aria-label="Open AI Chat Assistant"
          >
            <Bot className="w-6 h-6" />
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full ring-2 ring-blue-400/40 animate-ping pointer-events-none" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {activeFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveFile(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-2xl max-h-[85vh] bg-[#fbfbfa] dark:bg-[#121210] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-900 dark:text-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-violet-50/50 dark:from-blue-950/20 dark:to-violet-950/20">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                    <FileText className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="text-sm font-bold tracking-tight">{activeFile.name}</h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Personal Asset Document</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Code
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveFile(null)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 p-4 overflow-y-auto bg-[#fbfbfa] dark:bg-[#121210]">
                <pre className="whitespace-pre-wrap font-mono text-xs text-gray-800 dark:text-gray-200 select-text bg-[#f5f5f0] dark:bg-[#1c1c18] border border-black/5 dark:border-white/5 rounded-xl p-4 leading-relaxed max-h-[60vh] overflow-y-auto">
                  {activeFile.content}
                </pre>
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-black/10 dark:border-white/10 bg-[#fbfbfa] dark:bg-[#121210] flex justify-end">
                <button
                  onClick={() => setActiveFile(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-[#1c1c18] hover:bg-gray-100 dark:hover:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
