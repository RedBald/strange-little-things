# GitHub and Cloudflare Setup

## Create the GitHub repository

Use this repository name:

```text
strange-little-things
```

Recommended settings:

- Visibility: Private
- Add README: No, because this package already contains one
- Add .gitignore: No
- License: None

Extract this package and upload every file and folder to the repository root.

## Connect Codex

Add `RedBald/strange-little-things` to the existing ChatGPT Codex Connector repository access.

Codex will automatically read `AGENTS.md` when working in the repository.

## Create the Cloudflare Pages project

In Cloudflare:

1. Go to **Workers & Pages**.
2. Choose **Create application**.
3. Select **Pages** or **Import an existing Git repository**.
4. Connect GitHub.
5. Allow access only to `RedBald/strange-little-things`.
6. Select the repository.

Use these settings:

```text
Project name: strange-little-things
Production branch: main
Framework preset: None
Build command: npm run build
Build output directory: dist
Root directory: leave blank
```

Do not add environment variables for this demo.

## Initial preview

Cloudflare will create a temporary address similar to:

```text
https://strange-little-things.pages.dev
```

Keep the demo noindex and do not connect the production domains yet.

## Later domain plan

Primary public domain:

```text
strangelittlethings.com
```

Secondary domain:

```text
strangelittleplants.com
```

Recommended final behavior:

- Attach `strangelittlethings.com` as the primary custom domain.
- Redirect `www.strangelittlethings.com` to the preferred primary form.
- Redirect all requests from `strangelittleplants.com` and `www.strangelittleplants.com` to `https://strangelittlethings.com`.

Do not change nameservers or DNS until the staging site is approved and the existing DNS zone has been recorded.
