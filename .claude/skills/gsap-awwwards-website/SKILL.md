---
name: gsap-awwwards-website
description: Coordinated skill for the Bali villa Awwwards workflow: GSAP Awwwards Website.
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

ROLE IN THIS SYSTEM — GSAP IMPLEMENTATION PLAYBOOK
Owns: practical GSAP setup and implementation inside the existing project.
Does NOT own: visual direction, component architecture, or the decision to redesign the site.
CRITICAL PROJECT RULE:
- Do not clone or replace the current repository with a template.
- Template-clone instructions below are reference-only and apply only to a brand-new empty project when the user explicitly asks to start from that template.
- In an existing React/Vite project, install only the needed GSAP packages and integrate them into the current structure.
- Preserve existing Git history and repository contents.

--- ORIGINAL SKILL CONTENT, PRESERVED AND COORDINATED ---

GSAP Awwwards Website
A stunning product landing page with GSAP scroll animations, modern React 19 architecture, and Tailwind CSS 4 styling.

Tech Stack
Framework: React 19
Build Tool: Vite
Animation: GSAP
Styling: Tailwind CSS 4
Package Manager: npm
Output: dist directory
Dev Port: 5173
Setup
1. Template Reference (ONLY for a new empty project when explicitly requested)
# REFERENCE ONLY — do not run in an existing project
# git clone --depth 1 https://github.com/Eng0AI/gsap-awwwards-website-template.git .
If the directory is not empty:

# REFERENCE ONLY — do not run in an existing project
# git clone --depth 1 https://github.com/Eng0AI/gsap-awwwards-website-template.git _temp_template
mv _temp_template/* _temp_template/.* . 2>/dev/null || true
rm -rf _temp_template
2. Remove Git History (Optional)
# DO NOT run in an existing repository
# rm -rf .git
# Only for a brand-new uninitialized project
# git init
3. Install Dependencies
npm install
Build
npm run build
Creates a production build in the dist/ directory.

Deploy
CRITICAL: For Vercel, you MUST use vercel build --prod then vercel deploy --prebuilt --prod. Never use vercel --prod directly.

Vercel (Recommended)
vercel pull --yes -t $VERCEL_TOKEN
vercel build --prod -t $VERCEL_TOKEN
vercel deploy --prebuilt --prod --yes -t $VERCEL_TOKEN
Netlify
netlify deploy --prod --dir=dist
Development
npm run dev
Opens at http://localhost:5173

Notes
Static React site - no environment variables needed
Never run npm run dev in VM environment
