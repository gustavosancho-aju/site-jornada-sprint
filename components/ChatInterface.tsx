import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, Loader2, Globe, MapPin, X, MessageSquare } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { ChatMessage, GeminiModel, GroundingChunk } from '../types';
import ReactMarkdown from 'react-markdown';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{data: string, mimeType: string} | null>(null);
  const [useSearch, setUseSearch] = useState(false);
  const [useMaps, setUseMaps] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Split to get raw base64
        const base64Data = base64String.split(',')[1];
        setSelectedImage({
          data: base64Data,
          mimeType: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      image: selectedImage ? selectedImage.data : undefined,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);
    setInput('');
    const tempImage = selectedImage; // Keep ref for API call
    setSelectedImage(null); // Clear UI

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const parts: any[] = [];
      
      if (tempImage) {
        parts.push({
          inlineData: {
            mimeType: tempImage.mimeType,
            data: tempImage.data
          }
        });
      }
      
      if (input) {
        parts.push({ text: input });
      }

      const tools: any[] = [];
      if (useSearch) tools.push({ googleSearch: {} });
      if (useMaps) tools.push({ googleMaps: {} });

      const modelName = useSearch || useMaps || tempImage ? GeminiModel.PRO : GeminiModel.FLASH;

      const response: GenerateContentResponse = await ai.models.generateContent({
        model: modelName,
        contents: { parts },
        config: {
          tools: tools.length > 0 ? tools : undefined,
          // If Maps is active, we should try to get location. For now, we'll omit location for simplicity or hardcode a default
          // In a real app, use navigator.geolocation
        }
      });

      const text = response.text || "No text response generated.";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text,
        grounding: groundingChunks,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, modelMsg]);

    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
             <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-blue-400" />
             </div>
             <p>Start a conversation. You can upload images or use Grounding.</p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-800 text-gray-100 rounded-bl-none shadow-lg'
            }`}>
              {msg.image && (
                <img 
                  src={`data:image/png;base64,${msg.image}`} 
                  alt="Uploaded content" 
                  className="mb-3 rounded-lg max-h-64 object-contain bg-black/20"
                />
              )}
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>

              {/* Grounding Sources */}
              {msg.grounding && msg.grounding.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-700/50">
                  <p className="text-xs font-semibold text-gray-400 mb-2 flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Sources
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {msg.grounding.map((chunk, idx) => {
                      if (chunk.web) {
                        return (
                          <a 
                            key={idx} 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs bg-gray-900/50 hover:bg-gray-700 px-2 py-1 rounded border border-gray-700 text-blue-300 truncate max-w-[200px] transition-colors"
                          >
                            {chunk.web.title || new URL(chunk.web.uri).hostname}
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
                            className="text-xs bg-gray-900/50 hover:bg-gray-700 px-2 py-1 rounded border border-gray-700 text-green-300 truncate max-w-[200px] flex items-center gap-1 transition-colors"
                          >
                            <MapPin className="w-3 h-3" />
                            {chunk.maps.title}
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
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-gray-800 rounded-2xl rounded-bl-none p-4 shadow-lg flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                <span className="text-gray-400 text-sm">Thinking...</span>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-4xl mx-auto space-y-4">
          
          {selectedImage && (
            <div className="relative inline-block">
              <img 
                src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`}
                alt="Selected"
                className="h-20 rounded-lg border border-gray-700 object-cover"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-3">
             <button 
                onClick={() => setUseSearch(!useSearch)}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors ${useSearch ? 'bg-blue-900/50 border-blue-500 text-blue-300' : 'bg-transparent border-gray-700 text-gray-400 hover:text-white'}`}
             >
                <Globe className="w-3 h-3" /> Search
             </button>
             <button 
                onClick={() => setUseMaps(!useMaps)}
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors ${useMaps ? 'bg-green-900/50 border-green-500 text-green-300' : 'bg-transparent border-gray-700 text-gray-400 hover:text-white'}`}
             >
                <MapPin className="w-3 h-3" /> Maps
             </button>
          </div>

          <div className="flex gap-2">
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="p-3 text-gray-400 hover:text-white bg-gray-900 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors"
             >
               <Upload className="w-5 h-5" />
             </button>
             <input 
               type="file" 
               ref={fileInputRef} 
               className="hidden" 
               accept="image/*"
               onChange={handleFileSelect}
             />
             <div className="flex-1 relative">
               <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Gemini anything..."
                className="w-full bg-gray-900 text-white rounded-xl border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
               />
             </div>
             <button 
               onClick={handleSend}
               disabled={isLoading || (!input.trim() && !selectedImage)}
               className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             >
               <Send className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};