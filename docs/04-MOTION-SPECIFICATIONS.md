# 3D MOTION SPECIFICATIONS & ANIMATIONS
## Complete Animation Timing, Easing & Interaction Details

---

## SECTION 1: MOTION PRINCIPLES

### Timing Standards

All animations follow these timing guidelines:

- **Quick Interactions** (hover, toggle): 200ms, ease-out
- **Page Transitions**: 400-600ms, ease-in-out
- **Entrance Animations**: 600-1000ms, ease-out
- **Complex Sequences**: 1200-1800ms total

### Easing Curves

| Curve | Formula | Use Case |
|-------|---------|----------|
| **ease-out** | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Responsive, snappy feel |
| **ease-in-out** | cubic-bezier(0.42, 0, 0.58, 1) | Smooth transitions |
| **ease-in** | cubic-bezier(0.42, 0, 1, 1) | Slowing motion |
| **bounce** | cubic-bezier(0.68, -0.55, 0.265, 1.55) | Energetic, bouncy feel |

---

## SECTION 2: KEY ANIMATION SEQUENCES

### 1. Homepage Hero - 3D Product Carousel

**Trigger**: Page load  
**Duration**: 8 seconds total (loop)  
**3D Properties**: 
- perspective: 1200px (container)
- transform-style: preserve-3d
- rotateX: -10° (slight tilt down)
- rotateZ: 5° (slight spin)
- Lighting: Point light at (100, 100, 200), intensity 1.0

**Sequence Timeline**:

```
0ms-600ms:       Camera zoom in
                 - translateZ: -1000 → 0
                 - Easing: ease-out

600ms-2000ms:    Product rotates 90°
                 - rotateY: 0 → 90deg
                 - Easing: ease-in-out
                 - Duration: 1400ms

2000ms-3500ms:   Product rotates another 180°
                 - rotateY: 90 → 270deg
                 - Easing: ease-in-out

3500ms-4000ms:   Product rotates final 90° to complete
                 - rotateY: 270 → 360deg
                 - Easing: ease-out

4000ms-4500ms:   Product holds steady, light shifts
                 - Lighting animation: Light position X: -50 → 50
                 - Opacity stable

4500ms-5500ms:   Parallax background moves
                 - background-position: 0% → 20%
                 - Creates depth illusion

5500ms-6000ms:   Product scale up slightly
                 - scale: 1.0 → 1.05
                 - Easing: ease-out

6000ms-7000ms:   Fade current product, bring in next
                 - opacity: 1.0 → 0 (current)
                 - opacity: 0 → 1.0 (next, staggered)

7000ms-8000ms:   Repeat cycle, next product loads
                 - Reset to 0ms state
                 - Next product spins
```

**Hover State** (pauses loop):
- Drag interaction: rotateY += (mouseDelta.x * 0.5)
- Drag momentum: Continue rotating with friction (0.95 per frame)
- Zoom on scroll: scale += (wheelDelta * 0.001), clamped 0.5x - 2x

**Implementation (CSS/Three.js)**:
```css
.hero-product {
  perspective: 1200px;
  animation: heroCarousel 8s ease-in-out infinite;
  will-change: transform;
}

@keyframes heroCarousel {
  0% {
    transform: translateZ(-1000px) rotateX(-10deg) rotateZ(5deg);
  }
  7.5% {
    transform: translateZ(0) rotateX(-10deg) rotateZ(5deg) rotateY(90deg);
  }
  25% {
    transform: translateZ(0) rotateX(-10deg) rotateZ(5deg) rotateY(270deg);
  }
  43.75% {
    transform: translateZ(0) rotateX(-10deg) rotateZ(5deg) rotateY(360deg);
  }
  62.5% {
    transform: translateZ(0) rotateX(-10deg) rotateZ(5deg) rotateY(360deg) scale(1.05);
  }
  87.5% {
    transform: translateZ(0) rotateX(-10deg) rotateZ(5deg) rotateY(360deg) scale(1.0);
  }
  100% {
    transform: translateZ(0) rotateX(-10deg) rotateZ(5deg) rotateY(360deg) scale(1.0);
  }
}
```

---

### 2. Product Card - 3D Tilt on Hover

**Trigger**: Mouseenter on card  
**Duration**: 300ms ease-out  

**Transformation**:
```
On Hover:
- rotateX: 0 → -8° (tilt up slightly)
- rotateY: 0 → 5° (tilt right)
- rotateZ: 0 → 1° (slight spin)
- translateZ: 0 → 40px (move forward)
- box-shadow: 0 2px 8px → 0 12px 32px (deepen)
- scale: 1.0 → 1.05

Parallax Image (child):
- Image translateZ: 10px (appears in front)
- Image scale: 1.0 → 1.1 (zoom slightly)
```

**On Leave**:
- All transforms revert to 0 (300ms ease-out)

**Implementation (CSS)**:
```css
.product-card {
  perspective: 1200px;
  transform-style: preserve-3d;
  transition: transform 300ms ease-out, box-shadow 300ms ease-out;
  will-change: transform;
}

.product-card:hover {
  transform: rotateX(-8deg) rotateY(5deg) rotateZ(1deg) translateZ(40px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
}

.product-card img {
  transform: translateZ(10px) scale(1.1);
  transition: transform 300ms ease-out;
}
```

---

### 3. Checkout Step Transitions

**Trigger**: Click "Next Step" button  
**Duration**: 600ms ease-in-out  

**Outgoing Step** (compresses left):
```
Initial: scale(1.0), opacity(1.0)
Final:
  - scaleX: 0.6
  - scaleY: 0.8
  - opacity: 0.3
  - translateX: -400px
  - translateZ: -100px
  - filter: blur(2px)
```

**Incoming Step** (slides in from right):
```
Initial:
  - scaleX: 0.6
  - scaleY: 0.8
  - opacity: 0.3
  - translateX: +400px

Final:
  - scaleX: 1.0
  - scaleY: 1.0
  - opacity: 1.0
  - translateX: 0
  - filter: blur(0)

Duration: 600ms ease-in-out
```

**3D Container Properties**:
- perspective: 1200px
- transform-style: preserve-3d

**Implementation (React + Framer Motion)**:
```jsx
<motion.div
  key={step}
  initial={{ scaleX: 0.6, scaleY: 0.8, opacity: 0.3, x: 400 }}
  animate={{ scaleX: 1.0, scaleY: 1.0, opacity: 1.0, x: 0 }}
  exit={{ scaleX: 0.6, scaleY: 0.8, opacity: 0.3, x: -400 }}
  transition={{ duration: 0.6, ease: "easeInOut" }}
  style={{ perspective: "1200px" }}
>
  {/* Step content */}
</motion.div>
```

---

### 4. Reseller Dashboard - Animated Counter

**Trigger**: Dashboard loads or value updates  
**Duration**: 1500ms (per counter)  
**Stagger**: Each counter starts 100ms after previous  

**Sequence**:
```
0ms-1500ms:      Count from 0 to final value
                 - Easing: easeOut (starts fast, slows down)
                 - Counter updates rapidly at start, slows towards end

0ms-1200ms:      Icon animation (simultaneous)
                 - scale: 0.8 → 1.2 → 1.0
                 - rotateZ: 0 → 360°
                 - Easing: easeOut
```

**Stagger Timing**:
```
Counter 1 (Revenue): Starts 0ms
Counter 2 (Orders):  Starts 100ms
Counter 3 (Sold):    Starts 200ms
Counter 4 (Rating):  Starts 300ms
```

**Example (React)**:
```jsx
<CountUp 
  start={0} 
  end={3240} 
  duration={1.5} 
  ease="easeOut"
/>
```

---

### 5. Confirmation Screen - Confetti & Product Spin

**Trigger**: Order placed successfully  
**Duration**: 2000ms total  

**Phase 1: Product Spin (0-1500ms)**
```
rotateZ: 0 → 360° (ease-out)
scale: 1.0 → 1.2 → 1.0 (ease-in-out, bouncy)
translateY: 0 → -50px (hovers up)
```

**Phase 2: Confetti Particles (0-2000ms)**
```
Particle Count: 50-100
Initial Velocity:
  - X: Random -10 to 10
  - Y: Random -5 to 20

Physics:
  - Gravity: 0.5 (downward acceleration)
  - Bounce: On ground, reverse y velocity (damping 0.8)
  - Rotation: Random spin per particle
  - Opacity: Fade out last 200ms
```

**Sound** (Optional):
- Success chime: 300ms, 880Hz sine wave
- Confetti crunch: Low frequency percussion

---

### 6. Product Gallery - Staggered Image Reveal

**Trigger**: Gallery loads or user scrolls into view  
**Duration**: 50ms stagger per item  

**Sequence** (for each image):
```
Initial: opacity 0, translateY 20px
Animate: opacity 1, translateY 0
Duration: 400ms ease-out
Stagger: +50ms per image

Total time for 6 images: (50ms × 5) + 400ms = 650ms
```

**Implementation (React)**:
```jsx
{images.map((img, idx) => (
  <motion.img
    key={idx}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: idx * 0.05, duration: 0.4 }}
  />
))}
```

---

## SECTION 3: MICRO-INTERACTIONS

### Button Interaction - "Add to Cart"

**Hover**:
- Background color shift (ease 200ms)
- Shadow increase
- Icon pulse (scale 1.0 → 1.1 → 1.0, 400ms loop)

**Click**:
- Scale down (0.95x, 100ms)
- Then scale back (1.0x, 100ms) → Spring effect
- Ripple effect from click point (radius grows, opacity fades)
- Success feedback: Icon changes to checkmark (40ms after click)

### Form Input - Focus Interaction

**Focus**:
- Underline appears (scale Y 0 → 1, 200ms ease-out)
- Label moves up (translateY 0 → -20px, font-size 14px → 12px)
- Background tints blue (opacity 0 → 0.05)
- Placeholder fades (opacity 1 → 0)

**Blur**:
- Underline disappears
- Label returns to original position (if empty)
- Background returns to white

**Implementation (CSS)**:
```css
input:focus {
  border-bottom: 2px solid #0084FF;
  box-shadow: 0 0 0 4px rgba(0, 132, 255, 0.1);
}

input:focus + label {
  transform: translateY(-20px);
  font-size: 12px;
}
```

### Product Image - Hover Magnify

**Hover Point** (e.g., cursor at x:100, y:50):
- Zoom in on that region (scale 2.0)
- Magnifying glass indicator appears
- Image clip-path creates circular magnified region
- Magnifier follows cursor with slight lag (easing)
- Zoom level: 2.0x for detail view

**Implementation (JavaScript)**:
```javascript
image.addEventListener('mousemove', (e) => {
  const rect = image.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const magnifier = document.querySelector('.magnifier');
  magnifier.style.left = x + 'px';
  magnifier.style.top = y + 'px';
  
  image.style.backgroundPosition = 
    `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
});
```

### Notification Toast - Appear & Dismiss

**Appear**:
- Slide in from bottom-right: translateX 0 → 400px (reversed)
- Fade in: opacity 0 → 1
- Duration: 300ms ease-out

**Auto-dismiss** (after 4s):
- Slide out: translateX 0 → 400px
- Fade out: opacity 1 → 0
- Duration: 300ms ease-in

**Manual Dismiss** (click X):
- Immediate slide + fade (300ms ease-out)

---

## SECTION 4: PERFORMANCE OPTIMIZATION

### GPU Acceleration Best Practices

**Use only GPU-accelerated properties:**
```css
/* ✓ GOOD - GPU accelerated */
transform: translate3d(0, 10px, 0);
opacity: 0.5;

/* ✗ BAD - Triggers layout recalculation */
left: 10px;
margin-top: 10px;
width: 100%;
```

### will-change Property

Apply to animating elements:
```css
.will-animate {
  will-change: transform, opacity;
}

/* Remove after animation completes */
.animate-done {
  will-change: auto;
}
```

### Reduce Motion Support

Respect user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Mobile Optimization

- Simplify 3D effects on mobile
- Use CSS animations instead of JavaScript
- Disable parallax on mobile (performance hit)
- Use lower quality 3D models
- Test on real iOS/Android devices

### Loading States

- Show skeleton screens
- Avoid layout shift (CLS)
- Progressive image loading
- Lazy-load 3D models

---

## SECTION 5: ANIMATION LIBRARIES & TOOLS

### Recommended Stack

| Purpose | Library | Use Case |
|---------|---------|----------|
| React Animations | Framer Motion | Complex sequences, gestures |
| 3D Graphics | Three.js / Babylon.js | Product viewer, hero effects |
| Particles | tsparticles / Proton | Confetti, effects |
| Charts | Recharts / Chart.js | Analytics, graphs |
| SVG Animation | SVG.js / Anime.js | Logo, icons, morphing |
| Page Transitions | Swup / Barba.js | Smooth page changes |

### CSS Animation Template

```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slideInUp 600ms ease-out forwards;
}
```

### Framer Motion Example

```jsx
import { motion } from 'framer-motion';

export function AnimatedCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      Card Content
    </motion.div>
  );
}
```

---

## ANIMATION CHECKLIST

- [ ] All animations respect prefers-reduced-motion
- [ ] 60fps on test devices (Chrome DevTools Performance tab)
- [ ] No jank or stuttering on scroll
- [ ] Mobile animations simplified (no heavy 3D)
- [ ] Animations tested on iOS/Android
- [ ] Accessibility: Focus states visible during animations
- [ ] Loading states prevent layout shift
- [ ] Sound effects optional, not required
- [ ] Animations enhance UX, don't distract

---

**Status**: ✅ Motion Specifications Complete | Production-Ready
