-- Supabase Database Schema for Mohan Gym Performance Club

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  avatar_url TEXT,
  emergency_contact TEXT,
  fitness_goals TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Membership Plans Table
CREATE TABLE IF NOT EXISTS public.membership_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  duration TEXT NOT NULL,
  duration_months INTEGER NOT NULL DEFAULT 3,
  description TEXT,
  features TEXT[] NOT NULL DEFAULT '{}',
  popular BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Add-ons Table
CREATE TABLE IF NOT EXISTS public.addons (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Memberships Table
CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  plan_id UUID REFERENCES public.membership_plans(id) ON DELETE SET NULL,
  plan_name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  addons_selected JSONB DEFAULT '[]'::jsonb,
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired', 'cancelled', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  membership_id UUID REFERENCES public.memberships(id) ON DELETE SET NULL,
  plan_name TEXT NOT NULL,
  addons_summary TEXT,
  amount NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Successful' CHECK (status IN ('Successful', 'Pending', 'Failed', 'Refunded')),
  payment_method TEXT DEFAULT 'UPI',
  payment_reference TEXT NOT NULL UNIQUE,
  payment_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Attendance Table
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  user_name TEXT,
  check_in TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  check_out TIMESTAMPTZ,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Trainers Table
CREATE TABLE IF NOT EXISTS public.trainers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  experience TEXT DEFAULT '5+ Years',
  image TEXT NOT NULL,
  bio TEXT,
  programs TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  instagram TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Workout Plans Table
CREATE TABLE IF NOT EXISTS public.workout_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  day_name TEXT NOT NULL,
  muscle_group TEXT NOT NULL,
  exercises JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Diet Plans Table
CREATE TABLE IF NOT EXISTS public.diet_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  meal_time TEXT NOT NULL,
  meal_name TEXT NOT NULL,
  calories INTEGER,
  protein TEXT,
  items TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.membership_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diet_plans ENABLE ROW LEVEL SECURITY;

-- Helper functions to check admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON public.profiles FOR ALL USING (public.is_admin());

-- Plans & Addons Policies (Publicly viewable, admin editable)
CREATE POLICY "Plans viewable by everyone" ON public.membership_plans FOR SELECT USING (true);
CREATE POLICY "Admins manage plans" ON public.membership_plans FOR ALL USING (public.is_admin());
CREATE POLICY "Addons viewable by everyone" ON public.addons FOR SELECT USING (true);
CREATE POLICY "Admins manage addons" ON public.addons FOR ALL USING (public.is_admin());

-- Trainers Policies (Publicly viewable, admin editable)
CREATE POLICY "Trainers viewable by everyone" ON public.trainers FOR SELECT USING (true);
CREATE POLICY "Admins manage trainers" ON public.trainers FOR ALL USING (public.is_admin());

-- Memberships Policies
CREATE POLICY "Members view own membership" ON public.memberships FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admins and user insert memberships" ON public.memberships FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admins manage memberships" ON public.memberships FOR ALL USING (public.is_admin());

-- Payments Policies
CREATE POLICY "Members view own payments" ON public.payments FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Members and Admins insert payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admins manage payments" ON public.payments FOR ALL USING (public.is_admin());

-- Attendance Policies
CREATE POLICY "Members view own attendance" ON public.attendance FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Admins manage attendance" ON public.attendance FOR ALL USING (public.is_admin());

-- Workout & Diet Policies
CREATE POLICY "Members view own workout" ON public.workout_plans FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL OR public.is_admin());
CREATE POLICY "Members view own diet" ON public.diet_plans FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL OR public.is_admin());
CREATE POLICY "Admins manage workouts" ON public.workout_plans FOR ALL USING (public.is_admin());
CREATE POLICY "Admins manage diets" ON public.diet_plans FOR ALL USING (public.is_admin());

-- Initial Seed Data
INSERT INTO public.membership_plans (name, price, duration, duration_months, description, features, popular, active) VALUES
('Basic Plan', 799, '3 Months', 3, 'Essential access for focused training and workout charts.', ARRAY['Full Gym Floor Access', 'Locker Room & Showers', 'Workout Chart Included', 'Standard Equipment Access'], false, true),
('Premium Plan', 1499, '6 Months', 6, 'Our most popular comprehensive fitness and diet coaching regimen.', ARRAY['Full Gym Floor Access', 'Locker Room & Showers', 'Custom Diet Chart Included', '1 Free Trainer Consultation', 'Recovery Lounge Access'], true, true),
('Platinum Plan', 2799, '1 Year', 12, 'The ultimate elite performance membership with all charts and VIP perks.', ARRAY['Unlimited All-Zone Access', 'Workout + Diet Chart Included', '2 Personal Training Sessions', 'Priority Slot Booking', 'Free Guest Pass Every Month', 'Steam & Recovery Access'], false, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.addons (name, price, description, active) VALUES
('Admission Fee', 300, 'One-time club registration and member kit onboarding.', true),
('Workout Chart', 200, 'Tailored multi-phase resistance & cardio program chart.', true),
('Diet Chart', 300, 'Personalized macronutrient & meal schedule formulated by coaches.', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.trainers (name, specialization, experience, image, bio, programs, active, instagram) VALUES
('Mohan Raj', 'Head Strength Coach & Master Trainer', '12+ Years', 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80', 'Founder of Mohan Gym with over a decade of shaping national physique competitors and elite powerlifters.', ARRAY['Strength Sculpt', 'Hypertrophy Mastery'], true, '@mohan_fitness'),
('Kavitha Selvan', 'Conditioning & Functional Mobility', '7+ Years', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80', 'Specializes in high-intensity conditioning, posture realignment, and athletic agility protocols.', ARRAY['Athletic Burn', 'Mobility Reset'], true, '@kavitha_trains'),
('Vikram Sengupta', 'Body Transformation & Nutrition Specialist', '9+ Years', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80', 'Expert in customized contest prep, metabolic conditioning, and lean muscle mass acceleration.', ARRAY['Lean Physique', 'Powerlifting Block'], true, '@vikram_iron')
ON CONFLICT DO NOTHING;
