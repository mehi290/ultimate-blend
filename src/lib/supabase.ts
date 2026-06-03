import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Safely initialize Supabase client or fall back to a mock Proxy client to prevent runtime crashes
export const supabase = (() => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "Supabase credentials missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file. The application is running in local mock mode."
    );
    
    // Return a dummy proxy object that resolves gracefully instead of throwing errors
    return new Proxy({} as any, {
      get(target, prop) {
        if (prop === "auth") {
          return {
            getSession: async () => ({ data: { session: null }, error: null }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
            signInWithPassword: async () => ({ data: { user: null }, error: new Error("Mock database active") }),
            signOut: async () => ({ error: null })
          };
        }
        if (prop === "storage") {
          return {
            from: () => ({
              upload: async () => ({ data: null, error: new Error("Mock database active") }),
              getPublicUrl: () => ({ data: { publicUrl: "" } })
            })
          };
        }
        // DB queries chain builder mock
        const chain = {
          select: () => chain,
          eq: () => chain,
          neq: () => chain,
          limit: () => chain,
          order: () => chain,
          filter: () => chain,
          maybeSingle: async () => ({ data: null, error: null }),
          single: async () => ({ data: null, error: null }),
          insert: () => chain,
          update: () => chain,
          delete: () => chain,
          then: (resolve: any) => resolve({ data: [], error: null })
        };
        return () => chain;
      }
    });
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
})();
