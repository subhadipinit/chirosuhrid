import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lkugausdmubnluspvpgr.supabase.co";
const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrdWdhdXNkbXVibmx1c3B2cGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5NjMwMjcsImV4cCI6MjEwNzUzOTAyN30.rU0KLFJG-QToKaWabca19qqSUK6J6aj7Ucg-sMyPnqc";

const supabase = createClient(supabaseUrl, anonKey);

const tables = [
  "stories",
  "gallery",
  "programs",
  "impact_stats",
  "testimonials",
  "hero_slides",
  "site_settings",
  "inquiries",
];

async function checkAll() {
  console.log("=== SUPABASE DATABASE STATUS CHECK ===");
  console.log("Project URL:", supabaseUrl);
  console.log("Checking tables...");

  const results = {};
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select("*").limit(1);
      if (error) {
        results[table] = { status: "NOT FOUND / NEEDS MIGRATION", error: error.message };
      } else {
        results[table] = { status: "ACTIVE ✅", rows: data?.length };
      }
    } catch (e) {
      results[table] = { status: "ERROR", error: e.message };
    }
  }

  console.table(results);
}

checkAll();
