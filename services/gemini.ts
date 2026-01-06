import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Quiz } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// Helper to encode file to Base64
export const fileToGenerativePart = async (file: File): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// 1. Dynamic Content & Summarization
export const generateSummary = async (text: string, level: string = 'intermediate'): Promise<string> => {
  try {
    const prompt = `Please summarize the following educational content for a ${level} level student in Arabic. Focus on key concepts and actionable takeaways: \n\n ${text}`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "عذراً، لم أتمكن من تلخيص المحتوى حالياً.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي.";
  }
};

// 2. Adaptive Quiz Generation
export const generateQuiz = async (topic: string, difficulty: string): Promise<Quiz | null> => {
  try {
    const prompt = `Generate a quiz with 5 multiple choice questions about "${topic}" for a "${difficulty}" level student. Return strictly JSON.`;
    
    const schema: Schema = {
      type: Type.OBJECT,
      properties: {
        topic: { type: Type.STRING },
        questions: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ['question', 'options', 'correctAnswer', 'explanation']
          }
        }
      },
      required: ['topic', 'questions']
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Quiz;
    }
    return null;
  } catch (error) {
    console.error("Error generating quiz:", error);
    return null;
  }
};

// 3. Smart AI Assistant (Text & Audio)
export const sendMessageToAI = async (message: string, audioBase64?: string): Promise<string> => {
  try {
    const parts: any[] = [];
    
    if (audioBase64) {
      parts.push({
        inlineData: {
          mimeType: 'audio/wav', // Assuming WAV from MediaRecorder in browser usually
          data: audioBase64
        }
      });
      parts.push({ text: "Please respond to this audio in Arabic. " + (message || "") });
    } else {
      parts.push({ text: message });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Flash handles audio well
      contents: { parts },
      config: {
        systemInstruction: "You are a helpful, encouraging, and knowledgeable educational AI tutor named 'Moalem' (Teacher). You help students with their studies, provide emotional support based on educational values, and explain complex topics simply. You communicate primarily in Arabic."
      }
    });

    return response.text || "لم أفهم ذلك، هل يمكنك الإعادة؟";
  } catch (error) {
    console.error("Error in AI Chat:", error);
    return "واجهت مشكلة تقنية، يرجى المحاولة لاحقاً.";
  }
};

// 4. Educational Recommendations
export const getRecommendations = async (userInterests: string[]): Promise<string> => {
  try {
    const prompt = `Suggest a study plan and 3 related topics for a student interested in: ${userInterests.join(', ')}. Format as a bulleted list in Arabic.`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    return "";
  }
};
