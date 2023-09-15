import RegisterForm from "./register-form";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

export default async function Login({ searchParams: { type } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <div className="bg-white flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 order-last">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600"
                alt="Your Company"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign up to start your journey
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <RegisterForm session={session} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={
              type === "company"
                ? "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGFmcmljYW4lMjBjb21wYW55fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                : "https://images.unsplash.com/photo-1521790361543-f645cf042ec4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3269&q=80"
            }
            alt=""
          />
        </div>
      </div>
    </>
  );
}
