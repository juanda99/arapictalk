import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { BoardData } from "../core/types";


const schema = {
  description: "Board data for AAC communication",
  type: SchemaType.OBJECT,
  properties: {
    actividad: {
      type: SchemaType.STRING,
      description: "Name of the activity",
    },
    formato: {
      type: SchemaType.STRING,
      description: "Format description",
    },
    columnas: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          tipo: {
            type: SchemaType.STRING,
            description: "Category of the words in the column (e.g., People, Actions, Places, etc.)",
          },
          esDinamica: {
            type: SchemaType.BOOLEAN,
            description: "True if the column can be replaced/cycled (Dynamic), false if it is essential (Fixed)",
          },
          contenido: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.STRING,
              description: "Keywords for the column, ordered by importance",
            },
          },
        },
        required: ["tipo", "contenido", "esDinamica"],
      },
    },
  },
  required: ["actividad", "formato", "columnas"],
};

const getModel = (apiKey: string) => {
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: "gemini-3.1-flash-lite",
    generationConfig: {
      responseMimeType: "application/json",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      responseSchema: schema as any,
      temperature: 0.1,
    },
  });
};

export const generateBoardData = async (prompt: string, systemPrompt: string, apiKey: string): Promise<BoardData> => {
  if (!apiKey) {
    throw new Error("API_KEY_MISSING");
  }

  try {
    const model = getModel(apiKey);
    const result = await model.generateContent(`${systemPrompt}\n\nActividad: ${prompt}`);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text) as BoardData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Check for the specific "leaked" error or 403
    const errorMessage = error instanceof Error ? error.message : "";
    if (errorMessage.includes("403") || errorMessage.includes("API key was reported as leaked")) {
      throw new Error("API_KEY_LEAKED", { cause: error });
    }
    
    throw error;
  }
};
