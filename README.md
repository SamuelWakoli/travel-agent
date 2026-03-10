# Travel Assistant Agent

An AI-powered travel assistant built with Google's ADK (Agent Development Kit) that provides weather information and interesting facts about travel destinations.

## Overview

The Travel Assistant Agent is an LLM-powered chatbot that helps users learn about travel destinations by combining real-time weather data with historical and geographical information about locations.

## Features

The agent includes three integrated tools:

### 1. **Weather Tool** (Open-Meteo API)
- Fetches current weather conditions for any geographic location
- Requires latitude and longitude coordinates
- No API key needed
- Returns temperature, wind speed, and other weather metrics

### 2. **Wikipedia Tool**
- Searches Wikipedia for landmarks, historical facts, and points of interest
- Powered by Wikipedia's OpenSearch API
- Provides titles, descriptions, and links to relevant articles
- Great for learning about local attractions and history

### 3. **Geocoding Tool** (Nominatim API)
- Converts location names and addresses to latitude and longitude coordinates
- Powered by OpenStreetMap's Nominatim service
- No API key required
- Example: "Paris, France" → coordinates

## How It Works

1. User asks about a location or city
2. The agent uses **Geocoding Tool** to find the coordinates
3. The agent uses **Weather Tool** to fetch current weather
4. The agent uses **Wikipedia Tool** to find interesting facts and attractions
5. Agent synthesizes this information into a helpful response

## Tech Stack

- **Framework**: Google ADK (Agent Development Kit)
- **Model**: Gemini 2.5 Flash
- **Language**: TypeScript
- **Runtime**: Node.js (CommonJS)

## Dependencies

```json
{
  "@google/adk": "^0.3.0",
  "@google/adk-devtools": "^0.3.0",
  "typescript": "^5.9.3"
}
```

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SamuelWakoli/travel-agent.git
   cd travel-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   Create a `.env` file in the project root:
   ```
   GOOGLE_GENAI_API_KEY=your_actual_api_key_here
   GOOGLE_GENAI_USE_VERTEXAI=FALSE
   ```

4. **Run the agent**
   ```bash
   adk web
   ```
   
   or

   ```bash
   npm run test-web-ui
   ```

## Project Structure

```
travel-agent/
├── travel_assistant_agent.ts    # Main agent implementation
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── .env                         # Environment variables (not tracked)
└── README.md                    # This file
```

## API Requirements

- **Google Generative AI API**: Required for the LLM model
  - Sign up at: https://aistudio.google.com/
  - Get your API key and add to `.env`

## External APIs (No Authentication Required)

- **Open-Meteo**: Weather data (https://api.open-meteo.com/)
- **Nominatim/OpenStreetMap**: Geocoding (https://nominatim.openstreetmap.org/)
- **Wikipedia**: Landmark and historical information (https://en.wikipedia.org/)

## Example Usage

```typescript
import { travelAssistant } from "./travel_assistant_agent";

// The agent automatically handles tool calls
// Just ask about a location:
// "Tell me about the weather and attractions in Tokyo"
```

## Configuration

The agent is configured with:
- **Name**: travel_assistant
- **Model**: gemini-2.5-flash
- **System Instruction**: Provides guidance as a "Travel Concierge" to offer weather updates and interesting facts

Modify the `instruction` field in the agent configuration to change behavior.

## TypeScript Configuration

- **Module**: nodenext
- **Target**: esnext
- **Strict mode**: Enabled
- **Source maps**: Enabled for debugging


---

>Make sure your `.env` file is added to `.gitignore` to avoid committing sensitive API keys.
