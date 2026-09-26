---
name: animation-motion-design
description: "Coordinated skill for the Bali villa Awwwards workflow: Animation & Motion Design."
---

PROJECT INTEGRATION LAYER вЂ” BALI VILLA / AWWWARDS WORKFLOW

This skill is part of a coordinated skill set for implementing an already approved Figma design for a premium Bali villa website.

GLOBAL AUTHORITY ORDER
1. The user's explicit current instruction.
2. The approved Figma design and user-supplied assets/content.
3. Existing project-specific design tokens, code patterns, and repository constraints.
4. The specialized responsibility of this skill.
5. Generic examples, defaults, presets, templates, or style recommendations inside this skill.

GLOBAL NON-CONFLICT RULE
- Never override an intentional Figma choice merely because this skill contains a different generic recommendation.
- If the design is already approved, preserve its typography, colors, layout, spacing, hierarchy, imagery, and content unless the user explicitly asks for a redesign.
- Use examples in this skill as implementation references, not mandatory visual defaults.
- Do not install or introduce a library unless the current task actually needs it and it fits the detected project stack.
- When another skill owns a neighboring concern, defer to that skill instead of duplicating its job.

ROLE IN THIS SYSTEM вЂ” MOTION ENGINEERING / PERFORMANCE GUARDRAIL
Owns: animation performance, compositor-safe properties, Motion/View Transitions implementation details, cleanup, reduced-motion behavior, and technical quality.
Does NOT own: choosing the site's visual motion concept or scroll storytelling. Those belong to Awwwards Animations.
If Awwwards Animations specifies a motion idea, this skill validates and implements it safely.
Use Motion only where it is the right tool; do not duplicate a GSAP sequence with Motion.

--- ORIGINAL SKILL CONTENT, PRESERVED AND COORDINATED ---

Animation & Motion Design
Patterns for building performant, accessible animations using Motion (formerly Framer Motion, 18M+ weekly npm downloads) and the View Transitions API (cross-browser support in 2026). Covers layout animations, gesture interactions, exit transitions, micro-interactions, and motion accessibility.

Quick Reference
Rule	File	Impact	When to Use
Layout Animations	rules/motion-layout.md	HIGH	Shared layout transitions, FLIP animations, layoutId
Gesture Interactions	rules/motion-gestures.md	HIGH	Drag, hover, tap with spring physics
Exit Animations	rules/motion-exit.md	HIGH	AnimatePresence, unmount transitions
View Transitions API	rules/view-transitions-api.md	HIGH	Page navigation, cross-document transitions
Motion Accessibility	rules/motion-accessibility.md	CRITICAL	prefers-reduced-motion, cognitive load
Motion Performance	rules/motion-performance.md	HIGH	60fps, GPU compositing, layout thrash
Total: 6 rules across 3 categories

Decision Table вЂ” Motion vs View Transitions API
Scenario	Recommendation	Why
Component mount/unmount	Motion	AnimatePresence handles lifecycle
Page navigation transitions	View Transitions API	Built-in browser support, works with any router
Complex interruptible animations	Motion	Spring physics, gesture interruption
Simple crossfade between pages	View Transitions API	Zero JS bundle cost
Drag/reorder interactions	Motion	drag prop with layout animations
Shared element across routes	View Transitions API	viewTransitionName CSS property
Scroll-triggered animations	Motion	useInView, useScroll hooks
Multi-step orchestrated sequences	Motion	staggerChildren, variants
Quick Start
Motion вЂ” Component Animation
import { motion, AnimatePresence } from "motion/react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { type: "spring", stiffness: 300, damping: 24 },
}

function Card({ item }: { item: Item }) {
  return (
    <motion.div {...fadeInUp} layout layoutId={item.id}>
      {item.content}
    </motion.div>
  )
}

function CardList({ items }: { items: Item[] }) {
  return (
    <AnimatePresence mode="wait">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </AnimatePresence>
  )
}
View Transitions API вЂ” Page Navigation
// React Router v7+ with View Transitions
import { Link, useNavigate } from "react-router"

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return <Link to={to} viewTransition>{children}</Link>
}

// CSS for the transition
// ::view-transition-old(root) { animation: fade-out 200ms ease; }
// ::view-transition-new(root) { animation: fade-in 200ms ease; }
Motion вЂ” Accessible by Default
import { useReducedMotion } from "motion/react"

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={{ x: 100 }}
      transition={shouldReduceMotion
        ? { duration: 0 }
        : { type: "spring", stiffness: 300, damping: 24 }
      }
    />
  )
}
Rule Details
Layout Animations (Motion)
FLIP-based layout animations with the layout prop and shared layout transitions via layoutId.

Load: rules/motion-layout.md

Gesture Interactions (Motion)
Drag, hover, and tap interactions with spring physics and gesture composition.

Load: rules/motion-gestures.md

Exit Animations (Motion)
AnimatePresence for animating components as they unmount from the React tree.

Load: rules/motion-exit.md

View Transitions API
Browser-native page transitions using document.startViewTransition() and framework integrations.

Load: rules/view-transitions-api.md

Motion Accessibility
Respecting user motion preferences and reducing cognitive load with motion sensitivity patterns.

Load: rules/motion-accessibility.md

Motion Performance
GPU compositing, avoiding layout thrash, and keeping animations at 60fps.

Load: rules/motion-performance.md

Key Principles
60fps or nothing вЂ” Only animate transform and opacity (composite properties). Never animate width, height, top, or left.
Centralized presets вЂ” Define animation variants in a shared file, not inline on every component.
AnimatePresence for exits вЂ” React unmounts instantly; wrap with AnimatePresence to animate out.
Spring over duration вЂ” Springs feel natural and are interruptible. Use stiffness/damping, not duration.
Respect user preferences вЂ” Always check prefers-reduced-motion and provide instant alternatives.
Performance Budget
Metric	Target	Measurement
Transition duration	< 400ms	User perception threshold
Animation properties	transform, opacity only	DevTools > Rendering > Paint flashing
JS bundle (Motion)	~16KB gzipped	Import only what you use
First paint delay	0ms	Animations must not block render
Frame drops	< 5% of frames	Performance API: PerformanceObserver
Anti-Patterns (FORBIDDEN)
Animating layout properties вЂ” Never animate width, height, margin, padding directly. Use transform: scale() instead.
Missing AnimatePresence вЂ” Components unmount instantly without it; exit animations are silently lost.
Ignoring prefers-reduced-motion вЂ” Causes vestibular disorders for ~35% of users with motion sensitivity.
Inline transition objects вЂ” Creates new objects every render, breaking React memoization.
duration-based springs вЂ” Motion springs use stiffness/damping, not duration. Mixing causes unexpected behavior.
Synchronous startViewTransition вЂ” Always await or handle the promise from document.startViewTransition().
Detailed Documentation
Resource	Description
references/motion-vs-view-transitions.md	Comparison table, browser support, limitations
references/animation-presets-library.md	Copy-paste preset variants for common patterns
references/micro-interactions-catalog.md	Button press, toggle, checkbox, loading, success/error
Related Skills
ork:ui-components вЂ” shadcn/ui component patterns and CVA variants
ork:responsive-patterns вЂ” Responsive layout and container query patterns
ork:performance вЂ” Core Web Vitals and runtime performance optimization
ork:accessibility вЂ” WCAG compliance, ARIA patterns, screen reader support

