import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=df3e6907"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import { Globe, Youtube, Code2, Sparkles, Cpu, Flame } from "/node_modules/.vite/deps/lucide-react.js?v=df3e6907";
const PROMPT_CHIPS = [
  {
    icon: /* @__PURE__ */ jsxDEV(Globe, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
      fileName: "/app/applet/src/components/QuickPrompts.tsx",
      lineNumber: 12,
      columnNumber: 11
    }, this),
    label: "Live World Tech 2026",
    prompt: "Give me an urgent breakdown of the latest breakthroughs in AI, quantum computing, and tech news today with live web data.",
    mode: "general"
  },
  {
    icon: /* @__PURE__ */ jsxDEV(Youtube, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
      fileName: "/app/applet/src/components/QuickPrompts.tsx",
      lineNumber: 18,
      columnNumber: 11
    }, this),
    label: "YouTube Trending & Transcripts",
    prompt: "Analyze the top trending video formats on YouTube right now, including viral scripting hooks and thumbnail strategy.",
    mode: "youtube"
  },
  {
    icon: /* @__PURE__ */ jsxDEV(Code2, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
      fileName: "/app/applet/src/components/QuickPrompts.tsx",
      lineNumber: 24,
      columnNumber: 11
    }, this),
    label: "Generate 3D Three.js Shader Core",
    prompt: "Write a complete interactive Three.js 3D rotating neon crystal animation with custom glowing particles and mouse tracking in JavaScript.",
    mode: "code"
  },
  {
    icon: /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-fuchsia-400" }, void 0, false, {
      fileName: "/app/applet/src/components/QuickPrompts.tsx",
      lineNumber: 30,
      columnNumber: 11
    }, this),
    label: "Synthesize Cyberpunk Image",
    prompt: "Create a concept visual of a futuristic neon cyber-city floating above a digital ocean with holographic billboards.",
    mode: "image"
  },
  {
    icon: /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
      fileName: "/app/applet/src/components/QuickPrompts.tsx",
      lineNumber: 36,
      columnNumber: 11
    }, this),
    label: "Quantum Algorithms & Math",
    prompt: "Explain Shor's quantum factoring algorithm and quantum superposition with intuitive mathematical formulas and ASCII diagrams.",
    mode: "research"
  }
];
export const QuickPrompts = ({
  onSelectPrompt,
  activeMode
}) => {
  return /* @__PURE__ */ jsxDEV("div", { className: "w-full space-y-2", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 text-[11px] font-cyber font-semibold text-slate-400 uppercase tracking-wider", children: [
      /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
        fileName: "/app/applet/src/components/QuickPrompts.tsx",
        lineNumber: 50,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: "HIGH-VELOCITY QUANTUM PROMPTS" }, void 0, false, {
        fileName: "/app/applet/src/components/QuickPrompts.tsx",
        lineNumber: 51,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/QuickPrompts.tsx",
      lineNumber: 49,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: PROMPT_CHIPS.map((chip, index) => /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => onSelectPrompt(chip.prompt, chip.mode),
        className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-[#090e1c]/90 hover:bg-cyan-950/70 border border-slate-800 hover:border-cyan-500/50 text-xs text-slate-300 hover:text-cyan-200 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] text-left group",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-1 rounded-md bg-slate-800/80 group-hover:bg-slate-700 transition-colors", children: chip.icon }, void 0, false, {
            fileName: "/app/applet/src/components/QuickPrompts.tsx",
            lineNumber: 60,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: chip.label }, void 0, false, {
            fileName: "/app/applet/src/components/QuickPrompts.tsx",
            lineNumber: 63,
            columnNumber: 13
          }, this)
        ]
      },
      index,
      true,
      {
        fileName: "/app/applet/src/components/QuickPrompts.tsx",
        lineNumber: 55,
        columnNumber: 11
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/QuickPrompts.tsx",
      lineNumber: 53,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/QuickPrompts.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlF1aWNrUHJvbXB0cy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgR2xvYmUsIFlvdXR1YmUsIENvZGUyLCBTcGFya2xlcywgVGVybWluYWwsIENwdSwgRmxhbWUsIFNlYXJjaCB9IGZyb20gXCJsdWNpZGUtcmVhY3RcIjtcbmltcG9ydCB7IEFJTW9kZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5pbnRlcmZhY2UgUXVpY2tQcm9tcHRzUHJvcHMge1xuICBvblNlbGVjdFByb21wdDogKHByb21wdDogc3RyaW5nLCBtb2RlPzogQUlNb2RlKSA9PiB2b2lkO1xuICBhY3RpdmVNb2RlOiBBSU1vZGU7XG59XG5cbmNvbnN0IFBST01QVF9DSElQUyA9IFtcbiAge1xuICAgIGljb246IDxHbG9iZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz4sXG4gICAgbGFiZWw6IFwiTGl2ZSBXb3JsZCBUZWNoIDIwMjZcIixcbiAgICBwcm9tcHQ6IFwiR2l2ZSBtZSBhbiB1cmdlbnQgYnJlYWtkb3duIG9mIHRoZSBsYXRlc3QgYnJlYWt0aHJvdWdocyBpbiBBSSwgcXVhbnR1bSBjb21wdXRpbmcsIGFuZCB0ZWNoIG5ld3MgdG9kYXkgd2l0aCBsaXZlIHdlYiBkYXRhLlwiLFxuICAgIG1vZGU6IFwiZ2VuZXJhbFwiIGFzIEFJTW9kZSxcbiAgfSxcbiAge1xuICAgIGljb246IDxZb3V0dWJlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcm9zZS00MDBcIiAvPixcbiAgICBsYWJlbDogXCJZb3VUdWJlIFRyZW5kaW5nICYgVHJhbnNjcmlwdHNcIixcbiAgICBwcm9tcHQ6IFwiQW5hbHl6ZSB0aGUgdG9wIHRyZW5kaW5nIHZpZGVvIGZvcm1hdHMgb24gWW91VHViZSByaWdodCBub3csIGluY2x1ZGluZyB2aXJhbCBzY3JpcHRpbmcgaG9va3MgYW5kIHRodW1ibmFpbCBzdHJhdGVneS5cIixcbiAgICBtb2RlOiBcInlvdXR1YmVcIiBhcyBBSU1vZGUsXG4gIH0sXG4gIHtcbiAgICBpY29uOiA8Q29kZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+LFxuICAgIGxhYmVsOiBcIkdlbmVyYXRlIDNEIFRocmVlLmpzIFNoYWRlciBDb3JlXCIsXG4gICAgcHJvbXB0OiBcIldyaXRlIGEgY29tcGxldGUgaW50ZXJhY3RpdmUgVGhyZWUuanMgM0Qgcm90YXRpbmcgbmVvbiBjcnlzdGFsIGFuaW1hdGlvbiB3aXRoIGN1c3RvbSBnbG93aW5nIHBhcnRpY2xlcyBhbmQgbW91c2UgdHJhY2tpbmcgaW4gSmF2YVNjcmlwdC5cIixcbiAgICBtb2RlOiBcImNvZGVcIiBhcyBBSU1vZGUsXG4gIH0sXG4gIHtcbiAgICBpY29uOiA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1mdWNoc2lhLTQwMFwiIC8+LFxuICAgIGxhYmVsOiBcIlN5bnRoZXNpemUgQ3liZXJwdW5rIEltYWdlXCIsXG4gICAgcHJvbXB0OiBcIkNyZWF0ZSBhIGNvbmNlcHQgdmlzdWFsIG9mIGEgZnV0dXJpc3RpYyBuZW9uIGN5YmVyLWNpdHkgZmxvYXRpbmcgYWJvdmUgYSBkaWdpdGFsIG9jZWFuIHdpdGggaG9sb2dyYXBoaWMgYmlsbGJvYXJkcy5cIixcbiAgICBtb2RlOiBcImltYWdlXCIgYXMgQUlNb2RlLFxuICB9LFxuICB7XG4gICAgaWNvbjogPENwdSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+LFxuICAgIGxhYmVsOiBcIlF1YW50dW0gQWxnb3JpdGhtcyAmIE1hdGhcIixcbiAgICBwcm9tcHQ6IFwiRXhwbGFpbiBTaG9yJ3MgcXVhbnR1bSBmYWN0b3JpbmcgYWxnb3JpdGhtIGFuZCBxdWFudHVtIHN1cGVycG9zaXRpb24gd2l0aCBpbnR1aXRpdmUgbWF0aGVtYXRpY2FsIGZvcm11bGFzIGFuZCBBU0NJSSBkaWFncmFtcy5cIixcbiAgICBtb2RlOiBcInJlc2VhcmNoXCIgYXMgQUlNb2RlLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IFF1aWNrUHJvbXB0czogUmVhY3QuRkM8UXVpY2tQcm9tcHRzUHJvcHM+ID0gKHtcbiAgb25TZWxlY3RQcm9tcHQsXG4gIGFjdGl2ZU1vZGUsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgc3BhY2UteS0yXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1bMTFweF0gZm9udC1jeWJlciBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICA8c3Bhbj5ISUdILVZFTE9DSVRZIFFVQU5UVU0gUFJPTVBUUzwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICB7UFJPTVBUX0NISVBTLm1hcCgoY2hpcCwgaW5kZXgpID0+IChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TZWxlY3RQcm9tcHQoY2hpcC5wcm9tcHQsIGNoaXAubW9kZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zIHB5LTIgcm91bmRlZC14bCBiZy1bIzA5MGUxY10vOTAgaG92ZXI6YmctY3lhbi05NTAvNzAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLWN5YW4tNTAwLzUwIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC1jeWFuLTIwMCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctc20gaG92ZXI6c2NhbGUtWzEuMDJdIGFjdGl2ZTpzY2FsZS1bMC45OF0gdGV4dC1sZWZ0IGdyb3VwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMSByb3VuZGVkLW1kIGJnLXNsYXRlLTgwMC84MCBncm91cC1ob3ZlcjpiZy1zbGF0ZS03MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAge2NoaXAuaWNvbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj57Y2hpcC5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFXVTtBQVZWLFNBQVMsT0FBTyxTQUFTLE9BQU8sVUFBb0IsS0FBSyxhQUFxQjtBQVE5RSxNQUFNLGVBQWU7QUFBQSxFQUNuQjtBQUFBLElBQ0UsTUFBTSx1QkFBQyxTQUFNLFdBQVUsK0JBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBNkM7QUFBQSxJQUNuRCxPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU0sdUJBQUMsV0FBUSxXQUFVLCtCQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQStDO0FBQUEsSUFDckQsT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBLElBQ1IsTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNLHVCQUFDLFNBQU0sV0FBVSxrQ0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFnRDtBQUFBLElBQ3RELE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxJQUNSLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTSx1QkFBQyxZQUFTLFdBQVUsa0NBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBbUQ7QUFBQSxJQUN6RCxPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU0sdUJBQUMsT0FBSSxXQUFVLGdDQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBNEM7QUFBQSxJQUNsRCxPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixNQUFNO0FBQUEsRUFDUjtBQUNGO0FBRU8sYUFBTSxlQUE0QyxDQUFDO0FBQUEsRUFDeEQ7QUFBQSxFQUNBO0FBQ0YsTUFBTTtBQUNKLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLG9CQUNiO0FBQUEsMkJBQUMsU0FBSSxXQUFVLDBHQUNiO0FBQUEsNkJBQUMsU0FBTSxXQUFVLGdDQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQThDO0FBQUEsTUFDOUMsdUJBQUMsVUFBSyw2Q0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQW1DO0FBQUEsU0FGckM7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUdBO0FBQUEsSUFDQSx1QkFBQyxTQUFJLFdBQVUsd0JBQ1osdUJBQWEsSUFBSSxDQUFDLE1BQU0sVUFDdkI7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUVDLFNBQVMsTUFBTSxlQUFlLEtBQUssUUFBUSxLQUFLLElBQUk7QUFBQSxRQUNwRCxXQUFVO0FBQUEsUUFFVjtBQUFBLGlDQUFDLFNBQUksV0FBVSw2RUFDWixlQUFLLFFBRFI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLFVBQ0EsdUJBQUMsVUFBSyxXQUFVLGVBQWUsZUFBSyxTQUFwQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUEwQztBQUFBO0FBQUE7QUFBQSxNQVByQztBQUFBLE1BRFA7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVNBLENBQ0QsS0FaSDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBYUE7QUFBQSxPQWxCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBbUJBO0FBRUo7IiwibmFtZXMiOltdfQ==