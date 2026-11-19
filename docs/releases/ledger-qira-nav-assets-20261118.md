# Ledger Qira Apps — static asset release (November 18, 2026)

## Release

The public `ledger.imagineqira.com` website now receives the updated Ledger-specific Qira orientation bar CSS and the shared six-product Apps web component JavaScript. The original `index.html`, Ledger application bundle, account API, data, and backend are unchanged.

Cloudflare Worker: `qira-ledger-nav-assets-20261118`, source `workers/edge/qira-ledger-nav-assets-20261118.mjs` in PR #2.

| Live zone route | Route ID | Source |
|---|---|---|
| `ledger.imagineqira.com/qira-product-bar.css*` | `a817ab4828a045d381907d921f161071` | `qira-product-bar.css` at blob `0300c97845bd2a88b91635bb47cc8822cf1f83e2` |
| `ledger.imagineqira.com/assets/qira-apps/qira-product-launcher.js*` | `4eaababe4918453387e71e1be988df63` | `assets/qira-apps/qira-product-launcher.js` at blob `61b4e0106e62410361a559bbffe79925bec0f619` |

Release header for both assets: `x-qira-ledger-nav-release: ledger-nav-assets-20261118-r1`. Content types: `text/css; charset=utf-8` and `application/javascript; charset=utf-8`. Requests use GET or HEAD only; other methods return 405. Cache-Control: `public, max-age=300, must-revalidate`.

The existing Ledger landing page references the older version tags `?v=20261016` (CSS) and `?v=20260808` (launcher). The new exact-asset paths are mapped regardless of the URL query, so fresh requests receive updated assets without replacing the HTML or modifying the app. Browser caches that still hold a previous response may continue displaying it until expiry or refresh.

## Evidence

- Before change: a fresh 320px Cloudflare Browser Rendering screenshot showed the Qira strip occupying multiple rows above the independent Ledger header.
- Live-source preview: overlaying the PR CSS at **320px** reduced the Qira strip to one row; at **768px** it retained All products and Review a Flows report on one row and preserved the Ledger nav below.
- New asset Worker staged on its isolated `workers.dev` hostname; a browser-based HTML sample loading its CSS and JavaScript displayed the compact bar and Qira Apps trigger before promotion.
- After promotion: a fresh screenshot of the **real** `https://ledger.imagineqira.com/` at 320px showed a one-row Qira strip while retaining Ledger's own header and hero.
- On the real production host at 320px, opening the shadow-root Apps trigger rendered the six-product mobile dialog, with the current Ledger tile and product descriptions visible.

These are visual and static-asset checks, not signed-in record creation, publication, account entitlement, or billing tests.

## Preserved boundaries

The existing `ledger.imagineqira.com/api/*` zone route remains assigned to the original `ledger-account` Worker (route ID `cbd7c17487454a55a91ee575bc560b4f`). No API route, authentication, record data, cryptographic signing, storage, account or billing integration was changed. The original application JavaScript bundle is served by the same origin.

The source PR's `index.html` cache-tag edits remain **unreleased**; deploying the CSS/JS assets does not represent a complete Ledger source build or production merge.

## Rollback

Delete only these two route IDs: `a817ab4828a045d381907d921f161071` and `4eaababe4918453387e71e1be988df63`. CSS and Apps script requests then fall through to Ledger's existing static origin; the original `ledger-account` Worker remains intact. Do not modify DNS, the API route or app deployment. Verify that the former `x-qira-ledger-nav-release` header disappears on fresh asset requests.

The temporary `workers.dev` staging hostname can be disabled after final route checks; production custom routes will remain active.

## Follow-up

Promote Ledger's canonical HTML through its actual static application deployment when its build and account tests pass. That release should bump URL asset version tags and include keyboard, focus return, 320/390/768/1440 accessibility, and authenticated record lifecycle tests.
