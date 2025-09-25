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
  const { data, error } = await supabase.from('leads').insert(lead);
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
export const fetchLeads = async () => {
  const { data, error } = await supabase.from('leads').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
