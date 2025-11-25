import { GoogleGenAI, Type } from "@google/genai";
import { TravelPackage } from "../types";

// Initialize Gemini Client
// API Key is assumed to be in process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTravelPackage = async (
  destination: string,
  days: number,
  travelers: number,
  budget: string,
  date: string
): Promise<TravelPackage> => {
  
  const modelId = "gemini-2.5-flash";
  
  const prompt = `Act as a senior travel agent for "Explore Vista", a high-end travel agency. 
  Create a detailed travel package and itinerary for a trip to ${destination}.
  Duration: ${days} days.
  Travelers: ${travelers} people.
  Budget Level: ${budget}.
  Start Date: ${date}.
  
  Provide a creative, exciting package name, a summary description that sells the dream, 
  specific hotel recommendations suitable for the budget (include 'Explore Vista Recommended' in description if applicable), 
  list of inclusions (like breakfast, transfers, welcome drinks), and a detailed day-by-day itinerary with specific activities. 
  Estimate the total price per person based on the budget level.
  
  The tone should be vibrant, inviting, and professional.`;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          packageName: { type: Type.STRING, description: "Catchy name for the travel package" },
          destination: { type: Type.STRING },
          duration: { type: Type.STRING, description: "e.g., '5 Days / 4 Nights'" },
          price: { type: Type.STRING, description: "Estimated price per person, formatted with currency symbol" },
          description: { type: Type.STRING, description: "A short, enticing summary of the trip" },
          hotel: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              rating: { type: Type.STRING, description: "Star rating e.g. '4.5 Stars'" },
              description: { type: Type.STRING },
              amenities: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["name", "rating", "description", "amenities"]
          },
          inclusions: { type: Type.ARRAY, items: { type: Type.STRING } },
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER },
                title: { type: Type.STRING, description: "Theme of the day" },
                activities: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["day", "title", "activities"]
            }
          }
        },
        required: ["packageName", "destination", "duration", "price", "description", "hotel", "inclusions", "itinerary"]
      }
    }
  });

  if (response.text) {
    const data = JSON.parse(response.text) as TravelPackage;
    // Add a flag to indicate this is AI generated
    return { ...data, isGenerated: true };
  }

  throw new Error("Failed to generate travel package");
};