# Test report
Run date: 2026-10-20. Tool: Playwright 1.56 + headless Chromium, loading the files from disk (file://).

## What was actually run
| Test | Result |
|---|---|
| All 31 HTML files (30 pages + index) link `divas-design-system.css`, `divas-pages.css`, `divas-ui.js` via correct relative paths | PASS (link/asset check: 0 broken) |
| Internal link check (every href/src resolves; no external requests) | PASS, 0 issues |
| Tag balance, duplicate IDs, one h1 per page (HTML parser check) | PASS, 0 issues |
| Horizontal overflow at 320, 375, 430, 768, 1024, 1440px on all 31 pages (186 page loads) | PASS, 0 overflow (2 issues found and fixed during testing) |
| Browser console errors / page errors / failed requests across those loads | PASS, 0 |
| Interaction: mobile nav | PASS |
| Interaction: password toggle | PASS |
| Interaction: login validation errors shown, no fake success | PASS |
| Interaction: valid submit shows preview-only notice | PASS |
| Interaction: password confirmation feedback | PASS |
| Interaction: faq expand/collapse/search/empty | PASS |
| Interaction: tabs click + arrow keys | PASS |
| Interaction: cart qty/subtotal/remove/empty | PASS |
| Interaction: checkout shipping toggle | PASS |
| Interaction: checkout validation focuses first invalid field | PASS |
| Interaction: dismissible alerts | PASS |
| Interaction: no-JS: cart items, all tab panels, nav visible | PASS |

Screenshots reviewed by eye (375px and 1440px): cart, checkout (mobile), account dashboard (desktop and mobile).

## Not done / limitations
- **Homepage reference:** the live homepage was fetched as text/structure only; its CSS could not be inspected, so exact pixel/colour matches are **not verified**. The live homepage currently serves an earlier burgundy/gold build of the Festive Specials page; these shells follow the later approved pink/orange/light-brown version of that design.
- Not run: W3C HTML validator, Lighthouse/Core Web Vitals, axe or screen-reader testing, a contrast-checker tool, Firefox/Safari/real-device tests, all 31 pages visually inspected (only the representative pages above).
- Cart arithmetic is sample-only; no authentication, order, payment or WooCommerce behaviour exists or was tested. The live site was not accessed beyond reading the homepage.
