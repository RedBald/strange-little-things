# Commerce and Product-Upload Next Steps

The demo intentionally does not choose a shop platform yet.

## Required final features

- Lisa can add and edit listings from her phone
- Unique one-off items and quantity-based items
- Shipping and local pickup
- Website checkout
- Facebook links or messaging
- External purchase links when useful
- Sold-out and availability controls
- Product photos, prices, descriptions, and care notes

## Practical choices to evaluate

### Hosted store embedded into this design
Examples include Shopify, Ecwid, or Square Online. This is usually the lowest-maintenance route for checkout, inventory, shipping, tax, and phone-friendly product management.

### Git-backed content manager plus external checkout
A CMS manages listings while purchase buttons send buyers to Facebook, PayPal, Whatnot, or hosted checkout links. This preserves more of the custom design but splits inventory and order management.

### Custom Cloudflare application
Cloudflare Pages, Functions, D1, and R2 could provide a custom admin, product database, and image uploads. This offers the most control but creates the most security, maintenance, payment, tax, and support responsibility.

## Recommended order

1. Approve the demo design.
2. Collect Lisa's real Facebook URL and first five listings.
3. Decide whether direct checkout is needed immediately.
4. Compare hosted storefront cost and ease of use.
5. Connect only the selected service to staging.
6. Test a full order, refund, shipping, pickup, and sold-item workflow before public launch.
