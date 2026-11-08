import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number; size: number; hue: number };

export default function NeuralField({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !context) return;

    const reducedMotion = reduceMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const pointer = { x: -1000, y: -1000 };
    let frame = 0;
    let width = 0;
    let height = 0;
    let lastFrame = 0;
    let nodes: Node[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.max(24, Math.min(72, Math.floor((width * height) / 14500)));
      nodes = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: index % 9 === 0 ? 2.2 : 1.1 + Math.random() * 0.7,
        hue: index % 4 === 0 ? 198 : 42,
      }));
      draw(0);
    };

    const draw = (time: number, staticFrame = false) => {
      context.clearRect(0, 0, width, height);
      const linkDistance = Math.min(170, Math.max(90, width * 0.15));

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (!staticFrame && !reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (finePointer) {
            const dx = pointer.x - node.x;
            const dy = pointer.y - node.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 145 && distance > 1) {
              node.x -= (dx / distance) * (145 - distance) * 0.002;
              node.y -= (dy / distance) * (145 - distance) * 0.002;
            }
          }
          if (node.x < -12) node.x = width + 12;
          if (node.x > width + 12) node.x = -12;
          if (node.y < -12) node.y = height + 12;
          if (node.y > height + 12) node.y = -12;
        }

        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance < linkDistance) {
            const alpha = (1 - distance / linkDistance) * 0.24;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(${node.hue === 42 ? "218, 180, 106" : "67, 200, 255"}, ${alpha})`;
            context.lineWidth = 0.65;
            context.stroke();
          }
        }

        const glow = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 5);
        glow.addColorStop(0, node.hue === 42 ? "rgba(255, 222, 154, .72)" : "rgba(113, 220, 255, .75)");
        glow.addColorStop(1, node.hue === 42 ? "rgba(255, 222, 154, 0)" : "rgba(113, 220, 255, 0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(node.x, node.y, node.size * 5, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = node.hue === 42 ? "rgba(240, 202, 126, .82)" : "rgba(126, 222, 255, .82)";
        context.beginPath();
        context.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        context.fill();
      }

      if (!staticFrame && !reducedMotion) frame = window.requestAnimationFrame((nextTime) => {
        if (nextTime - lastFrame < 30) {
          frame = window.requestAnimationFrame(draw);
          return;
        }
        lastFrame = nextTime;
        draw(nextTime);
      });
      void time;
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      pointer.x = -1000;
      pointer.y = -1000;
    };

    resize();
    if (finePointer) {
      canvas.addEventListener("pointermove", onPointerMove, { passive: true });
      canvas.addEventListener("pointerleave", onPointerLeave);
    }
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} className="neural-field" aria-hidden="true" />;
}
