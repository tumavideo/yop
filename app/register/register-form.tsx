"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Session } from "@supabase/auth-helpers-nextjs";
import { TextField } from "../auth/input";

const signUpValueSchema = z
  .object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpValueSchema>;

export default function RegisterForm({ session }: { session: Session | null }) {
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
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpValueSchema),
  });

  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <button onClick={handleSignOut}>Sign out</button>
  ) : (
    <>
      <form
        onSubmit={handleSubmit(async (data: any) => {
          //   await new Promise((resolve) => setTimeout(resolve, 2000));
          //   console.log(data);
          const { email, name, password } = data;
          await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `https://yop-nsti-git-tailwind-refactor-zyop.vercel.app/auth/callback`,
            },
          });
          router.replace("/register/thanks");
        })}
        className="space-y-6"
        noValidate
      >
        <TextField
          {...register("name")}
          label="Full name"
          error={errors.name?.message}
        />

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

        <TextField
          {...register("confirmPassword")}
          type="password"
          label="Confirm Password"
          error={errors.confirmPassword?.message}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
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
              href="#"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-75"
            disabled={isSubmitting}
          >
            Sign up
          </button>
        </div>
      </form>
    </>
  );
}
