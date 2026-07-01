#!/usr/bin/env node
// Validates the autopilot-generated blog data BEFORE it is committed, so a
// malformed post can never reach main / break the Next.js build. Exits non-zero
// on any structural problem. No dependencies.

import { readFileSync } from "node:fs";

const POSTS_PATH = "src/data/autopilot-posts.json";
const SEEN_PATH = ".github/autopilot/seen.json";
const BLOGS_PATH = "src/data/blogs.ts";

const BLOCK_TYPES = new Set([
  "heading",
  "subheading",
  "paragraph",
  "list",
  "stats",
]);
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Depth gate — a shallow post can never ship. Applies per language to every
// post published on/after DEPTH_RULE_SINCE (earlier posts are grandfathered)
// unless the post is explicitly marked `"kind": "announcement"`.
const DEPTH_RULE_SINCE = "2026-07-02";
const MIN_WORDS = 700; // hard floor; INSTRUCTIONS.md targets 900–1400
const MIN_BLOCKS = 10;
const MIN_HEADINGS = 4; // "heading" (H2) blocks
const MIN_LISTS = 1;

const errors = [];
const fail = (msg) => errors.push(msg);

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(`${path}: not valid JSON — ${e.message}`);
    return undefined;
  }
}

function validateContent(blocks, where) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    fail(`${where}: content must be a non-empty array`);
    return;
  }
  blocks.forEach((b, i) => {
    const at = `${where}.content[${i}]`;
    if (!b || typeof b !== "object" || !BLOCK_TYPES.has(b.type)) {
      fail(`${at}: invalid block type "${b?.type}"`);
      return;
    }
    if (["heading", "subheading", "paragraph"].includes(b.type)) {
      if (typeof b.text !== "string" || !b.text.trim())
        fail(`${at}: "${b.type}" needs a non-empty text`);
    } else if (b.type === "list") {
      if (!Array.isArray(b.items) || b.items.some((x) => typeof x !== "string"))
        fail(`${at}: "list" needs items: string[]`);
    } else if (b.type === "stats") {
      if (
        !Array.isArray(b.items) ||
        b.items.some(
          (x) => !x || typeof x.label !== "string" || typeof x.value !== "string"
        )
      )
        fail(`${at}: "stats" needs items: {label,value}[]`);
    }
  });
}

const wordCount = (s) =>
  typeof s === "string" ? s.trim().split(/\s+/).filter(Boolean).length : 0;

function countWords(blocks) {
  let words = 0;
  for (const b of blocks) {
    if (!b || typeof b !== "object") continue;
    words += wordCount(b.text);
    if (Array.isArray(b.items)) {
      for (const it of b.items) {
        if (typeof it === "string") words += wordCount(it);
        else if (it && typeof it === "object")
          words += wordCount(`${it.label ?? ""} ${it.value ?? ""}`);
      }
    }
  }
  return words;
}

function validateDepth(lang, where) {
  const blocks = Array.isArray(lang?.content) ? lang.content : [];
  const words = countWords(blocks);
  const headings = blocks.filter((b) => b?.type === "heading").length;
  const lists = blocks.filter((b) => b?.type === "list").length;
  if (words < MIN_WORDS)
    fail(
      `${where}: too shallow — ${words} words (hard floor ${MIN_WORDS}, target 900–1400)`
    );
  if (blocks.length < MIN_BLOCKS)
    fail(`${where}: only ${blocks.length} content blocks (min ${MIN_BLOCKS})`);
  if (headings < MIN_HEADINGS)
    fail(`${where}: only ${headings} H2 "heading" blocks (min ${MIN_HEADINGS})`);
  if (lists < MIN_LISTS)
    fail(`${where}: needs at least ${MIN_LISTS} "list" block`);
}

function validateLang(lang, where) {
  if (!lang || typeof lang !== "object") {
    fail(`${where}: missing object`);
    return;
  }
  if (typeof lang.title !== "string" || !lang.title.trim())
    fail(`${where}.title: required non-empty string`);
  if (typeof lang.excerpt !== "string" || !lang.excerpt.trim())
    fail(`${where}.excerpt: required non-empty string`);
  validateContent(lang.content, where);
}

const posts = readJson(POSTS_PATH);
const seen = readJson(SEEN_PATH);
let blogsText = "";
try {
  blogsText = readFileSync(BLOGS_PATH, "utf8");
} catch {
  /* non-fatal: collision check just skipped */
}

if (posts !== undefined) {
  if (!Array.isArray(posts)) {
    fail(`${POSTS_PATH}: top level must be an array`);
  } else {
    const slugs = new Set();
    posts.forEach((p, i) => {
      const where = `post[${i}]${p?.slug ? ` (${p.slug})` : ""}`;
      if (!p || typeof p !== "object") {
        fail(`${where}: not an object`);
        return;
      }
      if (typeof p.slug !== "string" || !SLUG_RE.test(p.slug))
        fail(`${where}: slug must match kebab-case ^[a-z0-9-]+$`);
      else {
        if (slugs.has(p.slug)) fail(`${where}: duplicate slug`);
        slugs.add(p.slug);
        if (blogsText.includes(`slug: "${p.slug}"`))
          fail(`${where}: slug collides with a post in blogs.ts`);
      }
      if (typeof p.publishedAt !== "string" || !DATE_RE.test(p.publishedAt))
        fail(`${where}: publishedAt must be YYYY-MM-DD`);
      if (typeof p.readTime !== "string" || !p.readTime.trim())
        fail(`${where}: readTime required`);
      if (typeof p.category !== "string" || !p.category.trim())
        fail(`${where}: category required`);
      if (
        !Array.isArray(p.tags) ||
        p.tags.length === 0 ||
        p.tags.some((t) => typeof t !== "string")
      )
        fail(`${where}: tags must be a non-empty string[]`);
      if (p.status !== undefined && !["published", "draft"].includes(p.status))
        fail(`${where}: status must be "published" or "draft"`);
      if (p.kind !== undefined && !["article", "announcement"].includes(p.kind))
        fail(`${where}: kind must be "article" or "announcement"`);
      if (p.source !== undefined) {
        if (
          typeof p.source.name !== "string" ||
          typeof p.source.url !== "string" ||
          !/^https?:\/\//.test(p.source.url)
        )
          fail(`${where}: source, when present, must be {name, url(http...)}`);
      }
      if (p.relatedLinks !== undefined) {
        if (
          !Array.isArray(p.relatedLinks) ||
          p.relatedLinks.some(
            (l) =>
              !l ||
              typeof l.label !== "string" ||
              typeof l.href !== "string" ||
              !l.href.startsWith("/")
          )
        )
          fail(
            `${where}: relatedLinks must be {label, href}[] with internal paths (href starts with "/")`
          );
      }
      validateLang(p.tr, `${where}.tr`);
      validateLang(p.en, `${where}.en`);
      if (
        typeof p.publishedAt === "string" &&
        p.publishedAt >= DEPTH_RULE_SINCE &&
        p.kind !== "announcement"
      ) {
        validateDepth(p.tr, `${where}.tr`);
        validateDepth(p.en, `${where}.en`);
      }
    });
    console.log(`Checked ${posts.length} autopilot post(s).`);
  }
}

if (seen !== undefined && !Array.isArray(seen))
  fail(`${SEEN_PATH}: must be a JSON array of URLs`);

if (errors.length) {
  console.error("\n✗ Autopilot validation FAILED:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log("✓ Autopilot content valid.");
