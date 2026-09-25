import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  MapPin,
  Search,
  Zap,
  Cpu,
  RefreshCw,
  ExternalLink,
  Phone,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  modelUsed?: string;
  groundingChunks?: Array<{
    web?: { uri: string; title: string };
    maps?: { uri: string; title: string; address?: string };
  }>;
  webSearchQueries?: string[];
}

interface GeminiChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

type ChatMode = 'general' | 'maps' | 'search' | 'fast' | 'complex';

export const GeminiChatModal: React.FC<GeminiChatModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content:
        'Hello! I am your Industrial Metrology & Process Control AI Assistant powered by Google Gemini. How can I assist you with instrument sizing, calibration standards (ISO/IEC 17025, NIST), specs, or local facilities in Vadodara and Gujarat?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<ChatMode>('general');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(
    null
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);

      // Attempt to get user geolocation for Google Maps Grounding
      if (navigator.geolocation && !userLocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setUserLocation({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          () => {
            // Default to Vadodara coordinates if denied
            setUserLocation({ latitude: 22.2587, longitude: 73.1926 });
          }
        );
      }
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      setInputValue(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || loading) return;

    const userMsgId = `user-${Date.now()}`;
    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: userMsgId,
        role: 'user',
        content: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];

    setMessages(newMessages);
    setInputValue('');
    setLoading(true);

    try {
      const payload = {
        messages: newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        mode,
        userLocation,
      };

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `HTTP error ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'model',
          content: data.text || 'No response text received.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          modelUsed: data.model,
          groundingChunks: data.groundingChunks,
          webSearchQueries: data.webSearchQueries,
        },
      ]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model',
          content: `Technical issue processing request: ${err.message || 'Please verify your network connection.'}. You can also connect directly with our engineering desk at +91 94297 26631.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        content:
          'Chat session refreshed. How can I assist you with measurement technology, calibration certificates, or product selection?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const samplePrompts = [
    {
      title: 'Vadodara Office & Location',
      prompt: 'Where is INDUSTRIAL INSTRUMENTS located in Vadodara, Gujarat?',
      mode: 'maps' as ChatMode,
    },
    {
      title: 'NIST & ISO 17025 Standards',
      prompt: 'What is the difference between factory calibration and NIST-traceable 5-point calibration?',
      mode: 'general' as ChatMode,
    },
    {
      title: 'Find Nearby Calibration Labs',
      prompt: 'Search for accredited calibration and metrology testing laboratories in Gujarat.',
      mode: 'maps' as ChatMode,
    },
    {
      title: 'Coriolis vs Magnetic Flowmeter',
      prompt: 'When should I select a Coriolis mass flowmeter over an electromagnetic flowmeter?',
      mode: 'search' as ChatMode,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white border border-slate-300 rounded-xl max-w-3xl w-full h-[90vh] max-h-[780px] shadow-2xl flex flex-col overflow-hidden animate-fade-in">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold tracking-tight">
                  Gemini Metrology Assistant
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                  LIVE AI
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                INDUSTRIAL INSTRUMENTS · The Measurement Zone · Vadodara
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              title="Reset Conversation"
              className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Selector & Grounding Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 font-mono text-slate-600">
            <span className="text-[11px] font-bold uppercase">Grounding & Model:</span>
          </div>

          <div className="flex items-center gap-1 flex-wrap">
            <button
              onClick={() => setMode('general')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                mode === 'general'
                  ? 'bg-amber-600 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Search className="w-3 h-3" />
              <span>gemini-3.5-flash (Search)</span>
            </button>

            <button
              onClick={() => setMode('maps')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                mode === 'maps'
                  ? 'bg-sky-600 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>Google Maps Grounding</span>
            </button>

            <button
              onClick={() => setMode('fast')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                mode === 'fast'
                  ? 'bg-emerald-600 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>gemini-3.1-flash-lite</span>
            </button>

            <button
              onClick={() => setMode('complex')}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors ${
                mode === 'complex'
                  ? 'bg-purple-600 text-white font-semibold shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>gemini-3.1-pro</span>
            </button>
          </div>
        </div>

        {/* Chat Thread Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}
              >
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-lg p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-xs'
                }`}
              >
                {/* Header info */}
                <div
                  className={`flex items-center justify-between text-[10px] font-mono mb-1.5 pb-1 border-b ${
                    m.role === 'user'
                      ? 'text-slate-400 border-slate-800'
                      : 'text-slate-500 border-slate-100'
                  }`}
                >
                  <span className="font-semibold">
                    {m.role === 'user' ? 'Process Engineer' : 'Gemini Metrologist'}
                  </span>
                  <div className="flex items-center gap-2">
                    {m.modelUsed && (
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-mono text-[9px] border border-slate-200">
                        {m.modelUsed}
                      </span>
                    )}
                    <span>{m.timestamp}</span>
                    <button
                      onClick={() => handleCopy(m.id, m.content)}
                      className="hover:text-slate-900 p-0.5"
                      title="Copy response"
                    >
                      {copiedId === m.id ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="whitespace-pre-wrap font-sans text-slate-900">{m.content}</div>

                {/* Grounding Citations */}
                {m.groundingChunks && m.groundingChunks.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-slate-600 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Verified Grounding Sources:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {m.groundingChunks.map((chunk, idx) => {
                        if (chunk.web) {
                          return (
                            <a
                              key={idx}
                              href={chunk.web.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 hover:bg-amber-50 text-[11px] text-slate-700 hover:text-amber-800 border border-slate-200 hover:border-amber-300 transition-colors"
                            >
                              <Search className="w-2.5 h-2.5 text-slate-500" />
                              <span className="truncate max-w-[200px]">
                                {chunk.web.title || chunk.web.uri}
                              </span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </a>
                          );
                        }
                        if (chunk.maps) {
                          return (
                            <a
                              key={idx}
                              href={chunk.maps.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-50 hover:bg-sky-100 text-[11px] text-sky-800 border border-sky-200 transition-colors"
                            >
                              <MapPin className="w-2.5 h-2.5 text-sky-600" />
                              <span className="truncate max-w-[200px]">
                                {chunk.maps.title || 'View on Google Maps'}
                              </span>
                              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </a>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3.5 shadow-xs text-xs font-mono text-slate-600 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-100"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce delay-200"></div>
                <span>Gemini is synthesizing industrial metrology data...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Sample Prompt Shortcuts */}
        {messages.length <= 2 && (
          <div className="bg-white border-t border-slate-200 px-4 py-2">
            <div className="text-[10px] font-mono uppercase text-slate-500 mb-1 font-semibold">
              Suggested Technical Inquiries:
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {samplePrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMode(item.mode);
                    handleSendMessage(item.prompt);
                  }}
                  className="whitespace-nowrap px-2.5 py-1 text-xs rounded bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{item.title}</span>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="bg-white border-t border-slate-200 p-3 sm:p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                mode === 'maps'
                  ? 'Ask about industrial locations, Gujarat plants, calibration labs...'
                  : 'Ask about sensor specs, standards, sizing, or 4-20mA calibration...'
              }
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-amber-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !inputValue.trim()}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-900 font-bold text-xs rounded-md shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Footer Contact Help */}
          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <div className="flex items-center gap-1.5">
              <span>Vadodara Sales Desk:</span>
              <a
                href="tel:+919429726631"
                className="font-bold text-slate-900 hover:text-amber-600 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-amber-500" />
                +91 94297 26631
              </a>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>NIST Traceable & ISO 17025 Guidance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
