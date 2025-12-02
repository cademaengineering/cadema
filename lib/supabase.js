// lib/supabase.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://ohffktlhjzmyicwvongh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oZmZrdGxoanpteWljd3ZvbmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzgwMjAsImV4cCI6MjA3OTQxNDAyMH0.xf7tWdrENCXZ14r8_lRNkNjc7k9dAZwnTULJCYM2Tbg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
