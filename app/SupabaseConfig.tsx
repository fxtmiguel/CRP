import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://zdncagzbjoradxlfyidc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkbmNhZ3piam9yYWR4bGZ5aWRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTk4NjU2NCwiZXhwIjoyMDU1NTYyNTY0fQ.4se_-XUBwh23XN7xBG_wJlJ0He8pF0xIxhGlFo-Bt6c';
if (!supabaseKey) {
  throw new Error('SUPABASE_KEY is not defined');
}
const supabase = createClient(supabaseUrl, supabaseKey);
export { supabase };