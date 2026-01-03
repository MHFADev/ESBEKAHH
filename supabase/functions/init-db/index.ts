import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import postgres from "npm:postgres@3.4.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const DATABASE_URL = "postgresql://postgres:fZvfvjLlsgDtzFjHyKtuhadzFYZoQMmK@shortline.proxy.rlwy.net:49392/railway";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const sql = postgres(DATABASE_URL);

    // Create archives table
    await sql`
      CREATE TABLE IF NOT EXISTS archives (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        file_name TEXT NOT NULL,
        virtual_path TEXT NOT NULL,
        clearance_level TEXT NOT NULL,
        thumbnail_data BYTEA NOT NULL,
        original_data BYTEA NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `;

    // Create index for faster queries
    await sql`
      CREATE INDEX IF NOT EXISTS idx_archives_timestamp ON archives(timestamp DESC)
    `;

    await sql.end();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Database initialized successfully" 
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Database initialization error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
