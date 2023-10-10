"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TextField } from "@/app/auth/input";
import type { Session } from "@supabase/auth-helpers-nextjs";

const loginValueSchema = z.object({
  password: z.string().min(6).max(50),
});

type LoginValues = z.infer<typeof loginValueSchema>;

export default function UpdatePasswordForm({
  session,
}: {
  session: Session | null;
}) {
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
          const { password } = data;

          await supabase.auth.updateUser({ password: password });

          router.replace("/");
        })}
        className="space-y-6"
        noValidate
      >
        <TextField
          {...register("password")}
          type="password"
          label="Password"
          error={errors.password?.message}
        />

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-75"
            disabled={isSubmitting}
          >
            Reset password
          </button>
        </div>
      </form>
    </>
  );
}
