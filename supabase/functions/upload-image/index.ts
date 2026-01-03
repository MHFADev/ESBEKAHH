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
    const formData = await req.json();
    const { id, name, description, fileName, virtualPath, clearanceLevel, thumbnailData, originalData } = formData;

    // Convert base64 to binary
    const thumbnailBuffer = Uint8Array.from(atob(thumbnailData.split(',')[1]), c => c.charCodeAt(0));
    const originalBuffer = Uint8Array.from(atob(originalData.split(',')[1]), c => c.charCodeAt(0));

    const sql = postgres(DATABASE_URL);

    await sql`
      INSERT INTO archives (
        id, name, description, file_name, virtual_path, clearance_level, thumbnail_data, original_data, timestamp
      ) VALUES (
        ${id}, ${name}, ${description}, ${fileName}, ${virtualPath}, ${clearanceLevel}, ${thumbnailBuffer}, ${originalBuffer}, NOW()
      )
    `;

    await sql.end();

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Image uploaded successfully",
        id 
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Upload error:", error);
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
