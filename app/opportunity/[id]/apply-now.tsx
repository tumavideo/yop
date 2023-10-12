"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import FailModal from "./fail-modal";
import ThanksModal from "./thanks-modal";

export const ApplyNow = ({ opp }) => {
  const supabase = createClientComponentClient();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFail, setSubmitFail] = useState(false);

  const applyForOpp = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user.user_metadata?.resume) {
      setSubmitFail(true);
      return;
    }

    const { error } = await supabase.from("application").insert({
      opportunity_id: opp._id,
      opportunity: opp.title,
      company_id: opp.companyRef?._id,
      company_name: opp.companyRef?.company,
      user_id: user.id,
      user_name: user.user_metadata?.firstName,
      resume: user.user_metadata?.resume,
    });

    if (!error) {
      setSubmitSuccess(true);
    }
  };

  const renderButton = () => (
    <>
      <div className="mt-10">
        <a
          className="px-5 py-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg cursor-pointer hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onClick={applyForOpp}
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply Now
        </a>
      </div>
    </>
  );

  const renderFail = () => <FailModal />;
  const renderThanks = () => <ThanksModal />;

  return (
    <>
      {submitSuccess
        ? renderThanks()
        : submitFail
        ? renderFail()
        : renderButton()}
    </>
  );
};
