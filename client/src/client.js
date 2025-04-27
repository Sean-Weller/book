import { createClient } from '@supabase/supabase-js'

const URL = 'https://vyzkkjuxphxihdgdmgsd.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5emtranV4cGh4aWhkZ2RtZ3NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1OTA2MDYsImV4cCI6MjA2MDE2NjYwNn0.m3dmfuYFdBVOgkSWSI-xQh9snd81_aPojR0U9BrPU1E';

export const supabase = createClient(URL, API_KEY);