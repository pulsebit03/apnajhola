-- Create Products Table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric not null,
  category text,
  image_url text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Products
alter table products enable row level security;

-- Allow Public Read Access
create policy "Public read access" on products for select using (true);

-- Allow Authenticated (Admin) Write Access (simplified for now to allow all, stricter in prod)
create policy "Enable insert for all users" on products for insert with check (true);
create policy "Enable update for all users" on products for update using (true);
create policy "Enable delete for all users" on products for delete using (true);

-- Create App Users Table
create table if not exists app_users (
  id uuid references auth.users not null primary key,
  email text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for App Users
alter table app_users enable row level security;
create policy "Enable read access for all users" on app_users for select using (true);
create policy "Admin update users" on app_users for update using (true);

-- Add banned column
alter table app_users add column if not exists banned boolean default false;

-- Add details and role columns
alter table app_users add column if not exists name text;
alter table app_users add column if not exists phone text;
alter table app_users add column if not exists role text default 'client' check (role in ('admin', 'delivery', 'client'));

-- Create Function to Handle New User Signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.app_users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Create Trigger (if it doesn't exist, this might error if it does, but that's fine - drop first to be safe)
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create Storage Bucket for Product Images
insert into storage.buckets (id, name, public) 
values ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public access to storage
create policy "Public Access" 
on storage.objects for select 
using ( bucket_id = 'products' );

create policy "Authenticated Insert" 
on storage.objects for insert 
with check ( bucket_id = 'products' AND auth.role() = 'authenticated' );

-- Create Orders Table
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users,
  total_amount numeric not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Orders
alter table orders enable row level security;
create policy "Admin read access" on orders for select using (true);

-- Insert Dummy Orders for Earnings Calculation
insert into orders (total_amount, status, created_at) values 
(150.00, 'delivered', now() - interval '1 day'),
(230.50, 'delivered', now() - interval '2 days'),
(500.00, 'delivered', now() - interval '3 days'),
(120.00, 'pending', now());

-- Create Banners Table
create table if not exists banners (
  id uuid default gen_random_uuid() primary key,
  title text,
  image_url text not null,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Banners
alter table banners enable row level security;

-- Public Read Access
create policy "Public read banners" on banners for select using (true);

-- Admin Write Access
create policy "Admin insert banners" on banners for insert with check (true);
create policy "Admin update banners" on banners for update using (true);
create policy "Admin delete banners" on banners for delete using (true);

-- Storage for Banners
insert into storage.buckets (id, name, public) 
values ('banners', 'banners', true)
ON CONFLICT (id) DO UPDATE SET public = true;

create policy "Public Access Banners" 
on storage.objects for select 
using ( bucket_id = 'banners' );

create policy "Authenticated Insert Banners" 
on storage.objects for insert 
with check ( bucket_id = 'banners' AND auth.role() = 'authenticated' );

