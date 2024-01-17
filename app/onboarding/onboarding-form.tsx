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
                setLoading(true);
                return;
              }

              if (!formData?.resume) {
                showToast(
                  "Sorry 😥, please upload a resume",
                  "Please upload a resume",
                  "error"
                );
                return;
              }

              setLoading(true);
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
                {!loading ? (
                  <div className="flex justify-center">
                    <UploadResume
                      id={id}
                      removeFile={removeFile}
                      addFile={setResume}
                    />
                  </div>
                ) : (
                  <div className="flex justify-center">
                    <div className="h-32 w-56 md:h-80 md:w-96 relative">
                      <div className="absolute top-0 right-0 left-0 bottom-0 h-28 w-56 md:h-72 md:w-96 background-animate bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-xl"></div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {step === "2" && (
              <div className="flex justify-center text-center py-4">
                <ReferralSection user={user} data={referral} />
              </div>
            )}

            <div className="flex items-center justify-center gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="submit"
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                disabled={isSubmitting || loading}
              >
                <ButtonText
                  displayText={step === "1" ? "Next" : "Finish"}
                  loading={loading}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
