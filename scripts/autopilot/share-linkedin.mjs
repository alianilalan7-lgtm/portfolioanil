#!/usr/bin/env node
// Shares the newest not-yet-shared published blog post to the owner's LinkedIn
// profile (one per run). Bilingual: Turkish first, then English, then the link.
// No-ops cleanly if the LinkedIn token isn't configured. No dependencies.
//
// Env:
//   LINKEDIN_ACCESS_TOKEN  member token (w_member_social + openid + profile)
//   SITE_URL               (default https://alianil.com)
//   LINKEDIN_VERSION       (default 202606) LinkedIn-Version header (YYYYMM)
//   DRY_RUN                if set, prints the post text for the newest article and exits (no token / no posting)

import { readFileSync, writeFileSync } from "node:fs";

const POSTS_PATH = "src/data/autopilot-posts.json";
const LEDGER_PATH = ".github/autopilot/shared-linkedin.json";

const SITE = (process.env.SITE_URL || "https://alianil.com").replace(/\/+$/, "");
const VERSION = process.env.LINKEDIN_VERSION || "202606";
const DRY = !!process.env.DRY_RUN;

const readJson = (p, fallback) => {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
};

const posts = readJson(POSTS_PATH, []);
const shared = readJson(LEDGER_PATH, []);

const allPublished = posts
  .filter((p) => (p.status ?? "published") === "published")
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

// DRY_RUN previews the newest post regardless of the ledger; a real run only
// considers posts not yet shared.
const candidates = DRY ? allPublished : allPublished.filter((p) => !shared.includes(p.slug));

if (!candidates.length) {
  console.log(DRY ? "No published posts to preview." : "No new posts to share on LinkedIn.");
  process.exit(0);
}

const post = candidates[0];
const tr = post.tr || post.en;
const en = post.en || post.tr;
const url = `${SITE}/blog/${post.slug}`;

// Bilingual body: Turkish (primary audience) on top, English below, then link.
const commentary = [
  tr.title,
  "",
  tr.excerpt,
  "",
  "— — —",
  "",
  en.title,
  "",
  en.excerpt,
  "",
  `🔗 ${url}`,
  "",
  "#SaaS #AI #MVP #Startups #Girişim #Yazılım #FreelanceDeveloper",
].join("\n");

if (DRY) {
  console.log("─── DRY RUN — LinkedIn post preview ───\n");
  console.log(commentary);
  console.log(`\n[link card] ${tr.title} — ${url}`);
  process.exit(0);
}

const token = process.env.LINKEDIN_ACCESS_TOKEN;
if (!token) {
  console.log("LINKEDIN_ACCESS_TOKEN not set — LinkedIn sharing disabled. Skipping.");
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  "X-Restli-Protocol-Version": "2.0.0",
  "LinkedIn-Version": VERSION,
};

// 1) Resolve the author URN from the token (OpenID userinfo → sub = person id).
const uiRes = await fetch("https://api.linkedin.com/v2/userinfo", {
  headers: { Authorization: `Bearer ${token}` },
});
if (!uiRes.ok) {
  console.error(
    `Failed to resolve LinkedIn identity (HTTP ${uiRes.status}). Token may be expired or missing openid/profile scope.`
  );
  console.error(await uiRes.text());
  process.exit(1);
}
const ui = await uiRes.json();
const author = `urn:li:person:${ui.sub}`;

// 2) Create the post with a rich article link card (card uses the Turkish title).
const body = {
  author,
  commentary,
  visibility: "PUBLIC",
  distribution: {
    feedDistribution: "MAIN_FEED",
    targetEntities: [],
    thirdPartyDistributionChannels: [],
  },
  content: {
    article: { source: url, title: tr.title, description: tr.excerpt },
  },
  lifecycleState: "PUBLISHED",
  isReshareDisabledByAuthor: false,
};

const res = await fetch("https://api.linkedin.com/rest/posts", {
  method: "POST",
  headers,
  body: JSON.stringify(body),
});

if (!res.ok) {
  console.error(`LinkedIn post failed (HTTP ${res.status}):`);
  console.error(await res.text());
  process.exit(1);
}

const postId = res.headers.get("x-restli-id") || "(id n/a)";
console.log(`✓ Shared to LinkedIn (TR+EN): "${tr.title}" → ${url}  [${postId}]`);

shared.push(post.slug);
writeFileSync(LEDGER_PATH, JSON.stringify(shared, null, 0) + "\n");
console.log(`Ledger updated (${shared.length} shared).`);
