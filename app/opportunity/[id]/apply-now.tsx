"use client";

import { Application } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import FailModal from "./fail-modal";
import ThanksModal from "./thanks-modal";
import { CurrencyPoundIcon } from "@heroicons/react/20/solid";

export const ApplyNow = ({ opp, link = false }) => {
  const supabase = createClientComponentClient();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitFail, setSubmitFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  const applyForOpp = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (link) {
      window.location.assign(opp.link);
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: refData, error: refError } = await supabase
      .from("referral")
      .select(`referral_code`)
      .eq("user_id", user?.id)
      .single();

    if (!refError) {
      const { data: refCountData, error: refCountError } = await supabase
        .from("referral")
        .select("*")
        .eq("referrer_code", refData?.referral_code);
      if (refCountError) {
        console.error("Error fetching referral count:", refCountError);
        return;
      }

      if (!user.user_metadata?.resume) {
        setErrorMessage([
          "Please go to your profile via the button below",
          "You need to upload a up-to-date version of your resume.",
        ]);
        setSubmitFail(true);
        return;
      }

      if (user.user_metadata?.applied > 2 && refCountData.length < 4 && !link) {
        setErrorMessage([
          "You have exceeded your limit for the day",
          "Consider signing up for a paid account.",
        ]);
        setSubmitFail(true);
        return;
      }
    } else {
      console.log(refError);
    }
    try {
      const applied = user.user_metadata?.applied || 0;

      const { data, error } = await supabase.auth.updateUser({
        data: {
          applied: applied + 1,
        },
      });
    } catch (error) {
      console.log(error);
    }

    const { error } = await supabase.from("application").insert<Application>({
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
    setLoading(false);
  };

  const renderButton = () => (
    <>
      <div className="mt-10 w-20 whitespace-nowrap">
        <a
          className="whitespace-nowrap px-5 py-3 w-20 text-sm font-medium text-center text-white bg-red-700 rounded-lg cursor-pointer hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onClick={applyForOpp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {loading ? (
            <svg
              className="animate-spin h-4 w-4 text-white inline-block align-stary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : null}
          {loading ? (
            <span className="align-middle px-2">Loading...</span>
          ) : (
            "Apply Now"
          )}
        </a>
      </div>
    </>
  );

  const renderFail = () => <FailModal error={errorMessage} />;
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
