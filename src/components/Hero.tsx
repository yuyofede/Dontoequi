'use client';

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react';

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){ vec2 i = floor(p); vec2 f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f); return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y); }
float fbm(vec2 p){ float v = 0.0; float a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.02; a *= 0.5; } return v; }
void main(){
  vec2 st = gl_FragCoord.xy / u_res.xy;
  vec2 p = st; p.x *= u_res.x / u_res.y;
  float t = u_time * 0.12;
  float n = fbm(p * 1.8 + vec2(t, -t * 0.6));
  vec2 c1 = vec2(0.30 + 0.10 * sin(t * 1.4), 0.60 + 0.10 * cos(t * 1.1));
  vec2 c2 = vec2(0.75 + 0.10 * cos(t * 0.9), 0.40 + 0.10 * sin(t * 1.3));
  c1.x *= u_res.x / u_res.y; c2.x *= u_res.x / u_res.y;
  float d1 = length(p - c1) + (n - 0.5) * 0.22;
  float d2 = length(p - c2) + (n - 0.5) * 0.22;
  float g1 = smoothstep(0.62, 0.0, d1);
  float g2 = smoothstep(0.55, 0.0, d2);
  vec3 primary = vec3(0.02, 0.20, 0.34);
  vec3 accent  = vec3(0.85, 0.64, 0.25);
  vec3 teal    = vec3(0.35, 0.72, 0.66);
  vec3 col = mix(primary, accent, clamp(g2 / (g1 + g2 + 0.001), 0.0, 1.0));
  col = mix(col, teal, g1 * 0.25);
  float a = g1 * 0.30 + g2 * 0.26;
  a *= 0.85 + 0.15 * n;
  vec2 q = st - 0.5;
  a *= smoothstep(0.75, 0.25, length(q));
  vec2 m = u_mouse; m.x *= u_res.x / u_res.y;
  float md = length(p - m);
  a += smoothstep(0.35, 0.0, md) * 0.06;
  gl_FragColor = vec4(col, a);
`;

export default function Hero() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: false, powerPreference: 'high-performance' }) as WebGLRenderingContext | null;
    if (!gl) return;

    const compile = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
      return shader;
    };

    const vertexShader = compile(gl.VERTEX_SHADER, VERT);
    const fragmentShader = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vertexShader || !fragmentShader) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_pos');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'u_res');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    let mouseX = 0.5;
    let mouseY = 0.5;
    let frame = 0;
    let start = performance.now();
    let visible = true;

    const resize = () => {
      const bounds = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(bounds.width * dpr));
      const h = Math.max(1, Math.round(bounds.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
    };

    const render = (now: number) => {
      const elapsed = (now - start) * 0.001;
      if (uTime) gl.uniform1f(uTime, elapsed);
      if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = visible && !document.hidden ? requestAnimationFrame(render) : 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible && !frame) frame = requestAnimationFrame(render);
      if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; }
    });
    intersection.observe(host);
    const onVisibility = () => { if (!document.hidden && visible && !frame) frame = requestAnimationFrame(render); };
    document.addEventListener('visibilitychange', onVisibility);
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouseX = (e.clientX - rect.left) / rect.width;
      mouseY = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    resize();
    frame = requestAnimationFrame(render);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      const ext = gl.getExtension('WEBGL_lose_context');
      ext?.loseContext();
    };
  }, []);

  const handleTiltMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (-py * 10).toFixed(2);
    const ry = (px * 10).toFixed(2);
    el.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
  };

  const handleTiltLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section id="inicio" className="relative overflow-hidden reveal">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-[#f7faf7] to-accent/10" />
      <div ref={hostRef} className="absolute inset-0 -z-10 h-full w-full">
        <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full pointer-events-none opacity-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)]" style={{ zIndex: -10 }} />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-blob absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 z-[-5] hidden lg:block">
        <div className="h-80 w-80 rounded-full border-2 border-[#B5845]/40 animate-spin" style={{ animationDuration: '40s' }} />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h1 className="hero-rise hero-delay-1 mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            DontoEqui: Odontología equina de calidad para tus <span className="text-primary">caballos</span>.
          </h1>
          <p className="hero-rise hero-delay-2 mt-6 text-lg text-muted max-w-xl">
            En DontoEqui nos especializamos en odontología equina: diagnóstico, tratamiento y prevención para el bienestar de tu caballo.
          </p>
          <div className="hero-rise hero-delay-3 mt-8 flex flex-col sm:flex-row gap-4">
            <a href="#contacto" className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] cta-sheen">
              Solicitar turno
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">↗</span>
            </a>
            <a href="#servicios" className="inline-flex items-center justify-center rounded-full border border-border bg-card px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary">
              Ver servicios
            </a>
          </div>
          <dl className="hero-rise hero-delay-4 mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div>
              <dt className="text-2xl font-bold text-primary">+10</dt>
              <dd className="text-sm text-muted">Años de experiencia</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-primary">100%</dt>
              <dd className="text-sm text-muted">Odontología equina</dd>
            </div>
            <div>
              <dt className="text-2xl font-bold text-primary">Córdoba</dt>
              <dd className="text-sm text-muted">Argentina</dd>
            </div>
          </dl>
        </div>
        <div className="relative hero-tilt" ref={tiltRef} onPointerMove={handleTiltMove} onPointerLeave={handleTiltLeave}>
          <div className="glow-frame">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border shadow-lg animate-float">
              <img src="/hero-odontologia.webp" alt="Atención odontológica equina en DontoEqui" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
