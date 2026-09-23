import React, { useRef, useEffect } from 'react';
import { Download, Image as ImageIcon } from 'lucide-react';

export const BrandAssets: React.FC = () => {
  const logoCanvasRef = useRef<HTMLCanvasElement>(null);
  const bannerCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawLogo();
    drawBanner();
  }, []);

  const drawLogo = () => {
    const canvas = logoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#030712'; // slate-950
    ctx.fillRect(0, 0, 400, 400);

    // Glowing mesh
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
    gradient.addColorStop(1, 'rgba(3, 7, 18, 1)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);

    // Shield outer
    ctx.beginPath();
    ctx.moveTo(200, 80);
    ctx.lineTo(300, 120);
    ctx.lineTo(300, 220);
    ctx.bezierCurveTo(300, 280, 240, 320, 200, 340);
    ctx.bezierCurveTo(160, 320, 100, 280, 100, 220);
    ctx.lineTo(100, 120);
    ctx.closePath();
    
    ctx.strokeStyle = '#10b981'; // emerald-500
    ctx.lineWidth = 8;
    ctx.stroke();

    // Shield inner
    ctx.beginPath();
    ctx.moveTo(200, 105);
    ctx.lineTo(275, 135);
    ctx.lineTo(275, 215);
    ctx.bezierCurveTo(275, 260, 225, 290, 200, 305);
    ctx.bezierCurveTo(175, 290, 125, 260, 125, 215);
    ctx.lineTo(125, 135);
    ctx.closePath();
    ctx.fillStyle = '#06b6d4'; // cyan-500
    ctx.fill();

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 56px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ZK', 200, 215);
  };

  const drawBanner = () => {
    const canvas = bannerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, 1500, 500);

    // Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= 1500; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 500);
      ctx.stroke();
    }
    for (let y = 0; y <= 500; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1500, y);
      ctx.stroke();
    }

    // Glowing nodes (circuit pattern)
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(100, 250);
    ctx.lineTo(300, 250);
    ctx.lineTo(400, 150);
    ctx.lineTo(1200, 150);
    ctx.lineTo(1300, 250);
    ctx.lineTo(1400, 250);
    ctx.stroke();

    ctx.fillStyle = '#06b6d4';
    [100, 300, 400, 1200, 1300, 1400].forEach(x => {
      ctx.beginPath();
      ctx.arc(x, x === 400 || x === 1200 ? 150 : 250, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // Typography
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 72px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PayZK Protocol', 750, 260);

    ctx.fillStyle = '#9ca3af'; // gray-400
    ctx.font = '32px sans-serif';
    ctx.fillText('Confidential Income & Employment Verification on @MidnightNtwrk', 750, 330);
  };

  const downloadCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>, filename: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    a.click();
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <ImageIcon className="text-indigo-500" size={32} />
          X (Twitter) Brand Assets
        </h2>
        <p className="text-gray-400 max-w-2xl">
          Instantly generate and download high-resolution brand assets for your X profile.
        </p>
      </div>

      <div className="space-y-12">
        {/* Logo Section */}
        <div className="glass-panel p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Profile Logo (400x400)</h3>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/50">
              <canvas ref={logoCanvasRef} width={400} height={400} className="w-[200px] h-[200px] object-contain" />
            </div>
            <div className="flex-1">
              <p className="text-gray-400 mb-6">
                Dark futuristic ZK shield icon with glowing gradients and centered PayZK emblem.
                Optimized for circular avatar cropping on X.
              </p>
              <button 
                onClick={() => downloadCanvas(logoCanvasRef, 'payzk-x-logo.png')}
                className="btn-primary"
              >
                <Download size={18} />
                Download X Profile Logo (PNG)
              </button>
            </div>
          </div>
        </div>

        {/* Banner Section */}
        <div className="glass-panel p-8">
          <h3 className="text-xl font-semibold text-white mb-4">Header Banner (1500x500)</h3>
          <div className="flex flex-col gap-6 items-start">
            <div className="border border-white/10 rounded-2xl overflow-hidden bg-black/50 w-full overflow-x-auto">
              <canvas ref={bannerCanvasRef} width={1500} height={500} className="w-[750px] h-[250px] object-contain shrink-0" />
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 max-w-2xl">
                Dark cyber grid background, glowing node connections, and ZK circuit graphics.
              </p>
              <button 
                onClick={() => downloadCanvas(bannerCanvasRef, 'payzk-x-banner.png')}
                className="btn-primary shrink-0"
              >
                <Download size={18} />
                Download X Header Banner (PNG)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
