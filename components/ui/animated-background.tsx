'use client';

import { useEffect, useState, useRef } from 'react';

interface WavePoint {
    x: number;
    baseY: number;
    offset: number;
    speed: number;
    amplitude: number;
}

interface GlowWave {
    points: WavePoint[];
    color: string;
    opacity: number;
    baseOpacity: number;
    yOffset: number;
    flickerSpeed: number;
    flickerIntensity: number;
    life: number;
    maxLife: number;
}

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [lastProgress, setLastProgress] = useState(0);
    const animationFrameRef = useRef<number>(0);
    const wavesRef = useRef<GlowWave[]>([]);
    const isAnimatingRef = useRef<boolean>(false);
    const timeRef = useRef<number>(0);

    const [isPaused, setIsPaused] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const savedState = localStorage.getItem('bg-animation-paused');
        if (savedState) {
            setIsPaused(savedState === 'true');
        }

        // Listen for custom toggle events
        const handleToggle = (e: CustomEvent) => {
            setIsPaused(e.detail.isPaused);
        };

        window.addEventListener('bg-animation-toggle' as any, handleToggle);
        return () => {
            window.removeEventListener('bg-animation-toggle' as any, handleToggle);
        };
    }, []);

    // No internal toggle anymore, relying on external event or localstorage
    // const togglePause = ... (removed)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Reduced points for performance - smooth curves don't need many points
        const createWavePoints = (numPoints: number, baseY: number): WavePoint[] => {
            const points: WavePoint[] = [];
            const spacing = canvas.width / (numPoints - 1);

            for (let i = 0; i < numPoints; i++) {
                points.push({
                    x: i * spacing,
                    baseY,
                    offset: Math.random() * Math.PI * 2,
                    speed: 0.005 + Math.random() * 0.01,
                    amplitude: 60 + Math.random() * 60, // Increased amplitude
                });
            }
            return points;
        };

        const createAmbientWaves = () => {
            isAnimatingRef.current = true;
            wavesRef.current = [];

            const colors = [
                '#3b82f6', // Blue
                '#0ea5e9', // Sky
                '#06b6d4', // Cyan
            ];

            // Reduced from 7 to 3 layers for optimization
            const numWaves = 3;
            for (let i = 0; i < numWaves; i++) {
                const baseY = canvas.height - (i * 40);
                // Reduced points from 20 to 6
                const points = createWavePoints(5, baseY);

                wavesRef.current.push({
                    points,
                    color: colors[i % colors.length],
                    opacity: 0,
                    baseOpacity: 0.6, // Higher base opacity for better visibility
                    yOffset: -i * 20,
                    flickerSpeed: 0.02 + Math.random() * 0.02,
                    flickerIntensity: 0.1,
                    life: 600,
                    maxLife: 600,
                });
            }
        };

        const checkProgress = () => {
            if (isAnimatingRef.current || isPaused) return;

            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = Math.floor((scrollTop / docHeight) * 100);

            const milestones = [25, 50, 75, 100];
            milestones.forEach((milestone) => {
                if (progress >= milestone && lastProgress < milestone) {
                    createAmbientWaves();
                    setLastProgress(progress);
                }
            });
        };

        window.addEventListener('scroll', checkProgress);

        const ambientInterval = setInterval(() => {
            if (!isAnimatingRef.current && !isPaused) {
                createAmbientWaves();
            }
        }, 5 * 60 * 1000);

        const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const easeOutCubic = (t: number) => (--t) * t * t + 1;

        const animate = () => {
            if (isPaused) return; // Stop loop if paused

            // Only animate if there are active waves
            if (!isAnimatingRef.current && wavesRef.current.length === 0) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            timeRef.current += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Optimization: Use lighter blend mode for "glow" effect without shadowBlur
            ctx.globalCompositeOperation = 'screen';

            wavesRef.current = wavesRef.current.filter((wave) => {
                wave.life--;

                const progress = 1 - wave.life / wave.maxLife;
                if (progress < 0.1) {
                    wave.opacity = easeInOutQuad(progress / 0.1) * wave.baseOpacity;
                } else if (progress > 0.9) {
                    wave.opacity = easeOutCubic(1 - (progress - 0.9) / 0.1) * wave.baseOpacity;
                } else {
                    const flicker = Math.sin(timeRef.current * wave.flickerSpeed) * wave.flickerIntensity;
                    wave.opacity = wave.baseOpacity + (wave.baseOpacity * flicker);
                }

                // Update points
                for (let i = 0; i < wave.points.length; i++) {
                    wave.points[i].offset += wave.points[i].speed;
                }

                // Draw Single Smooth Wave
                ctx.beginPath();
                ctx.moveTo(0, canvas.height);

                for (let i = 0; i < wave.points.length; i++) {
                    const point = wave.points[i];
                    const y = point.baseY + Math.sin(point.offset) * point.amplitude + wave.yOffset;

                    if (i === 0) {
                        ctx.lineTo(point.x, y);
                    } else {
                        const prevPoint = wave.points[i - 1];
                        const prevY = prevPoint.baseY + Math.sin(prevPoint.offset) * prevPoint.amplitude + wave.yOffset;
                        const cpX = (prevPoint.x + point.x) / 2;
                        const cpY = (prevY + y) / 2;
                        ctx.quadraticCurveTo(prevPoint.x, prevY, cpX, cpY);
                    }
                }

                const lastPoint = wave.points[wave.points.length - 1];
                const lastY = lastPoint.baseY + Math.sin(lastPoint.offset) * lastPoint.amplitude + wave.yOffset;
                ctx.lineTo(lastPoint.x, lastY);
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();

                // Simple gradient fill - significantly faster than shadowBlur logic
                // Using just one fill per wave instead of 3 loops
                const gradient = ctx.createLinearGradient(0, canvas.height - 400, 0, canvas.height);
                gradient.addColorStop(0, wave.color + '00'); // Transparent at top
                gradient.addColorStop(1, wave.color + Math.floor(wave.opacity * 255).toString(16).padStart(2, '0'));

                ctx.fillStyle = gradient;
                ctx.fill();

                return wave.life > 0;
            });

            ctx.globalCompositeOperation = 'source-over'; // Reset blend mode

            if (wavesRef.current.length === 0) {
                isAnimatingRef.current = false;
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        if (!isPaused) {
            animationFrameRef.current = requestAnimationFrame(animate);
        }

        // Initial delay
        setTimeout(() => {
            if (!isPaused) createAmbientWaves();
        }, 1000);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', checkProgress);
            clearInterval(ambientInterval);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [lastProgress, isPaused]); // Re-run effect when pause state changes to handle restart/cleanup correctly

    // We shouldn't render the button on server/hydration mismatch, so use isMounted
    if (!isMounted) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{
                opacity: 1, // Increased overall opacity
                filter: 'blur(60px)',
                // Refined mask: visible on sides, fading to transparent in middle
                maskImage: 'linear-gradient(to right, black 0%, transparent 40%, transparent 60%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, black 0%, transparent 40%, transparent 60%, black 100%)'
            }}
        />
    );
}
