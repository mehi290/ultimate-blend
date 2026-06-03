-- Supabase Schema for Ultimate Blend Ladies Beauty Salon Dubai Booking CRM

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =========================================================================
-- 1. Tables Creation
-- =========================================================================

-- Profiles Table (Admin metadata linked to auth.users)
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    email text not null,
    role text not null default 'admin' check (role in ('admin', 'superadmin')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Customers Table (Unified unique customer table based on phone)
create table public.customers (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    phone text unique not null,
    email text,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Services Table
create table public.services (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    category text not null check (category in ('Braids', 'Hair', 'Wig Installation', 'Nails', 'Lashes', 'Makeup', 'Hair Treatments')),
    description text,
    duration_minutes integer not null default 60,
    price numeric,
    active boolean not null default true,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bookings Table
create table public.bookings (
    id uuid default gen_random_uuid() primary key,
    customer_id uuid references public.customers(id) on delete restrict,
    service_id uuid references public.services(id) on delete restrict,
    booking_date date not null,
    booking_time time without time zone not null,
    duration_minutes integer not null,
    status text not null default 'Pending' check (status in ('Pending', 'Confirmed', 'Completed', 'Cancelled', 'No-show')),
    customer_name text not null,
    customer_phone text not null,
    customer_email text,
    notes text,
    admin_notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Booking Status History (Audit log)
create table public.booking_status_history (
    id uuid default gen_random_uuid() primary key,
    booking_id uuid references public.bookings(id) on delete cascade not null,
    old_status text check (old_status in ('Pending', 'Confirmed', 'Completed', 'Cancelled', 'No-show')),
    new_status text not null check (new_status in ('Pending', 'Confirmed', 'Completed', 'Cancelled', 'No-show')),
    changed_by uuid references auth.users(id) on delete set null,
    changed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Availability Rules (Global Configuration)
create table public.availability_rules (
    id uuid default gen_random_uuid() primary key,
    opening_time time without time zone not null default '09:00:00',
    closing_time time without time zone not null default '23:30:00',
    slot_interval_mins integer not null default 60,
    default_max_capacity integer not null default 4,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Blocked Slots (Holidays, custom hours, reduced capacities)
create table public.blocked_slots (
    id uuid default gen_random_uuid() primary key,
    block_type text not null check (block_type in ('full_day', 'half_day', 'time_range', 'reduced_capacity')),
    start_date date not null,
    end_date date not null,
    start_time time without time zone,
    end_time time without time zone,
    override_capacity integer,
    reason text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Gallery Media
create table public.gallery_media (
    id uuid default gen_random_uuid() primary key,
    url text not null,
    media_type text not null check (media_type in ('image', 'video')),
    category text check (category in ('Braids', 'Hair', 'Wig Installation', 'Nails', 'Lashes', 'Makeup', 'Hair Treatments')),
    is_homepage boolean not null default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =========================================================================
-- 2. Indexes for Performance
-- =========================================================================
create index idx_bookings_date_time on public.bookings (booking_date, booking_time);
create index idx_bookings_customer_id on public.bookings (customer_id);
create index idx_blocked_slots_dates on public.blocked_slots (start_date, end_date);
create index idx_customers_phone on public.customers (phone);

-- =========================================================================
-- 3. Automatic profiles and updated_at Triggers
-- =========================================================================

-- Handle user profiles on sign up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'admin');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Handle booking updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_booking_updated
  before update on public.bookings
  for each row execute procedure public.handle_updated_at();

-- Audit Log Trigger for status changes
create or replace function public.log_booking_status_change()
returns trigger as $$
begin
  if (old.status is null or old.status <> new.status) then
    insert into public.booking_status_history (booking_id, old_status, new_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_booking_status_change
  after insert or update on public.bookings
  for each row execute procedure public.log_booking_status_change();

-- =========================================================================
-- 4. Enable Row Level Security (RLS)
-- =========================================================================

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.services enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_status_history enable row level security;
alter table public.availability_rules enable row level security;
alter table public.blocked_slots enable row level security;
alter table public.gallery_media enable row level security;

-- =========================================================================
-- 5. Row Level Security Policies
-- =========================================================================

-- Profile Policies
create policy "Admins can view all profiles" on public.profiles
    for select to authenticated using (true);

-- Customers Policies
create policy "Anyone can create new customer profiles" on public.customers
    for insert to public with insert rows (true);

create policy "Admins can manage all customers" on public.customers
    for all to authenticated using (true);

-- Services Policies
create policy "Anyone can view active services" on public.services
    for select to public using (active = true);

create policy "Admins can manage all services" on public.services
    for all to authenticated using (true);

-- Bookings Policies
create policy "Anyone can create bookings" on public.bookings
    for insert to public with insert rows (true);

create policy "Admins can manage all bookings" on public.bookings
    for all to authenticated using (true);

-- Booking Status History Policies
create policy "Admins can view status histories" on public.booking_status_history
    for select to authenticated using (true);

-- Availability Rules Policies
create policy "Anyone can read rules" on public.availability_rules
    for select to public using (true);

create policy "Admins can manage rules" on public.availability_rules
    for all to authenticated using (true);

-- Blocked Slots Policies
create policy "Anyone can read blocked slots" on public.blocked_slots
    for select to public using (true);

create policy "Admins can manage blocked slots" on public.blocked_slots
    for all to authenticated using (true);

-- Gallery Media Policies
create policy "Anyone can view gallery media" on public.gallery_media
    for select to public using (true);

create policy "Admins can manage gallery media" on public.gallery_media
    for all to authenticated using (true);

-- =========================================================================
-- 6. Initial Seed Data
-- =========================================================================

-- Set default settings
insert into public.availability_rules (opening_time, closing_time, slot_interval_mins, default_max_capacity)
values ('09:00:00', '23:30:00', 60, 4);

-- Seed Services
insert into public.services (name, category, description, duration_minutes, price, active) values
('Goddess Twist Braid', 'Braids', 'Stunning goddess twist braids styling.', 120, 250, true),
('Blow Dry & Iron', 'Hair', 'Professional blow dry and flat iron styling.', 60, 100, true),
('Box Braids', 'Braids', 'Classic box braids of premium length and finish.', 180, 300, true),
('Cornrows', 'Braids', 'Neat, customized cornrow styles.', 90, 150, true),
('Crochet', 'Braids', 'Beautiful and long-lasting crochet installation.', 120, 200, true),
('Wig Installation', 'Wig Installation', 'Seamless wig installation and styling.', 120, 250, true),
('Manicure', 'Nails', 'Relaxing manicure with choice of polish.', 45, 80, true),
('Pedicure', 'Nails', 'Rejuvenating pedicure treatment.', 60, 100, true),
('Eye Lash Extensions', 'Lashes', 'Gorgeous extension applications.', 90, 180, true),
('Make Up', 'Makeup', 'Full face glam for special events.', 90, 250, true),
('Signature Facial', 'Hair Treatments', 'Premium skin-nourishing facial.', 60, 150, true);
