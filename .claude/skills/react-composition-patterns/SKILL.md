---
name: react-composition-patterns
description: Coordinated skill for the Bali villa Awwwards workflow: React Composition Patterns.
---

PROJECT INTEGRATION LAYER — BALI VILLA / AWWWARDS WORKFLOW

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

ROLE IN THIS SYSTEM — REACT ARCHITECTURE
Owns: reusable component composition, state boundaries, explicit variants, compound components, and maintainable React APIs.
Does NOT own: visual styling, motion art direction, or design decisions.
Apply React 19-specific guidance only after confirming the project actually uses React 19.

--- ORIGINAL SKILL CONTENT, PRESERVED AND COORDINATED ---

React Composition Patterns
Composition patterns for building flexible, maintainable React components. Avoid boolean prop proliferation by using compound components, lifting state, and composing internals. These patterns make codebases easier for both humans and AI agents to work with as they scale.

When to Apply
Reference these guidelines when:

Refactoring components with many boolean props
Building reusable component libraries
Designing flexible component APIs
Reviewing component architecture
Working with compound components or context providers
Rule Categories by Priority
Priority	Category	Impact	Prefix
1	Component Architecture	HIGH	architecture-
2	State Management	MEDIUM	state-
3	Implementation Patterns	MEDIUM	patterns-
4	React 19 APIs	MEDIUM	react19-
Quick Reference
1. Component Architecture (HIGH)
architecture-avoid-boolean-props - Don't add boolean props to customize behavior; use composition
architecture-compound-components - Structure complex components with shared context
2. State Management (MEDIUM)
state-decouple-implementation - Provider is the only place that knows how state is managed
state-context-interface - Define generic interface with state, actions, meta for dependency injection
state-lift-state - Move state into provider components for sibling access
3. Implementation Patterns (MEDIUM)
patterns-explicit-variants - Create explicit variant components instead of boolean modes
patterns-children-over-render-props - Use children for composition instead of renderX props
4. React 19 APIs (MEDIUM)
⚠️ React 19+ only. Skip this section if using React 18 or earlier.

react19-no-forwardref - Don't use forwardRef; use use() instead of useContext()
How to Use
Read individual rule files for detailed explanations and code examples:

rules/architecture-avoid-boolean-props.md
rules/state-context-interface.md
Each rule file contains:

Brief explanation of why it matters
Incorrect code example with explanation
Correct code example with explanation
Additional context and references
Full Compiled Document
For the complete guide with all rules expanded: AGENTS.md
