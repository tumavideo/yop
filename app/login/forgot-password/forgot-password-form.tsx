"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TextField } from "@/app/auth/input";
import type { Session } from "@supabase/auth-helpers-nextjs";
import ButtonText from "@/components/ButtonText";

const loginValueSchema = z.object({
  email: z.string().email(),
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
          const { email } = data;
          await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${location.origin}/account/update-password`,
          });
          router.replace("/login/thanks");
        })}
        className="space-y-6"
        noValidate
      >
        <TextField
          {...register("email")}
          label="Email address"
          error={errors.email?.message}
        />

        <div>
          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-75"
            disabled={isSubmitting}
          >
            <ButtonText displayText="Reset password" loading={isSubmitting} />
          </button>
        </div>
      </form>
    </>
  );
}
