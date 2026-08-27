import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=df3e6907"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=df3e6907"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"];
import {
  Send,
  Mic,
  MicOff,
  Paperclip,
  Globe,
  Menu,
  X,
  VolumeX,
  Wand2,
  Radio,
  Zap,
  Download,
  FileArchive
} from "/node_modules/.vite/deps/lucide-react.js?v=df3e6907";
import { NeonCore3D } from "/src/components/NeonCore3D.tsx";
import { ChatMessage } from "/src/components/ChatMessage.tsx";
import { Sidebar } from "/src/components/Sidebar.tsx";
import { QuickPrompts } from "/src/components/QuickPrompts.tsx";
import { ImageCreationStudio } from "/src/components/ImageCreationStudio.tsx";
import { Live3DViewerModal } from "/src/components/Live3DViewerModal.tsx";
import {
  createSpeechRecognizer,
  speakWithBrowser,
  stopAllSpeech,
  playPcmAudio
} from "/src/utils/speech.ts";
const STORAGE_KEY_SESSIONS = "dode_ai_sessions_v1";
const STORAGE_KEY_THEME = "dode_ai_theme_v1";
const STORAGE_KEY_MODEL3D = "dode_ai_model3d_v1";
const STORAGE_KEY_VOICE = "dode_ai_voice_v1";
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showImageStudio, setShowImageStudio] = useState(false);
  const [activeMode, setActiveMode] = useState("general");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_THEME) || "cyan-core";
  });
  const [model3DType, setModel3DType] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_MODEL3D) || "dodecahedron";
  });
  const [useSearch, setUseSearch] = useState(true);
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to load sessions:", e);
    }
    const initialId = "sess_" + Date.now();
    return [
      {
        id: initialId,
        title: "Quantum Genesis",
        mode: "general",
        messages: [
          {
            id: "msg_welcome",
            role: "assistant",
            content: `### ⚡ Greetings, Operator. I am **DODE AI**.
I am your hyper-velocity, cyber-quantum AI assistant equipped with **real-time world search grounding**, **live YouTube and web data analysis**, **3D Three.js mesh generation**, **voice command synchronization**, and **neural image synthesis**.

#### What shall we explore or construct today?
- Ask any live world event, breaking tech news, or research question.
- Request 3D model code or interactive web applications.
- Speak directly via microphone using the voice interface.
- Synthesize custom cyberpunk AI imagery in the Vision Studio.`,
            timestamp: Date.now()
          }
        ],
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
    ];
  });
  const [currentSessionId, setCurrentSessionId] = useState(() => {
    return sessions[0]?.id || "sess_default";
  });
  const currentSession = sessions.find((s) => s.id === currentSessionId) || sessions[0];
  const messages = currentSession ? currentSession.messages : [];
  const [inputPrompt, setInputPrompt] = useState("");
  const [attachedImage, setAttachedImage] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState(null);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const speechRecognizerRef = useRef(null);
  const stopSpeechRef = useRef(null);
  const handleDownloadZip = async () => {
    setDownloadingZip(true);
    try {
      const response = await fetch("/api/download-zip");
      if (response.ok) {
        const blob = await response.blob();
        const { saveAs } = await import('/node_modules/.vite/deps/file-saver.js?v=df3e6907').then(m => ((m) => m?.__esModule ? m : { ...typeof m === "object" && !Array.isArray(m) || typeof m === "function" ? m : {}, default: m })(m.default));
        saveAs(blob, `dode-ai-source-${Date.now()}.zip`);
      } else {
        throw new Error("Server zip failed, using client fallback");
      }
    } catch (err) {
      console.warn("Using client-side zip fallback:", err);
      try {
        const { downloadProjectZipClientSide } = await import("/src/utils/zipBundle.ts");
        await downloadProjectZipClientSide();
      } catch (clientErr) {
        console.error("Client zip download error:", clientErr);
        window.open("/api/download-zip", "_blank");
      }
    } finally {
      setDownloadingZip(false);
    }
  };
  const [voiceConfig, setVoiceConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VOICE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
    }
    return {
      enabled: true,
      autoSpeak: false,
      voiceName: "Zephyr",
      rate: 1.05,
      pitch: 1
    };
  });
  const [codeModal, setCodeModal] = useState({
    isOpen: false,
    code: "",
    language: "javascript"
  });
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
  }, [sessions]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MODEL3D, model3DType);
  }, [model3DType]);
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_VOICE, JSON.stringify(voiceConfig));
  }, [voiceConfig]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText, isThinking]);
  useEffect(() => {
    const recognizer = createSpeechRecognizer(
      (transcript, isFinal) => {
        setInputPrompt((prev) => {
          if (isFinal) {
            return prev ? `${prev} ${transcript}` : transcript;
          }
          return transcript;
        });
      },
      (error) => {
        console.warn("Speech recognition error:", error);
        setIsListening(false);
      },
      () => {
        setIsListening(false);
      }
    );
    speechRecognizerRef.current = recognizer;
    return () => {
      if (speechRecognizerRef.current) {
        try {
          speechRecognizerRef.current.stop();
        } catch (e) {
        }
      }
      stopAllSpeech();
    };
  }, []);
  const toggleListening = () => {
    if (!speechRecognizerRef.current) {
      alert("Speech recognition is not supported on your browser or device.");
      return;
    }
    if (isListening) {
      speechRecognizerRef.current.stop();
      setIsListening(false);
    } else {
      try {
        speechRecognizerRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  };
  const handleSpeak = async (text, msgId) => {
    stopAllSpeech();
    if (stopSpeechRef.current) {
      stopSpeechRef.current();
      stopSpeechRef.current = null;
    }
    setIsSpeaking(true);
    if (msgId) setSpeakingMessageId(msgId);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice: voiceConfig.voiceName
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.audio) {
          const cancelFn = await playPcmAudio(data.audio);
          stopSpeechRef.current = () => {
            cancelFn();
            setIsSpeaking(false);
            setSpeakingMessageId(null);
          };
          return;
        }
      }
    } catch (e) {
      console.warn("Gemini TTS fallback to Web Speech:", e);
    }
    const cancelBrowserSpeak = speakWithBrowser(
      text,
      voiceConfig.voiceName,
      voiceConfig.rate,
      voiceConfig.pitch,
      () => setIsSpeaking(true),
      () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
      },
      () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
      }
    );
    stopSpeechRef.current = () => {
      cancelBrowserSpeak();
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };
  };
  const handleStopSpeak = () => {
    if (stopSpeechRef.current) {
      stopSpeechRef.current();
      stopSpeechRef.current = null;
    }
    stopAllSpeech();
    setIsSpeaking(false);
    setSpeakingMessageId(null);
  };
  const handleNewSession = (mode = activeMode) => {
    const newSessionId = "sess_" + Date.now();
    const newSession = {
      id: newSessionId,
      title: "Quantum Query " + (sessions.length + 1),
      mode,
      messages: [
        {
          id: "msg_init_" + Date.now(),
          role: "assistant",
          content: `⚡ **DODE AI Initialized** in **${mode.toUpperCase()}** protocol.
World data live grounding active. How can I assist your operations?`,
          timestamp: Date.now()
        }
      ],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSessionId);
    setShowImageStudio(false);
  };
  const handleDeleteSession = (id, e) => {
    e.stopPropagation();
    const filtered = sessions.filter((s) => s.id !== id);
    if (filtered.length === 0) {
      const resetId = "sess_" + Date.now();
      const resetSession = {
        id: resetId,
        title: "Quantum Genesis",
        mode: "general",
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      setSessions([resetSession]);
      setCurrentSessionId(resetId);
    } else {
      setSessions(filtered);
      if (currentSessionId === id) {
        setCurrentSessionId(filtered[0].id);
      }
    }
  };
  const handleSendMessage = async (customText, modeOverride) => {
    const textToSend = (customText !== void 0 ? customText : inputPrompt).trim();
    if (!textToSend && !attachedImage) return;
    const currentMode = modeOverride || activeMode;
    const userMsg = {
      id: "usr_" + Date.now(),
      role: "user",
      content: textToSend,
      timestamp: Date.now(),
      imageBase64: attachedImage || void 0
    };
    const updatedMessages = [...messages, userMsg];
    const sessionTitle = messages.length <= 1 ? textToSend.slice(0, 30) || "Quantum Discussion" : currentSession.title;
    setSessions(
      (prev) => prev.map(
        (s) => s.id === currentSessionId ? {
          ...s,
          title: sessionTitle,
          mode: currentMode,
          messages: updatedMessages,
          updatedAt: Date.now()
        } : s
      )
    );
    setInputPrompt("");
    setAttachedImage(null);
    setIsThinking(true);
    setStreamingText("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          useSearch,
          mode: currentMode
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to retrieve AI intelligence.");
      }
      const assistantMsg = {
        id: "ast_" + Date.now(),
        role: "assistant",
        content: data.reply || "No response received.",
        timestamp: Date.now(),
        sources: data.sources || [],
        searchQueries: data.searchQueries || []
      };
      setSessions(
        (prev) => prev.map(
          (s) => s.id === currentSessionId ? {
            ...s,
            messages: [...updatedMessages, assistantMsg],
            updatedAt: Date.now()
          } : s
        )
      );
      if (voiceConfig.autoSpeak && data.reply) {
        handleSpeak(data.reply, assistantMsg.id);
      }
    } catch (err) {
      console.error("Chat failure:", err);
      const errorMsg = {
        id: "err_" + Date.now(),
        role: "assistant",
        content: `⚠️ **Transmission Anomaly**: ${err.message || "Failed to connect with DODE AI Core."}
Please try again or verify network integrity.`,
        timestamp: Date.now()
      };
      setSessions(
        (prev) => prev.map(
          (s) => s.id === currentSessionId ? { ...s, messages: [...updatedMessages, errorMsg] } : s
        )
      );
    } finally {
      setIsThinking(false);
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAttachedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleOpenCodePreview = (code, language) => {
    setCodeModal({
      isOpen: true,
      code,
      language
    });
  };
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      id: "dode-ai-app-root",
      className: "flex h-screen w-full bg-[#04060f] text-slate-100 overflow-hidden font-sans select-text cyber-grid",
      children: [
        /* @__PURE__ */ jsxDEV(
          Sidebar,
          {
            isOpen: sidebarOpen,
            onClose: () => setSidebarOpen(false),
            sessions,
            currentSessionId,
            onSelectSession: (id) => {
              setCurrentSessionId(id);
              setShowImageStudio(false);
            },
            onNewSession: handleNewSession,
            onDeleteSession: handleDeleteSession,
            activeMode,
            onChangeMode: (m) => {
              setActiveMode(m);
              if (m === "image") {
                setShowImageStudio(true);
              } else {
                setShowImageStudio(false);
              }
            },
            theme,
            onChangeTheme: setTheme,
            model3DType,
            onChangeModel3D: setModel3DType,
            voiceConfig,
            onUpdateVoiceConfig: (cfg) => setVoiceConfig((prev) => ({ ...prev, ...cfg })),
            onOpenImageStudio: () => setShowImageStudio(true)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 499,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("main", { className: "flex-1 flex flex-col h-full lg:ml-72 md:lg:ml-80 relative overflow-hidden bg-gradient-to-b from-[#050814]/90 to-[#03040a]", children: [
          /* @__PURE__ */ jsxDEV("header", { className: "h-16 px-4 md:px-6 border-b border-cyan-500/20 bg-[#050711]/80 backdrop-blur-md flex items-center justify-between z-30", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setSidebarOpen(true),
                  className: "lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-slate-700 rounded-xl",
                  title: "Open Navigation",
                  children: /* @__PURE__ */ jsxDEV(Menu, { className: "w-5 h-5" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 538,
                    columnNumber: 15
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 533,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse neon-glow-cyan" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 542,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("h2", { className: "font-cyber font-black text-sm md:text-base tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-100 to-blue-400", children: "DODE AI" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 543,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30", children: showImageStudio ? "VISION STUDIO" : activeMode.toUpperCase() }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 546,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 541,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 532,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 md:gap-3", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setUseSearch(!useSearch),
                  className: `flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${useSearch ? "bg-cyan-500/15 border-cyan-400 text-cyan-300 neon-glow-cyan" : "bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300"}`,
                  title: "Toggle Live Google Search & Web Grounding",
                  children: [
                    /* @__PURE__ */ jsxDEV(Globe, { className: `w-3.5 h-3.5 ${useSearch ? "text-cyan-400 animate-spin-slow" : "text-slate-500"}` }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 564,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "hidden md:inline", children: "Live Grounding" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 565,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `w-1.5 h-1.5 rounded-full ${useSearch ? "bg-emerald-400" : "bg-slate-600"}` }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 566,
                      columnNumber: 15
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 555,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setShowImageStudio(!showImageStudio),
                  className: `flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${showImageStudio ? "bg-fuchsia-500/20 border-fuchsia-400 text-fuchsia-300 neon-glow-magenta" : "bg-slate-900 border-slate-800 text-slate-300 hover:border-fuchsia-500/50 hover:text-fuchsia-300"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV(Wand2, { className: "w-3.5 h-3.5 text-fuchsia-400" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 578,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "AI Vision" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 579,
                      columnNumber: 15
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 570,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleDownloadZip,
                  disabled: downloadingZip,
                  className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cyan-500/40 bg-[#0c1730] hover:bg-cyan-950/80 text-cyan-300 text-xs font-semibold transition-all shadow-sm group",
                  title: "Download Full Project ZIP Codebase",
                  children: downloadingZip ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(FileArchive, { className: "w-3.5 h-3.5 text-cyan-400 animate-spin" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 591,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Packing..." }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 592,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 590,
                    columnNumber: 17
                  }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 596,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "ZIP Code" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 597,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 595,
                    columnNumber: 17
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 583,
                  columnNumber: 13
                },
                this
              ),
              isSpeaking && /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleStopSpeak,
                  className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 text-xs font-semibold animate-pulse",
                  title: "Stop Audio",
                  children: [
                    /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 609,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "hidden md:inline", children: "Mute Voice" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 610,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 604,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 553,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 531,
            columnNumber: 9
          }, this),
          showImageStudio ? /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-4 scrollbar-thin", children: /* @__PURE__ */ jsxDEV(
            ImageCreationStudio,
            {
              theme,
              onInsertToChat: (imageUrl, prompt) => {
                setShowImageStudio(false);
                setAttachedImage(imageUrl);
                setInputPrompt(`Analyze and expand upon this visual concept: "${prompt}"`);
              }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 619,
              columnNumber: 13
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 618,
            columnNumber: 11
          }, this) : /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col overflow-hidden relative", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-4 md:p-6 space-y-5 scrollbar-thin", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 p-4 md:p-6 rounded-2xl bg-gradient-to-r from-[#070c1d]/90 via-[#0a1228]/80 to-[#070c1d]/90 border border-cyan-500/30 shadow-2xl relative overflow-hidden neon-glow-cyan", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 cyber-grid opacity-30 pointer-events-none" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 635,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 z-10 text-center md:text-left flex-1", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-cyber", children: [
                    /* @__PURE__ */ jsxDEV(Radio, { className: "w-3 h-3 text-cyan-400 animate-ping" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 640,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "DODE QUANTUM CORE • READY" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 641,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 639,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("h3", { className: "font-cyber font-black text-lg md:text-xl text-slate-100 tracking-wide", children: "ALL-WORLD INTELLIGENCE & 3D SYNTHESIS" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 643,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 max-w-md leading-relaxed", children: "Voice-enabled, real-time Google search grounded assistant. Synthesizes live web data, YouTube intelligence, 3D code & neon visuals instantly." }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 646,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-cyan-400 border border-cyan-500/20", children: "Model: Gemini 3.7 Flash" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 652,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-emerald-400 border border-emerald-500/20", children: "Live Search: Active" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 655,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-fuchsia-400 border border-fuchsia-500/20", children: "WebGL: 60 FPS" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 658,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 651,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 638,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "w-48 h-48 md:w-56 md:h-56 relative flex-shrink-0 z-10", children: [
                  /* @__PURE__ */ jsxDEV(
                    NeonCore3D,
                    {
                      theme,
                      modelType: model3DType,
                      isThinking,
                      isSpeaking,
                      isListening,
                      compact: true,
                      className: "w-full h-full"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 666,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] font-mono text-center text-cyan-400/80 -mt-2", children: isListening ? "Listening to your voice..." : isThinking ? "Computing quantum layers..." : isSpeaking ? "Transmitting audio..." : "Hover or click to interact with 3D Core" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 675,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 665,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 633,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-4xl mx-auto space-y-4", children: [
                messages.map((msg) => /* @__PURE__ */ jsxDEV(
                  ChatMessage,
                  {
                    message: msg,
                    theme,
                    onSpeak: (text) => handleSpeak(text, msg.id),
                    onStopSpeak: handleStopSpeak,
                    isSpeakingThis: isSpeaking && speakingMessageId === msg.id,
                    onOpenCodePreview: handleOpenCodePreview
                  },
                  msg.id,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 690,
                    columnNumber: 19
                  },
                  this
                )),
                isThinking && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 p-4 rounded-2xl bg-[#080d1e]/80 border border-cyan-500/30 max-w-md animate-pulse", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-400 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-cyan-300 animate-spin-slow" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 705,
                    columnNumber: 23
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 704,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "font-cyber text-xs font-bold text-cyan-300 flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV("span", { children: "DODE AI IS COMPUTING" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 709,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "flex gap-1", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 711,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 712,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 713,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 710,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 708,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 font-mono", children: "Gathering world intelligence & synthesizing response..." }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 716,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 707,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 703,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { ref: messagesEndRef }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 723,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 688,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 631,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 md:p-6 bg-[#050711]/95 border-t border-cyan-500/20 backdrop-blur-md", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-4xl mx-auto space-y-3", children: [
              messages.length <= 2 && /* @__PURE__ */ jsxDEV(
                QuickPrompts,
                {
                  onSelectPrompt: (p, m) => {
                    setInputPrompt(p);
                    if (m) setActiveMode(m);
                  },
                  activeMode
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 732,
                  columnNumber: 19
                },
                this
              ),
              attachedImage && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 p-2 bg-[#090e1e] rounded-xl border border-cyan-500/30 w-fit", children: [
                /* @__PURE__ */ jsxDEV(
                  "img",
                  {
                    src: attachedImage,
                    alt: "Attachment",
                    className: "w-12 h-12 object-cover rounded-lg border border-cyan-500/40"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 744,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-300", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-semibold text-cyan-300", children: "Visual Attachment Active" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 750,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500", children: "Ready for Multimodal Analysis" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 751,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 749,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setAttachedImage(null),
                    className: "p-1 text-slate-400 hover:text-rose-400",
                    children: /* @__PURE__ */ jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 757,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 753,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 743,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center bg-[#070b18] border border-cyan-500/40 focus-within:border-cyan-400 rounded-2xl shadow-xl transition-all neon-glow-cyan", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => fileInputRef.current?.click(),
                    className: "p-3 text-slate-400 hover:text-cyan-300 transition-colors ml-1",
                    title: "Attach Image for AI Analysis",
                    children: /* @__PURE__ */ jsxDEV(Paperclip, { className: "w-5 h-5" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 770,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 765,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    ref: fileInputRef,
                    type: "file",
                    accept: "image/*",
                    onChange: handleImageUpload,
                    className: "hidden"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 772,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: toggleListening,
                    className: `p-3 transition-all rounded-xl ${isListening ? "bg-rose-500/20 text-rose-400 animate-pulse border border-rose-500/50" : "text-slate-400 hover:text-cyan-300"}`,
                    title: isListening ? "Listening... click to stop" : "Voice Input (Speech-to-Text)",
                    children: isListening ? /* @__PURE__ */ jsxDEV(MicOff, { className: "w-5 h-5 text-rose-400 animate-bounce" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 791,
                      columnNumber: 23
                    }, this) : /* @__PURE__ */ jsxDEV(Mic, { className: "w-5 h-5" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 793,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 781,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "textarea",
                  {
                    value: inputPrompt,
                    onChange: (e) => setInputPrompt(e.target.value),
                    onKeyDown: (e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    },
                    placeholder: isListening ? "Listening to voice input..." : activeMode === "code" ? "Ask DODE AI to write 3D code, Three.js shaders, APIs..." : activeMode === "youtube" ? "Ask for YouTube video analysis, transcripts, content ideas..." : "Ask DODE AI anything (world knowledge, live news, 3D math, code)...",
                    rows: 1,
                    className: "flex-1 bg-transparent py-3.5 px-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none resize-none max-h-32 font-sans"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 798,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleSendMessage(),
                    disabled: isThinking || !inputPrompt.trim() && !attachedImage,
                    className: `p-3 mr-1.5 rounded-xl transition-all ${isThinking || !inputPrompt.trim() && !attachedImage ? "text-slate-600 cursor-not-allowed" : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-md neon-glow-cyan active:scale-95"}`,
                    children: /* @__PURE__ */ jsxDEV(Send, { className: "w-4 h-4 fill-current stroke-[2.5]" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 830,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 821,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 763,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[10px] text-slate-500 px-2 font-mono", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "⚡ DODE AI v3.7 Cyber Core" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 837,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 838,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Press Enter to transmit" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 839,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 836,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 842,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Real-Time World & Web Grounding" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 843,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 841,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 835,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 729,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 728,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 629,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 529,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(
          Live3DViewerModal,
          {
            isOpen: codeModal.isOpen,
            onClose: () => setCodeModal((prev) => ({ ...prev, isOpen: false })),
            codeSnippet: codeModal.code,
            language: codeModal.language,
            theme
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 853,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 494,
      columnNumber: 5
    },
    this
  );
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgU2VuZCxcbiAgTWljLFxuICBNaWNPZmYsXG4gIFNwYXJrbGVzLFxuICBQYXBlcmNsaXAsXG4gIEdsb2JlLFxuICBZb3V0dWJlLFxuICBDb2RlMixcbiAgQ3B1LFxuICBNZW51LFxuICBYLFxuICBWb2x1bWUyLFxuICBWb2x1bWVYLFxuICBSZWZyZXNoQ3csXG4gIFdhbmQyLFxuICBCb3gsXG4gIEltYWdlIGFzIEltYWdlSWNvbixcbiAgU3RvcENpcmNsZSxcbiAgUmFkaW8sXG4gIFphcCxcbiAgRG93bmxvYWQsXG4gIEZpbGVBcmNoaXZlLFxufSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgY29uZmV0dGkgZnJvbSBcImNhbnZhcy1jb25mZXR0aVwiO1xuaW1wb3J0IHtcbiAgTWVzc2FnZSxcbiAgQ2hhdFNlc3Npb24sXG4gIEFJTW9kZSxcbiAgTmVvblRoZW1lLFxuICBNb2RlbDNEVHlwZSxcbiAgVm9pY2VDb25maWcsXG4gIFdlYlNvdXJjZSxcbn0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IE5lb25Db3JlM0QgfSBmcm9tIFwiLi9jb21wb25lbnRzL05lb25Db3JlM0RcIjtcbmltcG9ydCB7IENoYXRNZXNzYWdlIH0gZnJvbSBcIi4vY29tcG9uZW50cy9DaGF0TWVzc2FnZVwiO1xuaW1wb3J0IHsgU2lkZWJhciB9IGZyb20gXCIuL2NvbXBvbmVudHMvU2lkZWJhclwiO1xuaW1wb3J0IHsgUXVpY2tQcm9tcHRzIH0gZnJvbSBcIi4vY29tcG9uZW50cy9RdWlja1Byb21wdHNcIjtcbmltcG9ydCB7IEltYWdlQ3JlYXRpb25TdHVkaW8gfSBmcm9tIFwiLi9jb21wb25lbnRzL0ltYWdlQ3JlYXRpb25TdHVkaW9cIjtcbmltcG9ydCB7IExpdmUzRFZpZXdlck1vZGFsIH0gZnJvbSBcIi4vY29tcG9uZW50cy9MaXZlM0RWaWV3ZXJNb2RhbFwiO1xuaW1wb3J0IHtcbiAgY3JlYXRlU3BlZWNoUmVjb2duaXplcixcbiAgc3BlYWtXaXRoQnJvd3NlcixcbiAgc3RvcEFsbFNwZWVjaCxcbiAgcGxheVBjbUF1ZGlvLFxufSBmcm9tIFwiLi91dGlscy9zcGVlY2hcIjtcblxuY29uc3QgU1RPUkFHRV9LRVlfU0VTU0lPTlMgPSBcImRvZGVfYWlfc2Vzc2lvbnNfdjFcIjtcbmNvbnN0IFNUT1JBR0VfS0VZX1RIRU1FID0gXCJkb2RlX2FpX3RoZW1lX3YxXCI7XG5jb25zdCBTVE9SQUdFX0tFWV9NT0RFTDNEID0gXCJkb2RlX2FpX21vZGVsM2RfdjFcIjtcbmNvbnN0IFNUT1JBR0VfS0VZX1ZPSUNFID0gXCJkb2RlX2FpX3ZvaWNlX3YxXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgLy8gTmF2aWdhdGlvbiAmIFVJIFN0YXRlXG4gIGNvbnN0IFtzaWRlYmFyT3Blbiwgc2V0U2lkZWJhck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0ltYWdlU3R1ZGlvLCBzZXRTaG93SW1hZ2VTdHVkaW9dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlTW9kZSwgc2V0QWN0aXZlTW9kZV0gPSB1c2VTdGF0ZTxBSU1vZGU+KFwiZ2VuZXJhbFwiKTtcbiAgY29uc3QgW3RoZW1lLCBzZXRUaGVtZV0gPSB1c2VTdGF0ZTxOZW9uVGhlbWU+KCgpID0+IHtcbiAgICByZXR1cm4gKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZX1RIRU1FKSBhcyBOZW9uVGhlbWUpIHx8IFwiY3lhbi1jb3JlXCI7XG4gIH0pO1xuICBjb25zdCBbbW9kZWwzRFR5cGUsIHNldE1vZGVsM0RUeXBlXSA9IHVzZVN0YXRlPE1vZGVsM0RUeXBlPigoKSA9PiB7XG4gICAgcmV0dXJuIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWV9NT0RFTDNEKSBhcyBNb2RlbDNEVHlwZSkgfHwgXCJkb2RlY2FoZWRyb25cIjtcbiAgfSk7XG4gIGNvbnN0IFt1c2VTZWFyY2gsIHNldFVzZVNlYXJjaF0gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICAvLyBTZXNzaW9ucyBTdGF0ZVxuICBjb25zdCBbc2Vzc2lvbnMsIHNldFNlc3Npb25zXSA9IHVzZVN0YXRlPENoYXRTZXNzaW9uW10+KCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWV9TRVNTSU9OUyk7XG4gICAgICBpZiAoc2F2ZWQpIHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc2F2ZWQpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIkZhaWxlZCB0byBsb2FkIHNlc3Npb25zOlwiLCBlKTtcbiAgICB9XG4gICAgY29uc3QgaW5pdGlhbElkID0gXCJzZXNzX1wiICsgRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gW1xuICAgICAge1xuICAgICAgICBpZDogaW5pdGlhbElkLFxuICAgICAgICB0aXRsZTogXCJRdWFudHVtIEdlbmVzaXNcIixcbiAgICAgICAgbW9kZTogXCJnZW5lcmFsXCIsXG4gICAgICAgIG1lc3NhZ2VzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwibXNnX3dlbGNvbWVcIixcbiAgICAgICAgICAgIHJvbGU6IFwiYXNzaXN0YW50XCIsXG4gICAgICAgICAgICBjb250ZW50OiBgIyMjIOKaoSBHcmVldGluZ3MsIE9wZXJhdG9yLiBJIGFtICoqRE9ERSBBSSoqLlxuSSBhbSB5b3VyIGh5cGVyLXZlbG9jaXR5LCBjeWJlci1xdWFudHVtIEFJIGFzc2lzdGFudCBlcXVpcHBlZCB3aXRoICoqcmVhbC10aW1lIHdvcmxkIHNlYXJjaCBncm91bmRpbmcqKiwgKipsaXZlIFlvdVR1YmUgYW5kIHdlYiBkYXRhIGFuYWx5c2lzKiosICoqM0QgVGhyZWUuanMgbWVzaCBnZW5lcmF0aW9uKiosICoqdm9pY2UgY29tbWFuZCBzeW5jaHJvbml6YXRpb24qKiwgYW5kICoqbmV1cmFsIGltYWdlIHN5bnRoZXNpcyoqLlxuXG4jIyMjIFdoYXQgc2hhbGwgd2UgZXhwbG9yZSBvciBjb25zdHJ1Y3QgdG9kYXk/XG4tIEFzayBhbnkgbGl2ZSB3b3JsZCBldmVudCwgYnJlYWtpbmcgdGVjaCBuZXdzLCBvciByZXNlYXJjaCBxdWVzdGlvbi5cbi0gUmVxdWVzdCAzRCBtb2RlbCBjb2RlIG9yIGludGVyYWN0aXZlIHdlYiBhcHBsaWNhdGlvbnMuXG4tIFNwZWFrIGRpcmVjdGx5IHZpYSBtaWNyb3Bob25lIHVzaW5nIHRoZSB2b2ljZSBpbnRlcmZhY2UuXG4tIFN5bnRoZXNpemUgY3VzdG9tIGN5YmVycHVuayBBSSBpbWFnZXJ5IGluIHRoZSBWaXNpb24gU3R1ZGlvLmAsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgY3JlYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIF07XG4gIH0pO1xuXG4gIGNvbnN0IFtjdXJyZW50U2Vzc2lvbklkLCBzZXRDdXJyZW50U2Vzc2lvbklkXSA9IHVzZVN0YXRlPHN0cmluZz4oKCkgPT4ge1xuICAgIHJldHVybiBzZXNzaW9uc1swXT8uaWQgfHwgXCJzZXNzX2RlZmF1bHRcIjtcbiAgfSk7XG5cbiAgLy8gQWN0aXZlIENoYXQgU3RhdGVcbiAgY29uc3QgY3VycmVudFNlc3Npb24gPSBzZXNzaW9ucy5maW5kKChzKSA9PiBzLmlkID09PSBjdXJyZW50U2Vzc2lvbklkKSB8fCBzZXNzaW9uc1swXTtcbiAgY29uc3QgbWVzc2FnZXMgPSBjdXJyZW50U2Vzc2lvbiA/IGN1cnJlbnRTZXNzaW9uLm1lc3NhZ2VzIDogW107XG5cbiAgY29uc3QgW2lucHV0UHJvbXB0LCBzZXRJbnB1dFByb21wdF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2F0dGFjaGVkSW1hZ2UsIHNldEF0dGFjaGVkSW1hZ2VdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc1RoaW5raW5nLCBzZXRJc1RoaW5raW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3N0cmVhbWluZ1RleHQsIHNldFN0cmVhbWluZ1RleHRdID0gdXNlU3RhdGUoXCJcIik7XG5cbiAgLy8gVm9pY2UgSW50ZXJhY3Rpb24gU3RhdGVcbiAgY29uc3QgW2lzTGlzdGVuaW5nLCBzZXRJc0xpc3RlbmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1NwZWFraW5nLCBzZXRJc1NwZWFraW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NwZWFraW5nTWVzc2FnZUlkLCBzZXRTcGVha2luZ01lc3NhZ2VJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2Rvd25sb2FkaW5nWmlwLCBzZXREb3dubG9hZGluZ1ppcF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IHNwZWVjaFJlY29nbml6ZXJSZWYgPSB1c2VSZWY8YW55PihudWxsKTtcbiAgY29uc3Qgc3RvcFNwZWVjaFJlZiA9IHVzZVJlZjwoKCkgPT4gdm9pZCkgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZFppcCA9IGFzeW5jICgpID0+IHtcbiAgICBzZXREb3dubG9hZGluZ1ppcCh0cnVlKTtcbiAgICB0cnkge1xuICAgICAgLy8gRmlyc3QgYXR0ZW1wdCBzZXJ2ZXIgZG93bmxvYWRcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCIvYXBpL2Rvd25sb2FkLXppcFwiKTtcbiAgICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVzcG9uc2UuYmxvYigpO1xuICAgICAgICBjb25zdCB7IHNhdmVBcyB9ID0gYXdhaXQgaW1wb3J0KFwiZmlsZS1zYXZlclwiKTtcbiAgICAgICAgc2F2ZUFzKGJsb2IsIGBkb2RlLWFpLXNvdXJjZS0ke0RhdGUubm93KCl9LnppcGApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiU2VydmVyIHppcCBmYWlsZWQsIHVzaW5nIGNsaWVudCBmYWxsYmFja1wiKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgY29uc29sZS53YXJuKFwiVXNpbmcgY2xpZW50LXNpZGUgemlwIGZhbGxiYWNrOlwiLCBlcnIpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBkb3dubG9hZFByb2plY3RaaXBDbGllbnRTaWRlIH0gPSBhd2FpdCBpbXBvcnQoXCIuL3V0aWxzL3ppcEJ1bmRsZVwiKTtcbiAgICAgICAgYXdhaXQgZG93bmxvYWRQcm9qZWN0WmlwQ2xpZW50U2lkZSgpO1xuICAgICAgfSBjYXRjaCAoY2xpZW50RXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDbGllbnQgemlwIGRvd25sb2FkIGVycm9yOlwiLCBjbGllbnRFcnIpO1xuICAgICAgICB3aW5kb3cub3BlbihcIi9hcGkvZG93bmxvYWQtemlwXCIsIFwiX2JsYW5rXCIpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXREb3dubG9hZGluZ1ppcChmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IFt2b2ljZUNvbmZpZywgc2V0Vm9pY2VDb25maWddID0gdXNlU3RhdGU8Vm9pY2VDb25maWc+KCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWV9WT0lDRSk7XG4gICAgICBpZiAoc2F2ZWQpIHJldHVybiBKU09OLnBhcnNlKHNhdmVkKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiB7XG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgYXV0b1NwZWFrOiBmYWxzZSxcbiAgICAgIHZvaWNlTmFtZTogXCJaZXBoeXJcIixcbiAgICAgIHJhdGU6IDEuMDUsXG4gICAgICBwaXRjaDogMS4wLFxuICAgIH07XG4gIH0pO1xuXG4gIC8vIENvZGUgUnVubmVyIE1vZGFsIFN0YXRlXG4gIGNvbnN0IFtjb2RlTW9kYWwsIHNldENvZGVNb2RhbF0gPSB1c2VTdGF0ZTx7XG4gICAgaXNPcGVuOiBib29sZWFuO1xuICAgIGNvZGU6IHN0cmluZztcbiAgICBsYW5ndWFnZTogc3RyaW5nO1xuICB9Pih7XG4gICAgaXNPcGVuOiBmYWxzZSxcbiAgICBjb2RlOiBcIlwiLFxuICAgIGxhbmd1YWdlOiBcImphdmFzY3JpcHRcIixcbiAgfSk7XG5cbiAgLy8gTWVzc2FnZSBzY3JvbGwgYW5jaG9yXG4gIGNvbnN0IG1lc3NhZ2VzRW5kUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgZmlsZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xuXG4gIC8vIFBlcnNpc3RlbmNlIEVmZmVjdHNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWV9TRVNTSU9OUywgSlNPTi5zdHJpbmdpZnkoc2Vzc2lvbnMpKTtcbiAgfSwgW3Nlc3Npb25zXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWV9USEVNRSwgdGhlbWUpO1xuICB9LCBbdGhlbWVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFNUT1JBR0VfS0VZX01PREVMM0QsIG1vZGVsM0RUeXBlKTtcbiAgfSwgW21vZGVsM0RUeXBlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWV9WT0lDRSwgSlNPTi5zdHJpbmdpZnkodm9pY2VDb25maWcpKTtcbiAgfSwgW3ZvaWNlQ29uZmlnXSk7XG5cbiAgLy8gU2Nyb2xsIHRvIGJvdHRvbSBvbiBtZXNzYWdlIHVwZGF0ZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBtZXNzYWdlc0VuZFJlZi5jdXJyZW50Py5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiIH0pO1xuICB9LCBbbWVzc2FnZXMsIHN0cmVhbWluZ1RleHQsIGlzVGhpbmtpbmddKTtcblxuICAvLyBWb2ljZSBSZWNvZ25pdGlvbiBTZXR1cFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJlY29nbml6ZXIgPSBjcmVhdGVTcGVlY2hSZWNvZ25pemVyKFxuICAgICAgKHRyYW5zY3JpcHQsIGlzRmluYWwpID0+IHtcbiAgICAgICAgc2V0SW5wdXRQcm9tcHQoKHByZXYpID0+IHtcbiAgICAgICAgICBpZiAoaXNGaW5hbCkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXYgPyBgJHtwcmV2fSAke3RyYW5zY3JpcHR9YCA6IHRyYW5zY3JpcHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cmFuc2NyaXB0O1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiU3BlZWNoIHJlY29nbml0aW9uIGVycm9yOlwiLCBlcnJvcik7XG4gICAgICAgIHNldElzTGlzdGVuaW5nKGZhbHNlKTtcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHNldElzTGlzdGVuaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgc3BlZWNoUmVjb2duaXplclJlZi5jdXJyZW50ID0gcmVjb2duaXplcjtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoc3BlZWNoUmVjb2duaXplclJlZi5jdXJyZW50KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc3BlZWNoUmVjb2duaXplclJlZi5jdXJyZW50LnN0b3AoKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIH1cbiAgICAgIHN0b3BBbGxTcGVlY2goKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgdG9nZ2xlTGlzdGVuaW5nID0gKCkgPT4ge1xuICAgIGlmICghc3BlZWNoUmVjb2duaXplclJlZi5jdXJyZW50KSB7XG4gICAgICBhbGVydChcIlNwZWVjaCByZWNvZ25pdGlvbiBpcyBub3Qgc3VwcG9ydGVkIG9uIHlvdXIgYnJvd3NlciBvciBkZXZpY2UuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc0xpc3RlbmluZykge1xuICAgICAgc3BlZWNoUmVjb2duaXplclJlZi5jdXJyZW50LnN0b3AoKTtcbiAgICAgIHNldElzTGlzdGVuaW5nKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3BlZWNoUmVjb2duaXplclJlZi5jdXJyZW50LnN0YXJ0KCk7XG4gICAgICAgIHNldElzTGlzdGVuaW5nKHRydWUpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJGYWlsZWQgdG8gc3RhcnQgc3BlZWNoIHJlY29nbml0aW9uOlwiLCBlcnIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvLyBWb2ljZSBPdXRwdXQgU3BlZWNoIEhhbmRsZXJcbiAgY29uc3QgaGFuZGxlU3BlYWsgPSBhc3luYyAodGV4dDogc3RyaW5nLCBtc2dJZD86IHN0cmluZykgPT4ge1xuICAgIHN0b3BBbGxTcGVlY2goKTtcbiAgICBpZiAoc3RvcFNwZWVjaFJlZi5jdXJyZW50KSB7XG4gICAgICBzdG9wU3BlZWNoUmVmLmN1cnJlbnQoKTtcbiAgICAgIHN0b3BTcGVlY2hSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuXG4gICAgc2V0SXNTcGVha2luZyh0cnVlKTtcbiAgICBpZiAobXNnSWQpIHNldFNwZWFraW5nTWVzc2FnZUlkKG1zZ0lkKTtcblxuICAgIC8vIFRyeSBzZXJ2ZXItc2lkZSBHZW1pbmkgVFRTIGZpcnN0XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKFwiL2FwaS90dHNcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICB0ZXh0LFxuICAgICAgICAgIHZvaWNlOiB2b2ljZUNvbmZpZy52b2ljZU5hbWUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICAgIGlmIChkYXRhLmF1ZGlvKSB7XG4gICAgICAgICAgY29uc3QgY2FuY2VsRm4gPSBhd2FpdCBwbGF5UGNtQXVkaW8oZGF0YS5hdWRpbyk7XG4gICAgICAgICAgc3RvcFNwZWVjaFJlZi5jdXJyZW50ID0gKCkgPT4ge1xuICAgICAgICAgICAgY2FuY2VsRm4oKTtcbiAgICAgICAgICAgIHNldElzU3BlYWtpbmcoZmFsc2UpO1xuICAgICAgICAgICAgc2V0U3BlYWtpbmdNZXNzYWdlSWQobnVsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJHZW1pbmkgVFRTIGZhbGxiYWNrIHRvIFdlYiBTcGVlY2g6XCIsIGUpO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIHRvIGJyb3dzZXIgV2ViIFNwZWVjaCBBUElcbiAgICBjb25zdCBjYW5jZWxCcm93c2VyU3BlYWsgPSBzcGVha1dpdGhCcm93c2VyKFxuICAgICAgdGV4dCxcbiAgICAgIHZvaWNlQ29uZmlnLnZvaWNlTmFtZSxcbiAgICAgIHZvaWNlQ29uZmlnLnJhdGUsXG4gICAgICB2b2ljZUNvbmZpZy5waXRjaCxcbiAgICAgICgpID0+IHNldElzU3BlYWtpbmcodHJ1ZSksXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHNldElzU3BlYWtpbmcoZmFsc2UpO1xuICAgICAgICBzZXRTcGVha2luZ01lc3NhZ2VJZChudWxsKTtcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIHNldElzU3BlYWtpbmcoZmFsc2UpO1xuICAgICAgICBzZXRTcGVha2luZ01lc3NhZ2VJZChudWxsKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgc3RvcFNwZWVjaFJlZi5jdXJyZW50ID0gKCkgPT4ge1xuICAgICAgY2FuY2VsQnJvd3NlclNwZWFrKCk7XG4gICAgICBzZXRJc1NwZWFraW5nKGZhbHNlKTtcbiAgICAgIHNldFNwZWFraW5nTWVzc2FnZUlkKG51bGwpO1xuICAgIH07XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3RvcFNwZWFrID0gKCkgPT4ge1xuICAgIGlmIChzdG9wU3BlZWNoUmVmLmN1cnJlbnQpIHtcbiAgICAgIHN0b3BTcGVlY2hSZWYuY3VycmVudCgpO1xuICAgICAgc3RvcFNwZWVjaFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgc3RvcEFsbFNwZWVjaCgpO1xuICAgIHNldElzU3BlYWtpbmcoZmFsc2UpO1xuICAgIHNldFNwZWFraW5nTWVzc2FnZUlkKG51bGwpO1xuICB9O1xuXG4gIC8vIFNlc3Npb24gTWFuYWdlbWVudFxuICBjb25zdCBoYW5kbGVOZXdTZXNzaW9uID0gKG1vZGU6IEFJTW9kZSA9IGFjdGl2ZU1vZGUpID0+IHtcbiAgICBjb25zdCBuZXdTZXNzaW9uSWQgPSBcInNlc3NfXCIgKyBEYXRlLm5vdygpO1xuICAgIGNvbnN0IG5ld1Nlc3Npb246IENoYXRTZXNzaW9uID0ge1xuICAgICAgaWQ6IG5ld1Nlc3Npb25JZCxcbiAgICAgIHRpdGxlOiBcIlF1YW50dW0gUXVlcnkgXCIgKyAoc2Vzc2lvbnMubGVuZ3RoICsgMSksXG4gICAgICBtb2RlLFxuICAgICAgbWVzc2FnZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiBcIm1zZ19pbml0X1wiICsgRGF0ZS5ub3coKSxcbiAgICAgICAgICByb2xlOiBcImFzc2lzdGFudFwiLFxuICAgICAgICAgIGNvbnRlbnQ6IGDimqEgKipET0RFIEFJIEluaXRpYWxpemVkKiogaW4gKioke21vZGUudG9VcHBlckNhc2UoKX0qKiBwcm90b2NvbC5cXG5Xb3JsZCBkYXRhIGxpdmUgZ3JvdW5kaW5nIGFjdGl2ZS4gSG93IGNhbiBJIGFzc2lzdCB5b3VyIG9wZXJhdGlvbnM/YCxcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgY3JlYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgIH07XG5cbiAgICBzZXRTZXNzaW9ucygocHJldikgPT4gW25ld1Nlc3Npb24sIC4uLnByZXZdKTtcbiAgICBzZXRDdXJyZW50U2Vzc2lvbklkKG5ld1Nlc3Npb25JZCk7XG4gICAgc2V0U2hvd0ltYWdlU3R1ZGlvKGZhbHNlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEZWxldGVTZXNzaW9uID0gKGlkOiBzdHJpbmcsIGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGNvbnN0IGZpbHRlcmVkID0gc2Vzc2lvbnMuZmlsdGVyKChzKSA9PiBzLmlkICE9PSBpZCk7XG4gICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29uc3QgcmVzZXRJZCA9IFwic2Vzc19cIiArIERhdGUubm93KCk7XG4gICAgICBjb25zdCByZXNldFNlc3Npb246IENoYXRTZXNzaW9uID0ge1xuICAgICAgICBpZDogcmVzZXRJZCxcbiAgICAgICAgdGl0bGU6IFwiUXVhbnR1bSBHZW5lc2lzXCIsXG4gICAgICAgIG1vZGU6IFwiZ2VuZXJhbFwiLFxuICAgICAgICBtZXNzYWdlczogW10sXG4gICAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgfTtcbiAgICAgIHNldFNlc3Npb25zKFtyZXNldFNlc3Npb25dKTtcbiAgICAgIHNldEN1cnJlbnRTZXNzaW9uSWQocmVzZXRJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFNlc3Npb25zKGZpbHRlcmVkKTtcbiAgICAgIGlmIChjdXJyZW50U2Vzc2lvbklkID09PSBpZCkge1xuICAgICAgICBzZXRDdXJyZW50U2Vzc2lvbklkKGZpbHRlcmVkWzBdLmlkKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gU2VuZCBNZXNzYWdlIEhhbmRsZXJcbiAgY29uc3QgaGFuZGxlU2VuZE1lc3NhZ2UgPSBhc3luYyAoY3VzdG9tVGV4dD86IHN0cmluZywgbW9kZU92ZXJyaWRlPzogQUlNb2RlKSA9PiB7XG4gICAgY29uc3QgdGV4dFRvU2VuZCA9IChjdXN0b21UZXh0ICE9PSB1bmRlZmluZWQgPyBjdXN0b21UZXh0IDogaW5wdXRQcm9tcHQpLnRyaW0oKTtcbiAgICBpZiAoIXRleHRUb1NlbmQgJiYgIWF0dGFjaGVkSW1hZ2UpIHJldHVybjtcblxuICAgIGNvbnN0IGN1cnJlbnRNb2RlID0gbW9kZU92ZXJyaWRlIHx8IGFjdGl2ZU1vZGU7XG5cbiAgICAvLyBDcmVhdGUgVXNlciBNZXNzYWdlXG4gICAgY29uc3QgdXNlck1zZzogTWVzc2FnZSA9IHtcbiAgICAgIGlkOiBcInVzcl9cIiArIERhdGUubm93KCksXG4gICAgICByb2xlOiBcInVzZXJcIixcbiAgICAgIGNvbnRlbnQ6IHRleHRUb1NlbmQsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICBpbWFnZUJhc2U2NDogYXR0YWNoZWRJbWFnZSB8fCB1bmRlZmluZWQsXG4gICAgfTtcblxuICAgIC8vIFVwZGF0ZSBhY3RpdmUgc2Vzc2lvbiBtZXNzYWdlc1xuICAgIGNvbnN0IHVwZGF0ZWRNZXNzYWdlcyA9IFsuLi5tZXNzYWdlcywgdXNlck1zZ107XG4gICAgY29uc3Qgc2Vzc2lvblRpdGxlID1cbiAgICAgIG1lc3NhZ2VzLmxlbmd0aCA8PSAxID8gdGV4dFRvU2VuZC5zbGljZSgwLCAzMCkgfHwgXCJRdWFudHVtIERpc2N1c3Npb25cIiA6IGN1cnJlbnRTZXNzaW9uLnRpdGxlO1xuXG4gICAgc2V0U2Vzc2lvbnMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocykgPT5cbiAgICAgICAgcy5pZCA9PT0gY3VycmVudFNlc3Npb25JZFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAuLi5zLFxuICAgICAgICAgICAgICB0aXRsZTogc2Vzc2lvblRpdGxlLFxuICAgICAgICAgICAgICBtb2RlOiBjdXJyZW50TW9kZSxcbiAgICAgICAgICAgICAgbWVzc2FnZXM6IHVwZGF0ZWRNZXNzYWdlcyxcbiAgICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogc1xuICAgICAgKVxuICAgICk7XG5cbiAgICBzZXRJbnB1dFByb21wdChcIlwiKTtcbiAgICBzZXRBdHRhY2hlZEltYWdlKG51bGwpO1xuICAgIHNldElzVGhpbmtpbmcodHJ1ZSk7XG4gICAgc2V0U3RyZWFtaW5nVGV4dChcIlwiKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcIi9hcGkvY2hhdFwiLCB7XG4gICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIG1lc3NhZ2VzOiB1cGRhdGVkTWVzc2FnZXMsXG4gICAgICAgICAgdXNlU2VhcmNoLFxuICAgICAgICAgIG1vZGU6IGN1cnJlbnRNb2RlLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLmVycm9yIHx8IFwiRmFpbGVkIHRvIHJldHJpZXZlIEFJIGludGVsbGlnZW5jZS5cIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFzc2lzdGFudE1zZzogTWVzc2FnZSA9IHtcbiAgICAgICAgaWQ6IFwiYXN0X1wiICsgRGF0ZS5ub3coKSxcbiAgICAgICAgcm9sZTogXCJhc3Npc3RhbnRcIixcbiAgICAgICAgY29udGVudDogZGF0YS5yZXBseSB8fCBcIk5vIHJlc3BvbnNlIHJlY2VpdmVkLlwiLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHNvdXJjZXM6IGRhdGEuc291cmNlcyB8fCBbXSxcbiAgICAgICAgc2VhcmNoUXVlcmllczogZGF0YS5zZWFyY2hRdWVyaWVzIHx8IFtdLFxuICAgICAgfTtcblxuICAgICAgc2V0U2Vzc2lvbnMoKHByZXYpID0+XG4gICAgICAgIHByZXYubWFwKChzKSA9PlxuICAgICAgICAgIHMuaWQgPT09IGN1cnJlbnRTZXNzaW9uSWRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIC4uLnMsXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IFsuLi51cGRhdGVkTWVzc2FnZXMsIGFzc2lzdGFudE1zZ10sXG4gICAgICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IHNcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgLy8gQXV0by1zcGVhayByZXNwb25zZSBpZiBlbmFibGVkXG4gICAgICBpZiAodm9pY2VDb25maWcuYXV0b1NwZWFrICYmIGRhdGEucmVwbHkpIHtcbiAgICAgICAgaGFuZGxlU3BlYWsoZGF0YS5yZXBseSwgYXNzaXN0YW50TXNnLmlkKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkNoYXQgZmFpbHVyZTpcIiwgZXJyKTtcbiAgICAgIGNvbnN0IGVycm9yTXNnOiBNZXNzYWdlID0ge1xuICAgICAgICBpZDogXCJlcnJfXCIgKyBEYXRlLm5vdygpLFxuICAgICAgICByb2xlOiBcImFzc2lzdGFudFwiLFxuICAgICAgICBjb250ZW50OiBg4pqg77iPICoqVHJhbnNtaXNzaW9uIEFub21hbHkqKjogJHtlcnIubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBjb25uZWN0IHdpdGggRE9ERSBBSSBDb3JlLlwifVxcblBsZWFzZSB0cnkgYWdhaW4gb3IgdmVyaWZ5IG5ldHdvcmsgaW50ZWdyaXR5LmAsXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgIH07XG4gICAgICBzZXRTZXNzaW9ucygocHJldikgPT5cbiAgICAgICAgcHJldi5tYXAoKHMpID0+XG4gICAgICAgICAgcy5pZCA9PT0gY3VycmVudFNlc3Npb25JZFxuICAgICAgICAgICAgPyB7IC4uLnMsIG1lc3NhZ2VzOiBbLi4udXBkYXRlZE1lc3NhZ2VzLCBlcnJvck1zZ10gfVxuICAgICAgICAgICAgOiBzXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzVGhpbmtpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICAvLyBJbWFnZSBVcGxvYWQgSGFuZGxlciBmb3IgTXVsdGltb2RhbFxuICBjb25zdCBoYW5kbGVJbWFnZVVwbG9hZCA9IChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlcz8uWzBdO1xuICAgIGlmICghZmlsZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgc2V0QXR0YWNoZWRJbWFnZShyZWFkZXIucmVzdWx0IGFzIHN0cmluZyk7XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVPcGVuQ29kZVByZXZpZXcgPSAoY29kZTogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nKSA9PiB7XG4gICAgc2V0Q29kZU1vZGFsKHtcbiAgICAgIGlzT3BlbjogdHJ1ZSxcbiAgICAgIGNvZGUsXG4gICAgICBsYW5ndWFnZSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGlkPVwiZG9kZS1haS1hcHAtcm9vdFwiXG4gICAgICBjbGFzc05hbWU9XCJmbGV4IGgtc2NyZWVuIHctZnVsbCBiZy1bIzA0MDYwZl0gdGV4dC1zbGF0ZS0xMDAgb3ZlcmZsb3ctaGlkZGVuIGZvbnQtc2FucyBzZWxlY3QtdGV4dCBjeWJlci1ncmlkXCJcbiAgICA+XG4gICAgICB7LyogU2lkZWJhciBOYXZpZ2F0aW9uICovfVxuICAgICAgPFNpZGViYXJcbiAgICAgICAgaXNPcGVuPXtzaWRlYmFyT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2lkZWJhck9wZW4oZmFsc2UpfVxuICAgICAgICBzZXNzaW9ucz17c2Vzc2lvbnN9XG4gICAgICAgIGN1cnJlbnRTZXNzaW9uSWQ9e2N1cnJlbnRTZXNzaW9uSWR9XG4gICAgICAgIG9uU2VsZWN0U2Vzc2lvbj17KGlkKSA9PiB7XG4gICAgICAgICAgc2V0Q3VycmVudFNlc3Npb25JZChpZCk7XG4gICAgICAgICAgc2V0U2hvd0ltYWdlU3R1ZGlvKGZhbHNlKTtcbiAgICAgICAgfX1cbiAgICAgICAgb25OZXdTZXNzaW9uPXtoYW5kbGVOZXdTZXNzaW9ufVxuICAgICAgICBvbkRlbGV0ZVNlc3Npb249e2hhbmRsZURlbGV0ZVNlc3Npb259XG4gICAgICAgIGFjdGl2ZU1vZGU9e2FjdGl2ZU1vZGV9XG4gICAgICAgIG9uQ2hhbmdlTW9kZT17KG0pID0+IHtcbiAgICAgICAgICBzZXRBY3RpdmVNb2RlKG0pO1xuICAgICAgICAgIGlmIChtID09PSBcImltYWdlXCIpIHtcbiAgICAgICAgICAgIHNldFNob3dJbWFnZVN0dWRpbyh0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0U2hvd0ltYWdlU3R1ZGlvKGZhbHNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgb25DaGFuZ2VUaGVtZT17c2V0VGhlbWV9XG4gICAgICAgIG1vZGVsM0RUeXBlPXttb2RlbDNEVHlwZX1cbiAgICAgICAgb25DaGFuZ2VNb2RlbDNEPXtzZXRNb2RlbDNEVHlwZX1cbiAgICAgICAgdm9pY2VDb25maWc9e3ZvaWNlQ29uZmlnfVxuICAgICAgICBvblVwZGF0ZVZvaWNlQ29uZmlnPXsoY2ZnKSA9PiBzZXRWb2ljZUNvbmZpZygocHJldikgPT4gKHsgLi4ucHJldiwgLi4uY2ZnIH0pKX1cbiAgICAgICAgb25PcGVuSW1hZ2VTdHVkaW89eygpID0+IHNldFNob3dJbWFnZVN0dWRpbyh0cnVlKX1cbiAgICAgIC8+XG5cbiAgICAgIHsvKiBNYWluIENvbnRlbnQgQXJlYSAqL31cbiAgICAgIDxtYWluIGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sIGgtZnVsbCBsZzptbC03MiBtZDpsZzptbC04MCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gYmctZ3JhZGllbnQtdG8tYiBmcm9tLVsjMDUwODE0XS85MCB0by1bIzAzMDQwYV1cIj5cbiAgICAgICAgey8qIFRvcCBGbG9hdGluZyBDeWJlciBIVUQgSGVhZGVyICovfVxuICAgICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImgtMTYgcHgtNCBtZDpweC02IGJvcmRlci1iIGJvcmRlci1jeWFuLTUwMC8yMCBiZy1bIzA1MDcxMV0vODAgYmFja2Ryb3AtYmx1ci1tZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gei0zMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2lkZWJhck9wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxnOmhpZGRlbiBwLTIgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiT3BlbiBOYXZpZ2F0aW9uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE1lbnUgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1jeWFuLTQwMCBhbmltYXRlLXB1bHNlIG5lb24tZ2xvdy1jeWFuXCIgLz5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtY3liZXIgZm9udC1ibGFjayB0ZXh0LXNtIG1kOnRleHQtYmFzZSB0cmFja2luZy13aWRlciB0ZXh0LXRyYW5zcGFyZW50IGJnLWNsaXAtdGV4dCBiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi0zMDAgdmlhLXRlYWwtMTAwIHRvLWJsdWUtNDAwXCI+XG4gICAgICAgICAgICAgICAgRE9ERSBBSVxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lLWJsb2NrIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctY3lhbi05NTAvODAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzMwXCI+XG4gICAgICAgICAgICAgICAge3Nob3dJbWFnZVN0dWRpbyA/IFwiVklTSU9OIFNUVURJT1wiIDogYWN0aXZlTW9kZS50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBRdWljayBIVUQgQWN0aW9ucyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1kOmdhcC0zXCI+XG4gICAgICAgICAgICB7LyogV29ybGQgU2VhcmNoIEdyb3VuZGluZyBUb2dnbGUgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFVzZVNlYXJjaCghdXNlU2VhcmNoKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJvcmRlciB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICB1c2VTZWFyY2hcbiAgICAgICAgICAgICAgICAgID8gXCJiZy1jeWFuLTUwMC8xNSBib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTMwMCBuZW9uLWdsb3ctY3lhblwiXG4gICAgICAgICAgICAgICAgICA6IFwiYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS0zMDBcIlxuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgdGl0bGU9XCJUb2dnbGUgTGl2ZSBHb29nbGUgU2VhcmNoICYgV2ViIEdyb3VuZGluZ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxHbG9iZSBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSAke3VzZVNlYXJjaCA/IFwidGV4dC1jeWFuLTQwMCBhbmltYXRlLXNwaW4tc2xvd1wiIDogXCJ0ZXh0LXNsYXRlLTUwMFwifWB9IC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBtZDppbmxpbmVcIj5MaXZlIEdyb3VuZGluZzwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsICR7dXNlU2VhcmNoID8gXCJiZy1lbWVyYWxkLTQwMFwiIDogXCJiZy1zbGF0ZS02MDBcIn1gfSAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBWaXNpb24gU3R1ZGlvIFNob3J0Y3V0ICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93SW1hZ2VTdHVkaW8oIXNob3dJbWFnZVN0dWRpbyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgcm91bmRlZC14bCBib3JkZXIgdGV4dC14cyBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgc2hvd0ltYWdlU3R1ZGlvXG4gICAgICAgICAgICAgICAgICA/IFwiYmctZnVjaHNpYS01MDAvMjAgYm9yZGVyLWZ1Y2hzaWEtNDAwIHRleHQtZnVjaHNpYS0zMDAgbmVvbi1nbG93LW1hZ2VudGFcIlxuICAgICAgICAgICAgICAgICAgOiBcImJnLXNsYXRlLTkwMCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOmJvcmRlci1mdWNoc2lhLTUwMC81MCBob3Zlcjp0ZXh0LWZ1Y2hzaWEtMzAwXCJcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxXYW5kMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWZ1Y2hzaWEtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmlubGluZVwiPkFJIFZpc2lvbjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogRGlyZWN0IFpJUCBEb3dubG9hZCBBY3Rpb24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkWmlwfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17ZG93bmxvYWRpbmdaaXB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwIGJnLVsjMGMxNzMwXSBob3ZlcjpiZy1jeWFuLTk1MC84MCB0ZXh0LWN5YW4tMzAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctc20gZ3JvdXBcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkRvd25sb2FkIEZ1bGwgUHJvamVjdCBaSVAgQ29kZWJhc2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZG93bmxvYWRpbmdaaXAgPyAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxGaWxlQXJjaGl2ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lXCI+UGFja2luZy4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDAgZ3JvdXAtaG92ZXI6dHJhbnNsYXRlLXktMC41IHRyYW5zaXRpb24tdHJhbnNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj5aSVAgQ29kZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogVm9pY2UgU3RhdHVzIEluZGljYXRvciAqL31cbiAgICAgICAgICAgIHtpc1NwZWFraW5nICYmIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVN0b3BTcGVha31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTIuNSBweS0xLjUgcm91bmRlZC14bCBiZy1yb3NlLTUwMC8yMCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzUwIHRleHQtcm9zZS0zMDAgdGV4dC14cyBmb250LXNlbWlib2xkIGFuaW1hdGUtcHVsc2VcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiU3RvcCBBdWRpb1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Vm9sdW1lWCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmlubGluZVwiPk11dGUgVm9pY2U8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9oZWFkZXI+XG5cbiAgICAgICAgey8qIFZpZXcgU3dpdGNoZXI6IEltYWdlIFN0dWRpbyB2cyBDaGF0ICYgM0QgQ29yZSBWaWV3ICovfVxuICAgICAgICB7c2hvd0ltYWdlU3R1ZGlvID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwLTQgc2Nyb2xsYmFyLXRoaW5cIj5cbiAgICAgICAgICAgIDxJbWFnZUNyZWF0aW9uU3R1ZGlvXG4gICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgb25JbnNlcnRUb0NoYXQ9eyhpbWFnZVVybCwgcHJvbXB0KSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0U2hvd0ltYWdlU3R1ZGlvKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBzZXRBdHRhY2hlZEltYWdlKGltYWdlVXJsKTtcbiAgICAgICAgICAgICAgICBzZXRJbnB1dFByb21wdChgQW5hbHl6ZSBhbmQgZXhwYW5kIHVwb24gdGhpcyB2aXN1YWwgY29uY2VwdDogXCIke3Byb21wdH1cImApO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sIG92ZXJmbG93LWhpZGRlbiByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgey8qIFNjcm9sbGFibGUgQ29udmVyc2F0aW9uIENhbnZhcyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwLTQgbWQ6cC02IHNwYWNlLXktNSBzY3JvbGxiYXItdGhpblwiPlxuICAgICAgICAgICAgICB7LyogVG9wIEludGVyYWN0aXZlIDNEIEhvbG9ncmFtIENvcmUgU3RhZ2UgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LTR4bCBteC1hdXRvIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwLTQgbWQ6cC02IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1bIzA3MGMxZF0vOTAgdmlhLVsjMGExMjI4XS84MCB0by1bIzA3MGMxZF0vOTAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMCBzaGFkb3ctMnhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBuZW9uLWdsb3ctY3lhblwiPlxuICAgICAgICAgICAgICAgIHsvKiBDeWJlciBIVUQgR3JpZCBCYWNrZ3JvdW5kICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBjeWJlci1ncmlkIG9wYWNpdHktMzAgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgICAgICAgICAgICB7LyogTGVmdCBEZXNjcmlwdGlvbiBIVUQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgei0xMCB0ZXh0LWNlbnRlciBtZDp0ZXh0LWxlZnQgZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zIHB5LTEgcm91bmRlZC1mdWxsIGJnLWN5YW4tNTAwLzEwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzAgdGV4dC1jeWFuLTMwMCB0ZXh0LXhzIGZvbnQtY3liZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPFJhZGlvIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1jeWFuLTQwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ET0RFIFFVQU5UVU0gQ09SRSDigKIgUkVBRFk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWN5YmVyIGZvbnQtYmxhY2sgdGV4dC1sZyBtZDp0ZXh0LXhsIHRleHQtc2xhdGUtMTAwIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgICAgICAgQUxMLVdPUkxEIElOVEVMTElHRU5DRSAmIDNEIFNZTlRIRVNJU1xuICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbWF4LXctbWQgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgIFZvaWNlLWVuYWJsZWQsIHJlYWwtdGltZSBHb29nbGUgc2VhcmNoIGdyb3VuZGVkIGFzc2lzdGFudC4gU3ludGhlc2l6ZXMgbGl2ZSB3ZWIgZGF0YSwgWW91VHViZSBpbnRlbGxpZ2VuY2UsIDNEIGNvZGUgJiBuZW9uIHZpc3VhbHMgaW5zdGFudGx5LlxuICAgICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgICB7LyogU3RhdHVzIEJhciAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1kOmp1c3RpZnktc3RhcnQgZ2FwLTIgcHQtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1zbGF0ZS05MDAvOTAgdGV4dC1jeWFuLTQwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzIwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTW9kZWw6IEdlbWluaSAzLjcgRmxhc2hcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1zbGF0ZS05MDAvOTAgdGV4dC1lbWVyYWxkLTQwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzIwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgTGl2ZSBTZWFyY2g6IEFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTkwMC85MCB0ZXh0LWZ1Y2hzaWEtNDAwIGJvcmRlciBib3JkZXItZnVjaHNpYS01MDAvMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBXZWJHTDogNjAgRlBTXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFJpZ2h0IEludGVyYWN0aXZlIDNEIERvZGVjYWhlZHJvbiBDb3JlICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy00OCBoLTQ4IG1kOnctNTYgbWQ6aC01NiByZWxhdGl2ZSBmbGV4LXNocmluay0wIHotMTBcIj5cbiAgICAgICAgICAgICAgICAgIDxOZW9uQ29yZTNEXG4gICAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgICAgICAgbW9kZWxUeXBlPXttb2RlbDNEVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgaXNUaGlua2luZz17aXNUaGlua2luZ31cbiAgICAgICAgICAgICAgICAgICAgaXNTcGVha2luZz17aXNTcGVha2luZ31cbiAgICAgICAgICAgICAgICAgICAgaXNMaXN0ZW5pbmc9e2lzTGlzdGVuaW5nfVxuICAgICAgICAgICAgICAgICAgICBjb21wYWN0PXt0cnVlfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1tb25vIHRleHQtY2VudGVyIHRleHQtY3lhbi00MDAvODAgLW10LTJcIj5cbiAgICAgICAgICAgICAgICAgICAge2lzTGlzdGVuaW5nXG4gICAgICAgICAgICAgICAgICAgICAgPyBcIkxpc3RlbmluZyB0byB5b3VyIHZvaWNlLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IGlzVGhpbmtpbmdcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiQ29tcHV0aW5nIHF1YW50dW0gbGF5ZXJzLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IGlzU3BlYWtpbmdcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiVHJhbnNtaXR0aW5nIGF1ZGlvLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiSG92ZXIgb3IgY2xpY2sgdG8gaW50ZXJhY3Qgd2l0aCAzRCBDb3JlXCJ9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIE1lc3NhZ2VzIEZsb3cgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LTR4bCBteC1hdXRvIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIHttZXNzYWdlcy5tYXAoKG1zZykgPT4gKFxuICAgICAgICAgICAgICAgICAgPENoYXRNZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgIGtleT17bXNnLmlkfVxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlPXttc2d9XG4gICAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgICAgICAgb25TcGVhaz17KHRleHQpID0+IGhhbmRsZVNwZWFrKHRleHQsIG1zZy5pZCl9XG4gICAgICAgICAgICAgICAgICAgIG9uU3RvcFNwZWFrPXtoYW5kbGVTdG9wU3BlYWt9XG4gICAgICAgICAgICAgICAgICAgIGlzU3BlYWtpbmdUaGlzPXtpc1NwZWFraW5nICYmIHNwZWFraW5nTWVzc2FnZUlkID09PSBtc2cuaWR9XG4gICAgICAgICAgICAgICAgICAgIG9uT3BlbkNvZGVQcmV2aWV3PXtoYW5kbGVPcGVuQ29kZVByZXZpZXd9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkpfVxuXG4gICAgICAgICAgICAgICAgey8qIFRoaW5raW5nIC8gU3RyZWFtaW5nIEluZGljYXRvciAqL31cbiAgICAgICAgICAgICAgICB7aXNUaGlua2luZyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHAtNCByb3VuZGVkLTJ4bCBiZy1bIzA4MGQxZV0vODAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMCBtYXgtdy1tZCBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLXhsIGJnLWN5YW4tOTUwLzgwIGJvcmRlciBib3JkZXItY3lhbi00MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTMwMCBhbmltYXRlLXNwaW4tc2xvd1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1jeWJlciB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWN5YW4tMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ET0RFIEFJIElTIENPTVBVVElORzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLWN5YW4tNDAwIGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLWN5YW4tNDAwIGFuaW1hdGUtYm91bmNlIFthbmltYXRpb24tZGVsYXk6MC4yc11cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctY3lhbi00MDAgYW5pbWF0ZS1ib3VuY2UgW2FuaW1hdGlvbi1kZWxheTowLjRzXVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBHYXRoZXJpbmcgd29ybGQgaW50ZWxsaWdlbmNlICYgc3ludGhlc2l6aW5nIHJlc3BvbnNlLi4uXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17bWVzc2FnZXNFbmRSZWZ9IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBCb3R0b20gSW5wdXQgQ29uc29sZSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IG1kOnAtNiBiZy1bIzA1MDcxMV0vOTUgYm9yZGVyLXQgYm9yZGVyLWN5YW4tNTAwLzIwIGJhY2tkcm9wLWJsdXItbWRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy00eGwgbXgtYXV0byBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICB7LyogUXVpY2sgUHJvbXB0cyBTdWdnZXN0aW9ucyAqL31cbiAgICAgICAgICAgICAgICB7bWVzc2FnZXMubGVuZ3RoIDw9IDIgJiYgKFxuICAgICAgICAgICAgICAgICAgPFF1aWNrUHJvbXB0c1xuICAgICAgICAgICAgICAgICAgICBvblNlbGVjdFByb21wdD17KHAsIG0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRJbnB1dFByb21wdChwKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAobSkgc2V0QWN0aXZlTW9kZShtKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlTW9kZT17YWN0aXZlTW9kZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiBBdHRhY2hlZCBJbWFnZSBUaHVtYm5haWwgKi99XG4gICAgICAgICAgICAgICAge2F0dGFjaGVkSW1hZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBwLTIgYmctWyMwOTBlMWVdIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMCB3LWZpdFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgc3JjPXthdHRhY2hlZEltYWdlfVxuICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIkF0dGFjaG1lbnRcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTIgaC0xMiBvYmplY3QtY292ZXIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtY3lhbi0zMDBcIj5WaXN1YWwgQXR0YWNobWVudCBBY3RpdmU8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+UmVhZHkgZm9yIE11bHRpbW9kYWwgQW5hbHlzaXM8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBdHRhY2hlZEltYWdlKG51bGwpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXJvc2UtNDAwXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogTWFpbiBDeWJlciBJbnB1dCBCYXIgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGl0ZW1zLWNlbnRlciBiZy1bIzA3MGIxOF0gYm9yZGVyIGJvcmRlci1jeWFuLTUwMC80MCBmb2N1cy13aXRoaW46Ym9yZGVyLWN5YW4tNDAwIHJvdW5kZWQtMnhsIHNoYWRvdy14bCB0cmFuc2l0aW9uLWFsbCBuZW9uLWdsb3ctY3lhblwiPlxuICAgICAgICAgICAgICAgICAgey8qIEZpbGUgQXR0YWNobWVudCBCdXR0b24gKi99XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1jeWFuLTMwMCB0cmFuc2l0aW9uLWNvbG9ycyBtbC0xXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJBdHRhY2ggSW1hZ2UgZm9yIEFJIEFuYWx5c2lzXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFBhcGVyY2xpcCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlSW1hZ2VVcGxvYWR9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICB7LyogVm9pY2UgTWljcm9waG9uZSBCdXR0b24gKi99XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZUxpc3RlbmluZ31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHRyYW5zaXRpb24tYWxsIHJvdW5kZWQteGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0xpc3RlbmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBcImJnLXJvc2UtNTAwLzIwIHRleHQtcm9zZS00MDAgYW5pbWF0ZS1wdWxzZSBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzUwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LWN5YW4tMzAwXCJcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXtpc0xpc3RlbmluZyA/IFwiTGlzdGVuaW5nLi4uIGNsaWNrIHRvIHN0b3BcIiA6IFwiVm9pY2UgSW5wdXQgKFNwZWVjaC10by1UZXh0KVwifVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7aXNMaXN0ZW5pbmcgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPE1pY09mZiBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcm9zZS00MDAgYW5pbWF0ZS1ib3VuY2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxNaWMgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgey8qIFRleHQgSW5wdXQgKi99XG4gICAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2lucHV0UHJvbXB0fVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldElucHV0UHJvbXB0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJFbnRlclwiICYmICFlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTZW5kTWVzc2FnZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e1xuICAgICAgICAgICAgICAgICAgICAgIGlzTGlzdGVuaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwiTGlzdGVuaW5nIHRvIHZvaWNlIGlucHV0Li4uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYWN0aXZlTW9kZSA9PT0gXCJjb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJBc2sgRE9ERSBBSSB0byB3cml0ZSAzRCBjb2RlLCBUaHJlZS5qcyBzaGFkZXJzLCBBUElzLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYWN0aXZlTW9kZSA9PT0gXCJ5b3V0dWJlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCJBc2sgZm9yIFlvdVR1YmUgdmlkZW8gYW5hbHlzaXMsIHRyYW5zY3JpcHRzLCBjb250ZW50IGlkZWFzLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogXCJBc2sgRE9ERSBBSSBhbnl0aGluZyAod29ybGQga25vd2xlZGdlLCBsaXZlIG5ld3MsIDNEIG1hdGgsIGNvZGUpLi4uXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByb3dzPXsxfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgYmctdHJhbnNwYXJlbnQgcHktMy41IHB4LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTEwMCBwbGFjZWhvbGRlcjp0ZXh0LXNsYXRlLTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgcmVzaXplLW5vbmUgbWF4LWgtMzIgZm9udC1zYW5zXCJcbiAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBTZW5kIEJ1dHRvbiAqL31cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2VuZE1lc3NhZ2UoKX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzVGhpbmtpbmcgfHwgKCFpbnB1dFByb21wdC50cmltKCkgJiYgIWF0dGFjaGVkSW1hZ2UpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMgbXItMS41IHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpc1RoaW5raW5nIHx8ICghaW5wdXRQcm9tcHQudHJpbSgpICYmICFhdHRhY2hlZEltYWdlKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcInRleHQtc2xhdGUtNjAwIGN1cnNvci1ub3QtYWxsb3dlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWN5YW4tNTAwIHRvLWJsdWUtNjAwIGhvdmVyOmZyb20tY3lhbi00MDAgaG92ZXI6dG8tYmx1ZS01MDAgdGV4dC1zbGF0ZS05NTAgc2hhZG93LW1kIG5lb24tZ2xvdy1jeWFuIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8U2VuZCBjbGFzc05hbWU9XCJ3LTQgaC00IGZpbGwtY3VycmVudCBzdHJva2UtWzIuNV1cIiAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogRm9vdGVyIE1pY3JvY29weSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBweC0yIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7imqEgRE9ERSBBSSB2My43IEN5YmVyIENvcmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UHJlc3MgRW50ZXIgdG8gdHJhbnNtaXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLWN5YW4tNDAwIGFuaW1hdGUtcGluZ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlJlYWwtVGltZSBXb3JsZCAmIFdlYiBHcm91bmRpbmc8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvbWFpbj5cblxuICAgICAgey8qIExpdmUgM0QgJiBDb2RlIFJ1bm5lciBNb2RhbCAqL31cbiAgICAgIDxMaXZlM0RWaWV3ZXJNb2RhbFxuICAgICAgICBpc09wZW49e2NvZGVNb2RhbC5pc09wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldENvZGVNb2RhbCgocHJldikgPT4gKHsgLi4ucHJldiwgaXNPcGVuOiBmYWxzZSB9KSl9XG4gICAgICAgIGNvZGVTbmlwcGV0PXtjb2RlTW9kYWwuY29kZX1cbiAgICAgICAgbGFuZ3VhZ2U9e2NvZGVNb2RhbC5sYW5ndWFnZX1cbiAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJtYXBwaW5ncyI6IkFBa2ZNLFNBMkZVLFVBM0ZWO0FBbGZOLFNBQWdCLFVBQVUsV0FBVyxjQUFjO0FBQ25EO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUlBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUVBO0FBQUEsRUFJQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFXUCxTQUFTLGtCQUFrQjtBQUMzQixTQUFTLG1CQUFtQjtBQUM1QixTQUFT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