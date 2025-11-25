// lib/supabase.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://ldygtnxdwsbjlbddypxw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkeWd0bnhkd3NiamxiZGR5cHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MjQyNDUsImV4cCI6MjA3MDUwMDI0NX0.aXbOsrK6h0NN-QBCLWRfQPMoOWQvhwRIwpdSR4PYYrE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
