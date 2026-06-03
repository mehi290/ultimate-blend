# Supabase Booking Backend Implementation Plan

This implementation plan details the manual database deployment and environment setup required to run the booking system and admin dashboard.

No code modifications to the UI (including the "Book" buttons) are made. All UI layouts, styles, and buttons remain untouched.

---

## Steps to Deploy

### 1. Database Schema Deployment
Copy the SQL code inside the file [schema.sql](file:///c:/Users/Hp/Downloads/DEMO%20PROJECTS/ultimate-blend/supabase/schema.sql) and paste it into the **Supabase SQL Editor**, then execute it. This creates:
- `profiles`
- `customers`
- `services`
- `bookings`
- `booking_status_history`
- `availability_rules`
- `blocked_slots`
- `gallery_media`
- Initial seed data (default rules and 11 salon services)

### 2. Setup Environment Variables
Create a file named `.env` in the root of the project:
`c:\Users\Hp\Downloads\DEMO PROJECTS\ultimate-blend\.env`

Add your Supabase credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## Verification Checklist
- Run the schema in Supabase SQL Editor.
- Create `.env` and insert project URLs/keys.
- Start or restart the local development server:
  ```powershell
  npm run dev
  ```
- Test booking flow by selecting a service and date/time at `/booking`.
- Test admin panel features at `/admin/dashboard`.
