"use client";

import { Application } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import FailModal from "./fail-modal";
import ThanksModal from "./thanks-modal";
import ButtonText from "@/components/ButtonText";

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

    if (!user.user_metadata?.resume) {
      setErrorMessage([
        "Please go to your profile via the button below",
        "You need to upload an up-to-date version of your resume.",
      ]);
      setSubmitFail(true);
      return;
    }

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

      if (user.user_metadata?.applied > 2 && refCountData.length < 4 && !link) {
        setErrorMessage([
          "You have exceeded your limit for the day",
          "Consider signing up for a paid account.",
        ]);
        setSubmitFail(true);
        return;
      }
    } else {
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
          <ButtonText loading={loading} displayText={"Apply Now"} />
        </a>
      </div>
    </>
  );

  const renderFail = () => <FailModal error={errorMessage} />;

  const renderThanks = (link) => <ThanksModal link={link} />;

  return (
    <>
      {submitSuccess
        ? renderThanks(link)
        : submitFail
          ? renderFail()
          : renderButton()}
    </>
  );
};
