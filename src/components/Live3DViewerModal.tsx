import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=df3e6907"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=df3e6907"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"];
import { X, Copy, Check } from "/node_modules/.vite/deps/lucide-react.js?v=df3e6907";
export const Live3DViewerModal = ({
  isOpen,
  onClose,
  codeSnippet,
  language,
  theme = "cyan-core"
}) => {
  const [code, setCode] = useState(codeSnippet);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");
  const iframeRef = useRef(null);
  useEffect(() => {
    setCode(codeSnippet);
  }, [codeSnippet]);
  const generatePreviewDoc = (rawCode) => {
    if (rawCode.includes("<!DOCTYPE html>") || rawCode.includes("<html")) {
      return rawCode;
    }
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
      background: #070913;
      color: #fff;
      font-family: sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    #canvas-container {
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
    }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
</head>
<body>
  <div id="canvas-container"></div>
  <script>
    try {
      ${rawCode}
    } catch (err) {
      document.body.innerHTML = '<div style="color:#f43f5e;padding:20px;font-family:monospace;z-index:100;background:rgba(0,0,0,0.8);border-radius:8px;">' + err.message + '</div>';
    }
  <\/script>
</body>
</html>
    `;
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      id: "live-3d-runner-modal",
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md",
      children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-5xl h-[85vh] bg-[#090d1a] border border-cyan-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden neon-glow-cyan", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between px-6 py-4 border-b border-cyan-500/20 bg-[#060a14]", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-3 h-3 rounded-full bg-cyan-400 animate-pulse neon-glow-cyan" }, void 0, false, {
              fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
              lineNumber: 96,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "font-cyber font-bold text-lg text-cyan-300 tracking-wider", children: "DODE AI 3D & CODE RUNNER" }, void 0, false, {
              fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
              lineNumber: 97,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase font-mono", children: language || "javascript" }, void 0, false, {
              fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
              lineNumber: 100,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
            lineNumber: 95,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center bg-[#0d1424] rounded-lg p-1 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setActiveTab("preview"),
                  className: `px-3 py-1 text-xs font-semibold rounded-md transition-all ${activeTab === "preview" ? "bg-cyan-500 text-slate-950 font-bold shadow-md" : "text-slate-400 hover:text-slate-200"}`,
                  children: "Interactive 3D / Preview"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
                  lineNumber: 108,
                  columnNumber: 15
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setActiveTab("code"),
                  className: `px-3 py-1 text-xs font-semibold rounded-md transition-all ${activeTab === "code" ? "bg-cyan-500 text-slate-950 font-bold shadow-md" : "text-slate-400 hover:text-slate-200"}`,
                  children: "Code Editor"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
                  lineNumber: 118,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
              lineNumber: 107,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleCopy,
                className: "flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700",
                title: "Copy code",
                children: [
                  copied ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
                    lineNumber: 135,
                    columnNumber: 25
                  }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
                    lineNumber: 135,
                    columnNumber: 78
                  }, this),
                  copied ? "Copied" : "Copy"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
                lineNumber: 130,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onClose,
                className: "p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors",
                children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
                  lineNumber: 143,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
                lineNumber: 139,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
            lineNumber: 105,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
          lineNumber: 94,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 relative bg-[#04060c] overflow-hidden", children: activeTab === "preview" ? /* @__PURE__ */ jsxDEV(
          "iframe",
          {
            ref: iframeRef,
            srcDoc: generatePreviewDoc(code),
            title: "3D Code Runner Preview",
            sandbox: "allow-scripts allow-same-origin",
            className: "w-full h-full border-none bg-[#070913]"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
            lineNumber: 151,
            columnNumber: 13
          },
          this
        ) : /* @__PURE__ */ jsxDEV(
          "textarea",
          {
            value: code,
            onChange: (e) => setCode(e.target.value),
            className: "w-full h-full p-6 bg-[#060812] text-cyan-200 font-mono text-sm resize-none focus:outline-none selection:bg-cyan-500/40",
            spellCheck: false
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
            lineNumber: 159,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
          lineNumber: 149,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between px-6 py-3 border-t border-cyan-500/20 bg-[#060a14] text-xs text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
              lineNumber: 171,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "WebGL 3D Context Ready • Three.js Enabled" }, void 0, false, {
              fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
              lineNumber: 172,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
            lineNumber: 170,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: "Click & drag inside preview to interact with 3D models." }, void 0, false, {
            fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
            lineNumber: 174,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
          lineNumber: 169,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
        lineNumber: 92,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/applet/src/components/Live3DViewerModal.tsx",
      lineNumber: 88,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpdmUzRFZpZXdlck1vZGFsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBYLCBQbGF5LCBSZWZyZXNoQ3csIENvcHksIENoZWNrLCBNYXhpbWl6ZTIsIEV4dGVybmFsTGluaywgQ29kZTIgfSBmcm9tIFwibHVjaWRlLXJlYWN0XCI7XG5pbXBvcnQgeyBOZW9uVGhlbWUgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuaW50ZXJmYWNlIExpdmUzRFZpZXdlck1vZGFsUHJvcHMge1xuICBpc09wZW46IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIGNvZGVTbmlwcGV0OiBzdHJpbmc7XG4gIGxhbmd1YWdlOiBzdHJpbmc7XG4gIHRoZW1lPzogTmVvblRoZW1lO1xufVxuXG5leHBvcnQgY29uc3QgTGl2ZTNEVmlld2VyTW9kYWw6IFJlYWN0LkZDPExpdmUzRFZpZXdlck1vZGFsUHJvcHM+ID0gKHtcbiAgaXNPcGVuLFxuICBvbkNsb3NlLFxuICBjb2RlU25pcHBldCxcbiAgbGFuZ3VhZ2UsXG4gIHRoZW1lID0gXCJjeWFuLWNvcmVcIixcbn0pID0+IHtcbiAgY29uc3QgW2NvZGUsIHNldENvZGVdID0gdXNlU3RhdGUoY29kZVNuaXBwZXQpO1xuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGU8XCJwcmV2aWV3XCIgfCBcImNvZGVcIj4oXCJwcmV2aWV3XCIpO1xuICBjb25zdCBpZnJhbWVSZWYgPSB1c2VSZWY8SFRNTElGcmFtZUVsZW1lbnQ+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0Q29kZShjb2RlU25pcHBldCk7XG4gIH0sIFtjb2RlU25pcHBldF0pO1xuXG4gIC8vIENvbnN0cnVjdCBzYW5kYm94IEhUTUwgY29udGFpbmluZyBUaHJlZS5qcyBhbmQgbW9kZXJuIENETiB0b29sc1xuICBjb25zdCBnZW5lcmF0ZVByZXZpZXdEb2MgPSAocmF3Q29kZTogc3RyaW5nKSA9PiB7XG4gICAgLy8gSWYgaXQncyBhbHJlYWR5IGEgZnVsbCBIVE1MIGRvY1xuICAgIGlmIChyYXdDb2RlLmluY2x1ZGVzKFwiPCFET0NUWVBFIGh0bWw+XCIpIHx8IHJhd0NvZGUuaW5jbHVkZXMoXCI8aHRtbFwiKSkge1xuICAgICAgcmV0dXJuIHJhd0NvZGU7XG4gICAgfVxuXG4gICAgLy8gSWYgaXQncyBqYXZhc2NyaXB0L1RocmVlLmpzXG4gICAgcmV0dXJuIGBcbjwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG48aGVhZD5cbiAgPG1ldGEgY2hhcnNldD1cInV0Zi04XCI+XG4gIDxzdHlsZT5cbiAgICBib2R5IHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgYmFja2dyb3VuZDogIzA3MDkxMztcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICB9XG4gICAgI2NhbnZhcy1jb250YWluZXIge1xuICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgfVxuICA8L3N0eWxlPlxuICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vY2RuanMuY2xvdWRmbGFyZS5jb20vYWpheC9saWJzL3RocmVlLmpzL3IxMjgvdGhyZWUubWluLmpzXCI+PC9zY3JpcHQ+XG48L2hlYWQ+XG48Ym9keT5cbiAgPGRpdiBpZD1cImNhbnZhcy1jb250YWluZXJcIj48L2Rpdj5cbiAgPHNjcmlwdD5cbiAgICB0cnkge1xuICAgICAgJHtyYXdDb2RlfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSAnPGRpdiBzdHlsZT1cImNvbG9yOiNmNDNmNWU7cGFkZGluZzoyMHB4O2ZvbnQtZmFtaWx5Om1vbm9zcGFjZTt6LWluZGV4OjEwMDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC44KTtib3JkZXItcmFkaXVzOjhweDtcIj4nICsgZXJyLm1lc3NhZ2UgKyAnPC9kaXY+JztcbiAgICB9XG4gIDwvc2NyaXB0PlxuPC9ib2R5PlxuPC9odG1sPlxuICAgIGA7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29weSA9ICgpID0+IHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChjb2RlKTtcbiAgICBzZXRDb3BpZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBpZD1cImxpdmUtM2QtcnVubmVyLW1vZGFsXCJcbiAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgYmctYmxhY2svODAgYmFja2Ryb3AtYmx1ci1tZFwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgbWF4LXctNXhsIGgtWzg1dmhdIGJnLVsjMDkwZDFhXSBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwIHJvdW5kZWQtMnhsIHNoYWRvdy0yeGwgZmxleCBmbGV4LWNvbCBvdmVyZmxvdy1oaWRkZW4gbmVvbi1nbG93LWN5YW5cIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNiBweS00IGJvcmRlci1iIGJvcmRlci1jeWFuLTUwMC8yMCBiZy1bIzA2MGExNF1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLWN5YW4tNDAwIGFuaW1hdGUtcHVsc2UgbmVvbi1nbG93LWN5YW5cIiAvPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtY3liZXIgZm9udC1ib2xkIHRleHQtbGcgdGV4dC1jeWFuLTMwMCB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICBET0RFIEFJIDNEICYgQ09ERSBSVU5ORVJcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLWN5YW4tNTAwLzEwIHRleHQtY3lhbi00MDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMCB1cHBlcmNhc2UgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgIHtsYW5ndWFnZSB8fCBcImphdmFzY3JpcHRcIn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIHsvKiBUYWIgc3dpdGNoICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBiZy1bIzBkMTQyNF0gcm91bmRlZC1sZyBwLTEgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYihcInByZXZpZXdcIil9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xIHRleHQteHMgZm9udC1zZW1pYm9sZCByb3VuZGVkLW1kIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09IFwicHJldmlld1wiXG4gICAgICAgICAgICAgICAgICAgID8gXCJiZy1jeWFuLTUwMCB0ZXh0LXNsYXRlLTk1MCBmb250LWJvbGQgc2hhZG93LW1kXCJcbiAgICAgICAgICAgICAgICAgICAgOiBcInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMjAwXCJcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIEludGVyYWN0aXZlIDNEIC8gUHJldmlld1xuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYihcImNvZGVcIil9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xIHRleHQteHMgZm9udC1zZW1pYm9sZCByb3VuZGVkLW1kIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09IFwiY29kZVwiXG4gICAgICAgICAgICAgICAgICAgID8gXCJiZy1jeWFuLTUwMCB0ZXh0LXNsYXRlLTk1MCBmb250LWJvbGQgc2hhZG93LW1kXCJcbiAgICAgICAgICAgICAgICAgICAgOiBcInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMjAwXCJcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIENvZGUgRWRpdG9yXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29weX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgYmctc2xhdGUtODAwLzgwIGhvdmVyOmJnLXNsYXRlLTcwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJDb3B5IGNvZGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y29waWVkID8gPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgIHtjb3BpZWQgPyBcIkNvcGllZFwiIDogXCJDb3B5XCJ9XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXJvc2UtNDAwIGhvdmVyOmJnLXJvc2UtNTAwLzEwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQ29udGVudCBBcmVhICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSByZWxhdGl2ZSBiZy1bIzA0MDYwY10gb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gXCJwcmV2aWV3XCIgPyAoXG4gICAgICAgICAgICA8aWZyYW1lXG4gICAgICAgICAgICAgIHJlZj17aWZyYW1lUmVmfVxuICAgICAgICAgICAgICBzcmNEb2M9e2dlbmVyYXRlUHJldmlld0RvYyhjb2RlKX1cbiAgICAgICAgICAgICAgdGl0bGU9XCIzRCBDb2RlIFJ1bm5lciBQcmV2aWV3XCJcbiAgICAgICAgICAgICAgc2FuZGJveD1cImFsbG93LXNjcmlwdHMgYWxsb3ctc2FtZS1vcmlnaW5cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIGJvcmRlci1ub25lIGJnLVsjMDcwOTEzXVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgdmFsdWU9e2NvZGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q29kZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgcC02IGJnLVsjMDYwODEyXSB0ZXh0LWN5YW4tMjAwIGZvbnQtbW9ubyB0ZXh0LXNtIHJlc2l6ZS1ub25lIGZvY3VzOm91dGxpbmUtbm9uZSBzZWxlY3Rpb246YmctY3lhbi01MDAvNDBcIlxuICAgICAgICAgICAgICBzcGVsbENoZWNrPXtmYWxzZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEZvb3RlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNiBweS0zIGJvcmRlci10IGJvcmRlci1jeWFuLTUwMC8yMCBiZy1bIzA2MGExNF0gdGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPldlYkdMIDNEIENvbnRleHQgUmVhZHkg4oCiIFRocmVlLmpzIEVuYWJsZWQ8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIENsaWNrICYgZHJhZyBpbnNpZGUgcHJldmlldyB0byBpbnRlcmFjdCB3aXRoIDNEIG1vZGVscy5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQStGWTtBQS9GWixTQUFnQixVQUFVLFdBQVcsY0FBYztBQUNuRCxTQUFTLEdBQW9CLE1BQU0sYUFBNkM7QUFXekUsYUFBTSxvQkFBc0QsQ0FBQztBQUFBLEVBQ2xFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxRQUFRO0FBQ1YsTUFBTTtBQUNKLFFBQU0sQ0FBQyxNQUFNLE9BQU8sSUFBSSxTQUFTLFdBQVc7QUFDNUMsUUFBTSxDQUFDLFFBQVEsU0FBUyxJQUFJLFNBQVMsS0FBSztBQUMxQyxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBNkIsU0FBUztBQUN4RSxRQUFNLFlBQVksT0FBMEIsSUFBSTtBQUVoRCxZQUFVLE1BQU07QUFDZCxZQUFRLFdBQVc7QUFBQSxFQUNyQixHQUFHLENBQUMsV0FBVyxDQUFDO0FBR2hCLFFBQU0scUJBQXFCLENBQUMsWUFBb0I7QUFFOUMsUUFBSSxRQUFRLFNBQVMsaUJBQWlCLEtBQUssUUFBUSxTQUFTLE9BQU8sR0FBRztBQUNwRSxhQUFPO0FBQUEsSUFDVDtBQUdBLFdBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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