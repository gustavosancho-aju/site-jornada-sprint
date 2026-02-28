
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Download, Loader2, Sparkles, Wand2, Key } from 'lucide-react';
import { GeminiModel, AIStudioGlobal } from '../types';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [modelType, setModelType] = useState<GeminiModel>(GeminiModel.PRO_IMAGE);
  const [keySelected, setKeySelected] = useState(false);

  // Check key selection on mount or when model changes to ensure high-quality model compliance
  useEffect(() => {
    const checkKey = async () => {
      try {
        const aistudio = (window as any).aistudio as AIStudioGlobal | undefined;
        if (aistudio && await aistudio.hasSelectedApiKey()) {
          setKeySelected(true);
        } else if (!aistudio) {
          // Fallback for development environments where the global might not be present
          setKeySelected(true);
        }
      } catch (e) {
        console.warn("AI Studio Global not found", e);
        // Fallback to true if we cannot check, though guidelines recommend checking
        setKeySelected(true); 
      }
    };
    checkKey();
  }, []);

  // Handle mandatory key selection dialog for Pro models
  const handleSelectKey = async () => {
    const aistudio = (window as any).aistudio as AIStudioGlobal | undefined;
    if (aistudio) {
      await aistudio.openSelectKey();
      // Assume success as per instructions to avoid race conditions
      setKeySelected(true);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setGeneratedImages([]);

    try {
      // Re-initialize Gemini client to ensure it picks up the latest selected API key from the dialog
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let newImages: string[] = [];

      if (modelType === GeminiModel.IMAGEN) {
        const response = await ai.models.generateImages({
          model: modelType,
          prompt: prompt,
          config: {
            numberOfImages: 1,
            aspectRatio: aspectRatio,
            outputMimeType: 'image/jpeg'
          }
        });
        if (response.generatedImages?.[0]?.image?.imageBytes) {
          newImages.push(response.generatedImages[0].image.imageBytes);
        }
      } else {
        // Nano Banana (Gemini Image models)
        const response = await ai.models.generateContent({
          model: modelType,
          contents: { parts: [{ text: prompt }] },
          config: {
            imageConfig: {
              aspectRatio: aspectRatio,
              imageSize: "1K" // High-quality size config for Gemini 3 Pro Image
            }
          }
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
          for (const part of parts) {
            // High quality image response handling - iterate through all parts to find inline data
            if (part.inlineData && part.inlineData.data) {
              newImages.push(part.inlineData.data);
            }
          }
        }
      }

      setGeneratedImages(newImages);
    } catch (error) {
      console.error("Image generation failed", error);
      const errString = String(error);
      // Reset key selection if the request fails due to missing project configuration
      if (errString.includes("Requested entity was not found") || errString.includes("404")) {
         setKeySelected(false);
         alert("Please select a valid paid API key for high-quality image generation.");
      } else {
         alert("Failed to generate image. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const needsKeySelection = modelType === GeminiModel.PRO_IMAGE && !keySelected;

  return (
    <div className="h-full bg-gray-900 flex flex-col p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            Image Studio
          </h2>
          <p className="text-gray-400">Generate high-quality visuals using Imagen 3 and Gemini Pro.</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-6">
          <div className="space-y-2">
             <label className="text-sm font-medium text-gray-300">Prompt</label>
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="A futuristic city with flying cars at sunset, cyberpunk style..."
               className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
             />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Model</label>
              <select 
                value={modelType}
                onChange={(e) => setModelType(e.target.value as GeminiModel)}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={GeminiModel.PRO_IMAGE}>Gemini 3 Pro Image (Best Quality)</option>
                <option value={GeminiModel.FLASH_IMAGE}>Gemini 2.5 Flash Image (Fast)</option>
                <option value={GeminiModel.IMAGEN}>Imagen 3 (Specialized)</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Aspect Ratio</label>
              <div className="grid grid-cols-3 gap-2">
                 {['1:1', '16:9', '9:16', '4:3', '3:4'].map(ratio => (
                   <button
                     key={ratio}
                     onClick={() => setAspectRatio(ratio)}
                     className={`p-2 rounded-lg text-sm border transition-colors ${
                       aspectRatio === ratio 
                         ? 'bg-purple-600 border-purple-500 text-white' 
                         : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
                     }`}
                   >
                     {ratio}
                   </button>
                 ))}
              </div>
            </div>
          </div>

          {needsKeySelection ? (
            <div className="p-6 bg-gray-900 rounded-xl border border-yellow-500/50 flex flex-col items-center text-center gap-4">
              <Key className="w-10 h-10 text-yellow-400" />
              <div className="space-y-1">
                <p className="text-white font-semibold">API Key Required</p>
                <p className="text-xs text-gray-400 max-w-xs">Gemini 3 Pro Image requires a paid project API key selection.</p>
              </div>
              <button 
                onClick={handleSelectKey}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Select API Key
              </button>
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">Billing Documentation</a>
            </div>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold shadow-lg shadow-purple-900/20 hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Dreaming...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate
                </>
              )}
            </button>
          )}
        </div>

        {/* Results display for generated images */}
        <div className="grid grid-cols-1 gap-8">
           {generatedImages.map((imgBase64, idx) => (
             <div key={idx} className="relative group rounded-2xl overflow-hidden border border-gray-700 bg-gray-800 shadow-2xl">
                <img 
                  src={`data:image/jpeg;base64,${imgBase64}`} 
                  alt={`Generated content ${idx}`} 
                  className="w-full h-auto object-contain max-h-[600px] mx-auto"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a 
                    href={`data:image/jpeg;base64,${imgBase64}`} 
                    download={`gemini-gen-${Date.now()}.jpg`}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
                  >
                    <Download className="w-6 h-6" />
                  </a>
                </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
};
