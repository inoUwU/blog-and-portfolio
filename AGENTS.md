# AGENTS.md

This file should contain only non-obvious instructions for coding agents.
Do not duplicate repository facts that can be discovered from the workspace.

## Communication
- Think in English.
- Respond to the user in Japanese.

## Change Policy
- Keep changes small, local, and task-focused.
- Prefer modifying existing files over adding new files, abstractions, or dependencies.
- Ask before changing public behavior, information architecture, routing, or visual tone.

## Implementation Heuristics
- Default to Server Components.
- Use `"use client"` only when browser APIs, local state, effects, or event handlers are required.
- Isolate animation-heavy or 3D-heavy code so it does not unnecessarily expand the initial render path.
- Prefer existing shared patterns over page-local duplication.

## Content and Schema
- Preserve existing URLs and authoring flow unless explicitly requested otherwise.
- Do not invent new content schema, metadata fields, or conventions without confirming the existing pattern.

## Quality
- Avoid unused code, dead code, and speculative abstractions.
- Validate with the project's standard formatting and linting flow after meaningful changes.