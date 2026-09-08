#!/usr/bin/env node
// Shares the newest not-yet-shared published blog post to the owner's LinkedIn
// profile (one per run). Bilingual: Turkish first, then English, then the link.
// The post's OG card is uploaded to LinkedIn and attached as the article
// thumbnail, so the share renders with a rich image instead of a bare text card.
// No-ops cleanly if the LinkedIn token isn't configured. No dependencies.
//
// Env:
//   LINKEDIN_ACCESS_TOKEN  member token (w_member_social + openid + profile)
//   SITE_URL               (default https://alianil.com)
//   LINKEDIN_VERSION       (default 202606) LinkedIn-Version header (YYYYMM)
//   DRY_RUN                if set, prints the post text for the newest article and exits (no token / no posting)
//   HEALTH_CHECK           if set, verifies the token against /v2/userinfo and exits (no posting)

import { Buffer } from "node:buffer";
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

// HEALTH_CHECK resolves the LinkedIn identity and exits, publishing nothing.
// Why it exists: the member token expires every ~60 days, and a normal run whose
// share queue is empty exits before it ever touches the API — so a freshly
// rotated token would otherwise sit unverified until the next post happens to
// publish, which is exactly how the 2026-08-28 expiry went unnoticed for 12 days.
if (process.env.HEALTH_CHECK) {
  const t = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!t) {
    console.error("HEALTH CHECK FAILED: LINKEDIN_ACCESS_TOKEN is unset or empty.");
    process.exit(1);
  }
  const probe = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${t}` },
  });
  const text = await probe.text();
  if (!probe.ok) {
    console.error(`HEALTH CHECK FAILED (HTTP ${probe.status}): ${text}`);
    process.exit(1);
  }
  const me = JSON.parse(text);
  console.log(`✓ Token valid — authenticated as ${me.name ?? "(name n/a)"}.`);
  process.exit(0);
}

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

// Which of the owner's products this share plugs. The validator guarantees at
// most ONE external relatedLink per post, so that link is an unambiguous signal:
// agency posts carry luvi.agency, creator posts carry luvicreator.com. The
// product-free Friday posts carry neither — those still plug LUVI Creator here,
// because the blog page is what stays clean for search credibility, while the
// LinkedIn feed is where reach is the point.
const externalHref =
  (Array.isArray(post.relatedLinks) ? post.relatedLinks : [])
    .map((l) => l && l.href)
    .find((h) => typeof h === "string" && !h.startsWith("/")) || "";

// Strict round-robin off the ledger length, so the plug never repeats twice in
// a row. (Hashing the slug looked fine on average but happened to land the same
// line on four consecutive posts.)
const pickFor = (arr) => arr[shared.length % arr.length];

const PROMOS = {
  agency: {
    tag: "LuviAgency",
    url: "https://luvi.agency",
    variants: [
      {
        tr: "Luvi Agency'den haberiniz var mı? Ajanslar ve markalar için içerik üretimi: AI hattı, geleneksel prodüksiyon ve yazılım tek çatı altında.",
        en: "Heard of Luvi Agency? Content production for agencies and brands — the AI line, traditional production and software under one roof.",
      },
      {
        tr: "Kampanya içeriğini kim üretiyor? Luvi Agency'de AI üretimi, gerçek çekim ve yazılım aynı ekipten çıkıyor — AI'ın yetmediği yerde iş durmuyor.",
        en: "Who produces your campaign content? At Luvi Agency the AI work, the real shoot and the software come from one team — so the job doesn't stall where AI stops.",
      },
      {
        tr: "Luvi Agency: sanat, teknoloji ve veriyi bir araya getiren içerik prodüksiyonu. Brief'inizi konuşalım.",
        en: "Luvi Agency: content production that puts art, technology and data together. Bring us your brief.",
      },
    ],
  },
  creator: {
    tag: "LuviCreator",
    url: "https://www.luvicreator.com",
    variants: [
      {
        tr: "LUVI Creator'dan haberiniz var mı? Görsel, video, ses ve 3D için 180+ yapay zeka modeli tek hesapta — ayrı ayrı aboneliklere gerek yok.",
        en: "Heard of LUVI Creator? 180+ AI models for image, video, voice and 3D in a single account — no juggling separate subscriptions.",
      },
      {
        tr: "LUVI Creator'ı denediniz mi? Hangi modeli seçeceğinizi ve prompt'u LuviBot sizin yerinize yazıyor.",
        en: "Tried LUVI Creator yet? LuviBot picks the right model and writes the prompt for you.",
      },
      {
        tr: "LUVI Creator'dan haberiniz var mı? 180+ AI modeli, tek kredi cüzdanı, Türkçe — ekipler için roller ve müşteri bazlı projeler de var.",
        en: "Heard of LUVI Creator? 180+ AI models, one credit wallet, Turkish-first — plus roles and per-client projects for teams.",
      },
    ],
  },
};

const promo = externalHref.includes("luvi.agency") ? PROMOS.agency : PROMOS.creator;
const promoLine = pickFor(promo.variants);

// Hashtags follow the post instead of being fixed: the blog covers agency
// content production, the LUVI Creator platform and evergreen AI/dev topics,
// so one hard-coded set would be wrong on two thirds of the posts. Derive them
// from the post's own tags (Turkish diacritics folded to ASCII, PascalCase),
// then top up with a small evergreen base.
const BASE_TAGS = [promo.tag, "YapayZeka", "AI"];
const TR_FOLD = { ı: "i", İ: "I", ğ: "g", Ğ: "G", ü: "u", Ü: "U", ş: "s", Ş: "S", ö: "o", Ö: "O", ç: "c", Ç: "C" };

const toHashtag = (tag) =>
  String(tag)
    .replace(/[ıİğĞüÜşŞöÖçÇ]/g, (c) => TR_FOLD[c])
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");

const hashtags = [];
for (const raw of [...(Array.isArray(post.tags) ? post.tags : []), ...BASE_TAGS]) {
  const h = toHashtag(raw);
  if (!h || /^[0-9]/.test(h)) continue; // LinkedIn tags can't start with a digit
  if (hashtags.some((x) => x.toLowerCase() === h.toLowerCase())) continue;
  hashtags.push(h);
  if (hashtags.length === 6) break;
}

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
  "— — —",
  "",
  promoLine.tr,
  "",
  promoLine.en,
  "",
  `👉 ${promo.url}`,
  "",
  hashtags.map((h) => `#${h}`).join(" "),
].join("\n");

// TR OG card matches the Turkish title/description shown on the link card.
const thumbnailUrl = `${SITE}/tr/blog/${post.slug}/opengraph-image`;

if (DRY) {
  console.log("─── DRY RUN — LinkedIn post preview ───\n");
  console.log(commentary);
  console.log(`\n[link card] ${tr.title} — ${url}`);
  console.log(`[thumbnail] ${thumbnailUrl}`);
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

// 2) Upload the post's OG card to LinkedIn and get an image URN. Without an
// explicit thumbnail, an article card built via the Posts API renders as a
// bare text card (LinkedIn does not auto-scrape og:image here). Best-effort:
// on any failure we fall back to a thumbnail-less card rather than skip posting.
async function uploadThumbnail() {
  try {
    const imgRes = await fetch(thumbnailUrl);
    if (!imgRes.ok) throw new Error(`OG image fetch HTTP ${imgRes.status}`);
    const bytes = Buffer.from(await imgRes.arrayBuffer());

    const initRes = await fetch(
      "https://api.linkedin.com/rest/images?action=initializeUpload",
      {
        method: "POST",
        headers,
        body: JSON.stringify({ initializeUploadRequest: { owner: author } }),
      }
    );
    if (!initRes.ok)
      throw new Error(`initializeUpload HTTP ${initRes.status}: ${await initRes.text()}`);
    const { value } = await initRes.json();
    const uploadUrl = value?.uploadUrl;
    const imageUrn = value?.image;
    if (!uploadUrl || !imageUrn)
      throw new Error("initializeUpload response missing uploadUrl/image");

    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "image/png" },
      body: bytes,
    });
    if (!putRes.ok) throw new Error(`upload PUT HTTP ${putRes.status}`);

    console.log(`✓ Uploaded OG thumbnail (${bytes.length} bytes) → ${imageUrn}`);
    return imageUrn;
  } catch (err) {
    console.warn(`⚠ Thumbnail upload skipped (${err.message}). Posting without image.`);
    return null;
  }
}

const thumbnail = await uploadThumbnail();

// 3) Create the post with a rich article link card (card uses the Turkish title).
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
    article: {
      source: url,
      title: tr.title,
      description: tr.excerpt,
      ...(thumbnail ? { thumbnail } : {}),
    },
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
