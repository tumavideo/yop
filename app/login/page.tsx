import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import assets from "@/assets";
import type { Database } from "@/lib/database.types";
import LoginForm from "./login-form";
import Adsense from "@/components/Adsense";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={assets.officialLogo.src}
            alt="logo"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm session={session} />

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-red-600 hover:text-red-500"
            >
              Join Now
            </a>
          </p>
        </div>

        <div className="mt-10 md:w-1/3 container mx-auto">
          <Adsense type="leaderboard-1"/>
        </div>
      </div>
    </>
  );
}
