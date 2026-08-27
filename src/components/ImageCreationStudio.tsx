import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=df3e6907"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=df3e6907"; const useState = __vite__cjsImport1_react["useState"];
import { Sparkles, Image as ImageIcon, Download, Copy, Check, RefreshCw, Wand2, Zap, Layers } from "/node_modules/.vite/deps/lucide-react.js?v=df3e6907";
const STYLE_PRESETS = [
  { id: "neon-cyberpunk", name: "Neon Cyberpunk", icon: "⚡", desc: "Glowing cyan & violet lighting, 8k octane" },
  { id: "3d-render", name: "3D Octane Render", icon: "🧊", desc: "Raytraced glass & metallic shaders" },
  { id: "hologram", name: "Sci-Fi Hologram", icon: "🌐", desc: "Translucent wireframe particle field" },
  { id: "photorealistic", name: "Cinematic Sci-Fi", icon: "📸", desc: "85mm lens, sharp photographic fidelity" }
];
const ASPECT_RATIOS = [
  { id: "1:1", label: "Square (1:1)", icon: "■" },
  { id: "16:9", label: "Landscape (16:9)", icon: "▬" },
  { id: "9:16", label: "Portrait (9:16)", icon: "▮" },
  { id: "4:3", label: "Standard (4:3)", icon: "▰" }
];
const PROMPT_SUGGESTIONS = [
  "Futuristic cyberpunk city at night with neon holographic skyscrapers and flying vehicles",
  "Glowing neon quantum AI core with floating geometric rings and neural particle stream",
  "Sleek cybernetic humanoid with glowing luminescent cyan circuits and glass armor",
  "Surreal 3D crystalline biome with bioluminescent flora and floating polygon islands",
  "High-tech futuristic starship cockpit overlooking a neon hyperdrive vortex"
];
export const ImageCreationStudio = ({
  onInsertToChat,
  theme = "cyan-core"
}) => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("neon-cyberpunk");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [activeImage, setActiveImage] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const handleGenerate = async (customPrompt) => {
    const textToGenerate = customPrompt || prompt;
    if (!textToGenerate.trim()) return;
    setIsGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/image/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: textToGenerate,
          style: selectedStyle,
          aspectRatio
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate image.");
      }
      const newImg = {
        id: "img_" + Date.now(),
        url: data.imageUrl,
        prompt: textToGenerate,
        style: selectedStyle,
        aspectRatio,
        createdAt: Date.now()
      };
      setGallery((prev) => [newImg, ...prev]);
      setActiveImage(newImg);
    } catch (err) {
      console.error("Image gen error:", err);
      setError(err.message || "Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };
  const handleDownload = (img) => {
    const link = document.createElement("a");
    link.href = img.url;
    link.download = `dode-ai-${Date.now()}.png`;
    link.click();
  };
  const handleCopyPrompt = (p, id) => {
    navigator.clipboard.writeText(p);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2e3);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400", children: /* @__PURE__ */ jsxDEV(Wand2, { className: "w-5 h-5 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 107,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 106,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl md:text-2xl font-cyber font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-fuchsia-400", children: "DODE AI VISION STUDIO" }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 110,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "Generative Neural Synthesizer powered by Gemini Image Engine" }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 113,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 109,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
        lineNumber: 104,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/30", children: [
        /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5" }, void 0, false, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 121,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Engine: High-Fidelity 1K Octane Synth" }, void 0, false, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 122,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
        lineNumber: 120,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-5 bg-[#080c18] border border-cyan-500/30 rounded-2xl p-5 shadow-xl", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-cyber font-semibold text-cyan-300 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "PROMPT MATRIX" }, void 0, false, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 133,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-sans", children: "Be descriptive" }, void 0, false, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 134,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 132,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative", children: /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              value: prompt,
              onChange: (e) => setPrompt(e.target.value),
              placeholder: "Describe your 3D cyberpunk scene, futuristic entity, neon artifact...",
              rows: 4,
              className: "w-full bg-[#050812] border border-slate-700 focus:border-cyan-400 rounded-xl p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none transition-all resize-none shadow-inner"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 137,
              columnNumber: 15
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 136,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 131,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-semibold text-slate-400 uppercase tracking-wider", children: "Quick Inspiration" }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 149,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-1.5", children: PROMPT_SUGGESTIONS.map((s, idx) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setPrompt(s),
              className: "text-[11px] text-left px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-cyan-950/60 hover:text-cyan-300 border border-slate-700/60 transition-all truncate max-w-full",
              children: [
                s.slice(0, 42),
                "..."
              ]
            },
            idx,
            true,
            {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 154,
              columnNumber: 17
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 152,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 148,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-cyber font-semibold text-cyan-300", children: "AESTHETIC PRESET" }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 167,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: STYLE_PRESETS.map((st) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedStyle(st.id),
              className: `p-2.5 rounded-xl text-left border transition-all ${selectedStyle === st.id ? "bg-cyan-500/15 border-cyan-400 text-cyan-200 neon-glow-cyan" : "bg-[#060914] border-slate-800 text-slate-300 hover:border-slate-700"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 text-xs font-semibold", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: st.icon }, void 0, false, {
                    fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                    lineNumber: 182,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: st.name }, void 0, false, {
                    fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                    lineNumber: 183,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                  lineNumber: 181,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1 line-clamp-1", children: st.desc }, void 0, false, {
                  fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                  lineNumber: 185,
                  columnNumber: 19
                }, this)
              ]
            },
            st.id,
            true,
            {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 172,
              columnNumber: 17
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 170,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 166,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-cyber font-semibold text-cyan-300", children: "FRAME RATIO" }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 193,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-4 gap-1.5", children: ASPECT_RATIOS.map((ar) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setAspectRatio(ar.id),
              className: `py-2 px-1 text-center rounded-lg border text-xs font-medium transition-all ${aspectRatio === ar.id ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold" : "bg-[#060914] border-slate-800 text-slate-400 hover:text-slate-200"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs", children: ar.icon }, void 0, false, {
                  fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                  lineNumber: 207,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] mt-0.5", children: ar.id }, void 0, false, {
                  fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                  lineNumber: 208,
                  columnNumber: 19
                }, this)
              ]
            },
            ar.id,
            true,
            {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 198,
              columnNumber: 17
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 196,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 192,
          columnNumber: 11
        }, this),
        error && /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs", children: error }, void 0, false, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 216,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => handleGenerate(),
            disabled: isGenerating || !prompt.trim(),
            className: `w-full py-3 px-4 rounded-xl font-cyber font-bold text-sm tracking-wider flex items-center justify-center gap-2 transition-all ${isGenerating || !prompt.trim() ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700" : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg neon-glow-cyan active:scale-[0.98]"}`,
            children: isGenerating ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4 animate-spin text-slate-950" }, void 0, false, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 233,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "SYNTHESIZING NEURAL VISUAL..." }, void 0, false, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 234,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 232,
              columnNumber: 15
            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-slate-950 fill-slate-950" }, void 0, false, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 238,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "GENERATE AI IMAGE" }, void 0, false, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 239,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 237,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 222,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
        lineNumber: 129,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-h-[420px] bg-[#070b16] border border-cyan-500/30 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 249,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 250,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 251,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 252,
            columnNumber: 13
          }, this),
          isGenerating ? /* @__PURE__ */ jsxDEV("div", { className: "text-center space-y-4 p-8", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "relative w-24 h-24 mx-auto", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" }, void 0, false, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 257,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-2 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" }, void 0, false, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 258,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-6 rounded-full bg-cyan-400/20 blur-md" }, void 0, false, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 259,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 256,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "font-cyber font-bold text-cyan-300 tracking-wider text-base", children: "RENDERING NEURAL VISION" }, void 0, false, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 262,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1 max-w-xs mx-auto", children: "Computing diffusion layers, volumetric neon rays, and 3D textures..." }, void 0, false, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 265,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 261,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 255,
            columnNumber: 15
          }, this) : activeImage ? /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full flex flex-col items-center justify-center gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "relative group max-h-[460px] max-w-full rounded-xl overflow-hidden border border-cyan-500/40 shadow-2xl", children: [
              /* @__PURE__ */ jsxDEV(
                "img",
                {
                  src: activeImage.url,
                  alt: activeImage.prompt,
                  referrerPolicy: "no-referrer",
                  className: "max-h-[440px] w-auto object-contain rounded-xl"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                  lineNumber: 273,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleDownload(activeImage),
                    className: "p-3 bg-cyan-500 text-slate-950 rounded-xl font-semibold flex items-center gap-2 hover:bg-cyan-400 transition-colors shadow-lg",
                    title: "Download image",
                    children: [
                      /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                        lineNumber: 286,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-xs", children: "Download" }, void 0, false, {
                        fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                        lineNumber: 287,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                    lineNumber: 281,
                    columnNumber: 21
                  },
                  this
                ),
                onInsertToChat && /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => onInsertToChat(activeImage.url, activeImage.prompt),
                    className: "p-3 bg-fuchsia-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-fuchsia-500 transition-colors shadow-lg",
                    title: "Send to Chat",
                    children: [
                      /* @__PURE__ */ jsxDEV(Layers, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                        lineNumber: 295,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-xs", children: "Discuss in Chat" }, void 0, false, {
                        fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                        lineNumber: 296,
                        columnNumber: 25
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                    lineNumber: 290,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 280,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 272,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-[#050812] p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "truncate flex-1 italic", children: [
                '"',
                activeImage.prompt,
                '"'
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                lineNumber: 303,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => handleCopyPrompt(activeImage.prompt, activeImage.id),
                  className: "flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 px-2 py-1 bg-cyan-500/10 rounded-md border border-cyan-500/20 flex-shrink-0",
                  children: [
                    copiedId === activeImage.id ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                      lineNumber: 309,
                      columnNumber: 23
                    }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                      lineNumber: 311,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: copiedId === activeImage.id ? "Copied" : "Prompt" }, void 0, false, {
                      fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                      lineNumber: 313,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                  lineNumber: 304,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 302,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 271,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV("div", { className: "text-center p-8 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400", children: /* @__PURE__ */ jsxDEV(ImageIcon, { className: "w-8 h-8 opacity-70" }, void 0, false, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 320,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 319,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "font-cyber font-bold text-slate-300 text-sm", children: "NO ACTIVE RENDER" }, void 0, false, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 322,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 max-w-sm", children: "Select a prompt or type your vision on the left, then click Generate to synthesize an ultra-high definition image." }, void 0, false, {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 325,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 318,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 247,
          columnNumber: 11
        }, this),
        gallery.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-cyber font-semibold text-cyan-300 flex items-center justify-between", children: /* @__PURE__ */ jsxDEV("span", { children: [
            "RECENT CREATIONS (",
            gallery.length,
            ")"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 336,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 335,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2 overflow-x-auto pb-2 scrollbar-thin", children: gallery.map((img) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setActiveImage(img),
              className: `relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border transition-all ${activeImage?.id === img.id ? "border-cyan-400 ring-2 ring-cyan-500/40 scale-105" : "border-slate-800 opacity-70 hover:opacity-100"}`,
              children: /* @__PURE__ */ jsxDEV(
                "img",
                {
                  src: img.url,
                  alt: img.prompt,
                  referrerPolicy: "no-referrer",
                  className: "w-full h-full object-cover"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
                  lineNumber: 349,
                  columnNumber: 21
                },
                this
              )
            },
            img.id,
            false,
            {
              fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
              lineNumber: 340,
              columnNumber: 19
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
            lineNumber: 338,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
          lineNumber: 334,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
        lineNumber: 246,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ImageCreationStudio.tsx",
    lineNumber: 101,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkltYWdlQ3JlYXRpb25TdHVkaW8udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgU3BhcmtsZXMsIEltYWdlIGFzIEltYWdlSWNvbiwgRG93bmxvYWQsIENvcHksIENoZWNrLCBSZWZyZXNoQ3csIFdhbmQyLCBNYXhpbWl6ZTIsIFphcCwgTGF5ZXJzIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiO1xuaW1wb3J0IHsgR2VuZXJhdGVkSW1hZ2UsIE5lb25UaGVtZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5pbnRlcmZhY2UgSW1hZ2VDcmVhdGlvblN0dWRpb1Byb3BzIHtcbiAgb25JbnNlcnRUb0NoYXQ/OiAoaW1hZ2VVcmw6IHN0cmluZywgcHJvbXB0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRoZW1lPzogTmVvblRoZW1lO1xufVxuXG5jb25zdCBTVFlMRV9QUkVTRVRTID0gW1xuICB7IGlkOiBcIm5lb24tY3liZXJwdW5rXCIsIG5hbWU6IFwiTmVvbiBDeWJlcnB1bmtcIiwgaWNvbjogXCLimqFcIiwgZGVzYzogXCJHbG93aW5nIGN5YW4gJiB2aW9sZXQgbGlnaHRpbmcsIDhrIG9jdGFuZVwiIH0sXG4gIHsgaWQ6IFwiM2QtcmVuZGVyXCIsIG5hbWU6IFwiM0QgT2N0YW5lIFJlbmRlclwiLCBpY29uOiBcIvCfp4pcIiwgZGVzYzogXCJSYXl0cmFjZWQgZ2xhc3MgJiBtZXRhbGxpYyBzaGFkZXJzXCIgfSxcbiAgeyBpZDogXCJob2xvZ3JhbVwiLCBuYW1lOiBcIlNjaS1GaSBIb2xvZ3JhbVwiLCBpY29uOiBcIvCfjJBcIiwgZGVzYzogXCJUcmFuc2x1Y2VudCB3aXJlZnJhbWUgcGFydGljbGUgZmllbGRcIiB9LFxuICB7IGlkOiBcInBob3RvcmVhbGlzdGljXCIsIG5hbWU6IFwiQ2luZW1hdGljIFNjaS1GaVwiLCBpY29uOiBcIvCfk7hcIiwgZGVzYzogXCI4NW1tIGxlbnMsIHNoYXJwIHBob3RvZ3JhcGhpYyBmaWRlbGl0eVwiIH0sXG5dO1xuXG5jb25zdCBBU1BFQ1RfUkFUSU9TID0gW1xuICB7IGlkOiBcIjE6MVwiLCBsYWJlbDogXCJTcXVhcmUgKDE6MSlcIiwgaWNvbjogXCLilqBcIiB9LFxuICB7IGlkOiBcIjE2OjlcIiwgbGFiZWw6IFwiTGFuZHNjYXBlICgxNjo5KVwiLCBpY29uOiBcIuKWrFwiIH0sXG4gIHsgaWQ6IFwiOToxNlwiLCBsYWJlbDogXCJQb3J0cmFpdCAoOToxNilcIiwgaWNvbjogXCLilq5cIiB9LFxuICB7IGlkOiBcIjQ6M1wiLCBsYWJlbDogXCJTdGFuZGFyZCAoNDozKVwiLCBpY29uOiBcIuKWsFwiIH0sXG5dO1xuXG5jb25zdCBQUk9NUFRfU1VHR0VTVElPTlMgPSBbXG4gIFwiRnV0dXJpc3RpYyBjeWJlcnB1bmsgY2l0eSBhdCBuaWdodCB3aXRoIG5lb24gaG9sb2dyYXBoaWMgc2t5c2NyYXBlcnMgYW5kIGZseWluZyB2ZWhpY2xlc1wiLFxuICBcIkdsb3dpbmcgbmVvbiBxdWFudHVtIEFJIGNvcmUgd2l0aCBmbG9hdGluZyBnZW9tZXRyaWMgcmluZ3MgYW5kIG5ldXJhbCBwYXJ0aWNsZSBzdHJlYW1cIixcbiAgXCJTbGVlayBjeWJlcm5ldGljIGh1bWFub2lkIHdpdGggZ2xvd2luZyBsdW1pbmVzY2VudCBjeWFuIGNpcmN1aXRzIGFuZCBnbGFzcyBhcm1vclwiLFxuICBcIlN1cnJlYWwgM0QgY3J5c3RhbGxpbmUgYmlvbWUgd2l0aCBiaW9sdW1pbmVzY2VudCBmbG9yYSBhbmQgZmxvYXRpbmcgcG9seWdvbiBpc2xhbmRzXCIsXG4gIFwiSGlnaC10ZWNoIGZ1dHVyaXN0aWMgc3RhcnNoaXAgY29ja3BpdCBvdmVybG9va2luZyBhIG5lb24gaHlwZXJkcml2ZSB2b3J0ZXhcIixcbl07XG5cbmV4cG9ydCBjb25zdCBJbWFnZUNyZWF0aW9uU3R1ZGlvOiBSZWFjdC5GQzxJbWFnZUNyZWF0aW9uU3R1ZGlvUHJvcHM+ID0gKHtcbiAgb25JbnNlcnRUb0NoYXQsXG4gIHRoZW1lID0gXCJjeWFuLWNvcmVcIixcbn0pID0+IHtcbiAgY29uc3QgW3Byb21wdCwgc2V0UHJvbXB0XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbc2VsZWN0ZWRTdHlsZSwgc2V0U2VsZWN0ZWRTdHlsZV0gPSB1c2VTdGF0ZShcIm5lb24tY3liZXJwdW5rXCIpO1xuICBjb25zdCBbYXNwZWN0UmF0aW8sIHNldEFzcGVjdFJhdGlvXSA9IHVzZVN0YXRlKFwiMToxXCIpO1xuICBjb25zdCBbaXNHZW5lcmF0aW5nLCBzZXRJc0dlbmVyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZ2FsbGVyeSwgc2V0R2FsbGVyeV0gPSB1c2VTdGF0ZTxHZW5lcmF0ZWRJbWFnZVtdPihbXSk7XG4gIGNvbnN0IFthY3RpdmVJbWFnZSwgc2V0QWN0aXZlSW1hZ2VdID0gdXNlU3RhdGU8R2VuZXJhdGVkSW1hZ2UgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2NvcGllZElkLCBzZXRDb3BpZWRJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBoYW5kbGVHZW5lcmF0ZSA9IGFzeW5jIChjdXN0b21Qcm9tcHQ/OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB0ZXh0VG9HZW5lcmF0ZSA9IGN1c3RvbVByb21wdCB8fCBwcm9tcHQ7XG4gICAgaWYgKCF0ZXh0VG9HZW5lcmF0ZS50cmltKCkpIHJldHVybjtcblxuICAgIHNldElzR2VuZXJhdGluZyh0cnVlKTtcbiAgICBzZXRFcnJvcihudWxsKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcIi9hcGkvaW1hZ2UvZ2VuZXJhdGVcIiwge1xuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBwcm9tcHQ6IHRleHRUb0dlbmVyYXRlLFxuICAgICAgICAgIHN0eWxlOiBzZWxlY3RlZFN0eWxlLFxuICAgICAgICAgIGFzcGVjdFJhdGlvLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLmVycm9yIHx8IFwiRmFpbGVkIHRvIGdlbmVyYXRlIGltYWdlLlwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3SW1nOiBHZW5lcmF0ZWRJbWFnZSA9IHtcbiAgICAgICAgaWQ6IFwiaW1nX1wiICsgRGF0ZS5ub3coKSxcbiAgICAgICAgdXJsOiBkYXRhLmltYWdlVXJsLFxuICAgICAgICBwcm9tcHQ6IHRleHRUb0dlbmVyYXRlLFxuICAgICAgICBzdHlsZTogc2VsZWN0ZWRTdHlsZSxcbiAgICAgICAgYXNwZWN0UmF0aW8sXG4gICAgICAgIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgIH07XG5cbiAgICAgIHNldEdhbGxlcnkoKHByZXYpID0+IFtuZXdJbWcsIC4uLnByZXZdKTtcbiAgICAgIHNldEFjdGl2ZUltYWdlKG5ld0ltZyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbWFnZSBnZW4gZXJyb3I6XCIsIGVycik7XG4gICAgICBzZXRFcnJvcihlcnIubWVzc2FnZSB8fCBcIkZhaWxlZCB0byBnZW5lcmF0ZSBpbWFnZS5cIik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzR2VuZXJhdGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkID0gKGltZzogR2VuZXJhdGVkSW1hZ2UpID0+IHtcbiAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgbGluay5ocmVmID0gaW1nLnVybDtcbiAgICBsaW5rLmRvd25sb2FkID0gYGRvZGUtYWktJHtEYXRlLm5vdygpfS5wbmdgO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDb3B5UHJvbXB0ID0gKHA6IHN0cmluZywgaWQ6IHN0cmluZykgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHApO1xuICAgIHNldENvcGllZElkKGlkKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldENvcGllZElkKG51bGwpLCAyMDAwKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LTZ4bCBteC1hdXRvIHAtNCBtZDpwLTYgc3BhY2UteS02XCI+XG4gICAgICB7LyogU3R1ZGlvIEhlYWRlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IGJvcmRlci1iIGJvcmRlci1jeWFuLTUwMC8yMCBwYi00XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLWN5YW4tNTAwLzEwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzAgdGV4dC1jeWFuLTQwMFwiPlxuICAgICAgICAgICAgICA8V2FuZDIgY2xhc3NOYW1lPVwidy01IGgtNSBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgbWQ6dGV4dC0yeGwgZm9udC1jeWJlciBmb250LWJvbGQgdHJhY2tpbmctd2lkZSB0ZXh0LXRyYW5zcGFyZW50IGJnLWNsaXAtdGV4dCBiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi0zMDAgdmlhLXRlYWwtMjAwIHRvLWZ1Y2hzaWEtNDAwXCI+XG4gICAgICAgICAgICAgICAgRE9ERSBBSSBWSVNJT04gU1RVRElPXG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgR2VuZXJhdGl2ZSBOZXVyYWwgU3ludGhlc2l6ZXIgcG93ZXJlZCBieSBHZW1pbmkgSW1hZ2UgRW5naW5lXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1tb25vIHRleHQtY3lhbi00MDAgYmctY3lhbi05NTAvNDAgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzMwXCI+XG4gICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgPHNwYW4+RW5naW5lOiBIaWdoLUZpZGVsaXR5IDFLIE9jdGFuZSBTeW50aDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1haW4gR2VuZXJhdG9yIFNlY3Rpb24gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02XCI+XG4gICAgICAgIHsvKiBMZWZ0IENvbnRyb2xzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgc3BhY2UteS01IGJnLVsjMDgwYzE4XSBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzMwIHJvdW5kZWQtMnhsIHAtNSBzaGFkb3cteGxcIj5cbiAgICAgICAgICB7LyogUHJvbXB0IGlucHV0ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWN5YmVyIGZvbnQtc2VtaWJvbGQgdGV4dC1jeWFuLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4+UFJPTVBUIE1BVFJJWDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1zYW5zXCI+QmUgZGVzY3JpcHRpdmU8L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICB2YWx1ZT17cHJvbXB0fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UHJvbXB0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkRlc2NyaWJlIHlvdXIgM0QgY3liZXJwdW5rIHNjZW5lLCBmdXR1cmlzdGljIGVudGl0eSwgbmVvbiBhcnRpZmFjdC4uLlwiXG4gICAgICAgICAgICAgICAgcm93cz17NH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNTA4MTJdIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGZvY3VzOmJvcmRlci1jeWFuLTQwMCByb3VuZGVkLXhsIHAtMyB0ZXh0LXNtIHRleHQtc2xhdGUtMTAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNTAwIGZvY3VzOm91dGxpbmUtbm9uZSB0cmFuc2l0aW9uLWFsbCByZXNpemUtbm9uZSBzaGFkb3ctaW5uZXJcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUXVpY2sgU3VnZ2VzdGlvbnMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICBRdWljayBJbnNwaXJhdGlvblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAge1BST01QVF9TVUdHRVNUSU9OUy5tYXAoKHMsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UHJvbXB0KHMpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1sZWZ0IHB4LTIuNSBweS0xIHJvdW5kZWQtbWQgYmctc2xhdGUtODAwLzgwIGhvdmVyOmJnLWN5YW4tOTUwLzYwIGhvdmVyOnRleHQtY3lhbi0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAvNjAgdHJhbnNpdGlvbi1hbGwgdHJ1bmNhdGUgbWF4LXctZnVsbFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3Muc2xpY2UoMCwgNDIpfS4uLlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFN0eWxlIFNlbGVjdG9yICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWN5YmVyIGZvbnQtc2VtaWJvbGQgdGV4dC1jeWFuLTMwMFwiPlxuICAgICAgICAgICAgICBBRVNUSEVUSUMgUFJFU0VUXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yXCI+XG4gICAgICAgICAgICAgIHtTVFlMRV9QUkVTRVRTLm1hcCgoc3QpID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e3N0LmlkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRTdHlsZShzdC5pZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIuNSByb3VuZGVkLXhsIHRleHQtbGVmdCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTdHlsZSA9PT0gc3QuaWRcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiYmctY3lhbi01MDAvMTUgYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0yMDAgbmVvbi1nbG93LWN5YW5cIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJiZy1bIzA2MDkxNF0gYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwXCJcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3N0Lmljb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57c3QubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgbXQtMSBsaW5lLWNsYW1wLTFcIj57c3QuZGVzY308L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBBc3BlY3QgUmF0aW8gU2VsZWN0b3IgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtY3liZXIgZm9udC1zZW1pYm9sZCB0ZXh0LWN5YW4tMzAwXCI+XG4gICAgICAgICAgICAgIEZSQU1FIFJBVElPXG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy00IGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAge0FTUEVDVF9SQVRJT1MubWFwKChhcikgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17YXIuaWR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBc3BlY3RSYXRpbyhhci5pZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0yIHB4LTEgdGV4dC1jZW50ZXIgcm91bmRlZC1sZyBib3JkZXIgdGV4dC14cyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICBhc3BlY3RSYXRpbyA9PT0gYXIuaWRcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiYmctY3lhbi01MDAvMjAgYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0zMDAgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiYmctWyMwNjA5MTRdIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDBcIlxuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzXCI+e2FyLmljb259PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIG10LTAuNVwiPnthci5pZH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBFcnJvciBub3RpY2UgKi99XG4gICAgICAgICAge2Vycm9yICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctcm9zZS05NTAvNTAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC81MCB0ZXh0LXJvc2UtMzAwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAge2Vycm9yfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBHZW5lcmF0ZSBCdXR0b24gKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlR2VuZXJhdGUoKX1cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0dlbmVyYXRpbmcgfHwgIXByb21wdC50cmltKCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgcHktMyBweC00IHJvdW5kZWQteGwgZm9udC1jeWJlciBmb250LWJvbGQgdGV4dC1zbSB0cmFja2luZy13aWRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICBpc0dlbmVyYXRpbmcgfHwgIXByb21wdC50cmltKClcbiAgICAgICAgICAgICAgICA/IFwiYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNTAwIGN1cnNvci1ub3QtYWxsb3dlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICAgICAgOiBcImJnLWdyYWRpZW50LXRvLXIgZnJvbS1jeWFuLTUwMCB0by1ibHVlLTYwMCBob3Zlcjpmcm9tLWN5YW4tNDAwIGhvdmVyOnRvLWJsdWUtNTAwIHRleHQtc2xhdGUtOTUwIHNoYWRvdy1sZyBuZW9uLWdsb3ctY3lhbiBhY3RpdmU6c2NhbGUtWzAuOThdXCJcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc0dlbmVyYXRpbmcgPyAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9XCJ3LTQgaC00IGFuaW1hdGUtc3BpbiB0ZXh0LXNsYXRlLTk1MFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+U1lOVEhFU0laSU5HIE5FVVJBTCBWSVNVQUwuLi48L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNsYXRlLTk1MCBmaWxsLXNsYXRlLTk1MFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+R0VORVJBVEUgQUkgSU1BR0U8L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJpZ2h0IFByZXZpZXcgJiBBY3RpdmUgQ2FudmFzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgZmxleCBmbGV4LWNvbCBnYXAtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi1oLVs0MjBweF0gYmctWyMwNzBiMTZdIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzAgcm91bmRlZC0yeGwgcC00IGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBzaGFkb3ctMnhsXCI+XG4gICAgICAgICAgICB7LyogQ3liZXIgY29ybmVyIGFjY2VudHMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIGxlZnQtMiB3LTMgaC0zIGJvcmRlci10LTIgYm9yZGVyLWwtMiBib3JkZXItY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiByaWdodC0yIHctMyBoLTMgYm9yZGVyLXQtMiBib3JkZXItci0yIGJvcmRlci1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0yIGxlZnQtMiB3LTMgaC0zIGJvcmRlci1iLTIgYm9yZGVyLWwtMiBib3JkZXItY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMiByaWdodC0yIHctMyBoLTMgYm9yZGVyLWItMiBib3JkZXItci0yIGJvcmRlci1jeWFuLTQwMFwiIC8+XG5cbiAgICAgICAgICAgIHtpc0dlbmVyYXRpbmcgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgc3BhY2UteS00IHAtOFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy0yNCBoLTI0IG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCByb3VuZGVkLWZ1bGwgYm9yZGVyLTIgYm9yZGVyLWN5YW4tNTAwLzIwIGFuaW1hdGUtcGluZ1wiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTIgcm91bmRlZC1mdWxsIGJvcmRlci0yIGJvcmRlci1jeWFuLTQwMCBib3JkZXItdC10cmFuc3BhcmVudCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC02IHJvdW5kZWQtZnVsbCBiZy1jeWFuLTQwMC8yMCBibHVyLW1kXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtY3liZXIgZm9udC1ib2xkIHRleHQtY3lhbi0zMDAgdHJhY2tpbmctd2lkZXIgdGV4dC1iYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgIFJFTkRFUklORyBORVVSQUwgVklTSU9OXG4gICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0xIG1heC13LXhzIG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgQ29tcHV0aW5nIGRpZmZ1c2lvbiBsYXllcnMsIHZvbHVtZXRyaWMgbmVvbiByYXlzLCBhbmQgM0QgdGV4dHVyZXMuLi5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogYWN0aXZlSW1hZ2UgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZ3JvdXAgbWF4LWgtWzQ2MHB4XSBtYXgtdy1mdWxsIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItY3lhbi01MDAvNDAgc2hhZG93LTJ4bFwiPlxuICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICBzcmM9e2FjdGl2ZUltYWdlLnVybH1cbiAgICAgICAgICAgICAgICAgICAgYWx0PXthY3RpdmVJbWFnZS5wcm9tcHR9XG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtYXgtaC1bNDQwcHhdIHctYXV0byBvYmplY3QtY29udGFpbiByb3VuZGVkLXhsXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICB7LyogT3ZlcmxheSBidXR0b25zICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWJsYWNrLzYwIG9wYWNpdHktMCBncm91cC1ob3ZlcjpvcGFjaXR5LTEwMCB0cmFuc2l0aW9uLW9wYWNpdHkgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZURvd25sb2FkKGFjdGl2ZUltYWdlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMgYmctY3lhbi01MDAgdGV4dC1zbGF0ZS05NTAgcm91bmRlZC14bCBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGhvdmVyOmJnLWN5YW4tNDAwIHRyYW5zaXRpb24tY29sb3JzIHNoYWRvdy1sZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJEb3dubG9hZCBpbWFnZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14c1wiPkRvd25sb2FkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAge29uSW5zZXJ0VG9DaGF0ICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkluc2VydFRvQ2hhdChhY3RpdmVJbWFnZS51cmwsIGFjdGl2ZUltYWdlLnByb21wdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMgYmctZnVjaHNpYS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLXhsIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgaG92ZXI6YmctZnVjaHNpYS01MDAgdHJhbnNpdGlvbi1jb2xvcnMgc2hhZG93LWxnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiU2VuZCB0byBDaGF0XCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14c1wiPkRpc2N1c3MgaW4gQ2hhdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNTA4MTJdIHAtMyByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0cnVuY2F0ZSBmbGV4LTEgaXRhbGljXCI+XCJ7YWN0aXZlSW1hZ2UucHJvbXB0fVwiPC9wPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5UHJvbXB0KGFjdGl2ZUltYWdlLnByb21wdCwgYWN0aXZlSW1hZ2UuaWQpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LVsxMXB4XSB0ZXh0LWN5YW4tNDAwIGhvdmVyOnRleHQtY3lhbi0zMDAgcHgtMiBweS0xIGJnLWN5YW4tNTAwLzEwIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8yMCBmbGV4LXNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2NvcGllZElkID09PSBhY3RpdmVJbWFnZS5pZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2NvcGllZElkID09PSBhY3RpdmVJbWFnZS5pZCA/IFwiQ29waWVkXCIgOiBcIlByb21wdFwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcC04IHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNiBoLTE2IHJvdW5kZWQtMnhsIGJnLWN5YW4tNTAwLzEwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbXgtYXV0byB0ZXh0LWN5YW4tNDAwXCI+XG4gICAgICAgICAgICAgICAgICA8SW1hZ2VJY29uIGNsYXNzTmFtZT1cInctOCBoLTggb3BhY2l0eS03MFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWN5YmVyIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgICBOTyBBQ1RJVkUgUkVOREVSXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBtYXgtdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgU2VsZWN0IGEgcHJvbXB0IG9yIHR5cGUgeW91ciB2aXNpb24gb24gdGhlIGxlZnQsIHRoZW4gY2xpY2sgR2VuZXJhdGUgdG8gc3ludGhlc2l6ZSBhbiB1bHRyYS1oaWdoIGRlZmluaXRpb24gaW1hZ2UuXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogSGlzdG9yeSBHYWxsZXJ5ICovfVxuICAgICAgICAgIHtnYWxsZXJ5Lmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtY3liZXIgZm9udC1zZW1pYm9sZCB0ZXh0LWN5YW4tMzAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlJFQ0VOVCBDUkVBVElPTlMgKHtnYWxsZXJ5Lmxlbmd0aH0pPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yIG92ZXJmbG93LXgtYXV0byBwYi0yIHNjcm9sbGJhci10aGluXCI+XG4gICAgICAgICAgICAgICAge2dhbGxlcnkubWFwKChpbWcpID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbWcuaWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZUltYWdlKGltZyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIGZsZXgtc2hyaW5rLTAgdy0yMCBoLTIwIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUltYWdlPy5pZCA9PT0gaW1nLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwiYm9yZGVyLWN5YW4tNDAwIHJpbmctMiByaW5nLWN5YW4tNTAwLzQwIHNjYWxlLTEwNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiYm9yZGVyLXNsYXRlLTgwMCBvcGFjaXR5LTcwIGhvdmVyOm9wYWNpdHktMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICBzcmM9e2ltZy51cmx9XG4gICAgICAgICAgICAgICAgICAgICAgYWx0PXtpbWcucHJvbXB0fVxuICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUEwR2MsU0E2SEEsVUE3SEE7QUExR2QsU0FBZ0IsZ0JBQWdCO0FBQ2hDLFNBQVMsVUFBVSxTQUFTLFdBQVcsVUFBVSxNQUFNLE9BQU8sV0FBVyxPQUFrQixLQUFLLGNBQWM7QUFROUcsTUFBTSxnQkFBZ0I7QUFBQSxFQUNwQixFQUFFLElBQUksa0JBQWtCLE1BQU0sa0JBQWtCLE1BQU0sS0FBSyxNQUFNLDRDQUE0QztBQUFBLEVBQzdHLEVBQUUsSUFBSSxhQUFhLE1BQU0sb0JBQW9CLE1BQU0sTUFBTSxNQUFNLHFDQUFxQztBQUFBLEVBQ3BHLEVBQUUsSUFBSSxZQUFZLE1BQU0sbUJBQW1CLE1BQU0sTUFBTSxNQUFNLHVDQUF1QztBQUFBLEVBQ3BHLEVBQUUsSUFBSSxrQkFBa0IsTUFBTSxvQkFBb0IsTUFBTSxNQUFNLE1BQU0seUNBQXlDO0FBQy9HO0FBRUEsTUFBTSxnQkFBZ0I7QUFBQSxFQUNwQixFQUFFLElBQUksT0FBTyxPQUFPLGdCQUFnQixNQUFNLElBQUk7QUFBQSxFQUM5QyxFQUFFLElBQUksUUFBUSxPQUFPLG9CQUFvQixNQUFNLElBQUk7QUFBQSxFQUNuRCxFQUFFLElBQUksUUFBUSxPQUFPLG1CQUFtQixNQUFNLElBQUk7QUFBQSxFQUNsRCxFQUFFLElBQUksT0FBTyxPQUFPLGtCQUFrQixNQUFNLElBQUk7QUFDbEQ7QUFFQSxNQUFNLHFCQUFxQjtBQUFBLEVBQ3pCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRU8sYUFBTSxzQkFBMEQsQ0FBQztBQUFBLEVBQ3RFO0FBQUEsRUFDQSxRQUFRO0FBQ1YsTUFBTTtBQUNKLFFBQU0sQ0FBQyxRQUFRLFNBQVMsSUFBSSxTQUFTLEVBQUU7QUFDdkMsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUksU0FBUyxnQkFBZ0I7QUFDbkUsUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQVMsS0FBSztBQUNwRCxRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBUyxLQUFLO0FBQ3RELFFBQU0sQ0FBQyxPQUFPLFFBQVEsSUFBSSxTQUF3QixJQUFJO0FBQ3RELFFBQU0sQ0FBQyxTQUFTLFVBQVUsSUFBSSxTQUEyQixDQUFDLENBQUM7QUFDM0QsUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQWdDLElBQUk7QUFDMUUsUUFBTSxDQUFDLFVBQVUsV0FBVyxJQUFJLFNBQXdCLElBQUk7QUFFNUQsUUFBTSxpQkFBaUIsT0FBTyxpQkFBMEI7QUFDdEQsVUFBTSxpQkFBaUIsZ0JBQWdCO0FBQ3ZDLFFBQUksQ0FBQyxlQUFlLEtBQUssRUFBRztBQUU1QixvQkFBZ0IsSUFBSTtBQUNwQixhQUFTLElBQUk7QUFFYixRQUFJO0FBQ0YsWUFBTSxNQUFNLE1BQU0sTUFBTSx1QkFBdUI7QUFBQSxRQUM3QyxRQUFRO0FBQUEsUUFDUixTQUFTLEVBQUUsZ0JBQWdCLG1CQUFtQjtBQUFBLFFBQzlDLE1BQU0sS0FBSyxVQUFVO0FBQUEsVUFDbkIsUUFBUTtBQUFBLFVBQ1IsT0FBTztBQUFBLFVBQ1A7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNILENBQUM7QUFFRCxZQUFNLE9BQU8sTUFBTSxJQUFJLEtBQUs7QUFDNUIsVUFBSSxDQUFDLElBQUksSUFBSTtBQUNYLGNBQU0sSUFBSSxNQUFNLEtBQUssU0FBUywyQkFBMkI7QUFBQSxNQUMzRDtBQUVBLFlBQU0sU0FBeUI7QUFBQSxRQUM3QixJQUFJLFNBQVMsS0FBSyxJQUFJO0FBQUEsUUFDdEIsS0FBSyxLQUFLO0FBQUEsUUFDVixRQUFRO0FBQUEsUUFDUixPQUFPO0FBQUEsUUFDUDtBQUFBLFFBQ0EsV0FBVyxLQUFLLElBQUk7QUFBQSxNQUN0QjtBQUVBLGlCQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDdEMscUJBQWUsTUFBTTtBQUFBLElBQ3ZCLFNBQVMsS0FBVTtBQUNqQixjQUFRLE1BQU0sb0JBQW9CLEdBQUc7QUFDckMsZUFBUyxJQUFJLFdBQVcsMkJBQTJCO0FBQUEsSUFDckQsVUFBRTtBQUNBLHNCQUFnQixLQUFLO0FBQUEsSUFDdkI7QUFBQSxFQUNGO0FBRUEsUUFBTSxpQkFBaUIsQ0FBQyxRQUF3QjtBQUM5QyxVQUFNLE9BQU8sU0FBUyxjQUFjLEdBQUc7QUFDdkMsU0FBSyxPQUFPLElBQUk7QUFDaEIsU0FBSyxXQUFXLFdBQVcsS0FBSyxJQUFJLENBQUM7QUFDckMsU0FBSyxNQUFNO0FBQUEsRUFDYjtBQUVBLFFBQU0sbUJBQW1CLENBQUMsR0FBVyxPQUFlO0FBQ2xELGNBQVUsVUFBVSxVQUFVLENBQUM7QUFDL0IsZ0JBQVksRUFBRTtBQUNkLGVBQVcsTUFBTSxZQUFZLElBQUksR0FBRyxHQUFJO0FBQUEsRUFDMUM7QUFFQSxTQUNFLHVCQUFDLFNBQUksV0FBVSxpREFFYjtBQUFBLDJCQUFDLFNBQUksV0FBVSxvR0FDYjtBQUFBLDZCQUFDLFNBQ0MsaUNBQUMsU0FBSSxXQUFVLDZCQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLHlFQUNiLGlDQUFDLFNBQU0sV0FBVSwyQkFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF5QyxLQUQzQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBLHVCQUFDLFNBQ0M7QUFBQSxpQ0FBQyxRQUFHLFdBQVUsbUpBQWtKLHFDQUFoSztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxPQUFFLFdBQVUsaUNBQWdDLDRFQUE3QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsYUFORjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBT0E7QUFBQSxXQVhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFZQSxLQWJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFjQTtBQUFBLE1BRUEsdUJBQUMsU0FBSSxXQUFVLDJIQUNiO0FBQUEsK0JBQUMsT0FBSSxXQUFVLGlCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBNkI7QUFBQSxRQUM3Qix1QkFBQyxVQUFLLHFEQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBMkM7QUFBQSxXQUY3QztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBR0E7QUFBQSxTQXBCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBcUJBO0FBQUEsSUFHQSx1QkFBQyxTQUFJLFdBQVUsMENBRWI7QUFBQSw2QkFBQyxTQUFJLFdBQVUsNEZBRWI7QUFBQSwrQkFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGlDQUFDLFdBQU0sV0FBVSxvRkFDZjtBQUFBLG1DQUFDLFVBQUssNkJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBbUI7QUFBQSxZQUNuQix1QkFBQyxVQUFLLFdBQVUsd0NBQXVDLDhCQUF2RDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFxRTtBQUFBLGVBRnZFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxVQUNBLHVCQUFDLFNBQUksV0FBVSxZQUNiO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxPQUFPO0FBQUEsY0FDUCxVQUFVLENBQUMsTUFBTSxVQUFVLEVBQUUsT0FBTyxLQUFLO0FBQUEsY0FDekMsYUFBWTtBQUFBLGNBQ1osTUFBTTtBQUFBLGNBQ04sV0FBVTtBQUFBO0FBQUEsWUFMWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNQSxLQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBUUE7QUFBQSxhQWJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFjQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSxXQUFVLGVBQ2I7QUFBQSxpQ0FBQyxTQUFJLFdBQVUscUVBQW9FLGlDQUFuRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxTQUFJLFdBQVUsMEJBQ1osNkJBQW1CLElBQUksQ0FBQyxHQUFHLFFBQzFCO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FFQyxTQUFTLE1BQU0sVUFBVSxDQUFDO0FBQUEsY0FDMUIsV0FBVTtBQUFBLGNBRVQ7QUFBQSxrQkFBRSxNQUFNLEdBQUcsRUFBRTtBQUFBLGdCQUFFO0FBQUE7QUFBQTtBQUFBLFlBSlg7QUFBQSxZQURQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNQSxDQUNELEtBVEg7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFVQTtBQUFBLGFBZEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWVBO0FBQUEsUUFHQSx1QkFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGlDQUFDLFdBQU0sV0FBVSxrREFBaUQsZ0NBQWxFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUNBLHVCQUFDLFNBQUksV0FBVSwwQkFDWix3QkFBYyxJQUFJLENBQUMsT0FDbEI7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUVDLFNBQVMsTUFBTSxpQkFBaUIsR0FBRyxFQUFFO0FBQUEsY0FDckMsV0FBVyxvREFDVCxrQkFBa0IsR0FBRyxLQUNqQixnRUFDQSxxRUFDTjtBQUFBLGNBRUE7QUFBQSx1Q0FBQyxTQUFJLFdBQVUsbURBQ2I7QUFBQSx5Q0FBQyxVQUFNLGFBQUcsUUFBVjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFlO0FBQUEsa0JBQ2YsdUJBQUMsVUFBTSxhQUFHLFFBQVY7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBZTtBQUFBLHFCQUZqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUdBO0FBQUEsZ0JBQ0EsdUJBQUMsU0FBSSxXQUFVLGdEQUFnRCxhQUFHLFFBQWxFO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXVFO0FBQUE7QUFBQTtBQUFBLFlBWmxFLEdBQUc7QUFBQSxZQURWO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFjQSxDQUNELEtBakJIO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBa0JBO0FBQUEsYUF0QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXVCQTtBQUFBLFFBR0EsdUJBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSxpQ0FBQyxXQUFNLFdBQVUsa0RBQWlELDJCQUFsRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxTQUFJLFdBQVUsNEJBQ1osd0JBQWMsSUFBSSxDQUFDLE9BQ2xCO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FFQyxTQUFTLE1BQU0sZUFBZSxHQUFHLEVBQUU7QUFBQSxjQUNuQyxXQUFXLDhFQUNULGdCQUFnQixHQUFHLEtBQ2YsMkRBQ0EsbUVBQ047QUFBQSxjQUVBO0FBQUEsdUNBQUMsU0FBSSxXQUFVLFdBQVcsYUFBRyxRQUE3QjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUFrQztBQUFBLGdCQUNsQyx1QkFBQyxTQUFJLFdBQVUsc0JBQXNCLGFBQUcsTUFBeEM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBMkM7QUFBQTtBQUFBO0FBQUEsWUFUdEMsR0FBRztBQUFBLFlBRFY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQVdBLENBQ0QsS0FkSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQWVBO0FBQUEsYUFuQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQW9CQTtBQUFBLFFBR0MsU0FDQyx1QkFBQyxTQUFJLFdBQVUsaUZBQ1osbUJBREg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsUUFJRjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsU0FBUyxNQUFNLGVBQWU7QUFBQSxZQUM5QixVQUFVLGdCQUFnQixDQUFDLE9BQU8sS0FBSztBQUFBLFlBQ3ZDLFdBQVcsaUlBQ1QsZ0JBQWdCLENBQUMsT0FBTyxLQUFLLElBQ3pCLDJFQUNBLDhJQUNOO0FBQUEsWUFFQyx5QkFDQyxtQ0FDRTtBQUFBLHFDQUFDLGFBQVUsV0FBVSx5Q0FBckI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBMkQ7QUFBQSxjQUMzRCx1QkFBQyxVQUFLLDZDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQW1DO0FBQUEsaUJBRnJDO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0EsSUFFQSxtQ0FDRTtBQUFBLHFDQUFDLFlBQVMsV0FBVSwyQ0FBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBNEQ7QUFBQSxjQUM1RCx1QkFBQyxVQUFLLGlDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXVCO0FBQUEsaUJBRnpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQTtBQUFBLFVBbEJKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQW9CQTtBQUFBLFdBakhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFrSEE7QUFBQSxNQUdBLHVCQUFDLFNBQUksV0FBVSxxQ0FDYjtBQUFBLCtCQUFDLFNBQUksV0FBVSw2SkFFYjtBQUFBLGlDQUFDLFNBQUksV0FBVSx5RUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFxRjtBQUFBLFVBQ3JGLHVCQUFDLFNBQUksV0FBVSwwRUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFzRjtBQUFBLFVBQ3RGLHVCQUFDLFNBQUksV0FBVSw0RUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF3RjtBQUFBLFVBQ3hGLHVCQUFDLFNBQUksV0FBVSw2RUFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF5RjtBQUFBLFVBRXhGLGVBQ0MsdUJBQUMsU0FBSSxXQUFVLDZCQUNiO0FBQUEsbUNBQUMsU0FBSSxXQUFVLDhCQUNiO0FBQUEscUNBQUMsU0FBSSxXQUFVLDRFQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXdGO0FBQUEsY0FDeEYsdUJBQUMsU0FBSSxXQUFVLDhGQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTBHO0FBQUEsY0FDMUcsdUJBQUMsU0FBSSxXQUFVLDBEQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXNFO0FBQUEsaUJBSHhFO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBSUE7QUFBQSxZQUNBLHVCQUFDLFNBQ0M7QUFBQSxxQ0FBQyxRQUFHLFdBQVUsK0RBQThELHVDQUE1RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBO0FBQUEsY0FDQSx1QkFBQyxPQUFFLFdBQVUsZ0RBQStDLG9GQUE1RDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVBO0FBQUEsaUJBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFPQTtBQUFBLGVBYkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFjQSxJQUNFLGNBQ0YsdUJBQUMsU0FBSSxXQUFVLGlFQUNiO0FBQUEsbUNBQUMsU0FBSSxXQUFVLDJHQUNiO0FBQUE7QUFBQSxnQkFBQztBQUFBO0FBQUEsa0JBQ0MsS0FBSyxZQUFZO0FBQUEsa0JBQ2pCLEtBQUssWUFBWTtBQUFBLGtCQUNqQixnQkFBZTtBQUFBLGtCQUNmLFdBQVU7QUFBQTtBQUFBLGdCQUpaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQUtBO0FBQUEsY0FFQSx1QkFBQyxTQUFJLFdBQVUsNEhBQ2I7QUFBQTtBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFDQyxTQUFTLE1BQU0sZUFBZSxXQUFXO0FBQUEsb0JBQ3pDLFdBQVU7QUFBQSxvQkFDVixPQUFNO0FBQUEsb0JBRU47QUFBQSw2Q0FBQyxZQUFTLFdBQVUsYUFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFBOEI7QUFBQSxzQkFDOUIsdUJBQUMsVUFBSyxXQUFVLFdBQVUsd0JBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQWtDO0FBQUE7QUFBQTtBQUFBLGtCQU5wQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBT0E7QUFBQSxnQkFDQyxrQkFDQztBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFDQyxTQUFTLE1BQU0sZUFBZSxZQUFZLEtBQUssWUFBWSxNQUFNO0FBQUEsb0JBQ2pFLFdBQVU7QUFBQSxvQkFDVixPQUFNO0FBQUEsb0JBRU47QUFBQSw2Q0FBQyxVQUFPLFdBQVUsYUFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFBNEI7QUFBQSxzQkFDNUIsdUJBQUMsVUFBSyxXQUFVLFdBQVUsK0JBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBQXlDO0FBQUE7QUFBQTtBQUFBLGtCQU4zQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBT0E7QUFBQSxtQkFqQko7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFtQkE7QUFBQSxpQkEzQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkE0QkE7QUFBQSxZQUVBLHVCQUFDLFNBQUksV0FBVSw2SEFDYjtBQUFBLHFDQUFDLE9BQUUsV0FBVSwwQkFBeUI7QUFBQTtBQUFBLGdCQUFFLFlBQVk7QUFBQSxnQkFBTztBQUFBLG1CQUEzRDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE0RDtBQUFBLGNBQzVEO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUNDLFNBQVMsTUFBTSxpQkFBaUIsWUFBWSxRQUFRLFlBQVksRUFBRTtBQUFBLGtCQUNsRSxXQUFVO0FBQUEsa0JBRVQ7QUFBQSxpQ0FBYSxZQUFZLEtBQ3hCLHVCQUFDLFNBQU0sV0FBVSw4QkFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFBNEMsSUFFNUMsdUJBQUMsUUFBSyxXQUFVLGFBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsMkJBQTBCO0FBQUEsb0JBRTVCLHVCQUFDLFVBQU0sdUJBQWEsWUFBWSxLQUFLLFdBQVcsWUFBaEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFBeUQ7QUFBQTtBQUFBO0FBQUEsZ0JBVDNEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQVVBO0FBQUEsaUJBWkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFhQTtBQUFBLGVBNUNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBNkNBLElBRUEsdUJBQUMsU0FBSSxXQUFVLDZCQUNiO0FBQUEsbUNBQUMsU0FBSSxXQUFVLHlIQUNiLGlDQUFDLGFBQVUsV0FBVSx3QkFBckI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBMEMsS0FENUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSxXQUFVLCtDQUE4QyxnQ0FBN0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLFlBQ0EsdUJBQUMsT0FBRSxXQUFVLG1DQUFrQyxrSUFBL0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLGVBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFVQTtBQUFBLGFBakZKO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFtRkE7QUFBQSxRQUdDLFFBQVEsU0FBUyxLQUNoQix1QkFBQyxTQUFJLFdBQVUsYUFDYjtBQUFBLGlDQUFDLFNBQUksV0FBVSxvRkFDYixpQ0FBQyxVQUFLO0FBQUE7QUFBQSxZQUFtQixRQUFRO0FBQUEsWUFBTztBQUFBLGVBQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXlDLEtBRDNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUNBLHVCQUFDLFNBQUksV0FBVSxrREFDWixrQkFBUSxJQUFJLENBQUMsUUFDWjtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBRUMsU0FBUyxNQUFNLGVBQWUsR0FBRztBQUFBLGNBQ2pDLFdBQVcscUZBQ1QsYUFBYSxPQUFPLElBQUksS0FDcEIsc0RBQ0EsK0NBQ047QUFBQSxjQUVBO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUNDLEtBQUssSUFBSTtBQUFBLGtCQUNULEtBQUssSUFBSTtBQUFBLGtCQUNULGdCQUFlO0FBQUEsa0JBQ2YsV0FBVTtBQUFBO0FBQUEsZ0JBSlo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBS0E7QUFBQTtBQUFBLFlBYkssSUFBSTtBQUFBLFlBRFg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQWVBLENBQ0QsS0FsQkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFtQkE7QUFBQSxhQXZCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBd0JBO0FBQUEsV0FoSEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWtIQTtBQUFBLFNBek9GO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0EwT0E7QUFBQSxPQXBRRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBcVFBO0FBRUo7IiwibmFtZXMiOltdfQ==