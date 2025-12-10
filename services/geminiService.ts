import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the API client.
// NOTE: We assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

let chatSession: Chat | null = null;

export const initializeChat = () => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }

  try {
    if (!chatSession) {
        throw new Error("Chat session failed to initialize");
    }
    const response = await chatSession.sendMessage({ message });
    
    // Safety check for text
    if (response.text) {
        return response.text;
    }
    
    return "I apologize, I'm having a bit of trouble connecting to my knowledge base right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently undergoing maintenance. Please contact a human sales representative.";
  }
};
