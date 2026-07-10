import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const command = fs.readFileSync(path.join(root, "commands/compounding.md"), "utf8");
const skill = fs.readFileSync(path.join(root, "skills/maintain-technical-design/SKILL.md"), "utf8");
const assetPath = path.join(
  root,
  "skills/maintain-technical-design/assets/TECHNICAL_DESIGN-template.md",
);
const asset = fs.readFileSync(assetPath, "utf8");
const snippet = fs.readFileSync(
  path.join(here, "technical-design-agent-snippet.md"),
  "utf8",
);
const continuousSnippet = fs.readFileSync(
  path.join(here, "continuous-improvement-agent-snippet.md"),
  "utf8",
);

test("v6 setup resolves the portable asset without duplicating it in the legacy pack", () => {
  assert.equal(fs.readFileSync(path.join(here, "VERSION"), "utf8").trim(), "6");
  assert.match(command, /TECH_TEMPLATE=.*maintain-technical-design\/assets\/TECHNICAL_DESIGN-template\.md/);
  assert.match(command, /portable skill asset is canonical; do not\s+duplicate it into the legacy template pack/i);
  assert.equal(fs.existsSync(path.join(here, "TECHNICAL_DESIGN-template.md")), false);
});

test("setup and upgrade preserve repository-owned technical documentation", () => {
  assert.match(
    command,
    /docs\/technical\/TECHNICAL_DESIGN\.md` ← `\$TECH_TEMPLATE` \*\*ONLY IF ABSENT\*\*/,
  );
  assert.match(
    command,
    /NEVER wholesale-replace `docs\/technical\/TECHNICAL_DESIGN\.md`/,
  );
  assert.match(command, /canonical index is absent[\s\S]*create it from `\$TECH_TEMPLATE`/);
  assert.match(command, /inventory existing architecture,\s+technical, operations, security, data, API, and decision documentation/i);
  assert.match(asset, /never overwritten by compounding upgrades/i);
});

test("the portable workflow carries the required reconciliation contract", () => {
  for (const tag of [
    "TECH-DOC-STALE",
    "IMPLEMENTATION-DRIFT",
    "NEW-UNCAPTURED",
    "DECISION-DRIFT",
    "PRD-TECH-MISMATCH",
    "STATUS-MOVE",
  ]) {
    assert.match(skill, new RegExp(`\\b${tag}\\b`));
  }
  assert.match(skill, /Require operator approval before changing component boundaries/);
  assert.match(skill, /executable and generated sources as authoritative/i);
});

test("the template is a technical index with explicit truth pointers", () => {
  for (const heading of [
    "Components and responsibilities",
    "Data ownership and persistence",
    "Interfaces and contracts",
    "Important flows",
    "Security and trust boundaries",
    "Runtime topology and operations",
    "Testing and verification strategy",
    "Active decisions",
    "Known technical gaps and evolution",
    "Authoritative pointers",
  ]) {
    assert.match(asset, new RegExp(heading));
  }
  assert.match(asset, /Point to migrations or schemas for exact fields/);
  assert.match(asset, /Point to generated API specifications/);
});

test("the standing instruction stays concise and delegates to the portable workflow", () => {
  assert.ok(snippet.split(/\r?\n/).length <= 6);
  assert.match(snippet, /maintain-technical-design/);
  assert.match(snippet, /do not load every linked topic doc by default/i);
  assert.match(command, /Append the concise pointer[\s\S]*to `AGENTS\.md`/);
});

test("setup installs shared cross-agent maintenance rules", () => {
  assert.match(command, /Make `AGENTS\.md` the canonical cross-agent file/);
  assert.match(command, /If `CLAUDE\.md` is absent, create it with `@AGENTS\.md`/);
  assert.match(command, /continuous-improvement-agent-snippet\.md/);
  assert.match(command, /Do not treat the\s+shared v6 stamp alone as proof/);
  assert.match(continuousSnippet, /every remaining follow-up is either completed/i);
  assert.match(continuousSnippet, /repository-local skill/i);
  assert.match(continuousSnippet, /use `promote-skill`/i);
  assert.ok(continuousSnippet.split(/\r?\n/).length <= 12);
});

test("product reconciliation captures confirmed planning decisions", () => {
  const prdTemplate = fs.readFileSync(path.join(here, "PRD-template.md"), "utf8");
  const prdReconcile = fs.readFileSync(path.join(here, "prd-reconcile.md"), "utf8");
  assert.match(prdTemplate, /confirmed product decision during discovery or planning/i);
  assert.match(prdReconcile, /Confirmed operator decisions in the current discovery or planning thread/);
});

test("all canonical-owned legacy templates carry the v6 stamp", () => {
  const stamped = [
    "PRD-template.md",
    "SOP.md",
    "auto-merge-journal.yml",
    "claude-md-snippet.md",
    "compounding-curate.md",
    "compounding-drain.md",
    "compounding-status.mjs",
    "continuous-improvement-agent-snippet.md",
    "prd-claude-md-snippet.md",
    "prd-reconcile.md",
    "technical-design-agent-snippet.md",
  ];
  for (const file of stamped) {
    assert.match(fs.readFileSync(path.join(here, file), "utf8"), /compounding-system: v6/);
  }
  assert.doesNotMatch(
    stamped.map((file) => fs.readFileSync(path.join(here, file), "utf8")).join("\n"),
    /compounding-system: v5/,
  );
});
