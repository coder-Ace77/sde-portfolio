"use client"
import { useState, useEffect } from 'react';
import { Minus, Plus, Maximize2, Minimize2, Type, ChevronLeft, ChevronRight, Waves, Play, Pause } from 'lucide-react';

export function NoteControls() {
    const [fontSize, setFontSize] = useState(20);
    const [widthMode, setWidthMode] = useState<'compact' | 'standard' | 'wide' | 'full'>("standard");
    const [isAnimPaused, setIsAnimPaused] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load preferences from localStorage on mount
    useEffect(() => {
        const savedFontSize = localStorage.getItem('note-font-size');
        const savedWidthMode = localStorage.getItem('note-width-mode');
        const savedAnimState = localStorage.getItem('bg-animation-paused');

        if (savedFontSize) {
            setFontSize(parseInt(savedFontSize, 10));
        }
        if (savedWidthMode) {
            setWidthMode(savedWidthMode as 'compact' | 'standard' | 'wide' | 'full');
        }
        if (savedAnimState) {
            setIsAnimPaused(savedAnimState === 'true');
        }

        setIsLoaded(true);
    }, []);

    // Apply styles and save to localStorage whenever settings change
    useEffect(() => {
        if (!isLoaded) return; // Don't save on initial mount

        const root = document.documentElement;
        root.style.setProperty('--note-font-size', `${fontSize}px`);

        // Map width modes to actual widths
        const widthMap = {
            compact: '650px',
            standard: '768px',
            wide: '1000px',
            full: '100%'
        };

        root.style.setProperty('--note-wrapper-width', widthMap[widthMode]);

        // Save to localStorage
        localStorage.setItem('note-font-size', fontSize.toString());
        localStorage.setItem('note-width-mode', widthMode);
    }, [fontSize, widthMode, isLoaded]);

    const widthOptions: Array<'compact' | 'standard' | 'wide' | 'full'> = ['compact', 'standard', 'wide', 'full'];
    const currentIndex = widthOptions.indexOf(widthMode);

    const cycleWidth = (direction: 'prev' | 'next') => {
        if (direction === 'next') {
            const nextIndex = (currentIndex + 1) % widthOptions.length;
            setWidthMode(widthOptions[nextIndex]);
        } else {
            const prevIndex = (currentIndex - 1 + widthOptions.length) % widthOptions.length;
            setWidthMode(widthOptions[prevIndex]);
        }
    };

    const toggleAnim = () => {
        const newState = !isAnimPaused;
        setIsAnimPaused(newState);
        localStorage.setItem('bg-animation-paused', String(newState));

        // Dispatch event for AnimatedBackground to pick up
        const event = new CustomEvent('bg-animation-toggle', { detail: { isPaused: newState } });
        window.dispatchEvent(event);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2 p-3 bg-card border shadow-lg rounded-xl transition-opacity opacity-90 hover:opacity-100">
            {/* Font Size Control */}
            <div className="flex items-center justify-between gap-4">
                <Type size={16} className="text-muted-foreground" />
                <div className="flex bg-secondary rounded-lg">
                    <button onClick={() => setFontSize(s => Math.max(12, s - 1))} className="p-2 hover:bg-background rounded-l-lg transition-colors" aria-label="Decrease font size">
                        <Minus size={14} />
                    </button>
                    <span className="w-8 flex items-center justify-center text-xs font-mono">{fontSize}</span>
                    <button onClick={() => setFontSize(s => Math.min(24, s + 1))} className="p-2 hover:bg-background rounded-r-lg transition-colors" aria-label="Increase font size">
                        <Plus size={14} />
                    </button>
                </div>
            </div>

            {/* Width Control */}
            <div className="flex items-center justify-between gap-4">
                <Maximize2 size={16} className="text-muted-foreground" />
                <div className="flex bg-secondary rounded-lg">
                    <button
                        onClick={() => cycleWidth('prev')}
                        className="p-2 hover:bg-background rounded-l-lg transition-colors"
                        aria-label="Decrease width"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    <span className="min-w-[60px] flex items-center justify-center text-xs font-mono capitalize px-2">
                        {widthMode}
                    </span>
                    <button
                        onClick={() => cycleWidth('next')}
                        className="p-2 hover:bg-background rounded-r-lg transition-colors"
                        aria-label="Increase width"
                    >
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            {/* Animation Control */}
            <div className="flex items-center justify-between gap-4">
                <Waves size={16} className="text-muted-foreground" />
                <div className="flex bg-secondary rounded-lg w-full">
                    <button
                        onClick={toggleAnim}
                        className="flex-1 p-2 hover:bg-background rounded-lg transition-colors flex items-center justify-center gap-2"
                        aria-label={isAnimPaused ? "Play animation" : "Pause animation"}
                    >
                        {isAnimPaused ? <Play size={14} /> : <Pause size={14} />}
                        <span className="text-xs font-mono">{isAnimPaused ? "Paused" : "Active"}</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
