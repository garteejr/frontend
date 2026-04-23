'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import BackButton from '@/components/common/BackButton';
import { useGame } from '../context/GameContext';

const COLORS = ['#FFD60A', '#FF6B35', '#FF4D8F', '#7C3AED', '#3B82F6', '#22C55E', '#FFFFFF', '#EF4444'];

export default function DrawGame() {
  const { showReward } = useGame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawing = useRef(false);
  const [activeColor, setActiveColor] = useState('#FFD60A');
  const brushSize = 8;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext('2d');
    if (ctxRef.current) {
      ctxRef.current.lineWidth = brushSize;
      ctxRef.current.lineCap = 'round';
      ctxRef.current.strokeStyle = activeColor;
    }
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleX };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    drawing.current = true;
    ctx.beginPath();
    const { x, y } = getPos(e, canvas);
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    const { x, y } = getPos(e, canvas);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => { drawing.current = false; };

  const setColor = (color: string) => {
    setActiveColor(color);
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    }
  };

  const setErase = () => {
    const ctx = ctxRef.current;
    if (ctx) { ctx.globalCompositeOperation = 'destination-out'; ctx.lineWidth = 20; }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = brushSize;
  };

  return (
    <div>
      <BackButton section="motor" />
      <div className="font-fredoka text-xl" style={{ color: '#FFD60A' }}>🎨 Kanvas Menggambar</div>
      <div className="text-sm text-muted font-semibold mb-3">Gambar apapun yang kamu mau! Gunakan jari atau mouse.</div>

      <canvas
        ref={canvasRef}
        width={520}
        height={220}
        className="draw-canvas"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={(e) => { e.preventDefault(); startDraw(e); }}
        onTouchMove={(e) => { e.preventDefault(); draw(e); }}
        onTouchEnd={stopDraw}
      />

      <div className="flex gap-2 flex-wrap justify-center mt-2">
        {COLORS.map((c) => (
          <div
            key={c}
            onClick={() => setColor(c)}
            className="w-8 h-8 rounded-full cursor-pointer transition-all duration-200"
            style={{
              background: c,
              border: activeColor === c ? '3px solid #fff' : '3px solid transparent',
              transform: activeColor === c ? 'scale(1.2)' : undefined,
            }}
          />
        ))}
        <button
          onClick={setErase}
          className="rounded-xl px-3 py-1.5 text-white text-xs font-bold font-nunito cursor-pointer transition-all duration-200 hover:border-brand-purple"
          style={{ background: '#231657', border: '2px solid #4C1D95' }}
        >
          🧹 Hapus
        </button>
        <button
          onClick={clearCanvas}
          className="rounded-xl px-3 py-1.5 text-white text-xs font-bold font-nunito cursor-pointer transition-all duration-200 hover:border-brand-purple"
          style={{ background: '#231657', border: '2px solid #4C1D95' }}
        >
          🗑️ Bersih
        </button>
        <button
          onClick={() => showReward('🌟🌟🌟', 'Karya Luar Biasa!', 'Gambarmu sangat indah! Teruskan berkarya!')}
          className="rounded-xl px-3 py-1.5 text-white text-xs font-bold font-nunito cursor-pointer transition-all duration-200 hover:border-brand-purple"
          style={{ background: '#231657', border: '2px solid #4C1D95' }}
        >
          💾 Simpan
        </button>
      </div>
    </div>
  );
}
