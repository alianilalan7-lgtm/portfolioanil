# Blog Autopilot

Auto-generates one bilingual (TR + EN) blog post **3× per week** — billed
against a **Claude Max subscription** (no API key, no per-token cost).

**Topic mix — 2 LUVI : 1 informative per week,** fixed to the publish weekday:

| Day | Type | Audience | Primary CTA |
| --- | --- | --- | --- |
| **Mon** | **A — LUVI Agency** | ad agencies, creative teams, corporate marketing | `https://luvi.agency` (bring a brief) |
| **Wed** | **C — LUVI Creator** | small teams, freelancers, individual creators | `https://www.luvicreator.com` (open an account) |
| **Fri** | **B — Informative** | anyone Googling an AI/SaaS/dev question | `/contact` (soft) — **no LUVI at all** |

Friday's post is deliberately product-free: it is what keeps the blog credible
and earns the broad search + AI-answer traffic the other two ride on. The full
rules — including the honesty gate for both LUVI types — live in
`INSTRUCTIONS.md`.

## How it works

`/.github/workflows/blog-autopilot.yml` runs on cron (Mon/Wed/Fri 06:00 UTC).
Each run:

1. Claude Code (via `anthropics/claude-code-action@v1`, authed with the Max
   subscription token) reads `INSTRUCTIONS.md`, fetches a few feeds from
   `sources.json`, picks one fresh story not in `seen.json`, and writes a post
   to `src/data/autopilot-posts.json` (+ records the source in `seen.json`).
2. `scripts/autopilot/validate.mjs` structurally validates the JSON (a bad post
   fails the job and is never committed).
3. The workflow commits & pushes → Vercel redeploys → the post is live.

Posts appear in the blog list, detail pages, sitemap, and `/llms.txt`
automatically via `src/data/blog-index.ts`. Hand-written posts in `blogs.ts` are
untouched.

## One-time setup

1. **Mint a subscription token** (local machine, interactive browser):
   ```bash
   claude setup-token
   ```
   Copy the printed `CLAUDE_CODE_OAUTH_TOKEN` (valid ~1 year).
2. **Add it as a repo secret:**
   ```bash
   gh secret set CLAUDE_CODE_OAUTH_TOKEN
   ```
3. **Enable the kill-switch variable:**
   ```bash
   gh variable set AUTOPILOT_ENABLED --body true
   ```
4. **Test it now** (manual run): Actions tab → "Blog Autopilot" → "Run workflow",
   or `gh workflow run blog-autopilot.yml`.

## Controls

- **Pause:** `gh variable set AUTOPILOT_ENABLED --body false` (job is skipped).
- **Queue your own topics:** add entries to `.github/autopilot/topics-queue.json`
  (priority order). An entry is a plain string, or an object that pins the type:
  `{ "type": "luvi-agency" | "luvi-creator" | "genel", "topic": "..." }`.
  Each run uses the first queued entry and removes it; when the queue is empty it
  falls back to the matching pool in `keywords.json` (`luvi-agency`,
  `luvi-creator`, `genel`).
- **Change cadence:** edit the `cron` in the workflow.
- **Tune voice / sources:** edit `INSTRUCTIONS.md` / `sources.json`.
- **Change the topic mix:** edit the three pools in `keywords.json` and the
  weekday→type table at the top of `INSTRUCTIONS.md`.
- **LinkedIn:** `scripts/autopilot/share-linkedin.mjs` mirrors the newest post
  (TR + EN + link). Hashtags are derived from that post's own `tags`, so they
  follow the topic automatically. Preview without posting:
  `DRY_RUN=1 node scripts/autopilot/share-linkedin.mjs`.
- **Remove a bad post:** delete its object from `src/data/autopilot-posts.json`
  and commit.
- **Token expires (~1 year):** re-run `claude setup-token` and update the secret.
