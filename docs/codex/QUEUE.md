# Task queue

Stages run one at a time, in this order. Claude reviews each stage in the browser and commits it before starting
the next one. Codex writes the code, except where the owner asked for Claude (R5 after Codex hit its limit, and R9).

| # | Task | Prompt | Status |
| --- | --- | --- | --- |
| R1 | Concept 02 design system and shell | `docs/codex/redesign-1.md` | done — `4935dc5` |
| R2 | Home page | `docs/codex/redesign-2.md` | done — `57be942` |
| R3 | Services page | `docs/codex/redesign-3.md` | done — `062cc16` |
| R4 | Work page | `docs/codex/redesign-4.md` | done — `617e196` |
| R5 | Contact, legal pages, not-found, heading case | `docs/codex/redesign-5.md` | done — `4a0a4a4` (by Claude: Codex hit its usage limit) |
| R6 | Cleanup, OG image, Services grid rhythm, final sweep | `docs/codex/redesign-6.md` | done — `89e5dd6` |
| R7 | Eight additional Work concepts behind the category filters | `docs/codex/redesign-7.md` | done — `2754daa` (counts: Web 4, Mobile 3, Desktop 3, Operations 4) |
| R8 | Approach and About as standalone routes | `docs/codex/redesign-8.md` | done — Codex wrote the code, then hit its usage limit before reporting; Claude verified and committed |
| R9 | Repeating scroll-reveal animation (Claude, not Codex) | `docs/tasks/r9-scroll-animation.md` | done — CSS + one shared IntersectionObserver, repeats on every entry, legal documents excluded |

All queued tasks are complete. Remaining launch work lives in `docs/production-checklist.md`.

Launch command used for every stage:

```
codex exec -m gpt-6-astra -c model_reasoning_effort=high -s workspace-write \
  -c sandbox_workspace_write.network_access=true -i redes-new.png - < docs/codex/redesign-N.md
```
