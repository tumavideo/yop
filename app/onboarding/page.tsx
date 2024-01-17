import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import OnboardingForm from "./onboarding-form";

export default async function Profile() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: referral, error } = await supabase
    .from("referral")
    .select("referral_code")
    .eq("user_id", user?.id)
    .single();

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-4 sm:px-6 sm:py-2 lg:px-8">
        <OnboardingForm user={user} referral={referral} />
      </div>
    </div>
  );
}
