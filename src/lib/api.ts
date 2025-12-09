import { supabase } from '@/integrations/supabase/client';

// Add new job
export const postJobs = async job => {
  const { data, error } = await supabase.from('jobs').insert(job);
  if (error) {
    throw new Error(error.message);
  }
  return { data };
};

// Add new lead
export const postLeads = async lead => {
  const { data, error } = await supabase.from('leads').insert([lead]);
  if (error) {
    throw new Error(error.message);
  }
  return { data };
};

// Add new lead
export const modifyLeads = async lead => {
  const { data, error } = await supabase.from('leads').update(lead).eq('id', lead.id);
  if (error) {
    throw new Error(error.message);
  }
  return { data };
};

// Fetch jobs
export const fetchJobs = async () => {
  const { data, error } = await supabase.from('jobs').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Fetch leads
// export const fetchLeads = async () => {
//   const { data, error } = await supabase.from('leads').select('*');

//   if (error) {
//     throw new Error(error.message);
//   }
//   return data;
// };
export const fetchLeads = async () => {
  const { data, error } = await supabase.from('leads').select(`
      *,
      bids(*, 
      bidder:bid_by (
         *
        ))
    `);
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// add bids
export const addBids = async ({ updates }) => {
  const { data, error } = await supabase.from('bids').insert(updates);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// modify bids
export const modifyBids = async updates => {
  const { data, error } = await supabase.from('bids').update(updates).eq('id', updates.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Update job status
export const updateJobStatus = async ({ jobId, status }) => {
  const { data, error } = await supabase.from('jobs').update({ status }).eq('id', jobId);
  if (error) {
    throw new Error(error.message);
  }
  return { data };
};

// Blog API

const API_URL = 'https://reassuring-paradise-02bc2fb070.strapiapp.com';

// Fetch All Article
export async function fetchArticles() {
  try {
    const response = await fetch(`${API_URL}/api/articles?populate=*&filters[Site][$eq]=tradepilot&pagination[pageSize]=100`, {});

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }
    const result = await response.json();
    console.log('API response structure:', Object.keys(result));

    return result;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { data: [] };
  }
}

// Fetch article by slug
export async function fetchArticleBySlug(slug) {
  try {
    if (!slug) {
      console.warn('fetchArticleBySlug called with empty/undefined slug:', slug);
      return null;
    }
    // First attempt: Try to find by slug
    let response = await fetch(`${API_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*&sort=updatedAt:desc`, {});

    let result = await response.json();
    if (!result.data || result.data.length === 0) {
      const possibleId = parseInt(slug, 10);

      if (!isNaN(possibleId)) {
        response = await fetch(`${API_URL}/api/articles?filters[id][$eq]=${possibleId}&populate=*&sort=updatedAt:desc`, {
          cache: 'no-store',
        });

        if (response.ok) {
          result = await response.json();
          return result.data && result.data.length > 0 ? result.data[0] : null;
        }
      }
      return null;
    }
    return result.data[0];
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Fetch Author Info
export async function fetchAuthors() {
  try {
    const response = await fetch(`${API_URL}/api/authors?populate=*`, {});

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }
    const result = await response.json();
    console.log('API response structure:', Object.keys(result));

    return result;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return { data: [] };
  }
}

export const addPurchase = async ({ lead, userID }) => {
  const { data: profile, error: fetchError } = await supabase.from('profiles').select('leads').eq('id', userID).single();

  if (fetchError) {
    throw new Error(fetchError.message);
  }

  // Create or update the leads array
  const currentLeads = profile.leads || [];
  const updatedLeads = [...currentLeads, lead];

  // Update the profiles table with the new leads array
  const { data: profileData, error: profileError } = await supabase.from('profiles').update({ leads: updatedLeads }).eq('id', userID);

  if (profileError) {
    throw new Error(profileError.message);
  }

  return {
    data: {
      profile: profileData,
    },
  };
};
