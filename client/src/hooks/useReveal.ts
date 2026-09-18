import { useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Global reveal system                                               */
/*                                                                     */
/*  Every element with the `reveal` class starts hidden (opacity: 0)   */
/*  and fades in once its top edge rises above the viewport bottom.    */
/*                                                                     */
/*  Why not IntersectionObserver? Fast scrolling can outrun its        */
/*  sampling — an element that enters and exits the viewport between   */
/*  two observer callbacks is never reported as "intersecting" and     */
/*  stays invisible forever. A rAF-throttled sweep has no such race.   */
/* ------------------------------------------------------------------ */

let started = false;
let rafId = 0;
let listenerCount = 0;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Reveal every .reveal element whose top edge is above the viewport bottom. */
function sweep() {
  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
}

function scheduleSweep() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    rafId = 0;
    sweep();
  });
}

function ensureGlobalObserver() {
  if (started || typeof window === 'undefined') return;
  started = true;

  if (prefersReducedMotion()) {
    // No animations: reveal everything immediately.
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    return;
  }

  const mutationWatcher = new MutationObserver((mutations) => {
    let relevant = false;
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (node.classList.contains('reveal') || node.querySelector?.('.reveal')) relevant = true;
        }
      });
    });
    if (relevant) scheduleSweep();
  });
  mutationWatcher.observe(document.body, { childList: true, subtree: true });

  window.addEventListener('scroll', scheduleSweep, { passive: true });
  window.addEventListener('resize', scheduleSweep, { passive: true });
  sweep();
}

function teardownGlobalObserver() {
  listenerCount = Math.max(0, listenerCount - 1);
  // Observers stay alive for the app's lifetime once started — they are
  // idempotent (ensureGlobalObserver guards with `started`) and cheap.
}

/** Mount once (App level) to activate global reveal-on-scroll. */
export function useRevealObserver() {
  useEffect(() => {
    listenerCount += 1;
    ensureGlobalObserver();
    return teardownGlobalObserver;
  }, []);
}

/* ------------------------------------------------------------------ */
/*  Per-element hook (legacy API — the global system does the work).  */
/* ------------------------------------------------------------------ */

export function useReveal<T extends HTMLElement>() {
  const [ref, setRef] = useState<T | null>(null);

  useEffect(() => {
    listenerCount += 1;
    ensureGlobalObserver();
    return teardownGlobalObserver;
  }, []);

  return setRef;
}

export function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}
