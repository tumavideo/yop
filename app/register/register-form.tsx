"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Referral } from "@/lib/database.types";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { TextField } from "../auth/input";
import ButtonText from "@/components/ButtonText";

const signUpValueSchema = z
  .object({
    firstName: z.string().min(3).max(255),
    lastName: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpValues = z.infer<typeof signUpValueSchema>;
export default function RegisterForm({
  session,
  type,
}: {
  session: Session | null;
  type: string;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const searchParams = useSearchParams;
  const ref = searchParams().get("ref");

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

  return session ? (
    <button onClick={handleSignOut}>Sign out</button>
  ) : (
    <>
      <form
        onSubmit={handleSubmit(async (data: any) => {
          const { email, government, firstName, lastName, password } = data;
          const { data: response, error: signUpError } =
            await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `https://inlightzambia.com/auth/callback`,
                data: {
                  government,
                  firstName,
                  lastName,
                },
              },
            });
          if (!signUpError) {
            const {
              data: res,
              error: err,
              status,
            } = await supabase.from("referral").insert<Referral>({
              referral_code: Math.random()
                .toString(36)
                .slice(2, 6)
                .toUpperCase(),
              referrer_code: ref,
              user_id: response.user.id,
            });
          }

          router.replace("/register/thanks");
        })}
        className="space-y-6"
        noValidate
      >
        <TextField
          {...register("firstName")}
          label="First name"
          error={errors.firstName?.message}
        />
        <TextField
          {...register("lastName")}
          label="Last name"
          error={errors.lastName?.message}
        />
        <div>
          <label
            htmlFor="government"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {type === "company"
              ? "Is your organization part of government?"
              : "Are you part of government?"}
          </label>
          <select
            id="government"
            name="government"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="Canada"
          >
            <option selected value="">
              --Please choose an option--
            </option>
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
        <input type="hidden" name="persona" value={type} />
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
        <div className="flex items-center justify-between"></div>
        <div>
          <button
            type="submit"
            className="flex items-center w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-75"
            disabled={isSubmitting}
          >
            <ButtonText displayText={"Sign Up"} loading={isSubmitting} />
          </button>
        </div>
      </form>
    </>
  );
}
