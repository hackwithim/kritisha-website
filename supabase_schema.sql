-- KRITISHA INFRASTRUCTURE DATABASE SCHEMA FOR SUPABASE / POSTGRESQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (ADMIN / USER ROLES)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('superadmin', 'admin', 'editor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. HOMEPAGE STATS
CREATE TABLE IF NOT EXISTS public.homepage_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stat_value TEXT NOT NULL,
    stat_label TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. CAPABILITIES
CREATE TABLE IF NOT EXISTS public.capabilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    image_url TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Layers',
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL DEFAULT 'Operations',
    short_description TEXT NOT NULL,
    full_description TEXT,
    image_url TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Briefcase',
    display_order INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. SERVICE FEATURES
CREATE TABLE IF NOT EXISTS public.service_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    feature_title TEXT NOT NULL,
    feature_desc TEXT,
    display_order INT DEFAULT 0
);

-- 6. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT,
    short_description TEXT NOT NULL,
    full_description TEXT,
    location TEXT NOT NULL,
    total_length TEXT,
    lanes TEXT,
    scope TEXT,
    featured_image TEXT NOT NULL,
    video_url TEXT,
    is_featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'Completed' CHECK (status IN ('Completed', 'Ongoing', 'Planned')),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. PROJECT METRICS
CREATE TABLE IF NOT EXISTS public.project_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    metric_label TEXT NOT NULL,
    metric_value TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- 8. PROJECT IMAGES / GALLERY
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    display_order INT DEFAULT 0
);

-- 9. LEADERSHIP DIRECTORS & EXECUTIVE OFFICERS
CREATE TABLE IF NOT EXISTS public.leadership (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    bio TEXT,
    image_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true
);

-- 10. CAREERS (JOB OPENINGS)
CREATE TABLE IF NOT EXISTS public.careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    employment_type TEXT DEFAULT 'Full-time',
    short_description TEXT NOT NULL,
    responsibilities TEXT[],
    requirements TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. CAREER APPLICATIONS
CREATE TABLE IF NOT EXISTS public.career_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    career_id UUID REFERENCES public.careers(id) ON DELETE SET NULL,
    applicant_name TEXT NOT NULL,
    applicant_email TEXT NOT NULL,
    applicant_phone TEXT NOT NULL,
    position_applied TEXT NOT NULL,
    resume_url TEXT,
    message TEXT,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Reviewing', 'Shortlisted', 'Rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. ENQUIRIES
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    service_interest TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Contacted', 'Archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. GALLERY / MEDIA ASSETS
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT DEFAULT 'Infrastructure',
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. SITE SETTINGS & SEO METADATA
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read stats" ON public.homepage_stats FOR SELECT USING (true);
CREATE POLICY "Public read capabilities" ON public.capabilities FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Public read leadership" ON public.leadership FOR SELECT USING (true);
CREATE POLICY "Public read careers" ON public.careers FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);

-- Public insert policies for forms
CREATE POLICY "Public create enquiry" ON public.enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public create career application" ON public.career_applications FOR INSERT WITH CHECK (true);

-- Admin full access policies (Authenticated users with admin role)
CREATE POLICY "Admin full access enquiries" ON public.enquiries FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access applications" ON public.career_applications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access capabilities" ON public.capabilities FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access leadership" ON public.leadership FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access careers" ON public.careers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access gallery" ON public.gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
