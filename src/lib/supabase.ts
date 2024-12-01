import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://svqrzerfjudcxrwsrymn.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2cXJ6ZXJmanVkY3hyd3NyeW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyMzQwMTAsImV4cCI6MjA0NzgxMDAxMH0.eI76Ytb5_nHtvGDBanpWi8xFqJWea9DLaekUC5Mett0';

export const supabase = createClient(supabaseUrl, supabaseKey);
