import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = (): boolean => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (
    supabaseUrl.includes("placeholder-project-id") ||
    supabaseUrl.includes("your-project-id") ||
    supabaseAnonKey.includes("placeholder-anon-key") ||
    supabaseAnonKey.includes("your-anon-public-key")
  ) {
    return false;
  }
  return true;
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

/**
 * Upload an image file to Supabase Storage bucket 'suhrid-media'.
 * Returns public URL if successful, or null if Supabase is not configured or fails.
 */
export async function uploadMediaToSupabase(file: File): Promise<string | null> {
  if (!supabase || !isSupabaseConfigured()) {
    return null;
  }

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("suhrid-media")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return null;
    }

    const { data } = supabase.storage
      .from("suhrid-media")
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (err) {
    console.error("Failed to upload image to Supabase:", err);
    return null;
  }
}
