import RegisterForm from "./register-form";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import assets from "@/assets";
import type { Database } from "@/lib/database.types";
import GoogleLoginButton from "../login/google-login-button";

export default async function Login({ searchParams: { type } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                src={assets.officialLogo.src}
                alt="logo"
                className="mx-auto h-20 w-auto"
              />
              <h2 className="mt-10 text-3xl text-center font-bold leading-9 tracking-tight text-gray-900">
                Sign up to start your journey
              </h2>
            </div>
            <div className="mt-10 flex justify-center">
            <GoogleLoginButton>
                Sign up with Google
            </GoogleLoginButton >
            </div>
            <p className="my-5 font-bold text-slate-500 text-center">or</p>
            <div className="mt-10">
              <div>
                <RegisterForm session={session} type={type} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
