"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Session } from "@supabase/auth-helpers-nextjs";
import { TextField } from "../auth/input";

const loginValueSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(50),
});

type LoginValues = z.infer<typeof loginValueSchema>;

export default function LoginForm({ session }: { session: Session | null }) {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginValueSchema),
  });

  const pushReferrer = () => {
    const origin = document.location.origin;
    const referrer = document.referrer;
    let route = "/";
    if (referrer.startsWith(origin)) {
      route = referrer.replace(origin, "");
      router.push(route);
    } else {
      router.push(route);
    }
  };

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <button
      className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-75"
      onClick={handleSignOut}
    >
      Sign out
    </button>
  ) : (
    <>
      <form
        onSubmit={handleSubmit(async (data: any) => {
          const { email, password } = data;
          await supabase.auth.signInWithPassword({
            email,
            password,
          });
          pushReferrer();
        })}
        className="space-y-6"
        noValidate
      >
        <TextField
          {...register("email")}
          label="Email address"
          error={errors.email?.message}
        />

        <TextField
          {...register("password")}
          type="password"
          label="Password"
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600"
            />
            <label
              htmlFor="remember-me"
              className="ml-3 block text-sm leading-6 text-gray-700"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm leading-6">
            <a
              href="/login/forgot-password"
              className="font-semibold text-red-600 hover:text-red-500"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-75"
            disabled={isSubmitting}
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
}
