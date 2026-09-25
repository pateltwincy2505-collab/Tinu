import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // Chat API endpoint supporting multi-turn conversation, Search Grounding & Maps Grounding
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, model = 'gemini-3.5-flash', mode = 'general', userLocation } = req.body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: 'Messages array is required' });
      }

      // Select model as specified by the brief
      // gemini-3.1-pro-preview for complex tasks, gemini-3.5-flash for general, gemini-3.1-flash-lite for fast tasks
      let selectedModel = 'gemini-3.5-flash';
      let tools: any[] = [];
      let toolConfig: any = undefined;

      if (mode === 'fast') {
        selectedModel = 'gemini-3.1-flash-lite';
      } else if (mode === 'complex') {
        selectedModel = 'gemini-3.1-pro-preview';
      } else if (mode === 'maps') {
        selectedModel = 'gemini-3.5-flash';
        tools = [{ googleMaps: {} }];
        if (userLocation && typeof userLocation.latitude === 'number' && typeof userLocation.longitude === 'number') {
          toolConfig = {
            retrievalConfig: {
              latLng: {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              },
            },
          };
        } else {
          // Default to Vadodara, Gujarat (Headquarters)
          toolConfig = {
            retrievalConfig: {
              latLng: {
                latitude: 22.2587,
                longitude: 73.1926,
              },
            },
          };
        }
      } else if (mode === 'search') {
        selectedModel = 'gemini-3.5-flash';
        tools = [{ googleSearch: {} }];
      } else {
        // General mode with Search Grounding
        selectedModel = model || 'gemini-3.5-flash';
        tools = [{ googleSearch: {} }];
      }

      const systemInstruction = `You are the Senior Metrology & Process Instrumentation AI Consultant for "INDUSTRIAL INSTRUMENTS - The Measurement Zone".
Location: 125, Om Nagar, Near HDFC Bank, Tarsali, Vadodara, Gujarat – 390009.
Direct Sales & WhatsApp Hotline: +91 94297 26631.

Capabilities:
1. Advise engineers and purchasing managers on industrial measurement tools:
   - Pressure Transmitters (Differential, Gauge, Coplanar)
   - Flow Meters (Coriolis, Magnetic, Vortex, Ultrasonic)
   - Level Transmitters (Guided Wave Radar, Non-contact Radar, Differential Pressure)
   - Temperature Sensors (RTDs, Pt100, Thermocouples, Thermal Imaging)
   - Calibration & Metrology Tools (Vernier Calipers, Digital Micrometers, Multimeters, Clamp Meters, Oscilloscopes, Anemometers)
2. Explain calibration & compliance: NIST traceability, ISO/IEC 17025 certification, ATEX/IECEx Zone 0/1, SIL2/SIL3, NACE MR0175.
3. If Google Search grounding is active, ground technical specifications with latest industry documentation.
4. If Google Maps grounding is active, cite exact locations, addresses, industrial zones, and calibration laboratories. Always mention our Vadodara office when local inquiries or Gujarat industrial zones are discussed.
5. Provide concise, clear, structured responses with engineering rigor.`;

      // Transform messages into valid Gemini multi-turn format
      const formattedContents = messages.map((m: { role: string; content?: string; text?: string }) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content || m.text || '' }],
      }));

      const config: any = {
        systemInstruction,
      };

      if (tools.length > 0) {
        config.tools = tools;
      }
      if (toolConfig) {
        config.toolConfig = toolConfig;
      }

      const response = await ai.models.generateContent({
        model: selectedModel,
        contents: formattedContents,
        config,
      });

      const text = response.text || '';
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const webSearchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

      res.json({
        text,
        groundingChunks,
        webSearchQueries,
        model: selectedModel,
      });
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      res.status(500).json({
        error: error.message || 'An error occurred while communicating with Gemini API',
      });
    }
  });

  // Vite middlewares in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
