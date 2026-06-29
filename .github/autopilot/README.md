# Blog Autopilot

Auto-generates one bilingual (TR + EN) blog post about a recent AI/tech
development, written from a founder's perspective, **3× per week** — billed
against a **Claude Max subscription** (no API key, no per-token cost).

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
- **Queue your own topics:** add strings to `.github/autopilot/topics-queue.json`
  (priority order, e.g. `["AI cost control for SaaS", "Supabase vs Firebase for an MVP"]`).
  Each run uses the first queued topic and removes it; when the queue is empty it
  falls back to `keywords.json`.
- **Change cadence:** edit the `cron` in the workflow.
- **Tune voice / sources:** edit `INSTRUCTIONS.md` / `sources.json`.
- **Remove a bad post:** delete its object from `src/data/autopilot-posts.json`
  and commit.
- **Token expires (~1 year):** re-run `claude setup-token` and update the secret.
