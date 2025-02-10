
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { corsHeaders } from "./cors.ts";

export interface AuthUser {
  id: string;
  email?: string;
  role?: string;
}

export async function requireAuth(req: Request): Promise<AuthUser> {
  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { 
        auth: {
          persistSession: false
        }
      }
    );

    // Get auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    // Get user from auth header
    const { data: { user }, error } = await supabaseClient.auth.getUser(authHeader);
    
    if (error || !user) {
      throw error || new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role
    };
  } catch (error) {
    throw new Error(`Auth failed: ${error.message}`);
  }
}

export function handleAuthError(error: Error): Response {
  console.error('Authentication error:', error);
  return new Response(
    JSON.stringify({
      error: 'Unauthorized',
      message: error.message
    }),
    {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    }
  );
}
