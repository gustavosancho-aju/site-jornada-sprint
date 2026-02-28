import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Video, Loader2, PlayCircle, Key } from 'lucide-react';
import { GeminiModel, AIStudioGlobal } from '../types';

export const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');
  const [keySelected, setKeySelected] = useState(false);

  // Check key selection on mount
  useEffect(() => {
    const checkKey = async () => {
      try {
        const aistudio = (window as any).aistudio as AIStudioGlobal | undefined;
        if (aistudio && await aistudio.hasSelectedApiKey()) {
          setKeySelected(true);
        }
      } catch (e) {
        console.warn("AI Studio Global not found", e);
        // Fallback for development if not in IDX/AI Studio environment
        setKeySelected(true); 
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    const aistudio = (window as any).aistudio as AIStudioGlobal | undefined;
    if (aistudio) {
      await aistudio.openSelectKey();
      // Assume success as per instructions
      setKeySelected(true);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    // Reset state
    setIsLoading(true);
    setVideoUri(null);
    setProgress('Initializing generation...');

    try {
      // Re-initialize to ensure fresh key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: GeminiModel.VEO_FAST,
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      setProgress('Rendering video (this may take a minute)...');

      // Polling
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({operation: operation});
        setProgress('Still rendering...');
      }

      const uri = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (uri) {
        setVideoUri(`${uri}&key=${process.env.API_KEY}`);
      } else {
        throw new Error("No video URI returned");
      }

    } catch (error) {
      console.error("Video generation error", error);
      // If 404/not found, it might be the key issue as per prompt instructions
      const errString = String(error);
      if (errString.includes("Requested entity was not found") || errString.includes("404")) {
         setKeySelected(false);
         alert("Please select a valid paid API key for Veo.");
      } else {
         alert("Video generation failed. " + errString);
      }
    } finally {
      setIsLoading(false);
      setProgress('');
    }
  };

  if (!keySelected) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-900 p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center">
          <Key className="w-10 h-10 text-yellow-400" />
        </div>
        <h2 className="text-2xl font-bold text-white">Veo Requires a Paid Project Key</h2>
        <p className="text-gray-400 max-w-md">
          Video generation uses the Veo model which requires a specific billing-enabled project key selection.
        </p>
        <button 
          onClick={handleSelectKey}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Select API Key
        </button>
        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noreferrer"
          className="text-blue-400 text-sm hover:underline"
        >
          Learn more about billing
        </a>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 flex flex-col p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        <div className="text-center space-y-2">
           <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
            <Video className="w-8 h-8 text-green-400" />
            Veo Video Studio
           </h2>
           <p className="text-gray-400">Generate videos from text prompts using Veo 3.1 Fast.</p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 space-y-6">
          <div className="space-y-2">
             <label className="text-sm font-medium text-gray-300">Prompt</label>
             <textarea 
               value={prompt}
               onChange={(e) => setPrompt(e.target.value)}
               placeholder="A cinematic drone shot of a futuristic city..."
               className="w-full h-32 bg-gray-900 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
             />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim()}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl text-white font-semibold shadow-lg shadow-green-900/20 hover:from-green-500 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {progress || 'Generating...'}
              </>
            ) : (
              <>
                <PlayCircle className="w-5 h-5" />
                Generate Video
              </>
            )}
          </button>
        </div>

        {videoUri && (
          <div className="bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
            <video 
              controls 
              autoPlay 
              loop 
              className="w-full aspect-video"
              src={videoUri}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

      </div>
    </div>
  );
};