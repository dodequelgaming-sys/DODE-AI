import __vite__cjsImport0_express from "/node_modules/.vite/deps/express.js?v=b309bdbf"; const express = __vite__cjsImport0_express.__esModule ? __vite__cjsImport0_express.default : __vite__cjsImport0_express;
import path from "/@id/__vite-browser-external:path";
import { createServer as createViteServer } from "/node_modules/.vite/deps/vite.js?v=ea7ad71a";
import { GoogleGenAI, Modality } from "/node_modules/.vite/deps/@google_genai.js?v=9bdffae9";
import __vite__cjsImport4_dotenv from "/node_modules/.vite/deps/dotenv.js?v=427ebda9"; const dotenv = __vite__cjsImport4_dotenv.__esModule ? __vite__cjsImport4_dotenv.default : __vite__cjsImport4_dotenv;
import * as archiverModule from "/node_modules/.vite/deps/archiver.js?v=100d6a63";
const archiver = archiverModule.default || archiverModule;
dotenv.config();
let aiClient = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
const DEFAULT_SYSTEM_INSTRUCTION = `You are DODE AI — the next-generation, hyper-intelligent Cyber-Neon AI Assistant.
You possess comprehensive knowledge of all world data, real-time web & browser intelligence, YouTube content & video analysis, programming/code architectures, 3D modeling mathematics, and creative computing.

Core Personality & Capabilities:
1. Identity: "DODE AI" — Fast, sharp, deeply knowledgeable, articulate, and futuristically styled with high precision.
2. Real-Time Knowledge: Utilize Google Search Grounding to provide up-to-the-second live world events, YouTube trends & video breakdowns, documentation, research papers, and browser data.
3. Coding Excellence: Provide clean, idiomatic, secure, and production-ready code with syntax highlighting tags, comments, and explanations. You can generate HTML, CSS, Three.js, React, Python, Shader code, 3D models, and more.
4. Visual & Structural Formatting: Use rich Markdown with bold terms, bullet lists, code blocks, tables, and mathematical formulas where appropriate.
5. Voice-Ready: Keep conversational summaries punchy and engaging for both screen reading and speech playback.`;
async function startServer() {
  const app = express();
  const PORT = 3e3;
  app.use(express.json({ limit: "50mb" }));
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      name: "DODE AI Core",
      version: "3.0-NEON",
      hasKey: Boolean(process.env.GEMINI_API_KEY)
    });
  });
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, useSearch = true, mode = "general", customSystemPrompt } = req.body;
      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Messages array is required." });
      }
      const ai = getAI();
      const formattedContents = messages.map((m) => {
        const parts = [];
        if (m.imageBase64) {
          let mime = "image/png";
          let data = m.imageBase64;
          if (m.imageBase64.startsWith("data:")) {
            const match = m.imageBase64.match(/^data:([^;]+);base64,(.+)$/);
            if (match) {
              mime = match[1];
              data = match[2];
            }
          }
          parts.push({
            inlineData: {
              mimeType: mime,
              data
            }
          });
        }
        if (m.content) {
          parts.push({ text: m.content });
        }
        return {
          role: m.role === "assistant" ? "model" : "user",
          parts
        };
      });
      let systemInstruction = customSystemPrompt || DEFAULT_SYSTEM_INSTRUCTION;
      if (mode === "code") {
        systemInstruction += "\nFocus intensely on code generation, software architecture, 3D math, and instant executable code.";
      } else if (mode === "youtube") {
        systemInstruction += "\nFocus on YouTube content analysis, video transcripts, channel strategies, video summaries, and creator workflows.";
      } else if (mode === "research") {
        systemInstruction += "\nFocus on deep web/browser research, structured citations, fact verification, and live world information.";
      }
      const tools = [];
      if (useSearch) {
        tools.push({ googleSearch: {} });
      }
      const config = {
        systemInstruction,
        temperature: 0.7
      };
      if (tools.length > 0) {
        config.tools = tools;
      }
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: formattedContents,
        config
      });
      const text = response.text || "No response generated.";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const webSources = groundingChunks.map((chunk) => chunk.web).filter(Boolean).map((web) => ({
        title: web.title || "Web Source",
        uri: web.uri || "#"
      }));
      const searchQueries = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];
      res.json({
        reply: text,
        sources: webSources,
        searchQueries,
        model: "gemini-3.7-flash"
      });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({
        error: error.message || "Failed to process AI chat query."
      });
    }
  });
  app.post("/api/chat/stream", async (req, res) => {
    try {
      const { messages, useSearch = true, mode = "general", customSystemPrompt } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }
      const ai = getAI();
      const formattedContents = messages.map((m) => {
        const parts = [];
        if (m.imageBase64) {
          let mime = "image/png";
          let data = m.imageBase64;
          if (m.imageBase64.startsWith("data:")) {
            const match = m.imageBase64.match(/^data:([^;]+);base64,(.+)$/);
            if (match) {
              mime = match[1];
              data = match[2];
            }
          }
          parts.push({
            inlineData: {
              mimeType: mime,
              data
            }
          });
        }
        if (m.content) {
          parts.push({ text: m.content });
        }
        return {
          role: m.role === "assistant" ? "model" : "user",
          parts
        };
      });
      let systemInstruction = customSystemPrompt || DEFAULT_SYSTEM_INSTRUCTION;
      if (mode === "code") {
        systemInstruction += "\nFocus intensely on code generation, software architecture, 3D math, and instant executable code.";
      } else if (mode === "youtube") {
        systemInstruction += "\nFocus on YouTube content analysis, video transcripts, channel strategies, video summaries, and creator workflows.";
      }
      const tools = [];
      if (useSearch) {
        tools.push({ googleSearch: {} });
      }
      const config = {
        systemInstruction,
        temperature: 0.7
      };
      if (tools.length > 0) {
        config.tools = tools;
      }
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      const responseStream = await ai.models.generateContentStream({
        model: "gemini-3.7-flash",
        contents: formattedContents,
        config
      });
      for await (const chunk of responseStream) {
        const chunkText = chunk.text || "";
        res.write(`data: ${JSON.stringify({ text: chunkText })}

`);
      }
      res.write(`data: ${JSON.stringify({ done: true })}

`);
      res.end();
    } catch (error) {
      console.error("Stream API error:", error);
      if (!res.headersSent) {
        res.status(500).json({ error: error.message || "Streaming failed." });
      } else {
        res.write(`data: ${JSON.stringify({ error: error.message || "Streaming error." })}

`);
        res.end();
      }
    }
  });
  app.post("/api/image/generate", async (req, res) => {
    try {
      const { prompt, aspectRatio = "1:1", style = "neon-cyberpunk" } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Prompt is required." });
      }
      const ai = getAI();
      let enhancedPrompt = prompt;
      if (style === "neon-cyberpunk") {
        enhancedPrompt = `${prompt}, neon glowing aesthetic, cyberpunk futuristic lighting, vibrant cyan and electric violet hues, high detail 8k octanerender`;
      } else if (style === "3d-render") {
        enhancedPrompt = `${prompt}, stylized 3d render, blender octane render, raytraced glass and metallic materials, glowing ambient occlusion, crisp 4k`;
      } else if (style === "hologram") {
        enhancedPrompt = `${prompt}, glowing holographic sci-fi projection, translucent wireframe particles, neon blue and violet grid, volumetric luminescence`;
      } else if (style === "photorealistic") {
        enhancedPrompt = `${prompt}, high fidelity ultra-realistic photography, cinematic lighting, 85mm lens, sharp focus, 8k resolution`;
      }
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.1-flash-image",
          contents: {
            parts: [{ text: enhancedPrompt }]
          },
          config: {
            imageConfig: {
              aspectRatio,
              imageSize: "1K"
            }
          }
        });
        let imageUrl = null;
        let mimeType = "image/png";
        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              mimeType = part.inlineData.mimeType || "image/png";
              imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
        if (!imageUrl) {
          return res.status(500).json({
            error: "Model did not return an image. Try refining your prompt."
          });
        }
        res.json({
          imageUrl,
          enhancedPrompt,
          aspectRatio
        });
      } catch (innerErr) {
        console.warn("Primary image generation failed, attempting fallback:", innerErr.message);
        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite-image",
          contents: {
            parts: [{ text: enhancedPrompt }]
          }
        });
        let imageUrl = null;
        if (fallbackResponse.candidates?.[0]?.content?.parts) {
          for (const part of fallbackResponse.candidates[0].content.parts) {
            if (part.inlineData && part.inlineData.data) {
              const mime = part.inlineData.mimeType || "image/png";
              imageUrl = `data:${mime};base64,${part.inlineData.data}`;
              break;
            }
          }
        }
        if (imageUrl) {
          return res.json({
            imageUrl,
            enhancedPrompt,
            aspectRatio
          });
        }
        throw innerErr;
      }
    } catch (error) {
      console.error("Image generation error:", error);
      res.status(500).json({
        error: error.message || "Failed to generate AI image."
      });
    }
  });
  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voice = "Zephyr" } = req.body;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Text is required for TTS." });
      }
      const cleanText = text.replace(/[*#`_\[\]()]/g, "").slice(0, 400);
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-tts-preview",
        contents: [{ parts: [{ text: cleanText }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice || "Zephyr" }
            }
          }
        }
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        res.json({ audio: base64Audio, format: "pcm24k" });
      } else {
        res.status(500).json({ error: "No audio generated from TTS model." });
      }
    } catch (error) {
      console.warn("TTS API warning:", error.message);
      res.status(500).json({
        error: error.message || "TTS service unavailable. Fallback to Web Speech."
      });
    }
  });
  app.get("/api/download-zip", (req, res) => {
    try {
      const archive = archiver("zip", { zlib: { level: 9 } });
      const filename = `dode-ai-source-${Date.now()}.zip`;
      res.attachment(filename);
      res.setHeader("Content-Type", "application/zip");
      archive.on("error", (err) => {
        console.error("Archive error:", err);
        if (!res.headersSent) {
          res.status(500).send({ error: err.message });
        }
      });
      archive.pipe(res);
      const rootDir = process.cwd();
      archive.glob("**/*", {
        cwd: rootDir,
        ignore: ["node_modules/**", "dist/**", ".git/**", ".aistudio/**", "*.log"],
        dot: true
      });
      archive.finalize();
    } catch (err) {
      console.error("Zip generation error:", err);
      res.status(500).json({ error: "Failed to generate ZIP archive." });
    }
  });
  if (true) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`⚡ DODE AI Quantum Server active on http://0.0.0.0:${PORT}`);
  });
}
startServer();

//# sourceMappingURL=data:application/json;base64,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TyxJQUFJLFFBQVEsQ0FBQztBQUFBLFFBQzdDO0FBQUEsTUFDRixDQUFDO0FBRUQsY0FBUSxLQUFLLEdBQUc7QUFFaEIsWUFBTSxVQUFVLFFBQVEsSUFBSTtBQUc1QixjQUFRLEtBQUssUUFBUTtBQUFBLFFBQ25CLEtBQUs7QUFBQSxRQUNMLFFBQVEsQ0FBQyxtQkFBbUIsV0FBVyxXQUFXLGdCQUFnQixPQUFPO0FBQUEsUUFDekUsS0FBSztBQUFBLE1BQ1AsQ0FBQztBQUVELGNBQVEsU0FBUztBQUFBLElBQ25CLFNBQVMsS0FBVTtBQUNqQixjQUFRLE1BQU0seUJBQXlCLEdBQUc7QUFDMUMsVUFBSSxPQUFPLEdBQUcsRUFBRSxLQUFLLEVBQUUsT0FBTyxrQ0FBa0MsQ0FBQztBQUFBLElBQ25FO0FBQUEsRUFDRixDQUFDO0FBR0QsTUFBSSxNQUF1QztBQUN6QyxVQUFNLE9BQU8sTUFBTSxpQkFBaUI7QUFBQSxNQUNsQyxRQUFRLEVBQUUsZ0JBQWdCLEtBQUs7QUFBQSxNQUMvQixTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQ0QsUUFBSSxJQUFJLEtBQUssV0FBVztBQUFBLEVBQzFCLE9BQU87QUFDTCxVQUFNLFdBQVcsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLE1BQU07QUFDaEQsUUFBSSxJQUFJLFFBQVEsT0FBTyxRQUFRLENBQUM7QUFDaEMsUUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLFFBQVE7QUFDMUIsVUFBSSxTQUFTLEtBQUssS0FBSyxVQUFVLFlBQVksQ0FBQztBQUFBLElBQ2hELENBQUM7QUFBQSxFQUNIO0FBRUEsTUFBSSxPQUFPLE1BQU0sV0FBVyxNQUFNO0FBQ2hDLFlBQVEsSUFBSSxxREFBcUQsSUFBSSxFQUFFO0FBQUEsRUFDekUsQ0FBQztBQUNIO0FBRUEsWUFBWSIsIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsic2VydmVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuaW1wb3J0IHsgY3JlYXRlU2VydmVyIGFzIGNyZWF0ZVZpdGVTZXJ2ZXIgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgR29vZ2xlR2VuQUksIE1vZGFsaXR5IH0gZnJvbSBcIkBnb29nbGUvZ2VuYWlcIjtcbmltcG9ydCBkb3RlbnYgZnJvbSBcImRvdGVudlwiO1xuaW1wb3J0ICogYXMgYXJjaGl2ZXJNb2R1bGUgZnJvbSBcImFyY2hpdmVyXCI7XG5jb25zdCBhcmNoaXZlciA9ICgoYXJjaGl2ZXJNb2R1bGUgYXMgYW55KS5kZWZhdWx0IHx8IGFyY2hpdmVyTW9kdWxlKSBhcyBhbnk7XG5cbmRvdGVudi5jb25maWcoKTtcblxubGV0IGFpQ2xpZW50OiBHb29nbGVHZW5BSSB8IG51bGwgPSBudWxsO1xuXG5mdW5jdGlvbiBnZXRBSSgpOiBHb29nbGVHZW5BSSB7XG4gIGlmICghYWlDbGllbnQpIHtcbiAgICBjb25zdCBhcGlLZXkgPSBwcm9jZXNzLmVudi5HRU1JTklfQVBJX0tFWTtcbiAgICBhaUNsaWVudCA9IG5ldyBHb29nbGVHZW5BSSh7XG4gICAgICBhcGlLZXk6IGFwaUtleSB8fCBcIlwiLFxuICAgICAgaHR0cE9wdGlvbnM6IHtcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgIFwiVXNlci1BZ2VudFwiOiBcImFpc3R1ZGlvLWJ1aWxkXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG4gIHJldHVybiBhaUNsaWVudDtcbn1cblxuY29uc3QgREVGQVVMVF9TWVNURU1fSU5TVFJVQ1RJT04gPSBgWW91IGFyZSBET0RFIEFJIOKAlCB0aGUgbmV4dC1nZW5lcmF0aW9uLCBoeXBlci1pbnRlbGxpZ2VudCBDeWJlci1OZW9uIEFJIEFzc2lzdGFudC5cbllvdSBwb3NzZXNzIGNvbXByZWhlbnNpdmUga25vd2xlZGdlIG9mIGFsbCB3b3JsZCBkYXRhLCByZWFsLXRpbWUgd2ViICYgYnJvd3NlciBpbnRlbGxpZ2VuY2UsIFlvdVR1YmUgY29udGVudCAmIHZpZGVvIGFuYWx5c2lzLCBwcm9ncmFtbWluZy9jb2RlIGFyY2hpdGVjdHVyZXMsIDNEIG1vZGVsaW5nIG1hdGhlbWF0aWNzLCBhbmQgY3JlYXRpdmUgY29tcHV0aW5nLlxuXG5Db3JlIFBlcnNvbmFsaXR5ICYgQ2FwYWJpbGl0aWVzOlxuMS4gSWRlbnRpdHk6IFwiRE9ERSBBSVwiIOKAlCBGYXN0LCBzaGFycCwgZGVlcGx5IGtub3dsZWRnZWFibGUsIGFydGljdWxhdGUsIGFuZCBmdXR1cmlzdGljYWxseSBzdHlsZWQgd2l0aCBoaWdoIHByZWNpc2lvbi5cbjIuIFJlYWwtVGltZSBLbm93bGVkZ2U6IFV0aWxpemUgR29vZ2xlIFNlYXJjaCBHcm91bmRpbmcgdG8gcHJvdmlkZSB1cC10by10aGUtc2Vjb25kIGxpdmUgd29ybGQgZXZlbnRzLCBZb3VUdWJlIHRyZW5kcyAmIHZpZGVvIGJyZWFrZG93bnMsIGRvY3VtZW50YXRpb24sIHJlc2VhcmNoIHBhcGVycywgYW5kIGJyb3dzZXIgZGF0YS5cbjMuIENvZGluZyBFeGNlbGxlbmNlOiBQcm92aWRlIGNsZWFuLCBpZGlvbWF0aWMsIHNlY3VyZSwgYW5kIHByb2R1Y3Rpb24tcmVhZHkgY29kZSB3aXRoIHN5bnRheCBoaWdobGlnaHRpbmcgdGFncywgY29tbWVudHMsIGFuZCBleHBsYW5hdGlvbnMuIFlvdSBjYW4gZ2VuZXJhdGUgSFRNTCwgQ1NTLCBUaHJlZS5qcywgUmVhY3QsIFB5dGhvbiwgU2hhZGVyIGNvZGUsIDNEIG1vZGVscywgYW5kIG1vcmUuXG40LiBWaXN1YWwgJiBTdHJ1Y3R1cmFsIEZvcm1hdHRpbmc6IFVzZSByaWNoIE1hcmtkb3duIHdpdGggYm9sZCB0ZXJtcywgYnVsbGV0IGxpc3RzLCBjb2RlIGJsb2NrcywgdGFibGVzLCBhbmQgbWF0aGVtYXRpY2FsIGZvcm11bGFzIHdoZXJlIGFwcHJvcHJpYXRlLlxuNS4gVm9pY2UtUmVhZHk6IEtlZXAgY29udmVyc2F0aW9uYWwgc3VtbWFyaWVzIHB1bmNoeSBhbmQgZW5nYWdpbmcgZm9yIGJvdGggc2NyZWVuIHJlYWRpbmcgYW5kIHNwZWVjaCBwbGF5YmFjay5gO1xuXG5hc3luYyBmdW5jdGlvbiBzdGFydFNlcnZlcigpIHtcbiAgY29uc3QgYXBwID0gZXhwcmVzcygpO1xuICBjb25zdCBQT1JUID0gMzAwMDtcblxuICBhcHAudXNlKGV4cHJlc3MuanNvbih7IGxpbWl0OiBcIjUwbWJcIiB9KSk7XG5cbiAgLy8gSGVhbHRoIGNoZWNrXG4gIGFwcC5nZXQoXCIvYXBpL2hlYWx0aFwiLCAoX3JlcSwgcmVzKSA9PiB7XG4gICAgcmVzLmpzb24oe1xuICAgICAgc3RhdHVzOiBcIm9rXCIsXG4gICAgICBuYW1lOiBcIkRPREUgQUkgQ29yZVwiLFxuICAgICAgdmVyc2lvbjogXCIzLjAtTkVPTlwiLFxuICAgICAgaGFzS2V5OiBCb29sZWFuKHByb2Nlc3MuZW52LkdFTUlOSV9BUElfS0VZKSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gQ2hhdCBBUEkgKE5vbi1zdHJlYW1pbmcgJiBHcm91bmRpbmcpXG4gIGFwcC5wb3N0KFwiL2FwaS9jaGF0XCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IG1lc3NhZ2VzLCB1c2VTZWFyY2ggPSB0cnVlLCBtb2RlID0gXCJnZW5lcmFsXCIsIGN1c3RvbVN5c3RlbVByb21wdCB9ID0gcmVxLmJvZHk7XG5cbiAgICAgIGlmICghbWVzc2FnZXMgfHwgIUFycmF5LmlzQXJyYXkobWVzc2FnZXMpIHx8IG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJNZXNzYWdlcyBhcnJheSBpcyByZXF1aXJlZC5cIiB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWkgPSBnZXRBSSgpO1xuXG4gICAgICAvLyBGb3JtYXQgY29udmVyc2F0aW9uIGhpc3RvcnkgZm9yIEdlbWluaSBBUElcbiAgICAgIC8vIFRyYW5zZm9ybSBtZXNzYWdlcyBpbnRvIGNvbnRlbnRzIGZvcm1hdFxuICAgICAgY29uc3QgZm9ybWF0dGVkQ29udGVudHMgPSBtZXNzYWdlcy5tYXAoKG06IHsgcm9sZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmc7IGltYWdlQmFzZTY0Pzogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgY29uc3QgcGFydHM6IGFueVtdID0gW107XG4gICAgICAgIGlmIChtLmltYWdlQmFzZTY0KSB7XG4gICAgICAgICAgLy8gRXh0cmFjdCBtaW1lVHlwZSBpZiBwcmVzZW50XG4gICAgICAgICAgbGV0IG1pbWUgPSBcImltYWdlL3BuZ1wiO1xuICAgICAgICAgIGxldCBkYXRhID0gbS5pbWFnZUJhc2U2NDtcbiAgICAgICAgICBpZiAobS5pbWFnZUJhc2U2NC5zdGFydHNXaXRoKFwiZGF0YTpcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbS5pbWFnZUJhc2U2NC5tYXRjaCgvXmRhdGE6KFteO10rKTtiYXNlNjQsKC4rKSQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICBtaW1lID0gbWF0Y2hbMV07XG4gICAgICAgICAgICAgIGRhdGEgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICBpbmxpbmVEYXRhOiB7XG4gICAgICAgICAgICAgIG1pbWVUeXBlOiBtaW1lLFxuICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobS5jb250ZW50KSB7XG4gICAgICAgICAgcGFydHMucHVzaCh7IHRleHQ6IG0uY29udGVudCB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJvbGU6IG0ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwibW9kZWxcIiA6IFwidXNlclwiLFxuICAgICAgICAgIHBhcnRzLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGxldCBzeXN0ZW1JbnN0cnVjdGlvbiA9IGN1c3RvbVN5c3RlbVByb21wdCB8fCBERUZBVUxUX1NZU1RFTV9JTlNUUlVDVElPTjtcbiAgICAgIGlmIChtb2RlID09PSBcImNvZGVcIikge1xuICAgICAgICBzeXN0ZW1JbnN0cnVjdGlvbiArPSBcIlxcbkZvY3VzIGludGVuc2VseSBvbiBjb2RlIGdlbmVyYXRpb24sIHNvZnR3YXJlIGFyY2hpdGVjdHVyZSwgM0QgbWF0aCwgYW5kIGluc3RhbnQgZXhlY3V0YWJsZSBjb2RlLlwiO1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09PSBcInlvdXR1YmVcIikge1xuICAgICAgICBzeXN0ZW1JbnN0cnVjdGlvbiArPSBcIlxcbkZvY3VzIG9uIFlvdVR1YmUgY29udGVudCBhbmFseXNpcywgdmlkZW8gdHJhbnNjcmlwdHMsIGNoYW5uZWwgc3RyYXRlZ2llcywgdmlkZW8gc3VtbWFyaWVzLCBhbmQgY3JlYXRvciB3b3JrZmxvd3MuXCI7XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT09IFwicmVzZWFyY2hcIikge1xuICAgICAgICBzeXN0ZW1JbnN0cnVjdGlvbiArPSBcIlxcbkZvY3VzIG9uIGRlZXAgd2ViL2Jyb3dzZXIgcmVzZWFyY2gsIHN0cnVjdHVyZWQgY2l0YXRpb25zLCBmYWN0IHZlcmlmaWNhdGlvbiwgYW5kIGxpdmUgd29ybGQgaW5mb3JtYXRpb24uXCI7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvb2xzOiBhbnlbXSA9IFtdO1xuICAgICAgaWYgKHVzZVNlYXJjaCkge1xuICAgICAgICB0b29scy5wdXNoKHsgZ29vZ2xlU2VhcmNoOiB7fSB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZmlnOiBhbnkgPSB7XG4gICAgICAgIHN5c3RlbUluc3RydWN0aW9uLFxuICAgICAgICB0ZW1wZXJhdHVyZTogMC43LFxuICAgICAgfTtcblxuICAgICAgaWYgKHRvb2xzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uZmlnLnRvb2xzID0gdG9vbHM7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYWkubW9kZWxzLmdlbmVyYXRlQ29udGVudCh7XG4gICAgICAgIG1vZGVsOiBcImdlbWluaS0zLjctZmxhc2hcIixcbiAgICAgICAgY29udGVudHM6IGZvcm1hdHRlZENvbnRlbnRzLFxuICAgICAgICBjb25maWcsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdGV4dCA9IHJlc3BvbnNlLnRleHQgfHwgXCJObyByZXNwb25zZSBnZW5lcmF0ZWQuXCI7XG4gICAgICBcbiAgICAgIC8vIEV4dHJhY3QgZ3JvdW5kaW5nIG1ldGFkYXRhIGlmIGF2YWlsYWJsZVxuICAgICAgY29uc3QgZ3JvdW5kaW5nQ2h1bmtzID0gKHJlc3BvbnNlLmNhbmRpZGF0ZXM/LlswXSBhcyBhbnkpPy5ncm91bmRpbmdNZXRhZGF0YT8uZ3JvdW5kaW5nQ2h1bmtzIHx8IFtdO1xuICAgICAgY29uc3Qgd2ViU291cmNlcyA9IGdyb3VuZGluZ0NodW5rc1xuICAgICAgICAubWFwKChjaHVuazogYW55KSA9PiBjaHVuay53ZWIpXG4gICAgICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAgICAgLm1hcCgod2ViOiBhbnkpID0+ICh7XG4gICAgICAgICAgdGl0bGU6IHdlYi50aXRsZSB8fCBcIldlYiBTb3VyY2VcIixcbiAgICAgICAgICB1cmk6IHdlYi51cmkgfHwgXCIjXCIsXG4gICAgICAgIH0pKTtcblxuICAgICAgY29uc3Qgc2VhcmNoUXVlcmllcyA9IChyZXNwb25zZS5jYW5kaWRhdGVzPy5bMF0gYXMgYW55KT8uZ3JvdW5kaW5nTWV0YWRhdGE/LndlYlNlYXJjaFF1ZXJpZXMgfHwgW107XG5cbiAgICAgIHJlcy5qc29uKHtcbiAgICAgICAgcmVwbHk6IHRleHQsXG4gICAgICAgIHNvdXJjZXM6IHdlYlNvdXJjZXMsXG4gICAgICAgIHNlYXJjaFF1ZXJpZXMsXG4gICAgICAgIG1vZGVsOiBcImdlbWluaS0zLjctZmxhc2hcIixcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJDaGF0IEFQSSBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oe1xuICAgICAgICBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBwcm9jZXNzIEFJIGNoYXQgcXVlcnkuXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFN0cmVhbWluZyBDaGF0IEFQSSAoU1NFKVxuICBhcHAucG9zdChcIi9hcGkvY2hhdC9zdHJlYW1cIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgbWVzc2FnZXMsIHVzZVNlYXJjaCA9IHRydWUsIG1vZGUgPSBcImdlbmVyYWxcIiwgY3VzdG9tU3lzdGVtUHJvbXB0IH0gPSByZXEuYm9keTtcblxuICAgICAgaWYgKCFtZXNzYWdlcyB8fCAhQXJyYXkuaXNBcnJheShtZXNzYWdlcykpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3I6IFwiTWVzc2FnZXMgYXJyYXkgaXMgcmVxdWlyZWQuXCIgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFpID0gZ2V0QUkoKTtcblxuICAgICAgY29uc3QgZm9ybWF0dGVkQ29udGVudHMgPSBtZXNzYWdlcy5tYXAoKG06IHsgcm9sZTogc3RyaW5nOyBjb250ZW50OiBzdHJpbmc7IGltYWdlQmFzZTY0Pzogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgY29uc3QgcGFydHM6IGFueVtdID0gW107XG4gICAgICAgIGlmIChtLmltYWdlQmFzZTY0KSB7XG4gICAgICAgICAgbGV0IG1pbWUgPSBcImltYWdlL3BuZ1wiO1xuICAgICAgICAgIGxldCBkYXRhID0gbS5pbWFnZUJhc2U2NDtcbiAgICAgICAgICBpZiAobS5pbWFnZUJhc2U2NC5zdGFydHNXaXRoKFwiZGF0YTpcIikpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gbS5pbWFnZUJhc2U2NC5tYXRjaCgvXmRhdGE6KFteO10rKTtiYXNlNjQsKC4rKSQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICBtaW1lID0gbWF0Y2hbMV07XG4gICAgICAgICAgICAgIGRhdGEgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcGFydHMucHVzaCh7XG4gICAgICAgICAgICBpbmxpbmVEYXRhOiB7XG4gICAgICAgICAgICAgIG1pbWVUeXBlOiBtaW1lLFxuICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobS5jb250ZW50KSB7XG4gICAgICAgICAgcGFydHMucHVzaCh7IHRleHQ6IG0uY29udGVudCB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJvbGU6IG0ucm9sZSA9PT0gXCJhc3Npc3RhbnRcIiA/IFwibW9kZWxcIiA6IFwidXNlclwiLFxuICAgICAgICAgIHBhcnRzLFxuICAgICAgICB9O1xuICAgICAgfSk7XG5cbiAgICAgIGxldCBzeXN0ZW1JbnN0cnVjdGlvbiA9IGN1c3RvbVN5c3RlbVByb21wdCB8fCBERUZBVUxUX1NZU1RFTV9JTlNUUlVDVElPTjtcbiAgICAgIGlmIChtb2RlID09PSBcImNvZGVcIikge1xuICAgICAgICBzeXN0ZW1JbnN0cnVjdGlvbiArPSBcIlxcbkZvY3VzIGludGVuc2VseSBvbiBjb2RlIGdlbmVyYXRpb24sIHNvZnR3YXJlIGFyY2hpdGVjdHVyZSwgM0QgbWF0aCwgYW5kIGluc3RhbnQgZXhlY3V0YWJsZSBjb2RlLlwiO1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09PSBcInlvdXR1YmVcIikge1xuICAgICAgICBzeXN0ZW1JbnN0cnVjdGlvbiArPSBcIlxcbkZvY3VzIG9uIFlvdVR1YmUgY29udGVudCBhbmFseXNpcywgdmlkZW8gdHJhbnNjcmlwdHMsIGNoYW5uZWwgc3RyYXRlZ2llcywgdmlkZW8gc3VtbWFyaWVzLCBhbmQgY3JlYXRvciB3b3JrZmxvd3MuXCI7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvb2xzOiBhbnlbXSA9IFtdO1xuICAgICAgaWYgKHVzZVNlYXJjaCkge1xuICAgICAgICB0b29scy5wdXNoKHsgZ29vZ2xlU2VhcmNoOiB7fSB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZmlnOiBhbnkgPSB7XG4gICAgICAgIHN5c3RlbUluc3RydWN0aW9uLFxuICAgICAgICB0ZW1wZXJhdHVyZTogMC43LFxuICAgICAgfTtcblxuICAgICAgaWYgKHRvb2xzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uZmlnLnRvb2xzID0gdG9vbHM7XG4gICAgICB9XG5cbiAgICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJ0ZXh0L2V2ZW50LXN0cmVhbVwiKTtcbiAgICAgIHJlcy5zZXRIZWFkZXIoXCJDYWNoZS1Db250cm9sXCIsIFwibm8tY2FjaGVcIik7XG4gICAgICByZXMuc2V0SGVhZGVyKFwiQ29ubmVjdGlvblwiLCBcImtlZXAtYWxpdmVcIik7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlU3RyZWFtID0gYXdhaXQgYWkubW9kZWxzLmdlbmVyYXRlQ29udGVudFN0cmVhbSh7XG4gICAgICAgIG1vZGVsOiBcImdlbWluaS0zLjctZmxhc2hcIixcbiAgICAgICAgY29udGVudHM6IGZvcm1hdHRlZENvbnRlbnRzLFxuICAgICAgICBjb25maWcsXG4gICAgICB9KTtcblxuICAgICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiByZXNwb25zZVN0cmVhbSkge1xuICAgICAgICBjb25zdCBjaHVua1RleHQgPSBjaHVuay50ZXh0IHx8IFwiXCI7XG4gICAgICAgIHJlcy53cml0ZShgZGF0YTogJHtKU09OLnN0cmluZ2lmeSh7IHRleHQ6IGNodW5rVGV4dCB9KX1cXG5cXG5gKTtcbiAgICAgIH1cblxuICAgICAgcmVzLndyaXRlKGBkYXRhOiAke0pTT04uc3RyaW5naWZ5KHsgZG9uZTogdHJ1ZSB9KX1cXG5cXG5gKTtcbiAgICAgIHJlcy5lbmQoKTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiU3RyZWFtIEFQSSBlcnJvcjpcIiwgZXJyb3IpO1xuICAgICAgaWYgKCFyZXMuaGVhZGVyc1NlbnQpIHtcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCBcIlN0cmVhbWluZyBmYWlsZWQuXCIgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXMud3JpdGUoYGRhdGE6ICR7SlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogZXJyb3IubWVzc2FnZSB8fCBcIlN0cmVhbWluZyBlcnJvci5cIiB9KX1cXG5cXG5gKTtcbiAgICAgICAgcmVzLmVuZCgpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgLy8gQUkgSW1hZ2UgR2VuZXJhdGlvbiBFbmRwb2ludFxuICBhcHAucG9zdChcIi9hcGkvaW1hZ2UvZ2VuZXJhdGVcIiwgYXN5bmMgKHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcHJvbXB0LCBhc3BlY3RSYXRpbyA9IFwiMToxXCIsIHN0eWxlID0gXCJuZW9uLWN5YmVycHVua1wiIH0gPSByZXEuYm9keTtcblxuICAgICAgaWYgKCFwcm9tcHQgfHwgdHlwZW9mIHByb21wdCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJQcm9tcHQgaXMgcmVxdWlyZWQuXCIgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFpID0gZ2V0QUkoKTtcblxuICAgICAgbGV0IGVuaGFuY2VkUHJvbXB0ID0gcHJvbXB0O1xuICAgICAgaWYgKHN0eWxlID09PSBcIm5lb24tY3liZXJwdW5rXCIpIHtcbiAgICAgICAgZW5oYW5jZWRQcm9tcHQgPSBgJHtwcm9tcHR9LCBuZW9uIGdsb3dpbmcgYWVzdGhldGljLCBjeWJlcnB1bmsgZnV0dXJpc3RpYyBsaWdodGluZywgdmlicmFudCBjeWFuIGFuZCBlbGVjdHJpYyB2aW9sZXQgaHVlcywgaGlnaCBkZXRhaWwgOGsgb2N0YW5lcmVuZGVyYDtcbiAgICAgIH0gZWxzZSBpZiAoc3R5bGUgPT09IFwiM2QtcmVuZGVyXCIpIHtcbiAgICAgICAgZW5oYW5jZWRQcm9tcHQgPSBgJHtwcm9tcHR9LCBzdHlsaXplZCAzZCByZW5kZXIsIGJsZW5kZXIgb2N0YW5lIHJlbmRlciwgcmF5dHJhY2VkIGdsYXNzIGFuZCBtZXRhbGxpYyBtYXRlcmlhbHMsIGdsb3dpbmcgYW1iaWVudCBvY2NsdXNpb24sIGNyaXNwIDRrYDtcbiAgICAgIH0gZWxzZSBpZiAoc3R5bGUgPT09IFwiaG9sb2dyYW1cIikge1xuICAgICAgICBlbmhhbmNlZFByb21wdCA9IGAke3Byb21wdH0sIGdsb3dpbmcgaG9sb2dyYXBoaWMgc2NpLWZpIHByb2plY3Rpb24sIHRyYW5zbHVjZW50IHdpcmVmcmFtZSBwYXJ0aWNsZXMsIG5lb24gYmx1ZSBhbmQgdmlvbGV0IGdyaWQsIHZvbHVtZXRyaWMgbHVtaW5lc2NlbmNlYDtcbiAgICAgIH0gZWxzZSBpZiAoc3R5bGUgPT09IFwicGhvdG9yZWFsaXN0aWNcIikge1xuICAgICAgICBlbmhhbmNlZFByb21wdCA9IGAke3Byb21wdH0sIGhpZ2ggZmlkZWxpdHkgdWx0cmEtcmVhbGlzdGljIHBob3RvZ3JhcGh5LCBjaW5lbWF0aWMgbGlnaHRpbmcsIDg1bW0gbGVucywgc2hhcnAgZm9jdXMsIDhrIHJlc29sdXRpb25gO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFpLm1vZGVscy5nZW5lcmF0ZUNvbnRlbnQoe1xuICAgICAgICAgIG1vZGVsOiBcImdlbWluaS0zLjEtZmxhc2gtaW1hZ2VcIixcbiAgICAgICAgICBjb250ZW50czoge1xuICAgICAgICAgICAgcGFydHM6IFt7IHRleHQ6IGVuaGFuY2VkUHJvbXB0IH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgICBpbWFnZUNvbmZpZzoge1xuICAgICAgICAgICAgICBhc3BlY3RSYXRpbzogYXNwZWN0UmF0aW8gYXMgYW55LFxuICAgICAgICAgICAgICBpbWFnZVNpemU6IFwiMUtcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGltYWdlVXJsOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgICAgICAgbGV0IG1pbWVUeXBlID0gXCJpbWFnZS9wbmdcIjtcblxuICAgICAgICBpZiAocmVzcG9uc2UuY2FuZGlkYXRlcz8uWzBdPy5jb250ZW50Py5wYXJ0cykge1xuICAgICAgICAgIGZvciAoY29uc3QgcGFydCBvZiByZXNwb25zZS5jYW5kaWRhdGVzWzBdLmNvbnRlbnQucGFydHMpIHtcbiAgICAgICAgICAgIGlmIChwYXJ0LmlubGluZURhdGEgJiYgcGFydC5pbmxpbmVEYXRhLmRhdGEpIHtcbiAgICAgICAgICAgICAgbWltZVR5cGUgPSBwYXJ0LmlubGluZURhdGEubWltZVR5cGUgfHwgXCJpbWFnZS9wbmdcIjtcbiAgICAgICAgICAgICAgaW1hZ2VVcmwgPSBgZGF0YToke21pbWVUeXBlfTtiYXNlNjQsJHtwYXJ0LmlubGluZURhdGEuZGF0YX1gO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWltYWdlVXJsKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgICAgICAgIGVycm9yOiBcIk1vZGVsIGRpZCBub3QgcmV0dXJuIGFuIGltYWdlLiBUcnkgcmVmaW5pbmcgeW91ciBwcm9tcHQuXCIsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXMuanNvbih7XG4gICAgICAgICAgaW1hZ2VVcmwsXG4gICAgICAgICAgZW5oYW5jZWRQcm9tcHQsXG4gICAgICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoaW5uZXJFcnI6IGFueSkge1xuICAgICAgICAvLyBUcnkgZmFsbGJhY2sgdG8gZ2VtaW5pLTMuMS1mbGFzaC1saXRlLWltYWdlIGlmIHByby9mbGFzaCBpbWFnZSBpcyByZXN0cmljdGVkXG4gICAgICAgIGNvbnNvbGUud2FybihcIlByaW1hcnkgaW1hZ2UgZ2VuZXJhdGlvbiBmYWlsZWQsIGF0dGVtcHRpbmcgZmFsbGJhY2s6XCIsIGlubmVyRXJyLm1lc3NhZ2UpO1xuICAgICAgICBjb25zdCBmYWxsYmFja1Jlc3BvbnNlID0gYXdhaXQgYWkubW9kZWxzLmdlbmVyYXRlQ29udGVudCh7XG4gICAgICAgICAgbW9kZWw6IFwiZ2VtaW5pLTMuMS1mbGFzaC1saXRlLWltYWdlXCIsXG4gICAgICAgICAgY29udGVudHM6IHtcbiAgICAgICAgICAgIHBhcnRzOiBbeyB0ZXh0OiBlbmhhbmNlZFByb21wdCB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgaW1hZ2VVcmw6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICAgICAgICBpZiAoZmFsbGJhY2tSZXNwb25zZS5jYW5kaWRhdGVzPy5bMF0/LmNvbnRlbnQ/LnBhcnRzKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBwYXJ0IG9mIGZhbGxiYWNrUmVzcG9uc2UuY2FuZGlkYXRlc1swXS5jb250ZW50LnBhcnRzKSB7XG4gICAgICAgICAgICBpZiAocGFydC5pbmxpbmVEYXRhICYmIHBhcnQuaW5saW5lRGF0YS5kYXRhKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG1pbWUgPSBwYXJ0LmlubGluZURhdGEubWltZVR5cGUgfHwgXCJpbWFnZS9wbmdcIjtcbiAgICAgICAgICAgICAgaW1hZ2VVcmwgPSBgZGF0YToke21pbWV9O2Jhc2U2NCwke3BhcnQuaW5saW5lRGF0YS5kYXRhfWA7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbWFnZVVybCkge1xuICAgICAgICAgIHJldHVybiByZXMuanNvbih7XG4gICAgICAgICAgICBpbWFnZVVybCxcbiAgICAgICAgICAgIGVuaGFuY2VkUHJvbXB0LFxuICAgICAgICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgaW5uZXJFcnI7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkltYWdlIGdlbmVyYXRpb24gZXJyb3I6XCIsIGVycm9yKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgXCJGYWlsZWQgdG8gZ2VuZXJhdGUgQUkgaW1hZ2UuXCIsXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFRUUyBTcGVlY2ggR2VuZXJhdGlvbiBFbmRwb2ludFxuICBhcHAucG9zdChcIi9hcGkvdHRzXCIsIGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHRleHQsIHZvaWNlID0gXCJaZXBoeXJcIiB9ID0gcmVxLmJvZHk7XG5cbiAgICAgIGlmICghdGV4dCB8fCB0eXBlb2YgdGV4dCAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogXCJUZXh0IGlzIHJlcXVpcmVkIGZvciBUVFMuXCIgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRydW5jYXRlIHRleHQgZm9yIFRUUyB0byBmaXJzdCA0MDAgY2hhcmFjdGVycyBmb3IgaW5zdGFudCBsb3ctbGF0ZW5jeSBzcGVlY2ggcmVzcG9uc2VcbiAgICAgIGNvbnN0IGNsZWFuVGV4dCA9IHRleHQucmVwbGFjZSgvWyojYF9cXFtcXF0oKV0vZywgXCJcIikuc2xpY2UoMCwgNDAwKTtcblxuICAgICAgY29uc3QgYWkgPSBnZXRBSSgpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhaS5tb2RlbHMuZ2VuZXJhdGVDb250ZW50KHtcbiAgICAgICAgbW9kZWw6IFwiZ2VtaW5pLTMuMS1mbGFzaC10dHMtcHJldmlld1wiLFxuICAgICAgICBjb250ZW50czogW3sgcGFydHM6IFt7IHRleHQ6IGNsZWFuVGV4dCB9XSB9XSxcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgcmVzcG9uc2VNb2RhbGl0aWVzOiBbTW9kYWxpdHkuQVVESU9dLFxuICAgICAgICAgIHNwZWVjaENvbmZpZzoge1xuICAgICAgICAgICAgdm9pY2VDb25maWc6IHtcbiAgICAgICAgICAgICAgcHJlYnVpbHRWb2ljZUNvbmZpZzogeyB2b2ljZU5hbWU6IHZvaWNlIHx8IFwiWmVwaHlyXCIgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBiYXNlNjRBdWRpbyA9IHJlc3BvbnNlLmNhbmRpZGF0ZXM/LlswXT8uY29udGVudD8ucGFydHM/LlswXT8uaW5saW5lRGF0YT8uZGF0YTtcbiAgICAgIGlmIChiYXNlNjRBdWRpbykge1xuICAgICAgICByZXMuanNvbih7IGF1ZGlvOiBiYXNlNjRBdWRpbywgZm9ybWF0OiBcInBjbTI0a1wiIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogXCJObyBhdWRpbyBnZW5lcmF0ZWQgZnJvbSBUVFMgbW9kZWwuXCIgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgY29uc29sZS53YXJuKFwiVFRTIEFQSSB3YXJuaW5nOlwiLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtcbiAgICAgICAgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgXCJUVFMgc2VydmljZSB1bmF2YWlsYWJsZS4gRmFsbGJhY2sgdG8gV2ViIFNwZWVjaC5cIixcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gRG93bmxvYWQgY29tcGxldGUgcHJvamVjdCBaSVAgZW5kcG9pbnRcbiAgYXBwLmdldChcIi9hcGkvZG93bmxvYWQtemlwXCIsIChyZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBhcmNoaXZlID0gYXJjaGl2ZXIoXCJ6aXBcIiwgeyB6bGliOiB7IGxldmVsOiA5IH0gfSk7XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IGBkb2RlLWFpLXNvdXJjZS0ke0RhdGUubm93KCl9LnppcGA7XG5cbiAgICAgIHJlcy5hdHRhY2htZW50KGZpbGVuYW1lKTtcbiAgICAgIHJlcy5zZXRIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi96aXBcIik7XG5cbiAgICAgIGFyY2hpdmUub24oXCJlcnJvclwiLCAoZXJyOiBhbnkpID0+IHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkFyY2hpdmUgZXJyb3I6XCIsIGVycik7XG4gICAgICAgIGlmICghcmVzLmhlYWRlcnNTZW50KSB7XG4gICAgICAgICAgcmVzLnN0YXR1cyg1MDApLnNlbmQoeyBlcnJvcjogZXJyLm1lc3NhZ2UgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBhcmNoaXZlLnBpcGUocmVzKTtcblxuICAgICAgY29uc3Qgcm9vdERpciA9IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAgIC8vIEFkZCBmaWxlcyBhbmQgZGlyZWN0b3JpZXMgaWdub3Jpbmcgbm9kZV9tb2R1bGVzLCBkaXN0LCAuZ2l0XG4gICAgICBhcmNoaXZlLmdsb2IoXCIqKi8qXCIsIHtcbiAgICAgICAgY3dkOiByb290RGlyLFxuICAgICAgICBpZ25vcmU6IFtcIm5vZGVfbW9kdWxlcy8qKlwiLCBcImRpc3QvKipcIiwgXCIuZ2l0LyoqXCIsIFwiLmFpc3R1ZGlvLyoqXCIsIFwiKi5sb2dcIl0sXG4gICAgICAgIGRvdDogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICBhcmNoaXZlLmZpbmFsaXplKCk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJaaXAgZ2VuZXJhdGlvbiBlcnJvcjpcIiwgZXJyKTtcbiAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IFwiRmFpbGVkIHRvIGdlbmVyYXRlIFpJUCBhcmNoaXZlLlwiIH0pO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gVml0ZSBtaWRkbGV3YXJlIGZvciBkZXZlbG9wbWVudCB2cyBzdGF0aWMgYnVpbGQgaW4gcHJvZHVjdGlvblxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgY29uc3Qgdml0ZSA9IGF3YWl0IGNyZWF0ZVZpdGVTZXJ2ZXIoe1xuICAgICAgc2VydmVyOiB7IG1pZGRsZXdhcmVNb2RlOiB0cnVlIH0sXG4gICAgICBhcHBUeXBlOiBcInNwYVwiLFxuICAgIH0pO1xuICAgIGFwcC51c2Uodml0ZS5taWRkbGV3YXJlcyk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGlzdFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJkaXN0XCIpO1xuICAgIGFwcC51c2UoZXhwcmVzcy5zdGF0aWMoZGlzdFBhdGgpKTtcbiAgICBhcHAuZ2V0KFwiKlwiLCAoX3JlcSwgcmVzKSA9PiB7XG4gICAgICByZXMuc2VuZEZpbGUocGF0aC5qb2luKGRpc3RQYXRoLCBcImluZGV4Lmh0bWxcIikpO1xuICAgIH0pO1xuICB9XG5cbiAgYXBwLmxpc3RlbihQT1JULCBcIjAuMC4wLjBcIiwgKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGDimqEgRE9ERSBBSSBRdWFudHVtIFNlcnZlciBhY3RpdmUgb24gaHR0cDovLzAuMC4wLjA6JHtQT1JUfWApO1xuICB9KTtcbn1cblxuc3RhcnRTZXJ2ZXIoKTtcbiJdLCJmaWxlIjoiL2FwcC9hcHBsZXQvc2VydmVyLnRzIn0=