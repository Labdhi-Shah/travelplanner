import React, { useEffect, useState, useRef } from 'react';

/**
 * AirplaneCursor
 * 
 * Replaces the default mouse cursor with an animated airplane on desktop.
 * Features:
 * - Smooth lerp tracking with slight delay for an authentic flight feel
 * - Dynamic aerodynamic banking (airplane tilts and banks towards movement vector)
 * - Gentle floating oscillation when idle
 * - Whisper-light contrail / vapor trail emitting from engines during flight
 * - Interactive hover states (scale-up, gold flight glow, ascent pitch over buttons/links)
 * - Restores native text cursor over inputs/textareas
 * - Automatically disables on touch/mobile devices
 */
export default function AirplaneCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Flight dynamics refs
  const mousePos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const velocity = useRef({ x: 0, y: 0 });
  const currentAngle = useRef(45);
  const planeRef = useRef(null);
  const trailContainerRef = useRef(null);
  const trailsRef = useRef([]);
  const animFrameId = useRef(null);
  const lastEmitTime = useRef(0);

  useEffect(() => {
    // 1. Device check: Only enable on desktop pointer devices (screen width >= 768px, pointer: fine, non-touch)
    const checkIsDesktop = () => {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isWideEnough = window.innerWidth >= 768;
      return isFinePointer && !isTouch && isWideEnough;
    };

    if (!checkIsDesktop()) {
      setIsEnabled(false);
      document.body.classList.remove('custom-cursor-active');
      return; // Keep native cursor on mobile/touch devices
    }

    setIsEnabled(true);
    document.body.classList.add('custom-cursor-active');

    const handleResize = () => {
      if (!checkIsDesktop()) {
        setIsEnabled(false);
        document.body.classList.remove('custom-cursor-active');
      } else {
        setIsEnabled(true);
        document.body.classList.add('custom-cursor-active');
      }
    };

    window.addEventListener('resize', handleResize);

    // 2. Mouse Move Tracker
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // 3. Hover element detection
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const isClickable = Boolean(
        target.closest('a, button, [role="button"], select, .clickable, [data-clickable="true"]')
      );
      const isInput = Boolean(
        target.closest('input[type="text"], input[type="email"], input[type="password"], input[type="tel"], input[type="number"], input[type="search"], textarea')
      );

      setIsHovering(isClickable);
      setIsTextInput(isInput);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    // 4. Smooth Physics Loop (60-120fps)
    let startTime = performance.now();

    const loop = (timestamp) => {
      const elapsed = timestamp - startTime;

      // Smooth lag / lerp tracking towards mouse position
      const lerpFactor = 0.16; // Higher = tighter, Lower = more floaty
      const dx = mousePos.current.x - currentPos.current.x;
      const dy = mousePos.current.y - currentPos.current.y;

      velocity.current.x = dx * lerpFactor;
      velocity.current.y = dy * lerpFactor;

      currentPos.current.x += velocity.current.x;
      currentPos.current.y += velocity.current.y;

      const speed = Math.sqrt(dx * dx + dy * dy);

      // Dynamic rotation & banking:
      // When moving fast, point in flight direction.
      // When slowing down or idle, smoothly return towards 45deg with gentle floating wobble.
      let targetAngle = currentAngle.current;

      if (speed > 2.0) {
        // Point nose (top of SVG) in flight direction
        targetAngle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) + 90;
      } else {
        // Subtle resting heading (45deg northeast arrow orientation)
        targetAngle = 45;
      }

      // Shortest-arc angle interpolation
      let angleDiff = ((targetAngle - currentAngle.current + 180) % 360) - 180;
      currentAngle.current += angleDiff * 0.14;

      // Gentle floating / cruising oscillation when airborne
      const idleFloatY = Math.sin(elapsed * 0.0035) * 2.5;
      const idleFloatX = Math.cos(elapsed * 0.0025) * 1.5;
      const idleTilt = Math.sin(elapsed * 0.003) * 3;

      // Render plane position
      if (planeRef.current) {
        const posX = currentPos.current.x + idleFloatX;
        const posY = currentPos.current.y + idleFloatY;
        const angle = currentAngle.current + idleTilt;

        planeRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0) rotate(${angle}deg)`;
      }

      // 5. Contrail / Jet Stream Particle Emission
      // Emit fading contrail particles when flying with speed > 4px
      if (speed > 4.5 && timestamp - lastEmitTime.current > 45) {
        lastEmitTime.current = timestamp;

        // Calculate position behind the engines
        const rad = (currentAngle.current - 90) * (Math.PI / 180);
        const trailOffsetDist = 12; // Distance behind plane nose
        const trailX = currentPos.current.x - Math.cos(rad) * trailOffsetDist;
        const trailY = currentPos.current.y - Math.sin(rad) * trailOffsetDist;

        trailsRef.current.push({
          id: timestamp + Math.random(),
          x: trailX,
          y: trailY,
          opacity: 0.65,
          scale: 0.8,
          createdAt: timestamp,
        });

        // Keep maximum 14 particles
        if (trailsRef.current.length > 14) {
          trailsRef.current.shift();
        }
      }

      // Update & render contrail particles in DOM
      if (trailContainerRef.current) {
        const now = timestamp;
        trailsRef.current = trailsRef.current.filter((particle) => {
          const age = now - particle.createdAt;
          const maxLife = 380; // ms
          if (age >= maxLife) return false;

          const progress = age / maxLife;
          particle.opacity = (1 - progress) * 0.6;
          particle.scale = 0.8 + progress * 0.8;
          return true;
        });

        // Direct DOM update for 60fps trail performance without React re-renders
        const html = trailsRef.current
          .map(
            (p) =>
              `<span style="position:absolute;left:${p.x}px;top:${p.y}px;width:5px;height:5px;border-radius:50%;background:rgba(207,168,100,${p.opacity});transform:translate(-50%,-50%) scale(${p.scale});filter:blur(1px);pointer-events:none;will-change:transform,opacity;"></span>`
          )
          .join('');
        trailContainerRef.current.innerHTML = html;
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* Contrail / Vapor particles layer */}
      <div
        ref={trailContainerRef}
        className="fixed inset-0 pointer-events-none z-[99998] overflow-hidden"
        style={{ opacity: isVisible && !isTextInput ? 1 : 0, transition: 'opacity 0.2s ease' }}
      />

      {/* Airplane Cursor Icon */}
      <div
        ref={planeRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
        style={{
          opacity: isVisible ? (isTextInput ? 0.25 : 1) : 0,
          transition: 'opacity 0.2s ease, filter 0.25s ease',
          // Position plane nose precisely at cursor point:
          // Nose is at x: 13px (center), y: 2px (top)
          marginLeft: '-13px',
          marginTop: '-2px',
        }}
      >
        <div
          className="transition-transform duration-200 ease-out"
          style={{
            transform: isClicking
              ? 'scale(0.88)'
              : isHovering
              ? 'scale(1.22)'
              : 'scale(1)',
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            className="text-white drop-shadow-[0_2px_5px_rgba(7,45,48,0.45)]"
            style={{
              filter: isHovering
                ? 'drop-shadow(0 0 8px rgba(207,168,100,0.85)) drop-shadow(0 3px 6px rgba(7,45,48,0.5))'
                : 'drop-shadow(0 2px 4px rgba(7,45,48,0.4)) drop-shadow(0 1px 2px rgba(0,0,0,0.25))',
            }}
          >
            {/* Aerodynamic Fuselage & Swept Wings (Nose at top center) */}
            <path
              d="M12 1.5C11.1 1.5 10.4 2.2 10.4 3.1V9.4L2.2 14.2V16.3L10.4 13.8V19.4L8.2 21V22.6L12 21.6L15.8 22.6V21L13.6 19.4V13.8L21.8 16.3V14.2L13.6 9.4V3.1C13.6 2.2 12.9 1.5 12 1.5Z"
              fill="#ffffff"
            />
            {/* Golden Nose Trim & Center Spine Accent */}
            <path
              d="M12 2C11.6 2 11.2 2.4 11.2 2.8V8.5H12.8V2.8C12.8 2.4 12.4 2 12 2Z"
              fill="#cfa864"
            />
            {/* Golden Jet Engines under wings */}
            <circle cx="7.5" cy="14" r="1.1" fill="#cfa864" />
            <circle cx="16.5" cy="14" r="1.1" fill="#cfa864" />
            {/* Subtle cockpit window reflection */}
            <ellipse cx="12" cy="4.8" rx="0.9" ry="1.4" fill="#072d30" opacity="0.65" />
          </svg>
        </div>
      </div>
    </>
  );
}
