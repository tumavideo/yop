"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const ApplyNow = (opp) => {
  const supabase = createClientComponentClient();

  const applyForOpp = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("application").insert({
      id: opp._id,
      company_id: opp.companyRef?._id,
      user_id: user.id,
      resume: user.user_metadata?.resume,
    });
  };

  return (
    <>
      <div className="mt-10">
        <a
          className="px-5 py-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg cursor-pointer hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          href={opp.link}
          onClick={applyForOpp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply Now
        </a>
      </div>
    </>
  );
};
