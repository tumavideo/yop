import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import assets from "@/assets";
import Adsense from "@/components/Adsense";
import type { Database } from "@/lib/database.types";
import { redirect } from "next/navigation";
import GoogleLoginButton from "./google-login-button";
import LoginForm from "./login-form";

const Header = ({ title = "Sign in to your account", link = "" }) => (
  <>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        src={assets.officialLogo.src}
        alt="logo"
        className="mx-auto h-20 w-auto"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {link && <a href={link}>{title}</a>}
      </h2>
    </div>
  </>
);

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect("/");
  return (
    <>
      <div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            src={assets.officialLogo.src}
            alt="logo"
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 flex justify-center">
          <GoogleLoginButton>Sign in with Google</GoogleLoginButton>
        </div>
        <p className="my-5 font-bold text-slate-500 text-center">or</p>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm session={session} />

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-red-600 hover:text-red-500"
            >
              Sign Up
            </a>
          </p>
        </div>

        <div className="mt-10 md:w-1/3 container mx-auto">
          <Adsense type="leaderboard-1" />
        </div>
      </div>
    </>
  );
}
