# Strange Little Things Agent Rules

## Purpose
Build and maintain a fast, accessible, whimsical website for Strange Little Things, a small hobby shop focused on air plants, succulents, curious creations, and other one-of-a-kind items.

## Required behavior
- Keep the design cute, feminine, woodland-fantasy, and original.
- Use lavender, pink, cream, mint, peach, and selected bold fantasy accents.
- Do not copy characters, artwork, wording, layouts, or trade dress from Magic: The Gathering, Bloomburrow, Air Plant Hub, Air Plant Direct, or any other brand.
- Preserve all three approved Strange Little Things graphics unless the owner explicitly removes one.
- Prefer the simplest static architecture until an actual shop platform or CMS is approved.
- Return complete files with no TODOs, ellipses, or omitted code.
- Preserve working functionality and accessibility.
- Never invent prices, inventory, shipping promises, warranties, reviews, business history, product care claims, contact details, Facebook URLs, or customer information.
- Mark demo listings and unverified content clearly.

## Production safeguards
- Do not publish payments, checkout, customer accounts, photo uploads, analytics, email delivery, or databases without an approved provider and exact owner approval.
- Never place API keys, tokens, passwords, payment data, or customer data in the repository.
- Keep staging noindex until the owner approves public release.
- Work on a separate branch and use a pull request for material changes.
- Do not change DNS or connect the production domain without a backup, exact DNS plan, and owner approval.

## Required testing
- Run `npm run check` after changes.
- Verify mobile layout, keyboard navigation, visible focus, image alternatives, internal links, and staging noindex controls.
- Do not claim browser, accessibility, checkout, form, DNS, or production verification unless it actually ran.
