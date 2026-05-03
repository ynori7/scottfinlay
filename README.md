# scottfinlay.xyz

Personal website for Scott Finlay — software developer and penetration tester.

Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com).

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

1. Clone the repository:

   ```bash
   git clone https://github.com/ynori7/scottfinlay.git
   cd scottfinlay
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
npm run build
npm run start
```

## Static Export (for deployment)

This project uses Next.js static export (`output: "export"` in [next.config.ts](next.config.ts)).

Build the static site:

```bash
npm run build
```

After build, the static files are generated in the `out/` directory:

- `out/index.html` and other route `.html` files
- `out/_next/static/` for JS/CSS assets
- copied files from `public/`

Deploy the contents of `out/` to any static host (for example: Netlify, Cloudflare Pages, GitHub Pages, S3/CloudFront, or any web server that serves static files).

Optional local preview of the static export:

```bash
npx serve out
```

## Project Structure

```
src/
  app/          # Next.js app router (layout, page, global styles)
  components/   # UI components and page sections
  data/         # Content data (portfolio, CV timeline, services, socials)
public/
  img/          # Images (portfolio, CV)
```
