# Deploying Forgeline to forgeline.tech

Target: your own Linux server, Node process behind nginx. The site needs a Node runtime — it cannot be exported
as static files, because the contact form runs a server action and `/contact` reads its query on the server.

## 1. What must be true before the first deploy

| Item | Value |
| --- | --- |
| Domain | `forgeline.tech`, with `www.forgeline.tech` as a redirect to the apex |
| DNS | `A` (and `AAAA` if you have IPv6) for `forgeline.tech` and `www` → the server's address |
| Node | 20.9 or newer (this repo is built and tested on 26) |
| `NEXT_PUBLIC_SITE_URL` | `https://forgeline.tech` — set at **build** time, it is baked into canonical URLs, Open Graph, `robots.txt` and `sitemap.xml` |

`.env.production` in the repo already sets that variable, so a plain `npm run build` produces the correct URLs.
Override it only if you deploy the same code to a staging host.

## 2. Build

```bash
git clone <repo> /srv/forgeline/releases/$(date +%Y%m%d%H%M)
cd /srv/forgeline/releases/<that directory>
npm ci
npm run lint && npm run typecheck && npm run test   # optional but cheap
npm run build
```

`next.config.ts` sets `output: "standalone"`, so the build produces a self-contained server:

```bash
# Assemble what the server actually runs
cp -r .next/static .next/standalone/.next/static
# public/ does not exist in this project; copy it too if you ever add one
```

## 3. Release layout

```
/srv/forgeline/
  releases/20260916T2010/.next/standalone/   ← built output
  current -> releases/20260916T2010/.next/standalone
```

```bash
ln -sfn /srv/forgeline/releases/<new>/.next/standalone /srv/forgeline/current
sudo systemctl restart forgeline
```

Keeping the previous release directory means a rollback is one `ln -sfn` plus a restart.

## 4. Service

Copy `deploy/forgeline.service` to `/etc/systemd/system/forgeline.service`:

```bash
sudo useradd --system --home /srv/forgeline --shell /usr/sbin/nologin forgeline
sudo chown -R forgeline:forgeline /srv/forgeline
sudo cp deploy/forgeline.service /etc/systemd/system/
sudo systemctl daemon-reload && sudo systemctl enable --now forgeline
curl -I http://127.0.0.1:3000/            # expect 200
```

The unit binds to `127.0.0.1:3000`, so the app is reachable only through nginx.

## 5. nginx and TLS

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/forgeline.tech
sudo ln -s /etc/nginx/sites-available/forgeline.tech /etc/nginx/sites-enabled/
sudo mkdir -p /var/www/certbot
sudo certbot certonly --webroot -w /var/www/certbot -d forgeline.tech -d www.forgeline.tech
sudo nginx -t && sudo systemctl reload nginx
```

Certbot installs its own renewal timer; check it with `systemctl list-timers | grep certbot`.

## 6. After the first deploy — verify

```bash
curl -I https://forgeline.tech/                       # 200, security headers present
curl -I https://www.forgeline.tech/                   # 301 → https://forgeline.tech/
curl -s https://forgeline.tech/robots.txt             # Sitemap: https://forgeline.tech/sitemap.xml
curl -s https://forgeline.tech/sitemap.xml            # six routes, all on forgeline.tech
curl -s https://forgeline.tech/ | grep -o 'rel="canonical" href="[^"]*"'
curl -s -o /dev/null -w '%{http_code}\n' https://forgeline.tech/nope          # 404
curl -s -o /dev/null -w '%{http_code}\n' https://forgeline.tech/privacy-policy # 404 while unpublished
```

Then, in Google Search Console: add `forgeline.tech`, verify by DNS, submit `https://forgeline.tech/sitemap.xml`.

## 7. Updating

```bash
cd /srv/forgeline/releases/<new checkout>
npm ci && npm run build
cp -r .next/static .next/standalone/.next/static
sudo ln -sfn $PWD/.next/standalone /srv/forgeline/current
sudo systemctl restart forgeline
```

## 8. Known gaps to close later

- **Content Security Policy.** Not enabled: Next injects inline bootstrap scripts, so a strict policy needs
  per-request nonces. Add it deliberately and test the form, the filters and the reveal animation afterwards.
- **Enquiries are simulated.** The form always confirms and nothing is delivered — see
  `docs/production-checklist.md`. Connect a provider before you rely on the site for leads.
- **Legal pages** return 404 until the facts in `src/content/legal.ts` are filled in.
- **Analytics** is not installed; add it with a consent story if you need it.
- **Backups**: the site is stateless, so backing up the repo and the certbot directory is enough.
