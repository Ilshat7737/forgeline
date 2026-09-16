# Codex task queue

Stages run one at a time, in this order. Claude reviews each stage in the browser and commits it before starting
the next one. Codex writes the code; Claude only implements a stage when the owner explicitly asks.

| # | Task | Prompt | Status |
| --- | --- | --- | --- |
| R1 | Concept 02 design system and shell | `docs/codex/redesign-1.md` | done — `4935dc5` |
| R2 | Home page | `docs/codex/redesign-2.md` | done — `57be942` |
| R3 | Services page | `docs/codex/redesign-3.md` | done — `062cc16` |
| R4 | Work page | `docs/codex/redesign-4.md` | done — `617e196` |
| R5 | Contact, legal pages, not-found, heading case | `docs/codex/redesign-5.md` | done — `4a0a4a4` (by Claude: Codex hit its usage limit) |
| R6 | Cleanup, OG image, Services grid rhythm, final sweep | `docs/codex/redesign-6.md` | queued — scheduled to start after the Codex limit reset (~14:57 on 2026-09-16) |
| R7 | Eight additional Work concepts behind the category filters | `docs/codex/redesign-7.md` | queued — starts after R6 is reviewed and committed |
| R8 | Approach and About as standalone routes | `docs/codex/redesign-8.md` | queued — last task, starts after R7 is reviewed and committed |

Launch command used for every stage:

```
codex exec -m gpt-6-astra -c model_reasoning_effort=high -s workspace-write \
  -c sandbox_workspace_write.network_access=true -i redes-new.png - < docs/codex/redesign-N.md
```
