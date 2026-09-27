# R4K — Robotics for Kids

A static website built with React, TypeScript, Vite, Tailwind CSS, Wouter, and Framer Motion. The deployed site has no server, database, runtime API, or required environment variable.

## Local development

Use Node.js 20.19 or newer.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5001`. The content editor is available only during local development at `http://127.0.0.1:5001/admin`.

The editor can update the JSON files in `client/public/data` and images in `client/public/uploads`. Its small write API is part of the Vite development server, binds to the local computer, and is excluded from production builds.

## Verify and build

```sh
npm run check
npm run build
npm run preview
```

The deployable website is generated in `dist/`. The preview is available at `http://127.0.0.1:4173`.

The production preview behaves like the deployed site: `/admin` and the local write API are unavailable.

## Deploy to a domain

Any static host can serve the `dist/` directory:

- Install command: `npm ci`
- Build command: `npm run build`
- Publish directory: `dist`
- Node.js version: 20.19 or newer

`vercel.json` configures Vercel automatically. Cloudflare's single-page-app fallback is configured in `wrangler.jsonc`, so direct visits to `/about`, `/contact`, and news articles load correctly.

## Development site on Cloudflare Workers

The repository includes `wrangler.jsonc` for a static Cloudflare Worker named `r4k-website-development`. It serves the generated `dist/` directory and sends browser navigation requests through the React single-page app.

```sh
npm run preview:cloudflare
npm run deploy:development
```

For automatic GitHub deployments, import this repository in **Cloudflare Dashboard → Workers & Pages → Create application → Import a repository**. Use:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Preview command: `npx wrangler preview`

The `main` branch updates the persistent development Worker. Other branches can receive isolated Cloudflare Preview URLs when preview builds are enabled. The local `/admin` editor remains excluded from every Cloudflare build.

After deploying, add the domain in the host's dashboard and point the domain's DNS records to the values provided by that host. The metadata, sitemap, and robots file currently use `https://www.r4kclub.com`. If the final domain changes, update:

- `client/index.html`
- `client/public/robots.txt`
- `client/public/sitemap.xml`

## Editing content

- `client/src/pages` contains the page layouts and static page copy.
- `client/src/components/Layout.tsx` contains the navigation and footer.
- `client/src/index.css` contains global styles and theme values.
- `client/public/data` contains members, news, and program data.
- `client/public/uploads` contains public content images.
- `attached_assets` contains images imported by the React components.

Use the local editor or edit the files directly. To update the real website, run the checks, rebuild, and deploy the newly generated `dist/` directory. The hosting provider only serves those static files, so it does not need a paid backend.
