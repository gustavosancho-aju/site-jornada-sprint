import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, Video as VideoIcon, VideoOff, Power, Activity } from 'lucide-react';
import { createBlob, decode, decodeAudioData, blobToBase64 } from '../utils/audio';
import { GeminiModel } from '../types';

export const LiveInterface: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [volume, setVolume] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef<any>(null); // Type 'any' used because LiveSession type is complex/internal
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const frameIntervalRef = useRef<number | null>(null);

  const addLog = (msg: string) => setLogs(prev => [...prev.slice(-4), msg]);

  const cleanup = () => {
    if (frameIntervalRef.current) clearInterval(frameIntervalRef.current);
    if (sessionRef.current) {
        try { sessionRef.current.close(); } catch(e) {} // best effort
    }
    if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
    }
    setConnected(false);
    setMicActive(false);
    setCameraActive(false);
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  const connect = async () => {
    try {
      addLog("Initializing Audio Context...");
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const inputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = inputCtx; // Keep one for cleanup, though we use two

      addLog("Requesting Media Permissions...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      mediaStreamRef.current = stream;

      // Setup Video Preview
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      addLog("Connecting to Gemini Live...");
      const sessionPromise = ai.live.connect({
        model: GeminiModel.LIVE_AUDIO,
        callbacks: {
          onopen: () => {
            addLog("Session Opened. Streaming Audio...");
            setConnected(true);
            setMicActive(true);
            setCameraActive(true);
            
            // --- Audio Input Setup ---
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              if (!connected) return; // simple guard
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Simple volume visualization
              let sum = 0;
              for(let i=0; i<inputData.length; i++) sum += inputData[i] * inputData[i];
              setVolume(Math.sqrt(sum / inputData.length));

              const pcmBlob = createBlob(inputData);
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              try {
                const audioBuffer = await decodeAudioData(
                  decode(base64Audio),
                  outputCtx,
                  24000,
                  1
                );
                
                const source = outputCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputCtx.destination);
                
                // Scheduling
                const now = outputCtx.currentTime;
                // If next time is in the past (gap), reset to now
                const startTime = Math.max(nextStartTimeRef.current, now);
                source.start(startTime);
                nextStartTimeRef.current = startTime + audioBuffer.duration;
              } catch (e) {
                console.error("Audio decode error", e);
              }
            }

            // Handle Interruption
            if (msg.serverContent?.interrupted) {
              addLog("Model interrupted");
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            addLog("Session Closed");
            cleanup();
          },
          onerror: (err) => {
            addLog("Session Error: " + String(err));
            console.error(err);
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          }
        }
      });

      sessionRef.current = await sessionPromise;

      // --- Video Input Loop ---
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video) {
        const ctx = canvas.getContext('2d');
        const frameRate = 1; // 1 FPS for tokens saving in demo, can be higher
        
        frameIntervalRef.current = window.setInterval(async () => {
           if (!video.videoWidth) return;
           canvas.width = video.videoWidth;
           canvas.height = video.videoHeight;
           ctx?.drawImage(video, 0, 0);
           
           canvas.toBlob(async (blob) => {
             if (blob) {
                const base64 = await blobToBase64(blob);
                sessionPromise.then(session => {
                    session.sendRealtimeInput({
                        media: {
                            mimeType: 'image/jpeg',
                            data: base64
                        }
                    });
                });
             }
           }, 'image/jpeg', 0.5);

        }, 1000 / frameRate);
      }

    } catch (error) {
      console.error(error);
      addLog("Connection Failed: " + String(error));
      cleanup();
    }
  };

  const handleDisconnect = () => {
    cleanup();
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col p-6">
       <div className="max-w-5xl mx-auto w-full flex flex-col h-full space-y-6">
          
          <div className="flex items-center justify-between">
             <h2 className="text-2xl font-bold text-white flex items-center gap-2">
               <Activity className={`w-6 h-6 ${connected ? 'text-green-500 animate-pulse' : 'text-gray-500'}`} />
               Gemini Live
             </h2>
             <div className="flex gap-2">
                {!connected ? (
                  <button 
                    onClick={connect}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-900/20"
                  >
                    <Power className="w-4 h-4" /> Start Live Session
                  </button>
                ) : (
                  <button 
                    onClick={handleDisconnect}
                    className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-red-900/20"
                  >
                    <Power className="w-4 h-4" /> End Session
                  </button>
                )}
             </div>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-0">
             {/* Video Feed */}
             <div className="relative bg-black rounded-3xl overflow-hidden border border-gray-800 flex items-center justify-center shadow-2xl">
                <video 
                   ref={videoRef} 
                   className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]" 
                   muted 
                   playsInline
                />
                {!mediaStreamRef.current && (
                   <div className="text-gray-500 flex flex-col items-center gap-2">
                      <VideoOff className="w-12 h-12" />
                      <span>Camera Off</span>
                   </div>
                )}
                <div className="absolute bottom-4 left-4 flex gap-2">
                   <div className={`p-2 rounded-full ${micActive ? 'bg-white text-black' : 'bg-red-500 text-white'}`}>
                      {micActive ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                   </div>
                   <div className={`p-2 rounded-full ${cameraActive ? 'bg-white text-black' : 'bg-red-500 text-white'}`}>
                      {cameraActive ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                   </div>
                </div>
                {/* Visualizer overlay */}
                {connected && (
                  <div className="absolute bottom-4 right-4 h-12 w-12 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                     <div 
                        className="bg-blue-500 rounded-full transition-all duration-75"
                        style={{ width: `${Math.min(volume * 200, 100)}%`, height: `${Math.min(volume * 200, 100)}%` }}
                     />
                  </div>
                )}
             </div>

             {/* Status/Logs */}
             <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 flex flex-col">
                <h3 className="font-semibold text-gray-300 mb-4">Session Logs</h3>
                <div className="flex-1 font-mono text-sm text-gray-400 space-y-2 overflow-y-auto">
                   {logs.length === 0 && <span className="opacity-50">Waiting to connect...</span>}
                   {logs.map((log, i) => (
                      <div key={i} className="border-l-2 border-gray-600 pl-2">
                        <span className="text-xs text-gray-500 block">{new Date().toLocaleTimeString()}</span>
                        {log}
                      </div>
                   ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
                   <p>Model: Gemini 2.5 Flash Native Audio</p>
                   <p>Latency: Real-time (WebSocket)</p>
                </div>
             </div>
          </div>

          {/* Hidden Canvas for processing */}
          <canvas ref={canvasRef} className="hidden" />
       </div>
    </div>
  );
};
