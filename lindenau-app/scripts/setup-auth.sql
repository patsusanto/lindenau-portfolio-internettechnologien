-- This script sets up basic authentication for the gallery admin
-- Run this in your Supabase SQL editor

-- Enable Row Level Security on the gallery_images table
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows authenticated users to do everything
CREATE POLICY "Allow authenticated users full access" ON gallery_images
FOR ALL USING (auth.role() = 'authenticated');

-- Create a policy for anonymous users to only read
CREATE POLICY "Allow anonymous users to read" ON gallery_images
FOR SELECT USING (true);

-- Insert a demo admin user (you can change this email and password)
-- Note: This will only work if you run it from the Supabase dashboard
-- You can also create users through the Supabase Auth UI in the dashboard

-- To create an admin user:
-- 1. Go to your Supabase dashboard
-- 2. Navigate to Authentication > Users
-- 3. Click "Add user"
-- 4. Enter email: admin@gallery.com
-- 5. Enter password: your-secure-password
-- 6. Click "Create user"

-- Alternatively, you can use the auth.users table directly (advanced):
-- INSERT INTO auth.users (
--   instance_id,
--   id,
--   aud,
--   role,
--   email,
--   encrypted_password,
--   email_confirmed_at,
--   created_at,
--   updated_at,
--   confirmation_token,
--   recovery_token
-- ) VALUES (
--   '00000000-0000-0000-0000-000000000000',
--   gen_random_uuid(),
--   'authenticated',
--   'authenticated',
--   'admin@gallery.com',
--   crypt('your-password', gen_salt('bf')),
--   NOW(),
--   NOW(),
--   NOW(),
--   '',
--   ''
-- );
