# README – Artist Website

---



## Project Overview

This web application was developed as part of the "E-Business and Internet Technologies" module at Deggendorf Institute of Technology (DIT). The goal was to provide a digital gallery for the artist Tatjana Lindenau, allowing visitors to view her artworks and enabling her to manage content independently through an admin dashboard.

---

## Features

- **Public Gallery**: Browse artworks, view details, and filter by availability.
- **Admin Dashboard**: Secure login, add/edit/delete artworks, drag-and-drop reordering, and responsive tables.
- **Image Uploads**: Store artwork images using Vercel Blob storage.
- **Multi-language Support**: Easily switch between languages.
- **Responsive Design**: Works on desktop and mobile, with horizontal scrolling for wide tables.

---

## Tech Stack

- **Next.js (App Router)**
- **React**
- **Supabase** (database & authentication)
- **Tailwind CSS**
- **@hello-pangea/dnd** (drag-and-drop)
- **Vercel Blob**

---

## Getting Started

1. **Install dependencies**

```bash
npm install
# or
yarn install
```

2. **Set up environment variables**\
   Create a `.env.local` file in the `lindenau-app` directory with your Supabase credentials:

```env
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

See `ENVIRONMENT_SETUP.md` for details on obtaining these values.

3. **Database setup**\
   Use Supabase as your backend. Create a table called `gallery_images` with columns matching the `Artwork` type in `lib/db.ts`.

- Enable Row Level Security and set up policies as described in `scripts/setup-auth.sql`
- Add an admin user via the Supabase dashboard (see SQL script for instructions)

4. **Run the development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to view the app.

---

## Usage

- `/galleryadmin`: Admin dashboard (login required)
- `/gallery`: Public gallery
- `/gallery/[slug]`: Artwork details

---

## Project Structure

```
app/         – Next.js app directory (pages, API routes)
components/  – Reusable UI and logic components
lib/         – Database and utility functions
public/      – Static assets
scripts/     – Database setup scripts
```

---

## Target Audience

- **Visitors**: Should be able to easily navigate, explore artworks, and reach out via the contact form.
- **Artist**: Should be able to manage artworks independently without technical knowledge.

---

## Testing & Quality Assurance

- Manual end-to-end testing conducted (site navigation, contact, language switch, admin functions)
- All testing was performed by project members; no external user feedback was collected

---

## Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Contributors

- Patrick Susanto – Development
- Marco Konjaev – Development
- Levin Hessenberger – Documentation & Concept
- Benedikt Laßkorn – Project Management & OpenProject
- Maik Winter – Project Management & Client Communication
- Tatjana Lindenau – Artist & Client

---

## Roadmap

- Add visitor analytics (e.g., Supabase logs or Plausible)
- Implement a shop portal or inquiry-based sales option
- Improve accessibility (keyboard navigation, screen reader support)

---

## License

The source code of this web application was developed exclusively for the artist Tatjana Lindenau as part of a university project. Use, distribution, or publication by third parties is not permitted without the explicit consent of the project team.

