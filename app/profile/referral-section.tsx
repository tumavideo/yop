"use client";

import { Referral } from "@/lib/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function ReferralSection({ user }: { user: User }) {
  const supabase = createClientComponentClient();
  const [referralURL, setReferralURL] = useState(null);

  useEffect(() => {
    const getReferralURL = async () => {
      const {
        data: { referral_code },
        error,
      } = await supabase
        .from("referral")
        .select(`referral_code`)
        .eq("user_id", user?.id)
        .single();
      if (!error) {
        setReferralURL(
          `https://www.inlightzambia.com/register?ref=${referral_code}`
        );
      }
      if (!referral_code) {
        const newReferralCode = Math.random().toString(36).slice(2, 6);
        const {
          data: res,
          error: err,
          status,
        } = await supabase.from("referral").insert<Referral>({
          referral_code: referral_code.toUpperCase(),
          referrer_code: "",
          user_id: user.id,
        });
        setReferralURL(
          `https://www.inlightzambia.com/register?ref=${newReferralCode}`
        );
      }
    };
    getReferralURL();
    return () => {};
  }, [user]);

  return (
    <div className="">
      Referral :
      <p className="rounded-xl border-2 border-slate-900 bg-slate-100 w-65 px-3 py-2 cursor-pointer text-slate-700 hover:text-slate-500">
        {referralURL}
      </p>
    </div>
  );
}
