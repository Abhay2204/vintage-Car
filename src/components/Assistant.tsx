import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Loader2, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const Assistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      text: "Namaste! I'm Chacha. I know everything about these old Indian beauties. Ask me about mileage, maintenance, or history!",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(input);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-600/30 text-black border-2 border-amber-400"
            >
              <MessageSquare className="w-8 h-8" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-96 h-[500px] bg-[#120a05] border border-amber-900/50 rounded-lg shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-amber-900/40 to-black border-b border-amber-900/30 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center border border-amber-400">
                  <Bot className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-amber-500">Chacha AI</h3>
                  <p className="text-[10px] text-amber-200 uppercase tracking-wider">Vintage Expert</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-amber-700 hover:text-amber-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 text-sm border ${
                      msg.role === 'user'
                        ? 'bg-amber-700 text-white rounded-l-xl rounded-tr-xl border-amber-600'
                        : 'bg-[#1a1005] text-amber-100 rounded-r-xl rounded-tl-xl border-amber-900/50'
                    }`}
                  >
                    {msg.role === 'model' && <Sparkles className="w-3 h-3 text-amber-500 mb-1 inline mr-2" />}
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#1a1005] p-3 rounded-r-xl rounded-tl-xl border border-amber-900/50 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                    <span className="text-xs text-amber-700">Checking the archives...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-[#120a05] border-t border-amber-900/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Ambassador..."
                  className="flex-1 bg-black/50 border border-amber-900/30 focus:border-amber-500 rounded-none px-4 py-2 text-amber-100 placeholder-amber-900 text-sm outline-none transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-amber-600 hover:bg-amber-500 text-black p-2 rounded-none disabled:opacity-50 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Assistant;