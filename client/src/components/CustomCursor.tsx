import { useEffect, useRef, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Custom cursor — dot (instant) + ring (spring lag).                 */
/*                                                                     */
/*  Contextual modes come from event delegation, so any element can    */
/*  opt in with a data-cursor attribute without importing anything:    */
/*    data-cursor="view"  -> lime VIEW badge (product imagery)         */
/*    data-cursor="drag"  -> blue DRAG badge (hero 3D stage)           */
/*    data-cursor="hover" -> ring shrinks & hugs the target            */
/*                           (auto-applied to buttons/links/inputs)    */
/*                                                                     */
/*  The native cursor stays visible for precision; the ring is         */
/*  decorative. Rendered only on fine pointers (mouse/trackpad).       */
/* ------------------------------------------------------------------ */

type CursorMode = 'idle' | 'hover' | 'view' | 'drag' | 'text';

const INTERACTIVE = 'a, button, [role="button"], label, summary';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const [mode, setMode] = useState<CursorMode>('idle');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return; // native cursor untouched on touch & reduced-motion
    document.documentElement.classList.add('cursor-on');
    setEnabled(true);
    return () => document.documentElement.classList.remove('cursor-on');
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      if (!target || !(target instanceof Element)) {
        setMode('idle');
        return;
      }

      // explicit zones win, then text fields, then anything interactive
      const zone = target.closest('[data-cursor]');
      if (zone) {
        setMode((zone.getAttribute('data-cursor') as CursorMode) ?? 'idle');
      } else if (target.closest('input, textarea, select')) {
        setMode('text');
      } else if (target.closest(INTERACTIVE)) {
        setMode('hover');
      } else {
        setMode('idle');
      }
    };

    const onDown = () => ringRef.current?.classList.add('cursor-press');
    const onUp = () => ringRef.current?.classList.remove('cursor-press');
    const onLeave = () => {
      setMode('idle');
      dotRef.current?.classList.add('cursor-hidden');
      ringRef.current?.classList.add('cursor-hidden');
    };
    const onEnter = () => {
      dotRef.current?.classList.remove('cursor-hidden');
      ringRef.current?.classList.remove('cursor-hidden');
    };

    const tick = () => {
      // dot follows instantly; ring eases toward it (spring lag)
      ring.current.x += (pos.current.x - ring.current.x) * 0.16;
      ring.current.y += (pos.current.y - ring.current.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className={`cursor-layer cursor-${mode}`} aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span className="cursor-label">
          {mode === 'view' ? 'VIEW' : mode === 'drag' ? 'DRAG' : ''}
        </span>
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
