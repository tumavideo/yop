import RegisterForm from "./register-form";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import assets from "@/assets";
import type { Database } from "@/lib/database.types";

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
                src={assets.logo.src}
                alt="logo"
                className="mx-auto h-20 w-auto"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up to start your journey
              </h2>
            </div>

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
