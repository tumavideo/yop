import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import type { Database, Referral } from "@/lib/database.types";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const provider = cookies().get('provider')
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    const {data:{user}, error} = await supabase.auth.getUser()

    if(provider.value === "google" && !error){
      const ref = cookies().get('ref') || null;
      const { data: refData, error: refError } = await supabase
      .from("referral")
      .select(`referral_code`)
      .eq("user_id", user?.id)
      .single();
        if(!refData){
          const newRef: Referral =  {
            referral_code: Math.random()
              .toString(36)
              .slice(2, 8)
              .toUpperCase(),
            user_id: user.id,
          }
          ref && (newRef.referrer_code = ref.value)
await supabase.from("referral").insert(newRef);
        }

    }  
  }

  return NextResponse.redirect(requestUrl.origin);
}
