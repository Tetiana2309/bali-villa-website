---
name: image-art-direction
description: Coordinated skill for the Bali villa Awwwards workflow: Image Art Direction.
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

ROLE IN THIS SYSTEM — IMAGE / VIDEO ART DIRECTION
Owns: image inventory, focal points, crop strategy, responsive variants, resolution checks, consistency, hero/gallery media treatment, and media replacement flags.
For this project, architecture and interior imagery are primary design material. Protect architectural lines, spatial composition, horizon, furniture, lighting, and premium visual continuity.
Also apply the same focal/crop/quality logic to short website video and poster frames when relevant.
Does NOT own: overall page layout or motion choreography.

--- ORIGINAL SKILL CONTENT, PRESERVED AND COORDINATED ---

Image Art Direction
Treat images as evidence, atmosphere, or explanation; never as anonymous filler.

When to use
Use when raster imagery affects narrative, authenticity, brand recognition, or layout.

When not to use
Do not generate fake documentary photographs for real people, places, programs, or events.

Inputs
Image folder, rights and credits, captions, intended page or slide roles, target sizes, aspect ratios, design tokens, and authenticity requirements.

Outputs
Image inventory, duplicate and resolution report, focal and crop recommendations, aspect variants, treatment rules, captions, credits, and replacement flags.

Required workflow
Read IMAGE-ART-DIRECTION.md.
Inventory dimensions, colour mode, metadata, rights, captions, and likely duplicates.
Classify each image as documentary, product or interface evidence, portrait, contextual, decorative, or unusable.
Define the focal subject and protected crop region.
Recommend variants for each real destination, preserving faces and meaningful objects.
Apply one coherent treatment and test crops in the target artifact.
Flag low-resolution, repeated hero, rights-unknown, and replacement-needed assets.
Hard rules
Do not fabricate documentary evidence.
Do not repeat a hero image without narrative reason.
Do not aggressively upscale an unsuitable image to hide quality limits.
Keep captions and credits attached to the correct asset.
Do not crop out context that changes meaning.
Checkpoints
Approve the hero-image strategy and any synthetic decorative imagery before generation or full composition.

Files to read by phase
Read image art direction before inventory and the target composition reference before cropping.

Quality checks
Check resolution at placed size, focal protection, duplicates, rights, captions, credits, colour consistency, crop diversity, and target rendering.

Failure and fallback behaviour
Use a neutral asset-pending frame, alternate authentic image, or non-photographic diagram when the right image is unavailable. State the limitation.

Example invocations
"Audit these photographs for an annual report."
"Recommend portrait, landscape, and widescreen crops without cutting faces."
"Find duplicate hero images and flag weak replacements."
Adjacent skills
Supply approved variants to publication and presentation; use SVG illustration for non-photographic explanation and visual QA for placed-image inspection.
