import { supabase } from '@/integrations/supabase/client';

// Add new job
export const postJobs = async job => {
  const { data, error } = await supabase.from('jobs').insert(job);
  if (error) {
    throw new Error(error.message);
  }
  return { data };
};
