import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UpdateProfile from "./update-profile-form";

export default async function Profile() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: { referral_code },
  } = await supabase
    .from("referral")
    .select(`referral_code`)
    .eq("user_id", user?.id)
    .single();

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="space-y-10 divide-y divide-gray-900/10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
            <div className="px-4 sm:px-0">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Creating a profile is free and easy.
              </p>
            </div>
            <UpdateProfile user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
