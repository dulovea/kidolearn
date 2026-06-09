interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
}

const COLORS = ["#6366f1","#ec4899","#f59e0b","#10b981","#3b82f6","#ef4444","#a855f7"];

let canvas: HTMLCanvasElement | null = null;
let animId: number | null = null;
let particles: Particle[] = [];

function ensureCanvas() {
  if (canvas) return canvas;
  canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999";
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  return canvas;
}

function loop() {
  const c = canvas!;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, c.width, c.height);

  particles = particles.filter((p) => p.life > 0);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.3;  // gravity
    p.rotation += p.rotationSpeed;
    p.life -= 1;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.min(1, p.life / 20);
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
  }

  if (particles.length > 0) {
    animId = requestAnimationFrame(loop);
  } else {
    if (canvas) {
      canvas.remove();
      canvas = null;
    }
    animId = null;
  }
}

export function launchConfetti(): void {
  const c = ensureCanvas();
  c.width = window.innerWidth;
  c.height = window.innerHeight;

  const cx = window.innerWidth / 2;
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: cx + (Math.random() - 0.5) * 200,
      y: window.innerHeight * 0.4,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 15 - 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      life: 80 + Math.random() * 40,
    });
  }

  if (!animId) animId = requestAnimationFrame(loop);
}
