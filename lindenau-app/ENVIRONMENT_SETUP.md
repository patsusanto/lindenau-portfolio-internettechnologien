# Environment Variables Setup

To fix the "Missing Supabase environment variables" error, you need to create a `.env.local` file in the root of your project with the following variables:

## Required Environment Variables

Create a file called `.env.local` in the `lindenau-app` directory with these variables:

```env
# Supabase Configuration
# Get these values from your Supabase project dashboard

# Server-side environment variables (for API routes and server components)
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Client-side environment variables (for browser components)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## How to Get These Values

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → Use for both `SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → Use for `SUPABASE_SERVICE_ROLE_KEY`

## Example

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2MzQ1Njg4MDAsImV4cCI6MTk1MDE0NDgwMH0.your_service_role_key_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjM0NTY4ODAwLCJleHAiOjE5NTAxNDQ4MDB9.your_anon_key_here
```

## Important Notes

- The `.env.local` file should be in the same directory as your `package.json`
- Never commit this file to version control (it should already be in `.gitignore`)
- Restart your development server after creating the `.env.local` file
- Make sure there are no spaces around the `=` sign in the environment variables

## Troubleshooting

If you're still getting the error after setting up the environment variables:

1. Make sure the file is named exactly `.env.local` (not `.env` or `.env.local.txt`)
2. Restart your development server: `npm run dev`
3. Check that the file is in the correct location (same directory as `package.json`)
4. Verify that the keys are copied correctly from your Supabase dashboard 