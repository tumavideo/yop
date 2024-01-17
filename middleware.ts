import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data, error } = await supabase.auth.getUser();
  if (!error) {
    if (!data.user.user_metadata?.resume) {
      return NextResponse.redirect(new URL("/onboarding?step=1", req.url));
    }
  } else {
    console.log(error.message);
  }
}
export const config = {
  matcher: [
    "/",
    "/profile",
    "/opportunity",
    "/opportunity/:path*",
    "/about",
    "/community",
    "/services",
  ],
};
