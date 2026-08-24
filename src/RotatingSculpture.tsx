import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import type { Group } from "three";

type RotationRef = React.MutableRefObject<{ x: number; y: number }>;

// Three interlocking rings at offset angles — a from-scratch procedural
// stand-in for the chrome sculpture in the desktop hero video (no 3D
// asset available to reuse), tuned toward the same iridescent-chrome
// read via MeshPhysicalMaterial's iridescence + a reflective env map.
function Sculpture({ dragRotation }: { dragRotation: RotationRef }) {
  const group = useRef<Group>(null);
  const autoRotate = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    autoRotate.current += delta * 0.35;
    group.current.rotation.y = autoRotate.current + dragRotation.current.y;
    group.current.rotation.x = dragRotation.current.x;
  });

  const ringMaterialProps = {
    metalness: 1,
    roughness: 0.12,
    iridescence: 1,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 420] as [number, number],
    envMapIntensity: 1.4,
  };

  return (
    <group ref={group} scale={0.85} position={[-1.05, 0.18, 0]}>
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.4, 0.16, 48, 128]} />
        <meshPhysicalMaterial {...ringMaterialProps} color="#e8e8ec" />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 5, 0]}>
        <torusGeometry args={[1.4, 0.14, 48, 128]} />
        <meshPhysicalMaterial {...ringMaterialProps} color="#f0e8e2" />
      </mesh>
      <mesh rotation={[-Math.PI / 3, -Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[1.4, 0.12, 48, 128]} />
        <meshPhysicalMaterial {...ringMaterialProps} color="#e2ecf0" />
      </mesh>
    </group>
  );
}

// Swipe-to-rotate, with momentum after release. `dragRotation` is read
// directly inside the R3F render loop (via useFrame above), so dragging
// never triggers a React re-render — only plain ref mutation.
function useDragRotation() {
  const dragRotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    // Without this, dragging over the hero's overlaid text (stats, labels)
    // also fires the browser's native text-selection drag underneath —
    // confirmed on a real mobile viewport test.
    e.preventDefault();
    dragging.current = true;
    last.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    const vy = dx * 0.008;
    const vx = dy * 0.008;
    dragRotation.current.y += vy;
    dragRotation.current.x = Math.max(-0.8, Math.min(0.8, dragRotation.current.x + vx));
    velocity.current = { x: vx, y: vy };
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // Single RAF loop for the whole component lifetime, applying momentum
  // decay only while there's leftover velocity and the pointer is up —
  // cheap no-op otherwise, and properly cancelled on unmount.
  useEffect(() => {
    let raf: number;
    const tick = () => {
      if (!dragging.current) {
        const { x, y } = velocity.current;
        if (Math.abs(x) > 0.0001 || Math.abs(y) > 0.0001) {
          dragRotation.current.y += y;
          dragRotation.current.x = Math.max(-0.8, Math.min(0.8, dragRotation.current.x + x));
          velocity.current = { x: x * 0.94, y: y * 0.94 };
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return { dragRotation, onPointerDown, onPointerMove, onPointerUp };
}

export function RotatingSculpture() {
  const { dragRotation, onPointerDown, onPointerMove, onPointerUp } = useDragRotation();
  // Lower-end phones can drop the WebGL context under GPU/memory
  // pressure (backgrounding the tab, other apps competing for memory).
  // R3F doesn't reliably resume mid-scene after that, so on loss we
  // force a full remount via this key — cheap, and guarantees a fresh
  // context rather than leaving the canvas permanently blank.
  const [canvasKey, setCanvasKey] = useState(0);

  return (
    <div
      // Clamped to a safe band, not the full hero — the object auto-rotates
      // continuously, so at scale/position alone it inevitably swings over
      // the stacked top/bottom text at some point in its cycle no matter
      // how it's tuned. Clipping here makes that geometrically impossible
      // instead of just unlikely.
      className="absolute left-0 right-0 top-[18%] bottom-[24%] overflow-hidden touch-none select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <Canvas
        key={canvasKey}
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        onCreated={(state) => {
          state.gl.domElement.addEventListener(
            "webglcontextlost",
            (e) => {
              e.preventDefault();
              setCanvasKey((k) => k + 1);
            },
            { once: true }
          );
        }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, -3]} intensity={0.5} />
        <Environment preset="city" />
        <Sculpture dragRotation={dragRotation} />
      </Canvas>
    </div>
  );
}
