import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=df3e6907"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=df3e6907"; const useState = __vite__cjsImport1_react["useState"];
import {
  Plus,
  MessageSquare,
  Trash2,
  Globe,
  Youtube,
  Code2,
  Wand2,
  Volume2,
  VolumeX,
  Cpu,
  Palette,
  Box,
  X,
  Download,
  FileArchive
} from "/node_modules/.vite/deps/lucide-react.js?v=df3e6907";
export const Sidebar = ({
  isOpen,
  onClose,
  sessions,
  currentSessionId,
  onSelectSession,
  onNewSession,
  onDeleteSession,
  activeMode,
  onChangeMode,
  theme,
  onChangeTheme,
  model3DType,
  onChangeModel3D,
  voiceConfig,
  onUpdateVoiceConfig,
  onOpenImageStudio
}) => {
  const [downloadingZip, setDownloadingZip] = useState(false);
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
      console.warn("Using client zip fallback in sidebar:", err);
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
  const THEMES = [
    { id: "cyan-core", label: "Cyan Core", color: "bg-cyan-400" },
    { id: "magenta-pulse", label: "Magenta Pulse", color: "bg-fuchsia-500" },
    { id: "matrix-green", label: "Matrix Green", color: "bg-emerald-400" },
    { id: "solar-amber", label: "Solar Amber", color: "bg-amber-400" }
  ];
  const MODELS_3D = [
    { id: "dodecahedron", label: "Dodecahedron" },
    { id: "neural-sphere", label: "Neural Sphere" },
    { id: "torus-knot", label: "Torus Knot" },
    { id: "quantum-ring", label: "Quantum Ring" }
  ];
  const MODES = [
    { id: "general", label: "World Intelligence", icon: Globe, desc: "Live Google Search & Web data" },
    { id: "youtube", label: "YouTube Intelligence", icon: Youtube, desc: "Video data & channel queries" },
    { id: "code", label: "3D & Cyber Code", icon: Code2, desc: "Three.js, algorithms & engines" },
    { id: "research", label: "Deep Research", icon: Cpu, desc: "Citations & scientific papers" }
  ];
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    isOpen && /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden",
        onClick: onClose
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/Sidebar.tsx",
        lineNumber: 116,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      "aside",
      {
        id: "dode-ai-sidebar",
        className: `fixed top-0 bottom-0 left-0 z-40 w-72 md:w-80 bg-[#060914] border-r border-cyan-500/20 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} shadow-2xl overflow-hidden`,
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-b border-cyan-500/20 bg-[#050711] flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg neon-glow-cyan flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full bg-[#050814] rounded-[10px] flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Box, { className: "w-5 h-5 text-cyan-300 animate-spin-slow" }, void 0, false, {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 134,
                columnNumber: 17
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 133,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 132,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV("h1", { className: "font-cyber font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400 tracking-wider", children: "DODE AI" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 139,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30", children: "v3.7" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 142,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 138,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 font-mono tracking-tight", children: "CYBER-QUANTUM INTELLIGENCE" }, void 0, false, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 146,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 137,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 131,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onClose,
                className: "lg:hidden p-1 text-slate-400 hover:text-white rounded-lg",
                children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 156,
                  columnNumber: 13
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 152,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Sidebar.tsx",
            lineNumber: 130,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 space-y-2 border-b border-slate-800", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onNewSession(activeMode),
                className: "w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-cyber font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg neon-glow-cyan transition-all active:scale-[0.98]",
                children: [
                  /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4 stroke-[3]" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 166,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "NEW QUANTUM CHAT" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 167,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 162,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  onOpenImageStudio();
                  if (window.innerWidth < 1024) onClose();
                },
                className: "w-full py-2 px-3 rounded-xl bg-[#0d1428] hover:bg-fuchsia-950/50 border border-fuchsia-500/40 text-fuchsia-300 font-cyber text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group",
                children: [
                  /* @__PURE__ */ jsxDEV(Wand2, { className: "w-3.5 h-3.5 text-fuchsia-400 group-hover:rotate-12 transition-transform" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 177,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "AI IMAGE CREATOR STUDIO" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 178,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 170,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleDownloadZip,
                disabled: downloadingZip,
                className: "w-full py-2 px-3 rounded-xl bg-[#0b162c] hover:bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 font-cyber text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group",
                title: "Download complete project ZIP source code directly",
                children: downloadingZip ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(FileArchive, { className: "w-3.5 h-3.5 text-cyan-400 animate-spin" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 189,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "PACKING ZIP CODEBASE..." }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 190,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 188,
                  columnNumber: 15
                }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-cyan-400 group-hover:translate-y-0.5 transition-transform" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 194,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "DOWNLOAD PROJECT ZIP" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 195,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 193,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 181,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Sidebar.tsx",
            lineNumber: 161,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 border-b border-slate-800/80 space-y-1.5", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-cyber font-bold text-cyan-400 px-1 tracking-wider uppercase", children: "INTELLIGENCE PROTOCOL" }, void 0, false, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 203,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-1.5", children: MODES.map((m) => {
              const Icon = m.icon;
              const isActive = activeMode === m.id;
              return /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => onChangeMode(m.id),
                  className: `p-2 rounded-xl text-left border transition-all ${isActive ? "bg-cyan-500/15 border-cyan-400 text-cyan-200 neon-glow-cyan" : "bg-[#080d1a] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"}`,
                  children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 text-xs font-semibold", children: [
                    /* @__PURE__ */ jsxDEV(Icon, { className: `w-3.5 h-3.5 ${isActive ? "text-cyan-300" : "text-slate-400"}` }, void 0, false, {
                      fileName: "/app/applet/src/components/Sidebar.tsx",
                      lineNumber: 221,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: m.label.split(" ")[0] }, void 0, false, {
                      fileName: "/app/applet/src/components/Sidebar.tsx",
                      lineNumber: 222,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 220,
                    columnNumber: 19
                  }, this)
                },
                m.id,
                false,
                {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 211,
                  columnNumber: 17
                },
                this
              );
            }) }, void 0, false, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 206,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Sidebar.tsx",
            lineNumber: 202,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-cyber font-bold text-slate-500 px-1 py-1 uppercase tracking-wider flex items-center justify-between", children: /* @__PURE__ */ jsxDEV("span", { children: [
              "SAVED SESSIONS (",
              sessions.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 233,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 232,
              columnNumber: 11
            }, this),
            sessions.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-8 text-xs text-slate-600 font-mono", children: "No sessions active." }, void 0, false, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 237,
              columnNumber: 13
            }, this) : sessions.map((session) => {
              const isSelected = session.id === currentSessionId;
              return /* @__PURE__ */ jsxDEV(
                "div",
                {
                  onClick: () => {
                    onSelectSession(session.id);
                    if (window.innerWidth < 1024) onClose();
                  },
                  className: `group flex items-center justify-between p-2.5 rounded-xl cursor-pointer border text-xs transition-all ${isSelected ? "bg-cyan-950/60 border-cyan-500/40 text-cyan-200 shadow-md" : "bg-[#080d1c]/40 border-transparent hover:bg-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-200"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxDEV(
                        MessageSquare,
                        {
                          className: `w-3.5 h-3.5 flex-shrink-0 ${isSelected ? "text-cyan-400" : "text-slate-500"}`
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/Sidebar.tsx",
                          lineNumber: 257,
                          columnNumber: 21
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV("span", { className: "truncate font-medium", children: session.title }, void 0, false, {
                        fileName: "/app/applet/src/components/Sidebar.tsx",
                        lineNumber: 262,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/Sidebar.tsx",
                      lineNumber: 256,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: (e) => onDeleteSession(session.id, e),
                        className: "opacity-0 group-hover:opacity-100 p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-all ml-1 flex-shrink-0",
                        title: "Delete Chat",
                        children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/Sidebar.tsx",
                          lineNumber: 270,
                          columnNumber: 21
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/Sidebar.tsx",
                        lineNumber: 265,
                        columnNumber: 19
                      },
                      this
                    )
                  ]
                },
                session.id,
                true,
                {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 244,
                  columnNumber: 17
                },
                this
              );
            })
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Sidebar.tsx",
            lineNumber: 231,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 border-t border-cyan-500/20 bg-[#050711] space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[10px] font-cyber text-slate-400 uppercase", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV(Palette, { className: "w-3 h-3 text-cyan-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 284,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Neon Aura" }, void 0, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 285,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 283,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-cyan-300", children: theme.replace("-", " ") }, void 0, false, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 287,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 282,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: THEMES.map((t) => /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => onChangeTheme(t.id),
                  className: `w-6 h-6 rounded-full ${t.color} transition-transform ${theme === t.id ? "ring-2 ring-white scale-110 shadow-lg" : "opacity-60 hover:opacity-100"}`,
                  title: t.label
                },
                t.id,
                false,
                {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 291,
                  columnNumber: 17
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 289,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 281,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[10px] font-cyber text-slate-400 uppercase", children: /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxDEV(Box, { className: "w-3 h-3 text-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 307,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "3D Hologram Mesh" }, void 0, false, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 308,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 306,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 305,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                "select",
                {
                  value: model3DType,
                  onChange: (e) => onChangeModel3D(e.target.value),
                  className: "w-full bg-[#080d1c] border border-slate-700 text-xs text-cyan-300 rounded-lg p-1.5 focus:outline-none focus:border-cyan-400 font-mono",
                  children: MODELS_3D.map((m) => /* @__PURE__ */ jsxDEV("option", { value: m.id, children: m.label }, m.id, false, {
                    fileName: "/app/applet/src/components/Sidebar.tsx",
                    lineNumber: 317,
                    columnNumber: 17
                  }, this))
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 311,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 304,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-1 border-t border-slate-800 text-xs text-slate-400", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-[11px]", children: [
                voiceConfig.autoSpeak ? /* @__PURE__ */ jsxDEV(Volume2, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 328,
                  columnNumber: 17
                }, this) : /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-3.5 h-3.5 text-slate-500" }, void 0, false, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 330,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Auto-Speak Output" }, void 0, false, {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 332,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Sidebar.tsx",
                lineNumber: 326,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: voiceConfig.autoSpeak,
                  onChange: (e) => onUpdateVoiceConfig({ autoSpeak: e.target.checked }),
                  className: "accent-cyan-500 cursor-pointer rounded"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Sidebar.tsx",
                  lineNumber: 334,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Sidebar.tsx",
              lineNumber: 325,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Sidebar.tsx",
            lineNumber: 279,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/Sidebar.tsx",
        lineNumber: 123,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Sidebar.tsx",
    lineNumber: 113,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpZGViYXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgUGx1cyxcbiAgTWVzc2FnZVNxdWFyZSxcbiAgVHJhc2gyLFxuICBHbG9iZSxcbiAgWW91dHViZSxcbiAgQ29kZTIsXG4gIFdhbmQyLFxuICBTcGFya2xlcyxcbiAgVm9sdW1lMixcbiAgVm9sdW1lWCxcbiAgU2V0dGluZ3MsXG4gIENwdSxcbiAgTGF5ZXJzLFxuICBQYWxldHRlLFxuICBCb3gsXG4gIFgsXG4gIFNlYXJjaCxcbiAgWmFwLFxuICBEb3dubG9hZCxcbiAgQ2hlY2ssXG4gIEZpbGVBcmNoaXZlLFxufSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBDaGF0U2Vzc2lvbiwgQUlNb2RlLCBOZW9uVGhlbWUsIE1vZGVsM0RUeXBlLCBWb2ljZUNvbmZpZyB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5pbnRlcmZhY2UgU2lkZWJhclByb3BzIHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBzZXNzaW9uczogQ2hhdFNlc3Npb25bXTtcbiAgY3VycmVudFNlc3Npb25JZDogc3RyaW5nO1xuICBvblNlbGVjdFNlc3Npb246IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk5ld1Nlc3Npb246IChtb2RlPzogQUlNb2RlKSA9PiB2b2lkO1xuICBvbkRlbGV0ZVNlc3Npb246IChpZDogc3RyaW5nLCBlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB2b2lkO1xuICBhY3RpdmVNb2RlOiBBSU1vZGU7XG4gIG9uQ2hhbmdlTW9kZTogKG1vZGU6IEFJTW9kZSkgPT4gdm9pZDtcbiAgdGhlbWU6IE5lb25UaGVtZTtcbiAgb25DaGFuZ2VUaGVtZTogKHRoZW1lOiBOZW9uVGhlbWUpID0+IHZvaWQ7XG4gIG1vZGVsM0RUeXBlOiBNb2RlbDNEVHlwZTtcbiAgb25DaGFuZ2VNb2RlbDNEOiAobW9kZWw6IE1vZGVsM0RUeXBlKSA9PiB2b2lkO1xuICB2b2ljZUNvbmZpZzogVm9pY2VDb25maWc7XG4gIG9uVXBkYXRlVm9pY2VDb25maWc6IChjb25maWc6IFBhcnRpYWw8Vm9pY2VDb25maWc+KSA9PiB2b2lkO1xuICBvbk9wZW5JbWFnZVN0dWRpbzogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IFNpZGViYXI6IFJlYWN0LkZDPFNpZGViYXJQcm9wcz4gPSAoe1xuICBpc09wZW4sXG4gIG9uQ2xvc2UsXG4gIHNlc3Npb25zLFxuICBjdXJyZW50U2Vzc2lvbklkLFxuICBvblNlbGVjdFNlc3Npb24sXG4gIG9uTmV3U2Vzc2lvbixcbiAgb25EZWxldGVTZXNzaW9uLFxuICBhY3RpdmVNb2RlLFxuICBvbkNoYW5nZU1vZGUsXG4gIHRoZW1lLFxuICBvbkNoYW5nZVRoZW1lLFxuICBtb2RlbDNEVHlwZSxcbiAgb25DaGFuZ2VNb2RlbDNELFxuICB2b2ljZUNvbmZpZyxcbiAgb25VcGRhdGVWb2ljZUNvbmZpZyxcbiAgb25PcGVuSW1hZ2VTdHVkaW8sXG59KSA9PiB7XG4gIGNvbnN0IFtkb3dubG9hZGluZ1ppcCwgc2V0RG93bmxvYWRpbmdaaXBdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkWmlwID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldERvd25sb2FkaW5nWmlwKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiL2FwaS9kb3dubG9hZC16aXBcIik7XG4gICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgICAgY29uc3QgeyBzYXZlQXMgfSA9IGF3YWl0IGltcG9ydChcImZpbGUtc2F2ZXJcIik7XG4gICAgICAgIHNhdmVBcyhibG9iLCBgZG9kZS1haS1zb3VyY2UtJHtEYXRlLm5vdygpfS56aXBgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlNlcnZlciB6aXAgZmFpbGVkLCB1c2luZyBjbGllbnQgZmFsbGJhY2tcIik7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIlVzaW5nIGNsaWVudCB6aXAgZmFsbGJhY2sgaW4gc2lkZWJhcjpcIiwgZXJyKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZG93bmxvYWRQcm9qZWN0WmlwQ2xpZW50U2lkZSB9ID0gYXdhaXQgaW1wb3J0KFwiLi4vdXRpbHMvemlwQnVuZGxlXCIpO1xuICAgICAgICBhd2FpdCBkb3dubG9hZFByb2plY3RaaXBDbGllbnRTaWRlKCk7XG4gICAgICB9IGNhdGNoIChjbGllbnRFcnIpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkNsaWVudCB6aXAgZG93bmxvYWQgZXJyb3I6XCIsIGNsaWVudEVycik7XG4gICAgICAgIHdpbmRvdy5vcGVuKFwiL2FwaS9kb3dubG9hZC16aXBcIiwgXCJfYmxhbmtcIik7XG4gICAgICB9XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldERvd25sb2FkaW5nWmlwKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgVEhFTUVTOiB7IGlkOiBOZW9uVGhlbWU7IGxhYmVsOiBzdHJpbmc7IGNvbG9yOiBzdHJpbmcgfVtdID0gW1xuICAgIHsgaWQ6IFwiY3lhbi1jb3JlXCIsIGxhYmVsOiBcIkN5YW4gQ29yZVwiLCBjb2xvcjogXCJiZy1jeWFuLTQwMFwiIH0sXG4gICAgeyBpZDogXCJtYWdlbnRhLXB1bHNlXCIsIGxhYmVsOiBcIk1hZ2VudGEgUHVsc2VcIiwgY29sb3I6IFwiYmctZnVjaHNpYS01MDBcIiB9LFxuICAgIHsgaWQ6IFwibWF0cml4LWdyZWVuXCIsIGxhYmVsOiBcIk1hdHJpeCBHcmVlblwiLCBjb2xvcjogXCJiZy1lbWVyYWxkLTQwMFwiIH0sXG4gICAgeyBpZDogXCJzb2xhci1hbWJlclwiLCBsYWJlbDogXCJTb2xhciBBbWJlclwiLCBjb2xvcjogXCJiZy1hbWJlci00MDBcIiB9LFxuICBdO1xuXG4gIGNvbnN0IE1PREVMU18zRDogeyBpZDogTW9kZWwzRFR5cGU7IGxhYmVsOiBzdHJpbmcgfVtdID0gW1xuICAgIHsgaWQ6IFwiZG9kZWNhaGVkcm9uXCIsIGxhYmVsOiBcIkRvZGVjYWhlZHJvblwiIH0sXG4gICAgeyBpZDogXCJuZXVyYWwtc3BoZXJlXCIsIGxhYmVsOiBcIk5ldXJhbCBTcGhlcmVcIiB9LFxuICAgIHsgaWQ6IFwidG9ydXMta25vdFwiLCBsYWJlbDogXCJUb3J1cyBLbm90XCIgfSxcbiAgICB7IGlkOiBcInF1YW50dW0tcmluZ1wiLCBsYWJlbDogXCJRdWFudHVtIFJpbmdcIiB9LFxuICBdO1xuXG4gIGNvbnN0IE1PREVTOiB7IGlkOiBBSU1vZGU7IGxhYmVsOiBzdHJpbmc7IGljb246IGFueTsgZGVzYzogc3RyaW5nIH1bXSA9IFtcbiAgICB7IGlkOiBcImdlbmVyYWxcIiwgbGFiZWw6IFwiV29ybGQgSW50ZWxsaWdlbmNlXCIsIGljb246IEdsb2JlLCBkZXNjOiBcIkxpdmUgR29vZ2xlIFNlYXJjaCAmIFdlYiBkYXRhXCIgfSxcbiAgICB7IGlkOiBcInlvdXR1YmVcIiwgbGFiZWw6IFwiWW91VHViZSBJbnRlbGxpZ2VuY2VcIiwgaWNvbjogWW91dHViZSwgZGVzYzogXCJWaWRlbyBkYXRhICYgY2hhbm5lbCBxdWVyaWVzXCIgfSxcbiAgICB7IGlkOiBcImNvZGVcIiwgbGFiZWw6IFwiM0QgJiBDeWJlciBDb2RlXCIsIGljb246IENvZGUyLCBkZXNjOiBcIlRocmVlLmpzLCBhbGdvcml0aG1zICYgZW5naW5lc1wiIH0sXG4gICAgeyBpZDogXCJyZXNlYXJjaFwiLCBsYWJlbDogXCJEZWVwIFJlc2VhcmNoXCIsIGljb246IENwdSwgZGVzYzogXCJDaXRhdGlvbnMgJiBzY2llbnRpZmljIHBhcGVyc1wiIH0sXG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgey8qIE1vYmlsZSBCYWNrZHJvcCAqL31cbiAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTQwIGJnLWJsYWNrLzcwIGJhY2tkcm9wLWJsdXItc20gbGc6aGlkZGVuXCJcbiAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIFNpZGViYXIgQ29udGFpbmVyICovfVxuICAgICAgPGFzaWRlXG4gICAgICAgIGlkPVwiZG9kZS1haS1zaWRlYmFyXCJcbiAgICAgICAgY2xhc3NOYW1lPXtgZml4ZWQgdG9wLTAgYm90dG9tLTAgbGVmdC0wIHotNDAgdy03MiBtZDp3LTgwIGJnLVsjMDYwOTE0XSBib3JkZXItciBib3JkZXItY3lhbi01MDAvMjAgZmxleCBmbGV4LWNvbCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDAgZWFzZS1pbi1vdXQgJHtcbiAgICAgICAgICBpc09wZW4gPyBcInRyYW5zbGF0ZS14LTBcIiA6IFwiLXRyYW5zbGF0ZS14LWZ1bGwgbGc6dHJhbnNsYXRlLXgtMFwiXG4gICAgICAgIH0gc2hhZG93LTJ4bCBvdmVyZmxvdy1oaWRkZW5gfVxuICAgICAgPlxuICAgICAgICB7LyogSGVhZGVyIEJyYW5kaW5nICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBib3JkZXItYiBib3JkZXItY3lhbi01MDAvMjAgYmctWyMwNTA3MTFdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tdHIgZnJvbS1jeWFuLTUwMCB0by1ibHVlLTYwMCBwLTAuNSBzaGFkb3ctbGcgbmVvbi1nbG93LWN5YW4gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIGJnLVsjMDUwODE0XSByb3VuZGVkLVsxMHB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxCb3ggY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWN5YW4tMzAwIGFuaW1hdGUtc3Bpbi1zbG93XCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJmb250LWN5YmVyIGZvbnQtYmxhY2sgdGV4dC1sZyB0ZXh0LXRyYW5zcGFyZW50IGJnLWNsaXAtdGV4dCBiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi0zMDAgdmlhLXRlYWwtMjAwIHRvLWJsdWUtNDAwIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICBET0RFIEFJXG4gICAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyBweC0xLjUgcHktMC4yIHJvdW5kZWQgYmctY3lhbi01MDAvMjAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzMwXCI+XG4gICAgICAgICAgICAgICAgICB2My43XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgICAgQ1lCRVItUVVBTlRVTSBJTlRFTExJR0VOQ0VcbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibGc6aGlkZGVuIHAtMSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHJvdW5kZWQtbGdcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQWN0aW9uIEJ1dHRvbnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHNwYWNlLXktMiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25OZXdTZXNzaW9uKGFjdGl2ZU1vZGUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSBweC0zIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWN5YW4tNTAwIHRvLWJsdWUtNjAwIGhvdmVyOmZyb20tY3lhbi00MDAgaG92ZXI6dG8tYmx1ZS01MDAgdGV4dC1zbGF0ZS05NTAgZm9udC1jeWJlciBmb250LWJvbGQgdGV4dC14cyB0cmFja2luZy13aWRlciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgbmVvbi1nbG93LWN5YW4gdHJhbnNpdGlvbi1hbGwgYWN0aXZlOnNjYWxlLVswLjk4XVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPVwidy00IGgtNCBzdHJva2UtWzNdXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPk5FVyBRVUFOVFVNIENIQVQ8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIG9uT3BlbkltYWdlU3R1ZGlvKCk7XG4gICAgICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDEwMjQpIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMiBweC0zIHJvdW5kZWQteGwgYmctWyMwZDE0MjhdIGhvdmVyOmJnLWZ1Y2hzaWEtOTUwLzUwIGJvcmRlciBib3JkZXItZnVjaHNpYS01MDAvNDAgdGV4dC1mdWNoc2lhLTMwMCBmb250LWN5YmVyIHRleHQteHMgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctc20gZ3JvdXBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxXYW5kMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWZ1Y2hzaWEtNDAwIGdyb3VwLWhvdmVyOnJvdGF0ZS0xMiB0cmFuc2l0aW9uLXRyYW5zZm9ybVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5BSSBJTUFHRSBDUkVBVE9SIFNUVURJTzwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkWmlwfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rvd25sb2FkaW5nWmlwfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIgcHgtMyByb3VuZGVkLXhsIGJnLVsjMGIxNjJjXSBob3ZlcjpiZy1jeWFuLTk1MC82MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzUwIHRleHQtY3lhbi0zMDAgZm9udC1jeWJlciB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgc2hhZG93LXNtIGdyb3VwXCJcbiAgICAgICAgICAgIHRpdGxlPVwiRG93bmxvYWQgY29tcGxldGUgcHJvamVjdCBaSVAgc291cmNlIGNvZGUgZGlyZWN0bHlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtkb3dubG9hZGluZ1ppcCA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8RmlsZUFyY2hpdmUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBBQ0tJTkcgWklQIENPREVCQVNFLi4uPC9zcGFuPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDAgZ3JvdXAtaG92ZXI6dHJhbnNsYXRlLXktMC41IHRyYW5zaXRpb24tdHJhbnNmb3JtXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5ET1dOTE9BRCBQUk9KRUNUIFpJUDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTW9kZSBTZWxlY3RvciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMC84MCBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1jeWJlciBmb250LWJvbGQgdGV4dC1jeWFuLTQwMCBweC0xIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgSU5URUxMSUdFTkNFIFBST1RPQ09MXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIHtNT0RFUy5tYXAoKG0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgSWNvbiA9IG0uaWNvbjtcbiAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBhY3RpdmVNb2RlID09PSBtLmlkO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17bS5pZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlTW9kZShtLmlkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMiByb3VuZGVkLXhsIHRleHQtbGVmdCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiYmctY3lhbi01MDAvMTUgYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0yMDAgbmVvbi1nbG93LWN5YW5cIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJiZy1bIzA4MGQxYV0gYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwXCJcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgPEljb24gY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgJHtpc0FjdGl2ZSA/IFwidGV4dC1jeWFuLTMwMFwiIDogXCJ0ZXh0LXNsYXRlLTQwMFwifWB9IC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e20ubGFiZWwuc3BsaXQoXCIgXCIpWzBdfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDaGF0IEhpc3RvcnkgTGlzdCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtMyBzcGFjZS15LTEgc2Nyb2xsYmFyLXRoaW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtY3liZXIgZm9udC1ib2xkIHRleHQtc2xhdGUtNTAwIHB4LTEgcHktMSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3Bhbj5TQVZFRCBTRVNTSU9OUyAoe3Nlc3Npb25zLmxlbmd0aH0pPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAge3Nlc3Npb25zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgcHktOCB0ZXh0LXhzIHRleHQtc2xhdGUtNjAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICBObyBzZXNzaW9ucyBhY3RpdmUuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgc2Vzc2lvbnMubWFwKChzZXNzaW9uKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZXNzaW9uLmlkID09PSBjdXJyZW50U2Vzc2lvbklkO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGtleT17c2Vzc2lvbi5pZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgb25TZWxlY3RTZXNzaW9uKHNlc3Npb24uaWQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCAxMDI0KSBvbkNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZ3JvdXAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMi41IHJvdW5kZWQteGwgY3Vyc29yLXBvaW50ZXIgYm9yZGVyIHRleHQteHMgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgID8gXCJiZy1jeWFuLTk1MC82MCBib3JkZXItY3lhbi01MDAvNDAgdGV4dC1jeWFuLTIwMCBzaGFkb3ctbWRcIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJiZy1bIzA4MGQxY10vNDAgYm9yZGVyLXRyYW5zcGFyZW50IGhvdmVyOmJnLXNsYXRlLTg1MCBob3Zlcjpib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMjAwXCJcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWluLXctMCBmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPE1lc3NhZ2VTcXVhcmVcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSBmbGV4LXNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID8gXCJ0ZXh0LWN5YW4tNDAwXCIgOiBcInRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGUgZm9udC1tZWRpdW1cIj57c2Vzc2lvbi50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4gb25EZWxldGVTZXNzaW9uKHNlc3Npb24uaWQsIGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS0xMDAgcC0xIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcm9zZS00MDAgaG92ZXI6Ymctcm9zZS01MDAvMTAgcm91bmRlZCB0cmFuc2l0aW9uLWFsbCBtbC0xIGZsZXgtc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIkRlbGV0ZSBDaGF0XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEN1c3RvbWl6YXRpb24gJiBQcmVmZXJlbmNlcyBGb290ZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJvcmRlci10IGJvcmRlci1jeWFuLTUwMC8yMCBiZy1bIzA1MDcxMV0gc3BhY2UteS0zXCI+XG4gICAgICAgICAgey8qIE5lb24gVGhlbWUgU2VsZWN0b3IgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gZm9udC1jeWJlciB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8UGFsZXR0ZSBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPk5lb24gQXVyYTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1jeWFuLTMwMFwiPnt0aGVtZS5yZXBsYWNlKFwiLVwiLCBcIiBcIil9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIHtUSEVNRVMubWFwKCh0KSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXt0LmlkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2VUaGVtZSh0LmlkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNiBoLTYgcm91bmRlZC1mdWxsICR7dC5jb2xvcn0gdHJhbnNpdGlvbi10cmFuc2Zvcm0gJHtcbiAgICAgICAgICAgICAgICAgICAgdGhlbWUgPT09IHQuaWQgPyBcInJpbmctMiByaW5nLXdoaXRlIHNjYWxlLTExMCBzaGFkb3ctbGdcIiA6IFwib3BhY2l0eS02MCBob3ZlcjpvcGFjaXR5LTEwMFwiXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXt0LmxhYmVsfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogM0QgQ29yZSBNb2RlbCBTZWxlY3RvciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gZm9udC1jeWJlciB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8Qm94IGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+M0QgSG9sb2dyYW0gTWVzaDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIHZhbHVlPXttb2RlbDNEVHlwZX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZU1vZGVsM0QoZS50YXJnZXQudmFsdWUgYXMgTW9kZWwzRFR5cGUpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwODBkMWNdIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgdGV4dC1jeWFuLTMwMCByb3VuZGVkLWxnIHAtMS41IGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItY3lhbi00MDAgZm9udC1tb25vXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge01PREVMU18zRC5tYXAoKG0pID0+IChcbiAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17bS5pZH0gdmFsdWU9e20uaWR9PlxuICAgICAgICAgICAgICAgICAge20ubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogVm9pY2UgQXV0by1TcGVhayBUb2dnbGUgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHQtMSBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAge3ZvaWNlQ29uZmlnLmF1dG9TcGVhayA/IChcbiAgICAgICAgICAgICAgICA8Vm9sdW1lMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8Vm9sdW1lWCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNsYXRlLTUwMFwiIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDxzcGFuPkF1dG8tU3BlYWsgT3V0cHV0PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgIGNoZWNrZWQ9e3ZvaWNlQ29uZmlnLmF1dG9TcGVha31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblVwZGF0ZVZvaWNlQ29uZmlnKHsgYXV0b1NwZWFrOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhY2NlbnQtY3lhbi01MDAgY3Vyc29yLXBvaW50ZXIgcm91bmRlZFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvYXNpZGU+XG4gICAgPC8+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFtSFEsU0F3RU0s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