

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // base64
  grounding?: GroundingChunk[];
  timestamp: number;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
      reviewSnippets?: {
        content: string;
      }[];
    }[];
  };
}

export enum GeminiModel {
  FLASH = 'gemini-3-flash-preview',
  PRO = 'gemini-3-pro-preview',
  FLASH_IMAGE = 'gemini-2.5-flash-image',
  PRO_IMAGE = 'gemini-3-pro-image-preview',
  IMAGEN = 'imagen-4.0-generate-001',
  VEO_FAST = 'veo-3.1-fast-generate-preview',
  VEO_FULL = 'veo-3.1-generate-preview',
  LIVE_AUDIO = 'gemini-2.5-flash-native-audio-preview-12-2025',
  GEMINI_2_5_FLASH = 'gemini-2.5-flash'
}

// Mock for the window.aistudio object
export interface AIStudioGlobal {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}