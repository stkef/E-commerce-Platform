import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fimvyfdsmhhncztfrtyw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpbXZ5ZmRzbWhobmN6dGZydHl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NDI3MzUsImV4cCI6MjA1ODMxODczNX0.DOLCA0oy42ceOcFdsEb5qv3o6_9GNzA9DtSHHCPmLbA';

export const supabase = createClient(supabaseUrl, supabaseKey);
