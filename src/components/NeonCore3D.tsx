import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=df3e6907"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=df3e6907"; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"];
import * as THREE from "/node_modules/.vite/deps/three.js?v=df3e6907";
export const NeonCore3D = ({
  isThinking = false,
  isSpeaking = false,
  isListening = false,
  theme = "cyan-core",
  modelType = "dodecahedron",
  compact = false,
  className = ""
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const primaryMeshRef = useRef(null);
  const wireframeMeshRef = useRef(null);
  const particlesRef = useRef(null);
  const innerCoreRef = useRef(null);
  const ringGroupRef = useRef(null);
  const getThemeColors = (t) => {
    switch (t) {
      case "magenta-pulse":
        return {
          primary: 14239471,
          secondary: 11032055,
          glow: 16020150,
          particles: 15235577
        };
      case "matrix-green":
        return {
          primary: 1096065,
          secondary: 366185,
          glow: 3462041,
          particles: 7268279
        };
      case "solar-amber":
        return {
          primary: 16096779,
          secondary: 14251782,
          glow: 16498468,
          particles: 16639626
        };
      case "cyan-core":
      default:
        return {
          primary: 440020,
          secondary: 3900150,
          glow: 2282478,
          particles: 6809849
        };
    }
  };
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1e3);
    camera.position.z = compact ? 4.5 : 5.5;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    const colors = getThemeColors(theme);
    const ambientLight = new THREE.AmbientLight(16777215, 0.8);
    scene.add(ambientLight);
    const pointLight1 = new THREE.PointLight(colors.primary, 3, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    const pointLight2 = new THREE.PointLight(colors.secondary, 2, 20);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);
    let geometry;
    switch (modelType) {
      case "neural-sphere":
        geometry = new THREE.IcosahedronGeometry(compact ? 1.1 : 1.4, 2);
        break;
      case "torus-knot":
        geometry = new THREE.TorusKnotGeometry(compact ? 0.8 : 1, 0.3, 100, 16);
        break;
      case "quantum-ring":
        geometry = new THREE.TorusGeometry(compact ? 1 : 1.3, 0.25, 16, 100);
        break;
      case "dodecahedron":
      default:
        geometry = new THREE.DodecahedronGeometry(compact ? 1.1 : 1.4, 0);
        break;
    }
    const material = new THREE.MeshPhysicalMaterial({
      color: colors.primary,
      transparent: true,
      opacity: 0.2,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      ior: 1.5,
      wireframe: false
    });
    const primaryMesh = new THREE.Mesh(geometry, material);
    scene.add(primaryMesh);
    primaryMeshRef.current = primaryMesh;
    const wireframeGeometry = new THREE.WireframeGeometry(geometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: colors.glow,
      linewidth: 2,
      transparent: true,
      opacity: 0.85
    });
    const wireframeMesh = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    primaryMesh.add(wireframeMesh);
    wireframeMeshRef.current = wireframeMesh;
    const innerGeometry = new THREE.SphereGeometry(compact ? 0.5 : 0.65, 32, 32);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: colors.glow,
      transparent: true,
      opacity: 0.9
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerCore);
    innerCoreRef.current = innerCore;
    const ringGroup = new THREE.Group();
    for (let i = 0; i < 3; i++) {
      const ringGeo = new THREE.RingGeometry(
        compact ? 1.6 + i * 0.25 : 2 + i * 0.35,
        compact ? 1.62 + i * 0.25 : 2.02 + i * 0.35,
        64
      );
      const ringMat = new THREE.MeshBasicMaterial({
        color: colors.secondary,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35 - i * 0.08
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / (2 + i);
      ring.rotation.y = Math.PI / 4 * i;
      ringGroup.add(ring);
    }
    scene.add(ringGroup);
    ringGroupRef.current = ringGroup;
    const particleCount = compact ? 80 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleScales[i] = Math.random() * 2 + 1;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: colors.particles,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetX = x / rect.width * 1.5;
      targetY = y / rect.height * 1.5;
    };
    window.addEventListener("mousemove", handleMouseMove);
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      if (newWidth > 0 && newHeight > 0) {
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    });
    resizeObserver.observe(container);
    let clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;
      let speedMultiplier = 1;
      if (isThinking) speedMultiplier = 3.5;
      if (isSpeaking) speedMultiplier = 2.2;
      if (isListening) speedMultiplier = 2;
      if (primaryMeshRef.current) {
        primaryMeshRef.current.rotation.x = elapsedTime * 0.3 * speedMultiplier + mouseY * 0.5;
        primaryMeshRef.current.rotation.y = elapsedTime * 0.4 * speedMultiplier + mouseX * 0.5;
        let pulse = Math.sin(elapsedTime * 3 * speedMultiplier) * 0.05;
        if (isThinking) pulse = Math.sin(elapsedTime * 8) * 0.12;
        if (isSpeaking) pulse = Math.sin(elapsedTime * 6) * 0.08;
        if (isListening) pulse = Math.sin(elapsedTime * 5) * 0.09;
        const baseScale = 1 + pulse;
        primaryMeshRef.current.scale.set(baseScale, baseScale, baseScale);
      }
      if (innerCoreRef.current) {
        const innerPulse = Math.sin(elapsedTime * 5 * speedMultiplier) * 0.15;
        const innerScale = 1 + innerPulse;
        innerCoreRef.current.scale.set(innerScale, innerScale, innerScale);
      }
      if (ringGroupRef.current) {
        ringGroupRef.current.rotation.z = -elapsedTime * 0.2 * speedMultiplier;
        ringGroupRef.current.rotation.y = elapsedTime * 0.15;
      }
      if (particlesRef.current) {
        particlesRef.current.rotation.y = -elapsedTime * 0.08 * speedMultiplier;
        particlesRef.current.rotation.x = elapsedTime * 0.04;
      }
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      geometry.dispose();
      wireframeGeometry.dispose();
      innerGeometry.dispose();
      particleGeo.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, modelType, compact, isThinking, isSpeaking, isListening]);
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      ref: containerRef,
      id: "dode-3d-core-container",
      className: `relative flex items-center justify-center select-none pointer-events-auto ${className}`
    },
    void 0,
    false,
    {
      fileName: "/app/applet/src/components/NeonCore3D.tsx",
      lineNumber: 317,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5lb25Db3JlM0QudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5pbXBvcnQgeyBOZW9uVGhlbWUsIE1vZGVsM0RUeXBlIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmludGVyZmFjZSBOZW9uQ29yZTNEUHJvcHMge1xuICBpc1RoaW5raW5nPzogYm9vbGVhbjtcbiAgaXNTcGVha2luZz86IGJvb2xlYW47XG4gIGlzTGlzdGVuaW5nPzogYm9vbGVhbjtcbiAgdGhlbWU/OiBOZW9uVGhlbWU7XG4gIG1vZGVsVHlwZT86IE1vZGVsM0RUeXBlO1xuICBjb21wYWN0PzogYm9vbGVhbjtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgTmVvbkNvcmUzRDogUmVhY3QuRkM8TmVvbkNvcmUzRFByb3BzPiA9ICh7XG4gIGlzVGhpbmtpbmcgPSBmYWxzZSxcbiAgaXNTcGVha2luZyA9IGZhbHNlLFxuICBpc0xpc3RlbmluZyA9IGZhbHNlLFxuICB0aGVtZSA9IFwiY3lhbi1jb3JlXCIsXG4gIG1vZGVsVHlwZSA9IFwiZG9kZWNhaGVkcm9uXCIsXG4gIGNvbXBhY3QgPSBmYWxzZSxcbiAgY2xhc3NOYW1lID0gXCJcIixcbn0pID0+IHtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3Qgc2NlbmVSZWYgPSB1c2VSZWY8VEhSRUUuU2NlbmUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcmVuZGVyZXJSZWYgPSB1c2VSZWY8VEhSRUUuV2ViR0xSZW5kZXJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhbmltYXRpb25GcmFtZVJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICAvLyBSZWZlcmVuY2VzIGZvciBhbmltYXRlZCBtZXNoZXNcbiAgY29uc3QgcHJpbWFyeU1lc2hSZWYgPSB1c2VSZWY8VEhSRUUuTWVzaCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB3aXJlZnJhbWVNZXNoUmVmID0gdXNlUmVmPFRIUkVFLkxpbmVTZWdtZW50cyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwYXJ0aWNsZXNSZWYgPSB1c2VSZWY8VEhSRUUuUG9pbnRzIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGlubmVyQ29yZVJlZiA9IHVzZVJlZjxUSFJFRS5NZXNoIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHJpbmdHcm91cFJlZiA9IHVzZVJlZjxUSFJFRS5Hcm91cCB8IG51bGw+KG51bGwpO1xuXG4gIC8vIENvbG9ycyBiYXNlZCBvbiB0aGVtZVxuICBjb25zdCBnZXRUaGVtZUNvbG9ycyA9ICh0OiBOZW9uVGhlbWUpID0+IHtcbiAgICBzd2l0Y2ggKHQpIHtcbiAgICAgIGNhc2UgXCJtYWdlbnRhLXB1bHNlXCI6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJpbWFyeTogMHhkOTQ2ZWYsXG4gICAgICAgICAgc2Vjb25kYXJ5OiAweGE4NTVmNyxcbiAgICAgICAgICBnbG93OiAweGY0NzJiNixcbiAgICAgICAgICBwYXJ0aWNsZXM6IDB4ZTg3OWY5LFxuICAgICAgICB9O1xuICAgICAgY2FzZSBcIm1hdHJpeC1ncmVlblwiOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByaW1hcnk6IDB4MTBiOTgxLFxuICAgICAgICAgIHNlY29uZGFyeTogMHgwNTk2NjksXG4gICAgICAgICAgZ2xvdzogMHgzNGQzOTksXG4gICAgICAgICAgcGFydGljbGVzOiAweDZlZTdiNyxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgXCJzb2xhci1hbWJlclwiOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHByaW1hcnk6IDB4ZjU5ZTBiLFxuICAgICAgICAgIHNlY29uZGFyeTogMHhkOTc3MDYsXG4gICAgICAgICAgZ2xvdzogMHhmYmJmMjQsXG4gICAgICAgICAgcGFydGljbGVzOiAweGZkZTY4YSxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgXCJjeWFuLWNvcmVcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcHJpbWFyeTogMHgwNmI2ZDQsXG4gICAgICAgICAgc2Vjb25kYXJ5OiAweDNiODJmNixcbiAgICAgICAgICBnbG93OiAweDIyZDNlZSxcbiAgICAgICAgICBwYXJ0aWNsZXM6IDB4NjdlOGY5LFxuICAgICAgICB9O1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBjb250YWluZXIgPSBjb250YWluZXJSZWYuY3VycmVudDtcbiAgICBjb25zdCB3aWR0aCA9IGNvbnRhaW5lci5jbGllbnRXaWR0aCB8fCAzMDA7XG4gICAgY29uc3QgaGVpZ2h0ID0gY29udGFpbmVyLmNsaWVudEhlaWdodCB8fCAzMDA7XG5cbiAgICAvLyBTY2VuZVxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgc2NlbmVSZWYuY3VycmVudCA9IHNjZW5lO1xuXG4gICAgLy8gQ2FtZXJhXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQ1LCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxMDAwKTtcbiAgICBjYW1lcmEucG9zaXRpb24ueiA9IGNvbXBhY3QgPyA0LjUgOiA1LjU7XG5cbiAgICAvLyBSZW5kZXJlclxuICAgIGNvbnN0IHJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoe1xuICAgICAgYWxwaGE6IHRydWUsXG4gICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICBwb3dlclByZWZlcmVuY2U6IFwiaGlnaC1wZXJmb3JtYW5jZVwiLFxuICAgIH0pO1xuICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgcmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyhNYXRoLm1pbih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbywgMikpO1xuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICByZW5kZXJlclJlZi5jdXJyZW50ID0gcmVuZGVyZXI7XG5cbiAgICBjb25zdCBjb2xvcnMgPSBnZXRUaGVtZUNvbG9ycyh0aGVtZSk7XG5cbiAgICAvLyBMaWdodHNcbiAgICBjb25zdCBhbWJpZW50TGlnaHQgPSBuZXcgVEhSRUUuQW1iaWVudExpZ2h0KDB4ZmZmZmZmLCAwLjgpO1xuICAgIHNjZW5lLmFkZChhbWJpZW50TGlnaHQpO1xuXG4gICAgY29uc3QgcG9pbnRMaWdodDEgPSBuZXcgVEhSRUUuUG9pbnRMaWdodChjb2xvcnMucHJpbWFyeSwgMywgMjApO1xuICAgIHBvaW50TGlnaHQxLnBvc2l0aW9uLnNldCg1LCA1LCA1KTtcbiAgICBzY2VuZS5hZGQocG9pbnRMaWdodDEpO1xuXG4gICAgY29uc3QgcG9pbnRMaWdodDIgPSBuZXcgVEhSRUUuUG9pbnRMaWdodChjb2xvcnMuc2Vjb25kYXJ5LCAyLCAyMCk7XG4gICAgcG9pbnRMaWdodDIucG9zaXRpb24uc2V0KC01LCAtNSwgNSk7XG4gICAgc2NlbmUuYWRkKHBvaW50TGlnaHQyKTtcblxuICAgIC8vIDEuIENyZWF0ZSBNb2RlbCBHZW9tZXRyeSBiYXNlZCBvbiBtb2RlbFR5cGVcbiAgICBsZXQgZ2VvbWV0cnk6IFRIUkVFLkJ1ZmZlckdlb21ldHJ5O1xuICAgIHN3aXRjaCAobW9kZWxUeXBlKSB7XG4gICAgICBjYXNlIFwibmV1cmFsLXNwaGVyZVwiOlxuICAgICAgICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5JY29zYWhlZHJvbkdlb21ldHJ5KGNvbXBhY3QgPyAxLjEgOiAxLjQsIDIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ0b3J1cy1rbm90XCI6XG4gICAgICAgIGdlb21ldHJ5ID0gbmV3IFRIUkVFLlRvcnVzS25vdEdlb21ldHJ5KGNvbXBhY3QgPyAwLjggOiAxLjAsIDAuMywgMTAwLCAxNik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInF1YW50dW0tcmluZ1wiOlxuICAgICAgICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Ub3J1c0dlb21ldHJ5KGNvbXBhY3QgPyAxLjAgOiAxLjMsIDAuMjUsIDE2LCAxMDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkb2RlY2FoZWRyb25cIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIC8vIERPREUgQUkgc2lnbmF0dXJlIHNoYXBlOiBEb2RlY2FoZWRyb25cbiAgICAgICAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuRG9kZWNhaGVkcm9uR2VvbWV0cnkoY29tcGFjdCA/IDEuMSA6IDEuNCwgMCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIE91dGVyIFRyYW5zbHVjZW50IEdsYXNzIE1lc2hcbiAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogY29sb3JzLnByaW1hcnksXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuMixcbiAgICAgIHJvdWdobmVzczogMC4xLFxuICAgICAgbWV0YWxuZXNzOiAwLjksXG4gICAgICB0cmFuc21pc3Npb246IDAuNixcbiAgICAgIGlvcjogMS41LFxuICAgICAgd2lyZWZyYW1lOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBwcmltYXJ5TWVzaCA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XG4gICAgc2NlbmUuYWRkKHByaW1hcnlNZXNoKTtcbiAgICBwcmltYXJ5TWVzaFJlZi5jdXJyZW50ID0gcHJpbWFyeU1lc2g7XG5cbiAgICAvLyBHbG93aW5nIFdpcmVmcmFtZVxuICAgIGNvbnN0IHdpcmVmcmFtZUdlb21ldHJ5ID0gbmV3IFRIUkVFLldpcmVmcmFtZUdlb21ldHJ5KGdlb21ldHJ5KTtcbiAgICBjb25zdCB3aXJlZnJhbWVNYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogY29sb3JzLmdsb3csXG4gICAgICBsaW5ld2lkdGg6IDIsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuODUsXG4gICAgfSk7XG4gICAgY29uc3Qgd2lyZWZyYW1lTWVzaCA9IG5ldyBUSFJFRS5MaW5lU2VnbWVudHMod2lyZWZyYW1lR2VvbWV0cnksIHdpcmVmcmFtZU1hdGVyaWFsKTtcbiAgICBwcmltYXJ5TWVzaC5hZGQod2lyZWZyYW1lTWVzaCk7XG4gICAgd2lyZWZyYW1lTWVzaFJlZi5jdXJyZW50ID0gd2lyZWZyYW1lTWVzaDtcblxuICAgIC8vIElubmVyIFB1bHNpbmcgQ29yZVxuICAgIGNvbnN0IGlubmVyR2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoY29tcGFjdCA/IDAuNSA6IDAuNjUsIDMyLCAzMik7XG4gICAgY29uc3QgaW5uZXJNYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogY29sb3JzLmdsb3csXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuOSxcbiAgICB9KTtcbiAgICBjb25zdCBpbm5lckNvcmUgPSBuZXcgVEhSRUUuTWVzaChpbm5lckdlb21ldHJ5LCBpbm5lck1hdGVyaWFsKTtcbiAgICBzY2VuZS5hZGQoaW5uZXJDb3JlKTtcbiAgICBpbm5lckNvcmVSZWYuY3VycmVudCA9IGlubmVyQ29yZTtcblxuICAgIC8vIE9yYml0YWwgUmluZ3MgR3JvdXBcbiAgICBjb25zdCByaW5nR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgY29uc3QgcmluZ0dlbyA9IG5ldyBUSFJFRS5SaW5nR2VvbWV0cnkoXG4gICAgICAgIGNvbXBhY3QgPyAxLjYgKyBpICogMC4yNSA6IDIuMCArIGkgKiAwLjM1LFxuICAgICAgICBjb21wYWN0ID8gMS42MiArIGkgKiAwLjI1IDogMi4wMiArIGkgKiAwLjM1LFxuICAgICAgICA2NFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJpbmdNYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogY29sb3JzLnNlY29uZGFyeSxcbiAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuMzUgLSBpICogMC4wOCxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmluZyA9IG5ldyBUSFJFRS5NZXNoKHJpbmdHZW8sIHJpbmdNYXQpO1xuICAgICAgcmluZy5yb3RhdGlvbi54ID0gTWF0aC5QSSAvICgyICsgaSk7XG4gICAgICByaW5nLnJvdGF0aW9uLnkgPSAoTWF0aC5QSSAvIDQpICogaTtcbiAgICAgIHJpbmdHcm91cC5hZGQocmluZyk7XG4gICAgfVxuICAgIHNjZW5lLmFkZChyaW5nR3JvdXApO1xuICAgIHJpbmdHcm91cFJlZi5jdXJyZW50ID0gcmluZ0dyb3VwO1xuXG4gICAgLy8gQW1iaWVudCBQYXJ0aWNsZSBTd2FybVxuICAgIGNvbnN0IHBhcnRpY2xlQ291bnQgPSBjb21wYWN0ID8gODAgOiAxODA7XG4gICAgY29uc3QgcGFydGljbGVHZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBjb25zdCBwYXJ0aWNsZVBvc2l0aW9ucyA9IG5ldyBGbG9hdDMyQXJyYXkocGFydGljbGVDb3VudCAqIDMpO1xuICAgIGNvbnN0IHBhcnRpY2xlU2NhbGVzID0gbmV3IEZsb2F0MzJBcnJheShwYXJ0aWNsZUNvdW50KTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCByYWRpdXMgPSAyLjAgKyBNYXRoLnJhbmRvbSgpICogMi4yO1xuICAgICAgY29uc3QgdGhldGEgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XG4gICAgICBjb25zdCBwaGkgPSBNYXRoLmFjb3MoTWF0aC5yYW5kb20oKSAqIDIgLSAxKTtcblxuICAgICAgcGFydGljbGVQb3NpdGlvbnNbaSAqIDNdID0gcmFkaXVzICogTWF0aC5zaW4ocGhpKSAqIE1hdGguY29zKHRoZXRhKTtcbiAgICAgIHBhcnRpY2xlUG9zaXRpb25zW2kgKiAzICsgMV0gPSByYWRpdXMgKiBNYXRoLnNpbihwaGkpICogTWF0aC5zaW4odGhldGEpO1xuICAgICAgcGFydGljbGVQb3NpdGlvbnNbaSAqIDMgKyAyXSA9IHJhZGl1cyAqIE1hdGguY29zKHBoaSk7XG4gICAgICBwYXJ0aWNsZVNjYWxlc1tpXSA9IE1hdGgucmFuZG9tKCkgKiAyICsgMTtcbiAgICB9XG5cbiAgICBwYXJ0aWNsZUdlby5zZXRBdHRyaWJ1dGUoXCJwb3NpdGlvblwiLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHBhcnRpY2xlUG9zaXRpb25zLCAzKSk7XG4gICAgY29uc3QgcGFydGljbGVNYXQgPSBuZXcgVEhSRUUuUG9pbnRzTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IGNvbG9ycy5wYXJ0aWNsZXMsXG4gICAgICBzaXplOiAwLjA2LFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBvcGFjaXR5OiAwLjcsXG4gICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICB9KTtcbiAgICBjb25zdCBwYXJ0aWNsZXMgPSBuZXcgVEhSRUUuUG9pbnRzKHBhcnRpY2xlR2VvLCBwYXJ0aWNsZU1hdCk7XG4gICAgc2NlbmUuYWRkKHBhcnRpY2xlcyk7XG4gICAgcGFydGljbGVzUmVmLmN1cnJlbnQgPSBwYXJ0aWNsZXM7XG5cbiAgICAvLyBNb3VzZSBJbnRlcmFjdGlvblxuICAgIGxldCBtb3VzZVggPSAwO1xuICAgIGxldCBtb3VzZVkgPSAwO1xuICAgIGxldCB0YXJnZXRYID0gMDtcbiAgICBsZXQgdGFyZ2V0WSA9IDA7XG5cbiAgICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHggPSBlLmNsaWVudFggLSByZWN0LmxlZnQgLSByZWN0LndpZHRoIC8gMjtcbiAgICAgIGNvbnN0IHkgPSBlLmNsaWVudFkgLSByZWN0LnRvcCAtIHJlY3QuaGVpZ2h0IC8gMjtcbiAgICAgIHRhcmdldFggPSAoeCAvIHJlY3Qud2lkdGgpICogMS41O1xuICAgICAgdGFyZ2V0WSA9ICh5IC8gcmVjdC5oZWlnaHQpICogMS41O1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBoYW5kbGVNb3VzZU1vdmUpO1xuXG4gICAgLy8gUmVzaXplIEhhbmRsZXIgd2l0aCBSZXNpemVPYnNlcnZlclxuICAgIGNvbnN0IHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKChlbnRyaWVzKSA9PiB7XG4gICAgICBpZiAoIWVudHJpZXNbMF0pIHJldHVybjtcbiAgICAgIGNvbnN0IHsgd2lkdGg6IG5ld1dpZHRoLCBoZWlnaHQ6IG5ld0hlaWdodCB9ID0gZW50cmllc1swXS5jb250ZW50UmVjdDtcbiAgICAgIGlmIChuZXdXaWR0aCA+IDAgJiYgbmV3SGVpZ2h0ID4gMCkge1xuICAgICAgICBjYW1lcmEuYXNwZWN0ID0gbmV3V2lkdGggLyBuZXdIZWlnaHQ7XG4gICAgICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIHJlbmRlcmVyLnNldFNpemUobmV3V2lkdGgsIG5ld0hlaWdodCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShjb250YWluZXIpO1xuXG4gICAgLy8gQW5pbWF0aW9uIExvb3BcbiAgICBsZXQgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcblxuICAgIGNvbnN0IGFuaW1hdGUgPSAoKSA9PiB7XG4gICAgICBjb25zdCBlbGFwc2VkVGltZSA9IGNsb2NrLmdldEVsYXBzZWRUaW1lKCk7XG5cbiAgICAgIC8vIFNtb290aCBtb3VzZSBsZXJwXG4gICAgICBtb3VzZVggKz0gKHRhcmdldFggLSBtb3VzZVgpICogMC4wNTtcbiAgICAgIG1vdXNlWSArPSAodGFyZ2V0WSAtIG1vdXNlWSkgKiAwLjA1O1xuXG4gICAgICAvLyBEeW5hbWljIHJvdGF0aW9uIHNwZWVkIGJhc2VkIG9uIHN0YXRlc1xuICAgICAgbGV0IHNwZWVkTXVsdGlwbGllciA9IDE7XG4gICAgICBpZiAoaXNUaGlua2luZykgc3BlZWRNdWx0aXBsaWVyID0gMy41O1xuICAgICAgaWYgKGlzU3BlYWtpbmcpIHNwZWVkTXVsdGlwbGllciA9IDIuMjtcbiAgICAgIGlmIChpc0xpc3RlbmluZykgc3BlZWRNdWx0aXBsaWVyID0gMi4wO1xuXG4gICAgICBpZiAocHJpbWFyeU1lc2hSZWYuY3VycmVudCkge1xuICAgICAgICBwcmltYXJ5TWVzaFJlZi5jdXJyZW50LnJvdGF0aW9uLnggPSBlbGFwc2VkVGltZSAqIDAuMyAqIHNwZWVkTXVsdGlwbGllciArIG1vdXNlWSAqIDAuNTtcbiAgICAgICAgcHJpbWFyeU1lc2hSZWYuY3VycmVudC5yb3RhdGlvbi55ID0gZWxhcHNlZFRpbWUgKiAwLjQgKiBzcGVlZE11bHRpcGxpZXIgKyBtb3VzZVggKiAwLjU7XG5cbiAgICAgICAgLy8gUHVsc2Ugc2NhbGVcbiAgICAgICAgbGV0IHB1bHNlID0gTWF0aC5zaW4oZWxhcHNlZFRpbWUgKiAzICogc3BlZWRNdWx0aXBsaWVyKSAqIDAuMDU7XG4gICAgICAgIGlmIChpc1RoaW5raW5nKSBwdWxzZSA9IE1hdGguc2luKGVsYXBzZWRUaW1lICogOCkgKiAwLjEyO1xuICAgICAgICBpZiAoaXNTcGVha2luZykgcHVsc2UgPSBNYXRoLnNpbihlbGFwc2VkVGltZSAqIDYpICogMC4wODtcbiAgICAgICAgaWYgKGlzTGlzdGVuaW5nKSBwdWxzZSA9IE1hdGguc2luKGVsYXBzZWRUaW1lICogNSkgKiAwLjA5O1xuXG4gICAgICAgIGNvbnN0IGJhc2VTY2FsZSA9IDEgKyBwdWxzZTtcbiAgICAgICAgcHJpbWFyeU1lc2hSZWYuY3VycmVudC5zY2FsZS5zZXQoYmFzZVNjYWxlLCBiYXNlU2NhbGUsIGJhc2VTY2FsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpbm5lckNvcmVSZWYuY3VycmVudCkge1xuICAgICAgICBjb25zdCBpbm5lclB1bHNlID0gTWF0aC5zaW4oZWxhcHNlZFRpbWUgKiA1ICogc3BlZWRNdWx0aXBsaWVyKSAqIDAuMTU7XG4gICAgICAgIGNvbnN0IGlubmVyU2NhbGUgPSAxICsgaW5uZXJQdWxzZTtcbiAgICAgICAgaW5uZXJDb3JlUmVmLmN1cnJlbnQuc2NhbGUuc2V0KGlubmVyU2NhbGUsIGlubmVyU2NhbGUsIGlubmVyU2NhbGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAocmluZ0dyb3VwUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgcmluZ0dyb3VwUmVmLmN1cnJlbnQucm90YXRpb24ueiA9IC1lbGFwc2VkVGltZSAqIDAuMiAqIHNwZWVkTXVsdGlwbGllcjtcbiAgICAgICAgcmluZ0dyb3VwUmVmLmN1cnJlbnQucm90YXRpb24ueSA9IGVsYXBzZWRUaW1lICogMC4xNTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcnRpY2xlc1JlZi5jdXJyZW50KSB7XG4gICAgICAgIHBhcnRpY2xlc1JlZi5jdXJyZW50LnJvdGF0aW9uLnkgPSAtZWxhcHNlZFRpbWUgKiAwLjA4ICogc3BlZWRNdWx0aXBsaWVyO1xuICAgICAgICBwYXJ0aWNsZXNSZWYuY3VycmVudC5yb3RhdGlvbi54ID0gZWxhcHNlZFRpbWUgKiAwLjA0O1xuICAgICAgfVxuXG4gICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG4gICAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgIH07XG5cbiAgICBhbmltYXRlKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XG4gICAgICB9XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgICAgcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgcmVuZGVyZXIuZGlzcG9zZSgpO1xuICAgICAgZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgICAgd2lyZWZyYW1lR2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgICAgaW5uZXJHZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgICBwYXJ0aWNsZUdlby5kaXNwb3NlKCk7XG4gICAgICBpZiAoY29udGFpbmVyLmNvbnRhaW5zKHJlbmRlcmVyLmRvbUVsZW1lbnQpKSB7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbdGhlbWUsIG1vZGVsVHlwZSwgY29tcGFjdCwgaXNUaGlua2luZywgaXNTcGVha2luZywgaXNMaXN0ZW5pbmddKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgaWQ9XCJkb2RlLTNkLWNvcmUtY29udGFpbmVyXCJcbiAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNlbGVjdC1ub25lIHBvaW50ZXItZXZlbnRzLWF1dG8gJHtjbGFzc05hbWV9YH1cbiAgICAvPlxuICAp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