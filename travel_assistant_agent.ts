import "dotenv/config";
import { LlmAgent, FunctionTool } from "@google/adk";
import z from "zod";

/**
 * Add the following in `.env`
 * GOOGLE_GENAI_API_KEY=ACTUAL_KEY
 * GOOGLE_GENAI_USE_VERTEXAI=FALSE
 */

/**
 * TOOL 1: Weather Tool (Open-Meteo API)
 * No API Key required.
 */
const weatherTool = new FunctionTool({
  name: "get_weather",
  description: "Get current weather for a specific latitude and longitude.",
  parameters: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  execute: async ({ latitude, longitude }) => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
    );
    const data = await response.json();
    return JSON.stringify(data.current_weather);
  },
});

/**
 * TOOL 2: Wikipedia Tool
 * Uses Wikipedia's Open Search to find landmarks/info.
 */
const wikipediaTool = new FunctionTool({
  name: "search_wikipedia",
  description:
    "Search Wikipedia for landmarks, history, or points of interest about a location.",
  parameters: z.object({
    query: z.string().describe("The city or landmark to search for."),
  }),
  execute: async ({ query }) => {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(query)}&limit=3&namespace=0&format=json`,
    );
    const data = await response.json();
    // Data format: [query, titles[], descriptions[], links[]]
    return JSON.stringify({
      results: data[1],
      links: data[3],
    });
  },
});

/**
 * TOOL 3: Geocoding Tool (Nominatim API)
 * Converts location names/addresses to latitude and longitude coordinates.
 * No API Key required.
 */
const geocodeTool = new FunctionTool({
  name: "geocode_location",
  description:
    "Convert a location name or address into latitude and longitude coordinates using Nominatim geocoding.",
  parameters: z.object({
    location: z
      .string()
      .describe(
        'The location name or address to geocode (e.g., "Paris, France" or "Times Square, New York").',
      ),
  }),
  execute: async ({ location }) => {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&limit=1`,
    );
    const data = await response.json();
    if (data.length === 0) {
      return JSON.stringify({ error: "Location not found" });
    }
    const result = data[0];
    return JSON.stringify({
      location: result.name,
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
      address: result.address,
    });
  },
});

/**
 * THE AGENT
 */
export const travelAssistant = new LlmAgent({
  name: "travel_assistant",
  model: "gemini-2.5-flash", // Or your preferred model
  instruction: `
    You are a helpful Travel Concierge.
    Your goal is to provide weather updates and interesting facts about locations.
    If a user asks about a city, find the weather AND some interesting points of interest.
  `,
  tools: [weatherTool, wikipediaTool, geocodeTool],
});
