# Ultimate Blend Ladies Beauty Salon — Booking & CRM Platform

A modern, responsive online booking system and client management CRM built for **Ultimate Blend Ladies Beauty Salon** in Dubai. This application enables customers to browse services, select timeslots, and complete appointments, while providing administrators with a secure dashboard to manage schedules, set capacities, and view analytics.

---

## 🚀 Tech Stack

### Frontend & Core
* **React 18** (TypeScript-first)
* **Vite** (Next-generation frontend tooling)
* **React Router DOM v6** (Client-side routing)
* **TanStack React Query v5** (Server-state caching and synchronization)

### Design & Styling
* **TailwindCSS v3** (Utility-first styling framework)
* **shadcn/ui** (Accessible component primitives powered by Radix UI)
* **Lucide React** (Modern, clean icon pack)
* **Tailwindcss Animate** (Micro-interactions and transitions)

### Backend & Database
* **Supabase** (Postgres DB, RLS access control, Auth, and Audit Triggers)
* **date-fns** (Strict date-time validation and slot capacity calculation)

---

## 🛠️ Key Features

### 1. Client-Side Booking Flow
* **Category Filters:** Quick browse of hair, nail, eyelash, and wig services.
* **Smart Slot Generator:** Generates available appointment slots dynamically by matching stylist limits (default/reduced capacities) and blocking slots already confirmed.
* **Booking Confirmation:** ICS calendar file download and pre-filled WhatsApp routing for instant salon support.

### 2. Admin Panel
* **Live Dashboard Metrics:** Displays today's schedule, upcoming events, pending reviews, completions, and cancellation counts.
* **Availability Rules:** Customize standard opening/closing hours, time step intervals, and maximum staff size.
* **Blocked Slot Management:** Prevent bookings during national holidays, staff trainings, or customize reduced staff capacities.
* **Bookings CRM Table:** Search, filter by service/status/date, update client statuses, and append internal admin notes.

---

## 📁 Repository Structure

```text
├── .agents/                    # Agent Skills and Postgres templates
├── Implementation Plan/        # Branded metadata plans and checklist state
├── src/
│   ├── components/             # Radix primitives, admin layout, and client pages
│   ├── hooks/                  # Custom React hooks (toast, mobile helpers)
│   ├── lib/                    # Supabase Client and general styling utilities
│   ├── pages/                  
│   │   ├── admin/              # Admin Login, Bookings CRM, and Availability limits
│   │   ├── Booking.tsx         # Multi-step scheduler
│   │   └── Index.tsx           # Salon landing page
│   └── main.tsx                # App entrypoint
├── supabase/
│   └── schema.sql              # RLS policies, audit logs, and mock seed data
```

---

## 💻 Local Setup & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Deploy Database Schema
Execute the SQL code in [schema.sql](file:///c:/Users/Hp/Downloads/DEMO%20PROJECTS/ultimate-blend/supabase/schema.sql) in your **Supabase SQL Editor** to establish all tables, custom trigger procedures, indexes, and initial services.

### 4. Run Development Server
```bash
npm run dev
```
The application will launch on your local host (usually `http://localhost:5173`).
