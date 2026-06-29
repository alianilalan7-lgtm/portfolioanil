#!/usr/bin/env node
// Shares the newest not-yet-shared published blog post to the owner's LinkedIn
// profile (one per run, matching the autopilot's cadence). No-ops cleanly if the
// LinkedIn token isn't configured. No dependencies — uses global fetch (Node 18+).
//
// Env:
//   LINKEDIN_ACCESS_TOKEN  (required) member token with w_member_social + openid + profile
//   SITE_URL               (default https://alianil.com)
//   LINKEDIN_VERSION       (default 202606) LinkedIn-Version header (YYYYMM)

import { readFileSync, writeFileSync } from "node:fs";

const POSTS_PATH = "src/data/autopilot-posts.json";
const LEDGER_PATH = ".github/autopilot/shared-linkedin.json";

const token = process.env.LINKEDIN_ACCESS_TOKEN;
if (!token) {
  console.log("LINKEDIN_ACCESS_TOKEN not set — LinkedIn sharing disabled. Skipping.");
  process.exit(0);
}
const SITE = (process.env.SITE_URL || "https://alianil.com").replace(/\/+$/, "");
const VERSION = process.env.LINKEDIN_VERSION || "202606";

const readJson = (p, fallback) => {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
};

const posts = readJson(POSTS_PATH, []);
const shared = readJson(LEDGER_PATH, []);

const published = posts
  .filter((p) => (p.status ?? "published") === "published")
  .filter((p) => !shared.includes(p.slug))
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

if (!published.length) {
  console.log("No new posts to share on LinkedIn.");
  process.exit(0);
}

const post = published[0]; // newest unshared — one per run
const lang = post.en || post.tr;
const url = `${SITE}/blog/${post.slug}`;
const commentary = `${lang.title}\n\n${lang.excerpt}\n\n#SaaS #AI #MVP #Startups #FreelanceDeveloper`;

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

// 2) Create the post with a rich article link card.
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
    article: { source: url, title: lang.title, description: lang.excerpt },
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

const postId = res.headers.get("x-restli-id") || res.headers.get("x-linkedin-id") || "(id n/a)";
console.log(`✓ Shared to LinkedIn: "${lang.title}" → ${url}  [${postId}]`);

// 3) Record it so we never double-post.
shared.push(post.slug);
writeFileSync(LEDGER_PATH, JSON.stringify(shared, null, 0) + "\n");
console.log(`Ledger updated (${shared.length} shared).`);
