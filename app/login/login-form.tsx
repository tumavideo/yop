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

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <button onClick={handleSignOut}>Sign out</button>
  ) : (
    <>
      <form
        onSubmit={handleSubmit(async (data: any) => {
          // await new Promise((resolve) => setTimeout(resolve, 2000));
          const { email, password } = data;

          await supabase.auth.signInWithPassword({
            email,
            password,
          });
          router.replace("/");
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

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-75"
            disabled={isSubmitting}
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
}
