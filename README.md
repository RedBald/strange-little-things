# Strange Little Things Demo Site

A complete static staging site for **StrangeLittleThings.com**.

## What is included

- Responsive landing page
- Three approved Strange Little Things graphics
- Decorative, accessible product placeholders with no product photography
- JSON-driven demo product grid
- Facebook link placeholder
- Browser-only demo product manager at `/admin/`
- Draft privacy page and accessible 404 page
- Staging noindex controls
- Cloudflare security headers
- No external packages, trackers, forms, databases, payments, or APIs

## Local preview

Install Node.js 20 or newer, then run:

```bash
npm run dev
```

Open:

```text
http://localhost:8080
```

## Build and test

```bash
npm run check
```

The deployable site is created in:

```text
dist
```

## Easy content updates

- `src/site-config.json` contains the Facebook URL and contact placeholder.
- `src/products.json` contains the public demo listings.
- `src/assets/` contains the three approved woodland-fantasy graphics and favicon.
- `/admin/` is only a browser-only workflow demonstration. It does not publish.

## Important

This is a noindex staging site. Do not connect payments, publish customer data, or connect production domains until the shop platform and policies are approved.
