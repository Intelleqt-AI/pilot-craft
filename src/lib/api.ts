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
