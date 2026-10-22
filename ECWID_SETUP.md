# Ecwid storefront: staging only

This branch scaffolds an embedded Ecwid storefront. Checkout is disabled by default and no vendor account has been connected.

## Before activation
1. Lisa chooses and approves the hosted store provider and plan.
2. Create an Ecwid account controlled by Lisa. Configure secure checkout, taxes, shipping, pickup, refunds, notifications, and store policies there.
3. Set up real products with photos, categories, descriptions, quantities, and prices using Ecwid's mobile app. Use quantity 1 for one-off items.
4. Add the numeric Store ID to src/shop-config.json.
5. Review the Ecwid embed code against current vendor instructions. The existing Content-Security-Policy blocks third-party scripts; scope narrowly required provider domains in src/_headers only after vendor/account approval.
6. Enable the storefront on a private preview only, run tests on desktop/mobile, place a test order, confirm inventory decrements, refunds, taxes, shipping and pickup.
7. Replace demo home-page listings and draft policies before any public release. Connect only verified Facebook/contact details.
8. Keep robots and X-Robots-Tag noindex until final production approval. Record existing DNS and verify redirects and TLS before changing domains.

The embedded store becomes the single source of truth for products and quantities. The browser-only /admin/ demo is not a production management portal. Do not put keys or payment credentials in the repository.
