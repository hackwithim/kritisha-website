import { useState, useEffect } from 'react';
import { 
  INITIAL_SITE_SETTINGS, 
  INITIAL_HOMEPAGE_STATS, 
  INITIAL_CAPABILITIES, 
  INITIAL_SERVICES, 
  INITIAL_PROJECTS, 
  INITIAL_LEADERSHIP, 
  INITIAL_CAREERS, 
  INITIAL_ENQUIRIES, 
  INITIAL_APPLICATIONS,
  INITIAL_INSIGHTS,
  INITIAL_TOLL_PLAZAS
} from './mockData';

const STORAGE_KEYS = {
  SETTINGS: 'kritisha_v3_site_settings',
  STATS: 'kritisha_v3_stats',
  CAPABILITIES: 'kritisha_v3_capabilities',
  SERVICES: 'kritisha_v3_services',
  PROJECTS: 'kritisha_v3_projects',
  LEADERSHIP: 'kritisha_v3_leadership',
  CAREERS: 'kritisha_v3_careers',
  INSIGHTS: 'kritisha_v3_insights',
  ENQUIRIES: 'kritisha_v3_enquiries',
  APPLICATIONS: 'kritisha_v3_applications',
  TOLL_PLAZAS: 'kritisha_v3_toll_plazas',
  AUTH: 'kritisha_v3_admin_auth',
  ADMIN_PROFILE: 'kritisha_v3_admin_profile'
};

// Image Compressor Utility to prevent localStorage QuotaExceededErrors
export function compressImageFile(file, maxWidth = 1000, maxHeight = 1000, quality = 0.8) {
  return new Promise((resolve) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      resolve(null);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = () => resolve(event.target.result);
    };
    reader.onerror = () => resolve(null);
  });
}

function loadStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error(`Error loading ${key} from storage:`, e);
  }
  return fallback;
}

function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('kritisha_cms_updated'));
      if ('BroadcastChannel' in window) {
        try {
          const channel = new BroadcastChannel('kritisha_cms_channel');
          channel.postMessage({ type: 'CMS_UPDATED', key, timestamp: Date.now() });
          channel.close();
        } catch (err) {
          // ignore BroadcastChannel errors in legacy browsers
        }
      }
    }
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
    if (e.name === 'QuotaExceededError' || e.code === 22) {
      alert('Browser storage space limit reached! Please clear unnecessary images or reset data.');
    }
  }
}

// React Custom Hook for Live Real-Time Dynamic CMS Synchronization across Tabs & Windows
export function useCmsLiveStore(getterFn) {
  const [data, setData] = useState(() => getterFn());

  useEffect(() => {
    const handleUpdate = () => {
      setData(getterFn());
    };

    window.addEventListener('kritisha_cms_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    let bc = null;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        bc = new BroadcastChannel('kritisha_cms_channel');
        bc.onmessage = () => {
          setData(getterFn());
        };
      } catch (err) {
        // ignore fallback
      }
    }

    return () => {
      window.removeEventListener('kritisha_cms_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      if (bc) bc.close();
    };
  }, [getterFn]);

  return data;
}

// ----------------------------------------------------------------------
// SITE SETTINGS & HERO CONTENT
// ----------------------------------------------------------------------
export const getSiteSettings = () => {
  const settings = loadStorage(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
  if (!settings.logo || settings.logo.includes('photo-1618005182384')) {
    settings.logo = '/logo.svg';
  }
  if (!settings.company_name || settings.company_name.includes('KCC')) {
    settings.company_name = 'KRITISHA Infrastructure Private Limited';
  }
  if (settings.email && settings.email.includes('kccgroup')) {
    settings.email = 'admin@kritishainfra.com';
  }
  return settings;
};
export const saveSiteSettings = (settings) => {
  saveStorage(STORAGE_KEYS.SETTINGS, settings);
  return settings;
};

export const getHomepageStats = () => {
  const stored = loadStorage(STORAGE_KEYS.STATS, INITIAL_HOMEPAGE_STATS);
  if (Array.isArray(stored)) {
    return stored.map(s => {
      if (s.stat_value && s.stat_value.includes("340")) {
        return { ...s, stat_value: "40+", stat_label: "Years of Excellence" };
      }
      return s;
    });
  }
  return INITIAL_HOMEPAGE_STATS;
};
export const saveHomepageStats = (stats) => {
  saveStorage(STORAGE_KEYS.STATS, stats);
  return stats;
};

// ----------------------------------------------------------------------
// SERVICES
// ----------------------------------------------------------------------
export const getServices = () => {
  const stored = loadStorage(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  if (Array.isArray(stored) && stored.length > 0) {
    const hasAirportOps = stored.some(s => (s.title || '').includes("Airport Operations"));
    if (!hasAirportOps) {
      saveServices(INITIAL_SERVICES);
      return INITIAL_SERVICES;
    }
    return stored.map((item, idx) => {
      const match = INITIAL_SERVICES.find(i => (i.title || '').toLowerCase() === (item.title || '').toLowerCase() || i.id === item.id) || INITIAL_SERVICES[idx] || {};
      return {
        ...match,
        ...item,
        title: item.title || match.title,
        features: item.features || match.features || []
      };
    });
  }
  return INITIAL_SERVICES;
};
export const saveServices = (services) => saveStorage(STORAGE_KEYS.SERVICES, services);

export const getServiceBySlug = (slug) => {
  const all = getServices();
  return all.find(item => item.slug === slug) || null;
};

export const addService = (service) => {
  const current = getServices();
  const newSrv = {
    id: `srv-${Date.now()}`,
    slug: service.slug || service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    is_featured: true,
    image_url: service.image_url || '/images/hero_expertise.jpg',
    icon_name: service.icon_name || 'Building2',
    ...service
  };
  const updated = [newSrv, ...current];
  saveServices(updated);
  return updated;
};

export const updateService = (id, updatedFields) => {
  const current = getServices();
  const updated = current.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  saveServices(updated);
  return updated;
};

export const deleteService = (id) => {
  const current = getServices();
  const updated = current.filter(item => item.id !== id);
  saveServices(updated);
  return updated;
};

// ----------------------------------------------------------------------
// PROJECTS
// ----------------------------------------------------------------------
export const getProjects = () => {
  const stored = loadStorage(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  if (Array.isArray(stored) && stored.length > 0) {
    const hasHaivargaon = stored.some(p => (p.title || '').includes("Haivargaon"));
    if (!hasHaivargaon) {
      saveProjects(INITIAL_PROJECTS);
      return INITIAL_PROJECTS;
    }
  }
  return stored || INITIAL_PROJECTS;
};
export const saveProjects = (projects) => saveStorage(STORAGE_KEYS.PROJECTS, projects);

export const addProject = (project) => {
  const current = getProjects();
  const newProj = {
    id: `proj-${Date.now()}`,
    slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    featured_image: project.featured_image || '/images/hero_work.jpg',
    is_featured: true,
    status: project.status || 'Active Operational',
    metrics: project.metrics || [],
    gallery: project.gallery || ['/images/hero_work.jpg'],
    ...project
  };
  const updated = [newProj, ...current];
  saveProjects(updated);
  return updated;
};

export const updateProject = (id, updatedFields) => {
  const current = getProjects();
  const updated = current.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  saveProjects(updated);
  return updated;
};

export const deleteProject = (id) => {
  const current = getProjects();
  const updated = current.filter(item => item.id !== id);
  saveProjects(updated);
  return updated;
};

// ----------------------------------------------------------------------
// TOLL PLAZAS OPERATIONAL DIRECTORY
// ----------------------------------------------------------------------
export const getTollPlazas = () => {
  const stored = loadStorage(STORAGE_KEYS.TOLL_PLAZAS, INITIAL_TOLL_PLAZAS);
  if (Array.isArray(stored)) {
    return stored.map(item => {
      const match = INITIAL_TOLL_PLAZAS.find(i => i.id === item.id);
      return {
        city: item.city || match?.city || '',
        ...item
      };
    });
  }
  return INITIAL_TOLL_PLAZAS;
};
export const saveTollPlazas = (plazas) => saveStorage(STORAGE_KEYS.TOLL_PLAZAS, plazas);

export const addTollPlaza = (plaza) => {
  const current = getTollPlazas();
  const newPlaza = {
    id: `toll-${Date.now()}`,
    consortium: plaza.consortium || "M/s Preetee Builders",
    status: plaza.status || "Ongoing",
    contract_value: Number(plaza.contract_value) || 0,
    ...plaza
  };
  const updated = [newPlaza, ...current];
  saveTollPlazas(updated);
  return updated;
};

export const updateTollPlaza = (id, updatedFields) => {
  const current = getTollPlazas();
  const updated = current.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  saveTollPlazas(updated);
  return updated;
};

export const deleteTollPlaza = (id) => {
  const current = getTollPlazas();
  const updated = current.filter(item => item.id !== id);
  saveTollPlazas(updated);
  return updated;
};

// ----------------------------------------------------------------------
// INSIGHTS
// ----------------------------------------------------------------------
export const getInsights = () => {
  const stored = loadStorage(STORAGE_KEYS.INSIGHTS, INITIAL_INSIGHTS);
  if (Array.isArray(stored)) {
    return stored.map((item, idx) => {
      const match = INITIAL_INSIGHTS.find(i => i.id === item.id) || INITIAL_INSIGHTS[idx] || {};
      let img = item.cover_image || item.featured_image || match.cover_image || match.featured_image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80';
      if (img.includes('photo-1541888946425')) {
        img = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80';
      }
      const authorName = typeof item.author === 'string' ? item.author : (item.author?.name || match.author || 'KRITISHA Editorial Team');
      return {
        ...match,
        ...item,
        cover_image: img,
        featured_image: img,
        author: authorName,
        excerpt: item.excerpt || match.excerpt || ''
      };
    });
  }
  return INITIAL_INSIGHTS;
};

export const saveInsights = (insights) => saveStorage(STORAGE_KEYS.INSIGHTS, insights);

export const getInsightBySlug = (slug) => {
  const all = getInsights();
  return all.find(item => item.slug === slug) || null;
};

export const addInsight = (insight) => {
  const current = getInsights();
  const img = insight.cover_image || insight.featured_image || '/images/hero_insights.jpg';
  const newInst = {
    id: `ins-${Date.now()}`,
    slug: insight.slug || insight.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    publish_date: insight.publish_date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    read_time: insight.read_time || '5 min read',
    is_featured: Boolean(insight.featured || insight.is_featured),
    cover_image: img,
    featured_image: img,
    author: typeof insight.author === 'string' ? insight.author : (insight.author?.name || 'KRITISHA Editorial Team'),
    excerpt: insight.excerpt || '',
    content: insight.content || '',
    ...insight
  };
  const updated = [newInst, ...current];
  saveInsights(updated);
  return updated;
};

export const updateInsight = (id, updatedFields) => {
  const current = getInsights();
  const targetId = typeof id === 'object' ? id.id : id;
  const fields = typeof id === 'object' ? id : updatedFields;
  const updated = current.map(item => item.id === targetId ? { ...item, ...fields } : item);
  saveInsights(updated);
  return updated;
};

export const deleteInsight = (id) => {
  const current = getInsights();
  const updated = current.filter(item => item.id !== id);
  saveInsights(updated);
  return updated;
};

// ----------------------------------------------------------------------
// CAPABILITIES
// ----------------------------------------------------------------------
export const getCapabilities = () => loadStorage(STORAGE_KEYS.CAPABILITIES, INITIAL_CAPABILITIES);
export const saveCapabilities = (caps) => saveStorage(STORAGE_KEYS.CAPABILITIES, caps);

export const addCapability = (cap) => {
  const current = getCapabilities();
  const newCap = {
    id: `cap-${Date.now()}`,
    slug: cap.slug || cap.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    image_url: cap.image_url || '/images/hero_expertise.jpg',
    display_order: current.length + 1,
    ...cap
  };
  const updated = [...current, newCap];
  saveCapabilities(updated);
  return updated;
};

export const updateCapability = (id, updatedFields) => {
  const current = getCapabilities();
  const updated = current.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  saveCapabilities(updated);
  return updated;
};

export const deleteCapability = (id) => {
  const current = getCapabilities();
  const updated = current.filter(item => item.id !== id);
  saveCapabilities(updated);
  return updated;
};

// ----------------------------------------------------------------------
// LEADERSHIP
// ----------------------------------------------------------------------
export const getLeadership = () => {
  const stored = loadStorage(STORAGE_KEYS.LEADERSHIP, INITIAL_LEADERSHIP);
  if (Array.isArray(stored) && stored.length > 0) {
    const firstIsVinod = stored[0]?.name?.includes("Vinod");
    if (!firstIsVinod) {
      saveLeadership(INITIAL_LEADERSHIP);
      return INITIAL_LEADERSHIP;
    }
    return stored.map((item, idx) => {
      const match = INITIAL_LEADERSHIP.find(i => i.name.toLowerCase() === (item.name || '').toLowerCase() || i.id === item.id) || INITIAL_LEADERSHIP[idx] || {};
      let img = item.image || item.image_url || match.image;
      if (!img || img.includes('unsplash.com')) {
        img = match.image || '/images/team/vinod-jadhav.jpg';
      }
      return {
        ...match,
        ...item,
        name: item.name || match.name,
        designation: item.designation || match.designation,
        bio: item.bio || match.bio,
        highlights: item.highlights || match.highlights || [],
        image: img
      };
    });
  }
  return INITIAL_LEADERSHIP;
};
export const saveLeadership = (lead) => saveStorage(STORAGE_KEYS.LEADERSHIP, lead);

export const addLeadership = (person) => {
  const current = getLeadership();
  const newPerson = {
    id: `lead-${Date.now()}`,
    image: person.image || '/images/hero_about.jpg',
    ...person
  };
  const updated = [...current, newPerson];
  saveLeadership(updated);
  return updated;
};

export const updateLeadership = (id, updatedFields) => {
  const current = getLeadership();
  const updated = current.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  saveLeadership(updated);
  return updated;
};

export const deleteLeadership = (id) => {
  const current = getLeadership();
  const updated = current.filter(item => item.id !== id);
  saveLeadership(updated);
  return updated;
};

// ----------------------------------------------------------------------
// CAREERS
// ----------------------------------------------------------------------
export const getCareers = () => loadStorage(STORAGE_KEYS.CAREERS, INITIAL_CAREERS);
export const saveCareers = (careers) => saveStorage(STORAGE_KEYS.CAREERS, careers);
export const addCareer = (career) => {
  const current = getCareers();
  const newCareer = {
    id: `car-${Date.now()}`,
    status: 'Open',
    is_featured: false,
    created_at: new Date().toISOString(),
    responsibilities: career.responsibilities || ['Oversee day-to-day site operations'],
    requirements: career.requirements || ['Degree/Diploma in Engineering', 'Relevant experience'],
    ...career
  };
  const updated = [newCareer, ...current];
  saveCareers(updated);
  return updated;
};

export const updateCareer = (career) => {
  const current = getCareers();
  const updated = current.map(item => item.id === career.id ? { ...item, ...career } : item);
  saveCareers(updated);
  return updated;
};

export const deleteCareer = (id) => {
  const current = getCareers();
  const updated = current.filter(item => item.id !== id);
  saveCareers(updated);
  return updated;
};

// ----------------------------------------------------------------------
// ENQUIRIES & APPLICATIONS
// ----------------------------------------------------------------------
export const getEnquiries = () => loadStorage(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
export const addEnquiry = (enquiry) => {
  const current = getEnquiries();
  const newEnq = {
    id: `enq-${Date.now()}`,
    status: 'New',
    created_at: new Date().toISOString(),
    ...enquiry
  };
  const updated = [newEnq, ...current];
  saveStorage(STORAGE_KEYS.ENQUIRIES, updated);

  // Trigger Email Notification to Admin Gmail
  try {
    import('./emailService').then(({ sendEnquiryEmailNotification }) => {
      sendEnquiryEmailNotification(newEnq);
    });
  } catch (err) {
    console.error('Failed to trigger email notification:', err);
  }

  return newEnq;
};

export const updateEnquiryStatus = (id, newStatus) => {
  const current = getEnquiries();
  const updated = current.map(item => item.id === id ? { ...item, status: newStatus } : item);
  saveStorage(STORAGE_KEYS.ENQUIRIES, updated);
  return updated;
};

export const deleteEnquiry = (id) => {
  const current = getEnquiries();
  const updated = current.filter(item => item.id !== id);
  saveStorage(STORAGE_KEYS.ENQUIRIES, updated);
  return updated;
};

export const getApplications = () => loadStorage(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
export const addApplication = (appData) => {
  const current = getApplications();
  const newApp = {
    id: `app-${Date.now()}`,
    status: 'New',
    notes: '',
    created_at: new Date().toISOString(),
    ...appData
  };
  const updated = [newApp, ...current];
  saveStorage(STORAGE_KEYS.APPLICATIONS, updated);
  return newApp;
};

export const updateApplicationStatus = (id, status, notes = '') => {
  const current = getApplications();
  const updated = current.map(item => item.id === id ? { ...item, status, notes: notes || item.notes } : item);
  saveStorage(STORAGE_KEYS.APPLICATIONS, updated);
  return updated;
};

// RESET ALL TO DEFAULTS
export const resetAllDataToDefaults = () => {
  saveStorage(STORAGE_KEYS.SETTINGS, INITIAL_SITE_SETTINGS);
  saveStorage(STORAGE_KEYS.STATS, INITIAL_HOMEPAGE_STATS);
  saveStorage(STORAGE_KEYS.CAPABILITIES, INITIAL_CAPABILITIES);
  saveStorage(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
  saveStorage(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  saveStorage(STORAGE_KEYS.LEADERSHIP, INITIAL_LEADERSHIP);
  saveStorage(STORAGE_KEYS.CAREERS, INITIAL_CAREERS);
  saveStorage(STORAGE_KEYS.INSIGHTS, INITIAL_INSIGHTS);
  saveStorage(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
  saveStorage(STORAGE_KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  return true;
};

// ----------------------------------------------------------------------
// ADMIN AUTHENTICATION & PROFILE
// ----------------------------------------------------------------------
export const getAdminProfile = () => loadStorage(STORAGE_KEYS.ADMIN_PROFILE, {
  name: 'KRITISHA Admin',
  email: 'admin@kritishainfra.com',
  password: 'admin123',
  avatar: null
});

export const saveAdminProfile = (profile) => {
  saveStorage(STORAGE_KEYS.ADMIN_PROFILE, profile);
  // Also update current session if logged in
  const auth = getAdminAuth();
  if (auth.isAuthenticated) {
    auth.user = {
      ...auth.user,
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar
    };
    setAdminAuth(auth);
  }
};

export const getAdminAuth = () => loadStorage(STORAGE_KEYS.AUTH, { isAuthenticated: false, user: null });
export const setAdminAuth = (authData) => saveStorage(STORAGE_KEYS.AUTH, authData);

export const loginAdmin = (email, password) => {
  const profile = getAdminProfile();
  if (email === profile.email && password === profile.password) {
    const authState = {
      isAuthenticated: true,
      user: {
        email: profile.email,
        name: profile.name,
        role: 'Superadmin',
        avatar: profile.avatar
      }
    };
    setAdminAuth(authState);
    return { success: true, authState };
  }
  return { success: false, message: 'Invalid credentials.' };
};

export const logoutAdmin = () => {
  setAdminAuth({ isAuthenticated: false, user: null });
};
