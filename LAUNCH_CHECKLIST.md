# Strange Little Things: Go-live checklist

This branch prepares catalog browsing. It does not activate checkout, customer accounts, admin publishing, or public indexing.

## Required owner decisions
- [ ] Select real commerce provider (Square, Ecwid, Shopify, or a different approved service).
- [ ] Decide whether launch includes checkout or is Facebook/inquiry-only.
- [ ] Provide Lisa's verified Facebook URL and approved contact address.
- [ ] Approve at least five real listings with prices, stock quantities, descriptions, photos, and alt text.
- [ ] Agree on shipping regions, rates, local pickup, returns/refunds, and customer service process.
- [ ] Approve finalized privacy notice and selling policies.

## Engineering checklist
- [ ] Connect a phone-friendly inventory editor and secured admin login to approved provider.
- [ ] Synchronize stock/availability between product pages and actual order processing.
- [ ] Test every product/category link on desktop and mobile, including keyboard navigation.
- [ ] Test a complete order, order confirmation, refund, pickup, shipping, and sold-out workflow.
- [ ] Ensure photos only live in `src/assets/products/` and are approved by owner.
- [ ] Run `npm run check` and inspect the generated site.
- [ ] Verify Cloudflare production build configuration and headers.
- [ ] Remove staging-only text after approved content is in place.
- [ ] Replace draft privacy page; audit cookies/forms/provider data collection.
- [ ] Plan staging-vs-production search engine indexing before changing noindex.
- [ ] Record existing DNS for strangelittlethings.com and strangelittleplants.com.
- [ ] Approve custom-domain mapping, canonical URL, www redirects, and TLS verification.
- [ ] Verify live pages, links, real orders, and mobile behavior after launch.

## Catalog field support on this branch
- Existing: `id`, `name`, `category`, `description`, `price`, `status`, `motif`, `purchaseUrl`.
- Optional: `quantity` (zero disables the purchase link), `image` (local path in `assets/products/`), and `imageAlt` (required to display an actual product photo).
- Categories now link to filtered featured listings.
- This does not turn browser-only `/admin/` into a production editor.

## Safety
Keep demoMode true and current noindex staging protections in place until real content, commerce platform, privacy policy, and owner approval are complete. Do not merge this branch solely to "go live".
