# Lindenau Portfolio – Internettechnologien

A portfolio and gallery management web application for artist Tatjana Lindenau, built with Next.js, Supabase, and Tailwind CSS. The app features a public gallery and a protected admin dashboard for managing artworks.

## Features

- **Public Gallery**: Browse artworks, view details, and filter by availability.
- **Admin Dashboard**: Secure login, add/edit/delete artworks, drag-and-drop reordering, and responsive tables.
- **Image Uploads**: Store artwork images using Vercel Blob storage.
- **Multi-language Support**: Easily switch between languages.
- **Responsive Design**: Works on desktop and mobile, with horizontal scrolling for wide tables.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [Supabase](https://supabase.com/) (database & authentication)
- [Tailwind CSS](https://tailwindcss.com/)
- [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) (drag-and-drop)
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Set up environment variables

Create a `.env.local` file in the `lindenau-app` directory with your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

See [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for details on obtaining these values.

### 3. Database setup

- Use Supabase as your backend. Create a table called `gallery_images` with columns matching the `Artwork` type in `lib/db.ts`.
- Enable Row Level Security and set up policies as described in [`scripts/setup-auth.sql`](./scripts/setup-auth.sql).
- Add an admin user via the Supabase dashboard (see SQL script for instructions).

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- **/galleryadmin**: Admin dashboard (login required)
- **/gallery**: Public gallery
- **/gallery/[slug]**: Artwork details

## Project Structure

- `app/` – Next.js app directory (pages, API routes)
- `components/` – Reusable UI and logic components
- `lib/` – Database and utility functions
- `public/` – Static assets
- `scripts/` – Database setup scripts

## Deployment

You can deploy this app on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

© Tatjana Lindenau. Built for the "E-Business und Internettechnologien" course.
