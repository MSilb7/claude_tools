<!-- technical-design: canonical implementation map. Installed only when
     docs/technical/TECHNICAL_DESIGN.md is absent. This filled-in document belongs to the repository
     and is never overwritten by compounding upgrades. Exact code, migrations, schemas, generated
     specifications, tests, and runtime inspection remain authoritative. -->
# Technical Design — <product name>

**Purpose:** Explain how the system satisfies the product intent in `docs/product/PRD.md`. Keep this
as a concise map of stable responsibilities and boundaries. Link detailed topic documents and exact
executable sources instead of copying them here.

**Last reconciled:** <YYYY-MM-DD · git ref>

## 1. System context and product traceability

<System boundary, external actors/systems, and links to the PRD capabilities, principles, stories,
or roadmap IDs that shape the design. State technical non-goals.>

## 2. Components and responsibilities

| Component | Responsibility | Owns | Interfaces | Product/decision links | Status |
|---|---|---|---|---|---|
| `<path or service>` | <stable responsibility> | <data or process> | <links/pointers> | <PRD/ADR IDs> | BUILT / PARTIAL / PLANNED / RETIRED |

## 3. Data ownership and persistence

<Name each authoritative data owner, write boundary, consistency or retention rule, and migration
path. Point to migrations or schemas for exact fields and constraints.>

## 4. Interfaces and contracts

<Describe stable internal/external contracts, compatibility expectations, and failure semantics.
Point to generated API specifications, protocol definitions, or contract tests for exact details.>

## 5. Important flows

<Document the few end-to-end, asynchronous, recovery, or failure flows needed to understand how the
system works. Link sequence/topic documents when a flow needs substantial detail.>

## 6. Security and trust boundaries

<Identity, authentication, authorization, secrets, sensitive data, privileged operations, network
boundaries, and material threat assumptions. Link security decisions and runbooks.>

## 7. Runtime topology and operations

<Build/deploy units, environments, dependencies, observability, recovery, and operator workflows.
Point to infrastructure definitions and commands that render current live state; do not inline
volatile inventory.>

## 8. Testing and verification strategy

<Test layers and ownership: unit, integration, contract, migration, end-to-end, security, load, and
operational checks. Link exact commands and identify meaningful gaps.>

## 9. Active decisions

| Decision | Governs | Status | Record |
|---|---|---|---|
| <ADR ID/title> | <boundary or rule> | PROPOSED / ACTIVE / SUPERSEDED | <link> |

## 10. Known technical gaps and evolution

| Item | Product link | Current state | Target state | Tracking |
|---|---|---|---|---|
| <gap/change> | <PRD ID> | <today> | <desired design> | <issue/compounding item/PR> |

## 11. Authoritative pointers

| Exact truth | Source or inspection command |
|---|---|
| Database schema | <migration/schema path> |
| API contract | <generated spec or definition path> |
| Runtime state | <safe inspection command/dashboard> |
| Deployment topology | <infrastructure/deployment path> |
| Test contract | <test path/command> |

## 12. Maintenance protocol

- Reconcile with `maintain-technical-design` after material implementation or decision changes.
- Update this document in the same change as component-boundary, data-ownership, interface,
  security-assumption, runtime-behavior, or operational-contract changes.
- Preserve historical rationale in decision records; mark supersession instead of rewriting history.
- Split detailed topics only when progressive disclosure improves this index.
