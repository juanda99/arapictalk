import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { BoardData } from "../core/types";

// NOTE: In a real app, this should come from an environment variable
// VITE_GEMINI_API_KEY=your_key_here
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(API_KEY);

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

const model = genAI.getGenerativeModel({
  model: "gemini-3.1-flash-lite",
  generationConfig: {
    responseMimeType: "application/json",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    responseSchema: schema as any,
    temperature: 0.1,
  },
});

export const generateBoardData = async (prompt: string, systemPrompt: string): Promise<BoardData> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  const result = await model.generateContent(`${systemPrompt}\n\nActividad: ${prompt}`);
  const response = await result.response;
  const text = response.text();
  return JSON.parse(text) as BoardData;
};
