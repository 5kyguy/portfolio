# Contact Worker

Sends portfolio contact form submissions to `0x5kyguy@gmail.com` using Cloudflare [Email Routing send_email](https://developers.cloudflare.com/email-routing/email-workers/send-email-workers/).

## Prerequisites

1. Email Routing enabled on a zone you control, with a **verified destination** including `0x5kyguy@gmail.com` (already the binding target).
2. A **sender address on that same zone** (e.g. `contact@yourdomain.com`) — required by Cloudflare for the `From:` header.

## Configure

Edit `wrangler.jsonc`:

- Set `vars.CONTACT_FROM` to your verified sender on the Email Routing domain.
- Set `vars.ALLOWED_ORIGINS` to a comma-separated list of site origins that may POST (e.g. `https://your.pages.dev,https://yourdomain.com`).

For production secrets, prefer `wrangler secret put CONTACT_FROM` (and unset plain `vars` duplicates) if you treat the sender as sensitive.

## Deploy

From repo root:

```bash
npm run worker:deploy
```

## Site

Set at **build** time for the static Next export:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://<your-worker>.workers.dev
```

The worker URL must match an entry in `ALLOWED_ORIGINS` (scheme + host + port).
