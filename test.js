import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://yubiasbddygtuhxsgckv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1Ymlhc2JkZHlndHVoeHNnY2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzNTQzNDEsImV4cCI6MjA5OTkzMDM0MX0.P2kcQ0oAzLMk5SM3zT0ndJCJQzEyMVGK_mMtoHqbsDg";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log("Testing Supabase auth...");
  const { data, error } = await supabase.auth.signUp({
  console.log("Updating profile...");
  const { error: profileError } = await supabase
    .from('profiles')
    .update(profileUpdates)
    .eq('id', data.user.id);
    
  if (profileError) {
    console.error("Profile Update Error:", profileError);
  } else {
    console.log("Profile Update Success!");
    
    // Fetch profile to verify
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single();
    console.log("Fetched Profile:", profile);
  }
}

test();
