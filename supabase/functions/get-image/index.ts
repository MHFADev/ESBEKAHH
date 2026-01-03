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
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      throw new Error('Image ID is required');
    }

    const sql = postgres(DATABASE_URL);

    const result = await sql`
      SELECT original_data
      FROM archives
      WHERE id = ${id}
      LIMIT 1
    `;

    await sql.end();

    if (result.length === 0) {
      throw new Error('Image not found');
    }

    const imageData = result[0].original_data;
    const base64Data = btoa(String.fromCharCode(...new Uint8Array(imageData)));

    return new Response(
      JSON.stringify({ 
        success: true, 
        url: `data:image/jpeg;base64,${base64Data}`
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Get image error:", error);
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
