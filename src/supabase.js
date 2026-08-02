import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wzpbymyvkxivjgysgvvf.supabase.co";
const supabaseAnonKey = "sb_publishable_ukJXBjUBnAx9dRytd7ZHAQ_nPatNRMM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
