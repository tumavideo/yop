"use client";

import UploadResume from "@/app/profile/upload-resume";
import ButtonText from "@/components/ButtonText";
import { showToast } from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ReferralSection from "../profile/referral-section";

const onboardingSchema = z.object({
  resume: z.string(),
});
type ProfileValues = z.infer<typeof onboardingSchema>;

export default function OnboardingForm({
  user,
  referral,
}: {
  user: User;
  referral: any;
}) {
  const router = useRouter();
  const step = useSearchParams().get("step");
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  const { id = "" } = user;
  useEffect(() => {
    setLoading(false);
    if (step === "2") {
      setValue("resume", "");
    }
  }, [step]);
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(onboardingSchema),
  });

  const setResume = (resume) => {
    setValue("resume", resume);
  };

  async function removeFile(filePath) {
    const { error } = await supabase.storage.from("resumes").remove(filePath);
    if (error) {
      showToast("Error", error.message, "error");
    } else {
      reset();
      showToast("File Removed", "Please upload another file");
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-center pt-5 flex justify-center">
        <h3 className="text-xl font-bold md:text-3xl">
          {parseInt(step) === 1 ? "Upload a Resume" : "Congratulations"}
        </h3>
      </div>
      <div className="text-center flex justify-center">
        <h5 className="text-base text-slate-600 w-4/5 text-center  md:text-lg ">
          {parseInt(step) === 1
            ? `We want to fine tune your user experience, so in order to do so, we’ll need your latest and greatest resume`
            : `Thanks for joining Inlight Zambia. A new journey awaits! It would be wise to bring some friends and family along your new adventure.`}
        </h5>
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 m-8 md:m-4">
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2 pb-4">
          <form
            onSubmit={handleSubmit(async (formData: any) => {
              if (parseInt(step) === 2) {
                router.push("/profile");
                return;
              }

              setLoading(true);
              if (!formData?.resume) {
                showToast(
                  "Sorry 😥, please upload a resume",
                  "Please upload a resume",
                  "error"
                );
                return;
              }

              const userMetadata: any = {
                type: "seeker",
                resume: formData?.resume,
              };
              const { error } = await supabase.auth.updateUser({
                data: { ...userMetadata },
              });

              if (error) {
                showToast(
                  "Sorry 😥, an unexpected error",
                  error.message,
                  "error"
                );
              } else {
                showToast("Congrats", "Your profile is now up to date.");
                router.push(`/onboarding?step=2`);
              }
            })}
          >
            {step === "1" && (
              <div className="px-4 py-6 sm:p-2">
                {!loading && (
                  <div className="flex justify-center">
                    <UploadResume
                      id={id}
                      removeFile={removeFile}
                      addFile={setResume}
                    />
                  </div>
                )}
              </div>
            )}
            {loading && (
              <div className="flex justify-center text-center my-4">
                <svg
                  className="animate-spin h-6 w-6 text-red-400 inline-block align-stary m-4"
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
              </div>
            )}
            {step === "2" && (
              <div className="flex justify-center text-center py-4">
                <ReferralSection user={user} data={referral} />
              </div>
            )}

            <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              {!loading && (
                <button
                  type="submit"
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  disabled={isSubmitting}
                >
                  <ButtonText
                    displayText={step === "1" ? "Next" : "Finish"}
                    loading={loading}
                  />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
