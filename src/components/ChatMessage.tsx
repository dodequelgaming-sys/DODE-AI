import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=df3e6907"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=df3e6907"; const useState = __vite__cjsImport1_react["useState"];
import Markdown from "/node_modules/.vite/deps/react-markdown.js?v=df3e6907";
import remarkGfm from "/node_modules/.vite/deps/remark-gfm.js?v=df3e6907";
import {
  Copy,
  Check,
  Volume2,
  VolumeX,
  Globe,
  ExternalLink,
  Play,
  Code2,
  Bot,
  User,
  Youtube,
  Download
} from "/node_modules/.vite/deps/lucide-react.js?v=df3e6907";
export const ChatMessage = ({
  message,
  theme = "cyan-core",
  onSpeak,
  onStopSpeak,
  isSpeakingThis,
  onOpenCodePreview
}) => {
  const [copied, setCopied] = useState(false);
  const isAssistant = message.role === "assistant";
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleToggleVoice = () => {
    if (isSpeakingThis) {
      onStopSpeak();
    } else {
      onSpeak(message.content);
    }
  };
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      id: `msg-${message.id}`,
      className: `group relative flex flex-col md:flex-row gap-3 md:gap-4 p-4 md:p-5 rounded-2xl transition-all ${isAssistant ? "bg-[#080d1e]/80 border border-cyan-500/25 shadow-lg backdrop-blur-sm" : "bg-[#0f172a]/70 border border-slate-800 self-end ml-auto"} max-w-4xl w-full`,
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex-shrink-0 flex items-center md:items-start gap-2.5", children: [
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: `w-9 h-9 rounded-xl flex items-center justify-center border font-cyber text-xs font-bold transition-transform group-hover:scale-105 ${isAssistant ? "bg-cyan-950/70 border-cyan-400/60 text-cyan-300 neon-glow-cyan" : "bg-slate-800 border-slate-700 text-slate-300"}`,
              children: isAssistant ? /* @__PURE__ */ jsxDEV(Bot, { className: "w-5 h-5 text-cyan-300 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/ChatMessage.tsx",
                lineNumber: 76,
                columnNumber: 13
              }, this) : /* @__PURE__ */ jsxDEV(User, { className: "w-5 h-5 text-slate-300" }, void 0, false, {
                fileName: "/app/applet/src/components/ChatMessage.tsx",
                lineNumber: 78,
                columnNumber: 13
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 68,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "md:hidden flex items-center justify-between flex-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-cyber text-xs font-semibold text-cyan-400", children: isAssistant ? "DODE AI" : "YOU" }, void 0, false, {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 82,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, void 0, false, {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 85,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChatMessage.tsx",
            lineNumber: 81,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChatMessage.tsx",
          lineNumber: 67,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "hidden md:flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: `font-cyber text-xs font-bold ${isAssistant ? "text-cyan-300" : "text-slate-300"}`, children: isAssistant ? "DODE AI Core" : "User Protocol" }, void 0, false, {
                fileName: "/app/applet/src/components/ChatMessage.tsx",
                lineNumber: 96,
                columnNumber: 13
              }, this),
              isAssistant && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono", children: "Gemini 3.7 Live" }, void 0, false, {
                fileName: "/app/applet/src/components/ChatMessage.tsx",
                lineNumber: 100,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 95,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, void 0, false, {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 105,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChatMessage.tsx",
            lineNumber: 94,
            columnNumber: 9
          }, this),
          message.imageBase64 && /* @__PURE__ */ jsxDEV("div", { className: "max-w-sm rounded-xl overflow-hidden border border-cyan-500/40 my-2 shadow-md", children: /* @__PURE__ */ jsxDEV(
            "img",
            {
              src: message.imageBase64,
              alt: "Input visual",
              referrerPolicy: "no-referrer",
              className: "w-full h-auto object-cover max-h-60"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 113,
              columnNumber: 13
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/ChatMessage.tsx",
            lineNumber: 112,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm leading-relaxed text-slate-200 break-words space-y-3 font-normal", children: /* @__PURE__ */ jsxDEV(
            Markdown,
            {
              remarkPlugins: [remarkGfm],
              components: {
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const lang = match ? match[1] : "";
                  const codeString = String(children).replace(/\n$/, "");
                  if (!inline && lang) {
                    const isRunable = [
                      "html",
                      "javascript",
                      "js",
                      "three",
                      "threejs",
                      "css",
                      "svg",
                      "glsl"
                    ].includes(lang.toLowerCase());
                    return /* @__PURE__ */ jsxDEV("div", { className: "my-3 rounded-xl overflow-hidden border border-cyan-500/30 bg-[#050711] shadow-xl", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between px-4 py-2 bg-[#090e1d] border-b border-cyan-500/20 text-xs", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-cyan-400 font-mono", children: [
                          /* @__PURE__ */ jsxDEV(Code2, { className: "w-3.5 h-3.5" }, void 0, false, {
                            fileName: "/app/applet/src/components/ChatMessage.tsx",
                            lineNumber: 149,
                            columnNumber: 27
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "uppercase font-semibold text-[11px]", children: lang }, void 0, false, {
                            fileName: "/app/applet/src/components/ChatMessage.tsx",
                            lineNumber: 150,
                            columnNumber: 27
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/ChatMessage.tsx",
                          lineNumber: 148,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                          isRunable && /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: () => onOpenCodePreview(codeString, lang),
                              className: "flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-[11px] shadow-sm transition-all",
                              children: [
                                /* @__PURE__ */ jsxDEV(Play, { className: "w-3 h-3 fill-slate-950" }, void 0, false, {
                                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                                  lineNumber: 159,
                                  columnNumber: 31
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { children: "Run 3D / Live" }, void 0, false, {
                                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                                  lineNumber: 160,
                                  columnNumber: 31
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/ChatMessage.tsx",
                              lineNumber: 155,
                              columnNumber: 29
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "button",
                            {
                              onClick: () => navigator.clipboard.writeText(codeString),
                              className: "flex items-center gap-1 text-slate-400 hover:text-cyan-300 px-2 py-1 bg-slate-800/80 rounded-md border border-slate-700 text-[11px] transition-colors",
                              children: [
                                /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                                  lineNumber: 168,
                                  columnNumber: 29
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { children: "Copy" }, void 0, false, {
                                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                                  lineNumber: 169,
                                  columnNumber: 29
                                }, this)
                              ]
                            },
                            void 0,
                            true,
                            {
                              fileName: "/app/applet/src/components/ChatMessage.tsx",
                              lineNumber: 164,
                              columnNumber: 27
                            },
                            this
                          )
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/ChatMessage.tsx",
                          lineNumber: 153,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ChatMessage.tsx",
                        lineNumber: 147,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "p-4 overflow-x-auto text-xs font-mono text-cyan-100/90 selection:bg-cyan-500/30", children: /* @__PURE__ */ jsxDEV("pre", { className: "!bg-transparent !p-0 !m-0", children: /* @__PURE__ */ jsxDEV("code", { children }, void 0, false, {
                        fileName: "/app/applet/src/components/ChatMessage.tsx",
                        lineNumber: 177,
                        columnNumber: 27
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/ChatMessage.tsx",
                        lineNumber: 176,
                        columnNumber: 25
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/ChatMessage.tsx",
                        lineNumber: 175,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 145,
                      columnNumber: 21
                    }, this);
                  }
                  return /* @__PURE__ */ jsxDEV(
                    "code",
                    {
                      className: "px-1.5 py-0.5 rounded bg-cyan-950/70 text-cyan-300 font-mono text-xs border border-cyan-500/20",
                      ...props,
                      children
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 185,
                      columnNumber: 19
                    },
                    this
                  );
                },
                p: ({ children }) => /* @__PURE__ */ jsxDEV("p", { className: "mb-2 last:mb-0", children }, void 0, false, {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 193,
                  columnNumber: 36
                }, this),
                ul: ({ children }) => /* @__PURE__ */ jsxDEV("ul", { className: "list-disc list-inside space-y-1 my-2 pl-2", children }, void 0, false, {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 194,
                  columnNumber: 37
                }, this),
                ol: ({ children }) => /* @__PURE__ */ jsxDEV("ol", { className: "list-decimal list-inside space-y-1 my-2 pl-2", children }, void 0, false, {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 195,
                  columnNumber: 37
                }, this),
                li: ({ children }) => /* @__PURE__ */ jsxDEV("li", { className: "text-slate-200", children }, void 0, false, {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 196,
                  columnNumber: 37
                }, this),
                h1: ({ children }) => /* @__PURE__ */ jsxDEV("h1", { className: "text-lg font-cyber font-bold text-cyan-300 my-2", children }, void 0, false, {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 197,
                  columnNumber: 37
                }, this),
                h2: ({ children }) => /* @__PURE__ */ jsxDEV("h2", { className: "text-base font-cyber font-bold text-cyan-200 my-2", children }, void 0, false, {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 198,
                  columnNumber: 37
                }, this),
                h3: ({ children }) => /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-cyber font-bold text-cyan-100 my-1", children }, void 0, false, {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 199,
                  columnNumber: 37
                }, this),
                blockquote: ({ children }) => /* @__PURE__ */ jsxDEV("blockquote", { className: "border-l-2 border-cyan-400 pl-3 py-1 my-2 bg-cyan-500/5 rounded-r-lg italic text-slate-300", children }, void 0, false, {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 201,
                  columnNumber: 17
                }, this),
                a: ({ href, children }) => /* @__PURE__ */ jsxDEV(
                  "a",
                  {
                    href,
                    target: "_blank",
                    rel: "noreferrer",
                    className: "text-cyan-400 hover:text-cyan-300 underline underline-offset-2 inline-flex items-center gap-0.5",
                    children: [
                      children,
                      /* @__PURE__ */ jsxDEV(ExternalLink, { className: "w-3 h-3 inline ml-0.5 opacity-70" }, void 0, false, {
                        fileName: "/app/applet/src/components/ChatMessage.tsx",
                        lineNumber: 213,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ChatMessage.tsx",
                    lineNumber: 206,
                    columnNumber: 17
                  },
                  this
                )
              },
              children: message.content
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 124,
              columnNumber: 11
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/ChatMessage.tsx",
            lineNumber: 123,
            columnNumber: 9
          }, this),
          message.sources && message.sources.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-3 border-t border-cyan-500/15 space-y-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 text-[11px] font-cyber font-semibold text-cyan-400", children: [
              /* @__PURE__ */ jsxDEV(Globe, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ChatMessage.tsx",
                lineNumber: 226,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "LIVE WORLD & WEB SOURCES (",
                message.sources.length,
                ")"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ChatMessage.tsx",
                lineNumber: 227,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 225,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: message.sources.map((src, i) => {
              const isYoutube = src.uri.includes("youtube.com") || src.uri.includes("youtu.be");
              return /* @__PURE__ */ jsxDEV(
                "a",
                {
                  href: src.uri,
                  target: "_blank",
                  rel: "noreferrer",
                  className: "flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#070b16] hover:bg-cyan-950/80 border border-slate-700/80 hover:border-cyan-500/50 text-[11px] text-slate-300 hover:text-cyan-200 transition-all shadow-sm max-w-xs truncate",
                  children: [
                    isYoutube ? /* @__PURE__ */ jsxDEV(Youtube, { className: "w-3 h-3 text-rose-500 flex-shrink-0" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 241,
                      columnNumber: 23
                    }, this) : /* @__PURE__ */ jsxDEV(ExternalLink, { className: "w-3 h-3 text-cyan-400 flex-shrink-0" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 243,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: src.title || src.uri }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 245,
                      columnNumber: 21
                    }, this)
                  ]
                },
                i,
                true,
                {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 233,
                  columnNumber: 19
                },
                this
              );
            }) }, void 0, false, {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 229,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChatMessage.tsx",
            lineNumber: 224,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              isAssistant && /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleToggleVoice,
                  className: `flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${isSpeakingThis ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse neon-glow-cyan" : "bg-slate-800/50 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-cyan-300"}`,
                  title: isSpeakingThis ? "Stop speaking" : "Speak response aloud",
                  children: isSpeakingThis ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-3.5 h-3.5 text-cyan-300" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 268,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Speaking..." }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 269,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ChatMessage.tsx",
                    lineNumber: 267,
                    columnNumber: 19
                  }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(Volume2, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 273,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Voice Audio" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 274,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ChatMessage.tsx",
                    lineNumber: 272,
                    columnNumber: 19
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 257,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleCopy,
                  className: "flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors",
                  title: "Copy text",
                  children: [
                    copied ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 285,
                      columnNumber: 25
                    }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 285,
                      columnNumber: 78
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: copied ? "Copied" : "Copy" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 286,
                      columnNumber: 15
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 280,
                  columnNumber: 13
                },
                this
              ),
              isAssistant && /* @__PURE__ */ jsxDEV(
                "a",
                {
                  href: "/api/download-zip",
                  download: "dode-ai-source.zip",
                  className: "flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 text-cyan-300 text-xs hover:border-cyan-400 transition-colors",
                  title: "Download full project code as ZIP",
                  children: [
                    /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 296,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "ZIP Code" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChatMessage.tsx",
                      lineNumber: 297,
                      columnNumber: 17
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ChatMessage.tsx",
                  lineNumber: 290,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 255,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500 font-mono flex items-center gap-1", children: /* @__PURE__ */ jsxDEV("span", { children: "DODE-AI-Q3" }, void 0, false, {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 303,
              columnNumber: 13
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ChatMessage.tsx",
              lineNumber: 302,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChatMessage.tsx",
            lineNumber: 254,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChatMessage.tsx",
          lineNumber: 92,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/ChatMessage.tsx",
      lineNumber: 58,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXRNZXNzYWdlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBNYXJrZG93biBmcm9tIFwicmVhY3QtbWFya2Rvd25cIjtcbmltcG9ydCByZW1hcmtHZm0gZnJvbSBcInJlbWFyay1nZm1cIjtcbmltcG9ydCB7XG4gIENvcHksXG4gIENoZWNrLFxuICBWb2x1bWUyLFxuICBWb2x1bWVYLFxuICBHbG9iZSxcbiAgRXh0ZXJuYWxMaW5rLFxuICBQbGF5LFxuICBDb2RlMixcbiAgQm90LFxuICBVc2VyLFxuICBTcGFya2xlcyxcbiAgWW91dHViZSxcbiAgU2hhcmUyLFxuICBEb3dubG9hZCxcbiAgRmlsZUFyY2hpdmUsXG59IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IE1lc3NhZ2UsIE5lb25UaGVtZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5pbnRlcmZhY2UgQ2hhdE1lc3NhZ2VQcm9wcyB7XG4gIG1lc3NhZ2U6IE1lc3NhZ2U7XG4gIHRoZW1lPzogTmVvblRoZW1lO1xuICBvblNwZWFrOiAodGV4dDogc3RyaW5nKSA9PiB2b2lkO1xuICBvblN0b3BTcGVhazogKCkgPT4gdm9pZDtcbiAgaXNTcGVha2luZ1RoaXM6IGJvb2xlYW47XG4gIG9uT3BlbkNvZGVQcmV2aWV3OiAoY29kZTogc3RyaW5nLCBsYW5ndWFnZTogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgQ2hhdE1lc3NhZ2U6IFJlYWN0LkZDPENoYXRNZXNzYWdlUHJvcHM+ID0gKHtcbiAgbWVzc2FnZSxcbiAgdGhlbWUgPSBcImN5YW4tY29yZVwiLFxuICBvblNwZWFrLFxuICBvblN0b3BTcGVhayxcbiAgaXNTcGVha2luZ1RoaXMsXG4gIG9uT3BlbkNvZGVQcmV2aWV3LFxufSkgPT4ge1xuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBpc0Fzc2lzdGFudCA9IG1lc3NhZ2Uucm9sZSA9PT0gXCJhc3Npc3RhbnRcIjtcblxuICBjb25zdCBoYW5kbGVDb3B5ID0gKCkgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KG1lc3NhZ2UuY29udGVudCk7XG4gICAgc2V0Q29waWVkKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkKGZhbHNlKSwgMjAwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlVm9pY2UgPSAoKSA9PiB7XG4gICAgaWYgKGlzU3BlYWtpbmdUaGlzKSB7XG4gICAgICBvblN0b3BTcGVhaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvblNwZWFrKG1lc3NhZ2UuY29udGVudCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgaWQ9e2Btc2ctJHttZXNzYWdlLmlkfWB9XG4gICAgICBjbGFzc05hbWU9e2Bncm91cCByZWxhdGl2ZSBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGdhcC0zIG1kOmdhcC00IHAtNCBtZDpwLTUgcm91bmRlZC0yeGwgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgaXNBc3Npc3RhbnRcbiAgICAgICAgICA/IFwiYmctWyMwODBkMWVdLzgwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMjUgc2hhZG93LWxnIGJhY2tkcm9wLWJsdXItc21cIlxuICAgICAgICAgIDogXCJiZy1bIzBmMTcyYV0vNzAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc2VsZi1lbmQgbWwtYXV0b1wiXG4gICAgICB9IG1heC13LTR4bCB3LWZ1bGxgfVxuICAgID5cbiAgICAgIHsvKiBMZWZ0IEF2YXRhciBIVUQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtc2hyaW5rLTAgZmxleCBpdGVtcy1jZW50ZXIgbWQ6aXRlbXMtc3RhcnQgZ2FwLTIuNVwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgdy05IGgtOSByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJvcmRlciBmb250LWN5YmVyIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tdHJhbnNmb3JtIGdyb3VwLWhvdmVyOnNjYWxlLTEwNSAke1xuICAgICAgICAgICAgaXNBc3Npc3RhbnRcbiAgICAgICAgICAgICAgPyBcImJnLWN5YW4tOTUwLzcwIGJvcmRlci1jeWFuLTQwMC82MCB0ZXh0LWN5YW4tMzAwIG5lb24tZ2xvdy1jeWFuXCJcbiAgICAgICAgICAgICAgOiBcImJnLXNsYXRlLTgwMCBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwXCJcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIHtpc0Fzc2lzdGFudCA/IChcbiAgICAgICAgICAgIDxCb3QgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWN5YW4tMzAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8VXNlciBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtc2xhdGUtMzAwXCIgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpoaWRkZW4gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZsZXgtMVwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtY3liZXIgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtY3lhbi00MDBcIj5cbiAgICAgICAgICAgIHtpc0Fzc2lzdGFudCA/IFwiRE9ERSBBSVwiIDogXCJZT1VcIn1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICB7bmV3IERhdGUobWVzc2FnZS50aW1lc3RhbXApLnRvTG9jYWxlVGltZVN0cmluZyhbXSwgeyBob3VyOiBcIjItZGlnaXRcIiwgbWludXRlOiBcIjItZGlnaXRcIiB9KX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIENvbnRlbnQgQm9keSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi13LTAgc3BhY2UteS0zXCI+XG4gICAgICAgIHsvKiBUb3AgbWV0YSBmb3IgZGVza3RvcCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6ZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1jeWJlciB0ZXh0LXhzIGZvbnQtYm9sZCAke2lzQXNzaXN0YW50ID8gXCJ0ZXh0LWN5YW4tMzAwXCIgOiBcInRleHQtc2xhdGUtMzAwXCJ9YH0+XG4gICAgICAgICAgICAgIHtpc0Fzc2lzdGFudCA/IFwiRE9ERSBBSSBDb3JlXCIgOiBcIlVzZXIgUHJvdG9jb2xcIn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIHtpc0Fzc2lzdGFudCAmJiAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1jeWFuLTUwMC8xMCB0ZXh0LWN5YW4tNDAwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMjAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgR2VtaW5pIDMuNyBMaXZlXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICB7bmV3IERhdGUobWVzc2FnZS50aW1lc3RhbXApLnRvTG9jYWxlVGltZVN0cmluZyhbXSwgeyBob3VyOiBcIjItZGlnaXRcIiwgbWludXRlOiBcIjItZGlnaXRcIiB9KX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBBdHRhY2hlZCBpbWFnZSBpZiBhbnkgKi99XG4gICAgICAgIHttZXNzYWdlLmltYWdlQmFzZTY0ICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LXNtIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItY3lhbi01MDAvNDAgbXktMiBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgc3JjPXttZXNzYWdlLmltYWdlQmFzZTY0fVxuICAgICAgICAgICAgICBhbHQ9XCJJbnB1dCB2aXN1YWxcIlxuICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtYXV0byBvYmplY3QtY292ZXIgbWF4LWgtNjBcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogTWFya2Rvd24gVGV4dCByZW5kZXJpbmcgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSBsZWFkaW5nLXJlbGF4ZWQgdGV4dC1zbGF0ZS0yMDAgYnJlYWstd29yZHMgc3BhY2UteS0zIGZvbnQtbm9ybWFsXCI+XG4gICAgICAgICAgPE1hcmtkb3duXG4gICAgICAgICAgICByZW1hcmtQbHVnaW5zPXtbcmVtYXJrR2ZtXX1cbiAgICAgICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICAgICAgY29kZSh7IG5vZGUsIGlubGluZSwgY2xhc3NOYW1lLCBjaGlsZHJlbiwgLi4ucHJvcHMgfTogYW55KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSAvbGFuZ3VhZ2UtKFxcdyspLy5leGVjKGNsYXNzTmFtZSB8fCBcIlwiKTtcbiAgICAgICAgICAgICAgICBjb25zdCBsYW5nID0gbWF0Y2ggPyBtYXRjaFsxXSA6IFwiXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgY29kZVN0cmluZyA9IFN0cmluZyhjaGlsZHJlbikucmVwbGFjZSgvXFxuJC8sIFwiXCIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFpbmxpbmUgJiYgbGFuZykge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNSdW5hYmxlID0gW1xuICAgICAgICAgICAgICAgICAgICBcImh0bWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJqYXZhc2NyaXB0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwianNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0aHJlZVwiLFxuICAgICAgICAgICAgICAgICAgICBcInRocmVlanNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjc3NcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJnbHNsXCIsXG4gICAgICAgICAgICAgICAgICBdLmluY2x1ZGVzKGxhbmcudG9Mb3dlckNhc2UoKSk7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXktMyByb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzMwIGJnLVsjMDUwNzExXSBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogQ29kZSBCbG9jayBIZWFkZXIgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNCBweS0yIGJnLVsjMDkwZTFkXSBib3JkZXItYiBib3JkZXItY3lhbi01MDAvMjAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LWN5YW4tNDAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29kZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ1cHBlcmNhc2UgZm9udC1zZW1pYm9sZCB0ZXh0LVsxMXB4XVwiPntsYW5nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpc1J1bmFibGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uT3BlbkNvZGVQcmV2aWV3KGNvZGVTdHJpbmcsIGxhbmcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0yLjUgcHktMSByb3VuZGVkLW1kIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1jeWFuLTUwMCB0by1ibHVlLTYwMCBob3Zlcjpmcm9tLWN5YW4tNDAwIGhvdmVyOnRvLWJsdWUtNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQgdGV4dC1bMTFweF0gc2hhZG93LXNtIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGxheSBjbGFzc05hbWU9XCJ3LTMgaC0zIGZpbGwtc2xhdGUtOTUwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlJ1biAzRCAvIExpdmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGNvZGVTdHJpbmcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtY3lhbi0zMDAgcHgtMiBweS0xIGJnLXNsYXRlLTgwMC84MCByb3VuZGVkLW1kIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtWzExcHhdIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDb3B5IGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNvcHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogQ29kZSBDb250ZW50ICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IG92ZXJmbG93LXgtYXV0byB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMTAwLzkwIHNlbGVjdGlvbjpiZy1jeWFuLTUwMC8zMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCIhYmctdHJhbnNwYXJlbnQgIXAtMCAhbS0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPntjaGlsZHJlbn08L2NvZGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8Y29kZVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IHJvdW5kZWQgYmctY3lhbi05NTAvNzAgdGV4dC1jeWFuLTMwMCBmb250LW1vbm8gdGV4dC14cyBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzIwXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLnByb3BzfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgICA8L2NvZGU+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgcDogKHsgY2hpbGRyZW4gfSkgPT4gPHAgY2xhc3NOYW1lPVwibWItMiBsYXN0Om1iLTBcIj57Y2hpbGRyZW59PC9wPixcbiAgICAgICAgICAgICAgdWw6ICh7IGNoaWxkcmVuIH0pID0+IDx1bCBjbGFzc05hbWU9XCJsaXN0LWRpc2MgbGlzdC1pbnNpZGUgc3BhY2UteS0xIG15LTIgcGwtMlwiPntjaGlsZHJlbn08L3VsPixcbiAgICAgICAgICAgICAgb2w6ICh7IGNoaWxkcmVuIH0pID0+IDxvbCBjbGFzc05hbWU9XCJsaXN0LWRlY2ltYWwgbGlzdC1pbnNpZGUgc3BhY2UteS0xIG15LTIgcGwtMlwiPntjaGlsZHJlbn08L29sPixcbiAgICAgICAgICAgICAgbGk6ICh7IGNoaWxkcmVuIH0pID0+IDxsaSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPntjaGlsZHJlbn08L2xpPixcbiAgICAgICAgICAgICAgaDE6ICh7IGNoaWxkcmVuIH0pID0+IDxoMSBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtY3liZXIgZm9udC1ib2xkIHRleHQtY3lhbi0zMDAgbXktMlwiPntjaGlsZHJlbn08L2gxPixcbiAgICAgICAgICAgICAgaDI6ICh7IGNoaWxkcmVuIH0pID0+IDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1jeWJlciBmb250LWJvbGQgdGV4dC1jeWFuLTIwMCBteS0yXCI+e2NoaWxkcmVufTwvaDI+LFxuICAgICAgICAgICAgICBoMzogKHsgY2hpbGRyZW4gfSkgPT4gPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1jeWJlciBmb250LWJvbGQgdGV4dC1jeWFuLTEwMCBteS0xXCI+e2NoaWxkcmVufTwvaDM+LFxuICAgICAgICAgICAgICBibG9ja3F1b3RlOiAoeyBjaGlsZHJlbiB9KSA9PiAoXG4gICAgICAgICAgICAgICAgPGJsb2NrcXVvdGUgY2xhc3NOYW1lPVwiYm9yZGVyLWwtMiBib3JkZXItY3lhbi00MDAgcGwtMyBweS0xIG15LTIgYmctY3lhbi01MDAvNSByb3VuZGVkLXItbGcgaXRhbGljIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9ibG9ja3F1b3RlPlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBhOiAoeyBocmVmLCBjaGlsZHJlbiB9KSA9PiAoXG4gICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgIGhyZWY9e2hyZWZ9XG4gICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgICAgcmVsPVwibm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tNDAwIGhvdmVyOnRleHQtY3lhbi0zMDAgdW5kZXJsaW5lIHVuZGVybGluZS1vZmZzZXQtMiBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTAuNVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgICAgICAgPEV4dGVybmFsTGluayBjbGFzc05hbWU9XCJ3LTMgaC0zIGlubGluZSBtbC0wLjUgb3BhY2l0eS03MFwiIC8+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bWVzc2FnZS5jb250ZW50fVxuICAgICAgICAgIDwvTWFya2Rvd24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSZWFsLVRpbWUgR3JvdW5kaW5nIFNvdXJjZXMgKEdvb2dsZSBTZWFyY2ggLyBMaXZlIFdvcmxkIERhdGEgLyBZb3VUdWJlKSAqL31cbiAgICAgICAge21lc3NhZ2Uuc291cmNlcyAmJiBtZXNzYWdlLnNvdXJjZXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHB0LTMgYm9yZGVyLXQgYm9yZGVyLWN5YW4tNTAwLzE1IHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtWzExcHhdIGZvbnQtY3liZXIgZm9udC1zZW1pYm9sZCB0ZXh0LWN5YW4tNDAwXCI+XG4gICAgICAgICAgICAgIDxHbG9iZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+TElWRSBXT1JMRCAmIFdFQiBTT1VSQ0VTICh7bWVzc2FnZS5zb3VyY2VzLmxlbmd0aH0pPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0yXCI+XG4gICAgICAgICAgICAgIHttZXNzYWdlLnNvdXJjZXMubWFwKChzcmMsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1lvdXR1YmUgPSBzcmMudXJpLmluY2x1ZGVzKFwieW91dHViZS5jb21cIikgfHwgc3JjLnVyaS5pbmNsdWRlcyhcInlvdXR1LmJlXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgIGhyZWY9e3NyYy51cml9XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctWyMwNzBiMTZdIGhvdmVyOmJnLWN5YW4tOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzgwIGhvdmVyOmJvcmRlci1jeWFuLTUwMC81MCB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LWN5YW4tMjAwIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1zbSBtYXgtdy14cyB0cnVuY2F0ZVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpc1lvdXR1YmUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPFlvdXR1YmUgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXJvc2UtNTAwIGZsZXgtc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxFeHRlcm5hbExpbmsgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWN5YW4tNDAwIGZsZXgtc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntzcmMudGl0bGUgfHwgc3JjLnVyaX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogQWN0aW9uIENvbnRyb2xzIEJhciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICB7aXNBc3Npc3RhbnQgJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlVG9nZ2xlVm9pY2V9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0yLjUgcHktMSByb3VuZGVkLWxnIGJvcmRlciB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBpc1NwZWFraW5nVGhpc1xuICAgICAgICAgICAgICAgICAgICA/IFwiYmctY3lhbi01MDAvMjAgYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0zMDAgYW5pbWF0ZS1wdWxzZSBuZW9uLWdsb3ctY3lhblwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJiZy1zbGF0ZS04MDAvNTAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC1jeWFuLTMwMFwiXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgdGl0bGU9e2lzU3BlYWtpbmdUaGlzID8gXCJTdG9wIHNwZWFraW5nXCIgOiBcIlNwZWFrIHJlc3BvbnNlIGFsb3VkXCJ9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXNTcGVha2luZ1RoaXMgPyAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8Vm9sdW1lWCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+U3BlYWtpbmcuLi48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPFZvbHVtZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Wb2ljZSBBdWRpbzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3B5fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMC81MCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwiQ29weSB0ZXh0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NvcGllZCA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICA8c3Bhbj57Y29waWVkID8gXCJDb3BpZWRcIiA6IFwiQ29weVwifTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7aXNBc3Npc3RhbnQgJiYgKFxuICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgIGhyZWY9XCIvYXBpL2Rvd25sb2FkLXppcFwiXG4gICAgICAgICAgICAgICAgZG93bmxvYWQ9XCJkb2RlLWFpLXNvdXJjZS56aXBcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctY3lhbi05NTAvNDAgaG92ZXI6YmctY3lhbi05MDAvNjAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMCB0ZXh0LWN5YW4tMzAwIHRleHQteHMgaG92ZXI6Ym9yZGVyLWN5YW4tNDAwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIkRvd25sb2FkIGZ1bGwgcHJvamVjdCBjb2RlIGFzIFpJUFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj5aSVAgQ29kZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICA8c3Bhbj5ET0RFLUFJLVEzPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBw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