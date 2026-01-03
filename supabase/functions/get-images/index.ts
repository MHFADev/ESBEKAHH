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

    const images = await sql`
      SELECT 
        id, 
        name, 
        description, 
        file_name, 
        virtual_path, 
        clearance_level, 
        thumbnail_data,
        timestamp
      FROM archives
      ORDER BY timestamp DESC
    `;

    // Convert binary data to base64 for thumbnails
    const formattedImages = images.map(img => ({
      id: img.id,
      name: img.name,
      description: img.description,
      fileName: img.file_name,
      virtualPath: img.virtual_path,
      clearanceLevel: img.clearance_level,
      timestamp: img.timestamp,
      thumbnailUrl: `data:image/jpeg;base64,${btoa(String.fromCharCode(...new Uint8Array(img.thumbnail_data)))}`,
      url: `placeholder`
    }));

    await sql.end();

    return new Response(
      JSON.stringify({ 
        success: true, 
        images: formattedImages 
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Get images error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        images: []
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
