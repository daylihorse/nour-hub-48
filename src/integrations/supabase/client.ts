// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ueexajiuyryoouzbnqna.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlZXhhaml1eXJ5b291emJucW5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NzUxNTYsImV4cCI6MjA2NTA1MTE1Nn0.7ET5IOSBHC_SiuUVrAv0ZDpmbIkCJkSxlUE8G54dfYc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);