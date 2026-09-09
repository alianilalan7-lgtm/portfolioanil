#!/usr/bin/env node
// Shares the newest not-yet-shared published blog post to LinkedIn — one post
// per channel per run. Bilingual: Turkish first, then English, then the link,
// then a short call-out for whichever LUVI product the post belongs to. The
// post's OG card is uploaded and attached, so the share renders with a rich
// image instead of a bare text card.
//
// Where the link card lands: on a LUVI post (Type A / Type C) it opens the
// product — luvi.agency or luvicreator.com — because sending that reader to the
// product is the whole point of the post; the article itself stays one tap away
// through the 🔗 line in the commentary. A product-free post (Type B) keeps its
// card on the article, which is the only place it has to send anyone.
//
// Channels
//   personal      the owner's own profile — takes every post
//   luvi-creator  the LUVI Creator page — Type C (Wednesday) posts only
//   luvi-agency   the Luvi Agency page  — Type A (Monday) posts only
//
// A page channel stays dormant until its organisation id is set, so with none
// configured this behaves exactly like the single-channel version it replaces.
// Posting AS a page also needs the token to carry w_organization_social, which
// LinkedIn grants only through Community Management API review — until then the
// page channels will fail their health check and should be left unset.
//
// Env:
//   LINKEDIN_ACCESS_TOKEN     member token (w_member_social + openid + profile;
//                             plus w_organization_social for the page channels)
//   LINKEDIN_ORG_ID_CREATOR   numeric org id of the LUVI Creator page (optional)
//   LINKEDIN_ORG_ID_AGENCY    numeric org id of the Luvi Agency page (optional)
//   SITE_URL                  (default https://alianil.com)
//   LINKEDIN_VERSION          (default 202606) LinkedIn-Version header (YYYYMM)
//   DRY_RUN                   print what each channel would post; no token, no posting
//   HEALTH_CHECK              verify the token and any configured page; no posting

import { Buffer } from "node:buffer";
import { readFileSync, writeFileSync } from "node:fs";

const POSTS_PATH = "src/data/autopilot-posts.json";
// One-off posts that jump ahead of the blog queue — a standalone product post
// with its own image. With `link` (+ `title`, optional `description`) it goes
// out as a link card that opens that URL; without it, as a plain image post.
// Emptying the file disables them.
const QUEUE_PATH = ".github/autopilot/linkedin-queue.json";
const LEDGER_PATH = ".github/autopilot/shared-linkedin.json";

const SITE = (process.env.SITE_URL || "https://alianil.com").replace(/\/+$/, "");
const VERSION = process.env.LINKEDIN_VERSION || "202606";
const DRY = !!process.env.DRY_RUN;
const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;

const readJson = (p, fallback) => {
  try {
    return JSON.parse(readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
};

// Which LUVI product a post belongs to. The validator allows at most ONE
// external relatedLink, so that link classifies the post with no guessing:
// luvi.agency => Type A, luvicreator.com => Type C, neither => the product-free
// Friday post. Routing and the call-out both read from this.
const typeOf = (post) => {
  const href =
    (Array.isArray(post.relatedLinks) ? post.relatedLinks : [])
      .map((l) => l && l.href)
      .find((h) => typeof h === "string" && !h.startsWith("/")) || "";
  if (href.includes("luvi.agency")) return "agency";
  if (href.includes("luvicreator.com")) return "creator";
  return "informative";
};

const PROMOS = {
  agency: {
    tag: "LuviAgency",
    url: "https://luvi.agency",
    cta: { tr: "Brief'inizi konuşalım", en: "Let's talk" },
    // The link card on a LUVI post lands on the product, not on the article, so
    // its title has to name the product — a card carrying the article's title
    // while opening luvi.agency would read as bait. The article's own title and
    // excerpt still lead the commentary, with the blog link inside it.
    card: {
      title: "Luvi Agency — reklam ve marka içeriği üretimi",
      description: "AI üretim hattı, geleneksel prodüksiyon ve yazılım tek çatı altında.",
    },
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
        tr: "Luvi Agency: sanat, teknoloji ve veriyi bir araya getiren içerik prodüksiyonu — kampanya görselinden filme, tek ekip.",
        en: "Luvi Agency: content production that brings art, technology and data together — from campaign stills to film, one team.",
      },
    ],
  },
  creator: {
    tag: "LuviCreator",
    url: "https://www.luvicreator.com",
    // One variant per headline capability, so three shares cover TEAMS,
    // Workflows and MCP rather than repeating the model count every time.
    cta: { tr: "Hadi, siz de deneyin", en: "Give it a try" },
    card: {
      title: "LUVI Creator — 180+ AI modeli tek hesapta",
      description: "Görsel, video, ses ve 3D üretimi; LuviBot, TEAMS, workflow ve süresi dolmayan kredi.",
    },
    variants: [
      {
        tr: "LUVI Creator'dan haberiniz var mı? Ekipçe çalışın: roller, davetler, müşteri bazlı projeler ve ortak kütüphane — herkesin işi tek yerde toplansın.",
        en: "Heard of LUVI Creator? Work as a team: roles, invites, per-client projects and a shared library — everyone's work in one place.",
      },
      {
        tr: "LUVI Creator'ın Workflow'unu denediniz mi? Bir görselden videoya uzanan zinciri tek akışta kurun, toplu üretin — her adımı elle tekrarlamaya son.",
        en: "Tried LUVI Creator's Workflows? Chain an image into a video in a single pass and generate in batches — no repeating every step by hand.",
      },
      {
        tr: "Yapay zekadan hiç anlamasanız da olur: LUVI Creator'ı MCP ile Claude'a ya da ChatGPT'ye bağlayın, ne istediğinizi gündelik dille söyleyin — üretim sohbetten çıkmadan olsun.",
        en: "You don't need to know a thing about AI: connect LUVI Creator to Claude or ChatGPT over MCP and just say what you want — it generates without leaving the chat.",
      },
      {
        tr: "LUVI Creator'dan haberiniz var mı? Görsel, video, ses ve 3D için 180+ yapay zeka modeli tek hesapta — ayrı ayrı aboneliklere gerek yok.",
        en: "Heard of LUVI Creator? 180+ AI models for image, video, voice and 3D in a single account — no juggling separate subscriptions.",
      },
    ],
  },
};

// The page channels only exist once their org id is configured. Each keeps its
// own ledger, so a page that comes online later starts from the newest post it
// accepts rather than replaying everything the profile already shared.
const CHANNELS = [
  {
    key: "personal",
    label: "kişisel profil",
    author: async () => {
      const res = await fetch("https://api.linkedin.com/v2/userinfo", {
        headers: { Authorization: `Bearer ${TOKEN}` },
      });
      if (!res.ok)
        throw new Error(
          `identity lookup failed (HTTP ${res.status}) — token expired or missing openid/profile: ${await res.text()}`
        );
      const me = await res.json();
      return { urn: `urn:li:person:${me.sub}`, who: me.name ?? "(name n/a)" };
    },
    accepts: () => true,
  },
  {
    key: "luvi-creator",
    label: "LUVI Creator sayfası",
    orgId: process.env.LINKEDIN_ORG_ID_CREATOR,
    accepts: (t) => t === "creator",
  },
  {
    key: "luvi-agency",
    label: "Luvi Agency sayfası",
    orgId: process.env.LINKEDIN_ORG_ID_AGENCY,
    accepts: (t) => t === "agency",
  },
].filter((c) => c.key === "personal" || c.orgId);

for (const c of CHANNELS) {
  if (c.orgId)
    c.author = async () => ({
      urn: `urn:li:organization:${c.orgId}`,
      who: `${c.label} (org ${c.orgId})`,
    });
}

// HEALTH_CHECK resolves every configured channel and exits, publishing nothing.
// Why it exists: the member token expires every ~60 days, and a normal run whose
// share queue is empty exits before it ever touches the API — so a freshly
// rotated token would otherwise sit unverified until the next post happens to
// publish, which is exactly how the 2026-08-28 expiry went unnoticed for 12 days.
if (process.env.HEALTH_CHECK) {
  if (!TOKEN) {
    console.error("HEALTH CHECK FAILED: LINKEDIN_ACCESS_TOKEN is unset or empty.");
    process.exit(1);
  }
  let bad = 0;
  for (const c of CHANNELS) {
    try {
      const { who } = await c.author();
      if (c.orgId) {
        // Resolving the URN proves nothing for a page — only an actual write
        // permission check does. This read needs the same grant family.
        const res = await fetch(
          `https://api.linkedin.com/rest/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&state=APPROVED`,
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              "LinkedIn-Version": VERSION,
              "X-Restli-Protocol-Version": "2.0.0",
            },
          }
        );
        if (!res.ok)
          throw new Error(
            `page access denied (HTTP ${res.status}) — the app needs Community Management API approval and w_organization_social`
          );
      }
      console.log(`✓ ${c.key}: ${who}`);
    } catch (err) {
      console.error(`✗ ${c.key}: ${err.message}`);
      bad++;
    }
  }
  process.exit(bad ? 1 : 0);
}

const posts = readJson(POSTS_PATH, []);

// The ledger used to be a flat array of slugs (profile only). Migrate it to a
// per-channel map on first write; old entries belong to the profile.
const queue = readJson(QUEUE_PATH, []);
const nextQueued = (key, done) =>
  queue.find((q) => (q.channels ?? ["personal"]).includes(key) && !done.includes(q.id));

const rawLedger = readJson(LEDGER_PATH, {});
const ledger = Array.isArray(rawLedger) ? { personal: rawLedger } : rawLedger;
for (const c of CHANNELS) if (!Array.isArray(ledger[c.key])) ledger[c.key] = [];

const allPublished = posts
  .filter((p) => (p.status ?? "published") === "published")
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

const buildCommentary = (post, sentCount) => {
  const tr = post.tr || post.en;
  const en = post.en || post.tr;
  const url = `${SITE}/blog/${post.slug}`;
  const type = typeOf(post);
  const promo = type === "agency" ? PROMOS.agency : PROMOS.creator;
  // Strict round-robin off the channel's own ledger, so the call-out never
  // repeats twice in a row and each channel rotates independently.
  const line = promo.variants[sentCount % promo.variants.length];

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

  const commentary = [
    tr.title, "", tr.excerpt, "",
    "— — —", "",
    en.title, "", en.excerpt, "",
    `🔗 ${url}`, "",
    "— — —", "",
    line.tr, "", line.en, "",
    `${promo.cta.tr} / ${promo.cta.en} 👉 ${promo.url}`, "",
    hashtags.map((h) => `#${h}`).join(" "),
  ].join("\n");

  // Where the card lands. On a LUVI post (Type A / Type C) the tap goes to the
  // product — that is the point of those posts — and the article stays reachable
  // through the 🔗 line in the commentary above. A product-free post (Type B)
  // has nowhere else to send anyone, so its card stays on the article.
  const card =
    type === "informative"
      ? { source: url, title: tr.title, description: tr.excerpt }
      : { source: promo.url, ...promo.card };

  // The TR OG card matches the Turkish title/description on the link card.
  return { commentary, url, tr, card, thumbnailUrl: `${SITE}/tr/blog/${post.slug}/opengraph-image` };
};

// Without an explicit thumbnail an article card built via the Posts API renders
// with no image (LinkedIn does not auto-scrape og:image here). Best-effort: any
// failure falls back to a thumbnail-less card rather than skipping the post.
async function uploadImage(bytes, owner, headers, contentType = "image/png") {
  try {
    const initRes = await fetch("https://api.linkedin.com/rest/images?action=initializeUpload", {
      method: "POST",
      headers,
      body: JSON.stringify({ initializeUploadRequest: { owner } }),
    });
    if (!initRes.ok)
      throw new Error(`initializeUpload HTTP ${initRes.status}: ${await initRes.text()}`);
    const { value } = await initRes.json();
    if (!value?.uploadUrl || !value?.image)
      throw new Error("initializeUpload response missing uploadUrl/image");

    const putRes = await fetch(value.uploadUrl, {
      method: "PUT",
      headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": contentType },
      body: bytes,
    });
    if (!putRes.ok) throw new Error(`upload PUT HTTP ${putRes.status}`);

    console.log(`  ✓ image uploaded (${bytes.length} bytes)`);
    return value.image;
  } catch (err) {
    console.warn(`  ⚠ image skipped (${err.message})`);
    return null;
  }
}

const fetchBytes = async (url) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OG image fetch HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
};

if (DRY) {
  for (const c of CHANNELS) {
    console.log(`\n─── DRY RUN — ${c.key} (${c.label}) ───\n`);
    const q = nextQueued(c.key, ledger[c.key]);
    if (q) {
      console.log(`[sırada: tek seferlik gönderi ${q.id}]\n`);
      console.log(q.commentary);
      console.log(
        q.link
          ? `\n[link card] ${q.title} — ${q.link}\n[thumbnail] ${q.image}`
          : `\n[görsel gönderi — sadece metindeki link tıklanır] ${q.image}`
      );
      continue;
    }
    // Preview ignores the ledger so there is always something to look at.
    const post = allPublished.find((p) => c.accepts(typeOf(p)));
    if (!post) {
      console.log("(bu kanala uygun yayımlanmış yazı yok)");
      continue;
    }
    const { commentary, tr, card, thumbnailUrl } = buildCommentary(post, ledger[c.key].length);
    console.log(commentary);
    console.log(`\n[link card] ${card.title}\n[tıklayınca gider] ${card.source}`);
    console.log(`[thumbnail] ${thumbnailUrl}`);
  }
  process.exit(0);
}

if (!TOKEN) {
  console.log("LINKEDIN_ACCESS_TOKEN not set — LinkedIn sharing disabled. Skipping.");
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
  "X-Restli-Protocol-Version": "2.0.0",
  "LinkedIn-Version": VERSION,
};

let posted = 0;
let failed = 0;

for (const c of CHANNELS) {
  const queued = nextQueued(c.key, ledger[c.key]);
  const post = queued
    ? null
    : allPublished.find((p) => c.accepts(typeOf(p)) && !ledger[c.key].includes(p.slug));
  if (!queued && !post) {
    console.log(`${c.key}: nothing new to share.`);
    continue;
  }

  try {
    const { urn: author, who } = await c.author();

    // A queued one-off brings its own picture. With `link` set it goes out as a
    // LINK CARD — the picture becomes the card thumbnail and tapping anywhere on
    // it lands on that URL, which is what a product post wants. Without `link`
    // it stays a plain image post, where tapping the picture only opens the
    // picture and the URL inside the commentary is the sole clickable thing.
    if (queued) {
      console.log(`${c.key} → ${who}: one-off "${queued.id}"`);
      if (queued.link && !queued.title)
        throw new Error(`queue "${queued.id}": a link card needs a title`);
      const image = await uploadImage(
        readFileSync(queued.image),
        author,
        headers,
        queued.image.endsWith(".png") ? "image/png" : "image/jpeg"
      );
      if (!image) throw new Error("image upload failed — refusing to post it bare");
      const res = await fetch("https://api.linkedin.com/rest/posts", {
        method: "POST",
        headers,
        body: JSON.stringify({
          author,
          commentary: queued.commentary,
          visibility: "PUBLIC",
          distribution: {
            feedDistribution: "MAIN_FEED",
            targetEntities: [],
            thirdPartyDistributionChannels: [],
          },
          content: queued.link
            ? {
                article: {
                  source: queued.link,
                  title: queued.title,
                  ...(queued.description ? { description: queued.description } : {}),
                  thumbnail: image,
                },
              }
            : { media: { id: image, altText: queued.alt ?? "" } },
          lifecycleState: "PUBLISHED",
          isReshareDisabledByAuthor: false,
        }),
      });
      if (!res.ok) throw new Error(`post failed (HTTP ${res.status}): ${await res.text()}`);
      console.log(`  ✓ shared one-off  [${res.headers.get("x-restli-id") || "id n/a"}]`);
      ledger[c.key].push(queued.id);
      posted++;
      continue;
    }

    const { commentary, tr, card, thumbnailUrl } = buildCommentary(post, ledger[c.key].length);
    console.log(`${c.key} → ${who}: "${tr.title}"`);

    const thumbnail = await uploadImage(await fetchBytes(thumbnailUrl), author, headers);

    const res = await fetch("https://api.linkedin.com/rest/posts", {
      method: "POST",
      headers,
      body: JSON.stringify({
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
            ...card,
            ...(thumbnail ? { thumbnail } : {}),
          },
        },
        lifecycleState: "PUBLISHED",
        isReshareDisabledByAuthor: false,
      }),
    });

    if (!res.ok) throw new Error(`post failed (HTTP ${res.status}): ${await res.text()}`);

    console.log(`  ✓ shared → ${card.source}  [${res.headers.get("x-restli-id") || "id n/a"}]`);
    ledger[c.key].push(post.slug);
    posted++;
  } catch (err) {
    // One channel failing must not cost the others their share this run.
    console.error(`  ✗ ${c.key}: ${err.message}`);
    failed++;
  }
}

writeFileSync(LEDGER_PATH, JSON.stringify(ledger, null, 0) + "\n");
console.log(
  `Done — ${posted} shared, ${failed} failed. Ledger: ` +
    CHANNELS.map((c) => `${c.key}=${ledger[c.key].length}`).join(", ")
);
if (failed) process.exit(1);
