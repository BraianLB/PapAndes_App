import { GoogleGenAI, Type } from "@google/genai";

/**
 * Diagnostic service for potato crops using Gemini API.
 * Follows Google GenAI guidelines for initialization and model selection.
 */
export const getGeminiDiagnosis = async (prompt: string, imageBase64?: string) => {
  // Always initialize GoogleGenAI with a direct reference to process.env.API_KEY.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contentParts: any[] = [{ text: prompt }];
  if (imageBase64) {
    contentParts.push({
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64
      }
    });
  }

  try {
    // Using gemini-3-pro-preview for complex technical reasoning tasks like agronomy diagnosis.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: { parts: contentParts },
      config: {
        systemInstruction: `You are an expert agronomist specialized in potato crops (Solanum tuberosum). 
        You help farmers identify diseases like Late Blight (Phytophthora infestans), Early Blight, and pests.
        Provide structured advice: Diagnosis, Confidence Level, and Treatment Plan (Organic and Chemical options).
        Be professional, technical yet accessible.`,
        temperature: 0.7,
      },
    });
    // Access response.text as a property.
    return response.text;
  } catch (error) {
    console.error("Gemini Diagnosis Error:", error);
    return "Lo siento, hubo un error al procesar tu solicitud. Por favor intenta de nuevo.";
  }
};