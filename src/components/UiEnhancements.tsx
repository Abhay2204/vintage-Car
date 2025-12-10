import React, { useEffect, useRef, useState } from 'react';

export const FilmGrain: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.02] mix-blend-overlay overflow-hidden">
      <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-grain" />
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        .animate-grain {
          animation: grain 8s steps(10) infinite;
        }
      `}</style>
    </div>
  );
};

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Configuration
  const TRAIL_LENGTH = 12;
  
  // State refs to avoid re-renders during animation loop
  const cursorState = useRef({
    mouseX: -100,
    mouseY: -100,
    trailX: new Array(TRAIL_LENGTH).fill(-100),
    trailY: new Array(TRAIL_LENGTH).fill(-100),
    isVisible: false,
    isHovering: false
  });

  useEffect(() => {
    // Event Handlers
    const moveMouse = (e: MouseEvent) => {
      cursorState.current.mouseX = e.clientX;
      cursorState.current.mouseY = e.clientY;
      if (!cursorState.current.isVisible) cursorState.current.isVisible = true;
    };

    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isClickable = 
            target.tagName === 'A' || 
            target.tagName === 'BUTTON' || 
            target.tagName === 'INPUT' || 
            target.tagName === 'TEXTAREA' ||
            target.closest('a') || 
            target.closest('button') ||
            target.closest('input') ||
            target.classList.contains('cursor-pointer') ||
            target.classList.contains('cursor-hover') ||
            window.getComputedStyle(target).cursor === 'pointer';
            
        cursorState.current.isHovering = !!isClickable;
    };

    const handleMouseLeave = () => { cursorState.current.isVisible = false; };
    const handleMouseEnter = () => { cursorState.current.isVisible = true; };

    // Listeners
    window.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseover', handleMouseOver); // Capture bubbling hover events
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    // Animation Loop
    let animationFrameId: number;
    
    const render = () => {
      const state = cursorState.current;
      
      // Update Main Cursor
      if (cursorRef.current) {
        const sizeOffset = 6; // Half of w-3 (12px)
        const scale = state.isHovering ? 2 : 1;
        
        // Use translate3d for GPU acceleration
        cursorRef.current.style.transform = `translate3d(${state.mouseX - sizeOffset}px, ${state.mouseY - sizeOffset}px, 0) scale(${scale})`;
        cursorRef.current.style.opacity = state.isVisible ? '1' : '0';
      }

      // Update Trail (Snake Effect)
      // Each segment moves towards the previous target (preceding dot)
      // We start the target as the current mouse position
      let targetX = state.mouseX;
      let targetY = state.mouseY;
      
      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const el = trailRefs.current[i];
        if (el) {
          // Smoothness factor (0.1 = very lazy/long trail, 0.5 = tight trail)
          const smoothness = 0.35; 
          
          const currentX = state.trailX[i];
          const currentY = state.trailY[i];
          
          // Lerp towards target
          const nextX = currentX + (targetX - currentX) * smoothness;
          const nextY = currentY + (targetY - currentY) * smoothness;
          
          state.trailX[i] = nextX;
          state.trailY[i] = nextY;
          
          const sizeOffset = 4; // Half of w-2 (8px)
          const scale = 1 - (i / TRAIL_LENGTH); // Shrink towards end
          const opacity = state.isVisible ? (0.6 * (1 - i / TRAIL_LENGTH)) : 0;
          
          el.style.transform = `translate3d(${nextX - sizeOffset}px, ${nextY - sizeOffset}px, 0) scale(${scale})`;
          el.style.opacity = opacity.toString();
          
          // The next dot will chase this dot's new position
          targetX = nextX;
          targetY = nextY;
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseover', handleMouseOver);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-amber-500 rounded-full pointer-events-none z-[9999] transition-[transform_0s] will-change-transform shadow-[0_0_10px_rgba(245,158,11,0.8)]"
      />
      
      {/* Trail Segments */}
      {Array.from({ length: TRAIL_LENGTH }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9998] will-change-transform"
        />
      ))}
    </>
  );
};