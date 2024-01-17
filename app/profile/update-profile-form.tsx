"use client";

import ButtonText from "@/components/ButtonText";
import Form from "@/components/form/Form";
import { FileObject } from "@/lib/database.types";
import { inputs } from "@/utils/inputs";
import { showToast } from "@/utils/toast";
import { DocumentIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextField } from "../auth/input";
import UploadResume from "./upload-resume";

const phoneRegex = new RegExp(/^(\+?26)?0[79][567]\d{7}$/);
const profileSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z
    .string()
    .regex(
      phoneRegex,
      "Please enter a valid zambian phone number (MTN, Airtel, Zamtel)"
    ),
});

type ProfileValues = z.infer<typeof profileSchema>;

type ResumeFileObject = FileObject;

export default function UpdateProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [values, setValues] = useState<{
    occupation: string;
    industry: string;
    howHelp: string;
  }>(null);

  const [loading, setLoading] = useState(null);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [resumes, setResumes] = useState<ResumeFileObject[]>([]);
  const [resume, setResume] = useState<string>(null);

  const supabase = createClientComponentClient();

  const { id, email } = user || {};
  const {
    firstName = "",
    lastName = "",
    company = "",
    phone = "",
    occupation = "",
    industry = "",
    howHelp = "",
  } = user ? user?.user_metadata : {};

  const onChange = (e) => {
    setValues((prevValues: any | null) => {
      if (prevValues) return { ...prevValues, [e.target.name]: e.target.value };
      else return { [e.target.name]: e.target.value };
    });
  };

  async function removeFile(filePath) {
    const { error } = await supabase.storage.from("resumes").remove(filePath);
    if (error) {
      showToast("Error", error.message, "error");
    } else {
      setResume(null);
      showToast("File Removed", "Please upload another file");
    }
  }

  async function handleCancel() {
    if (resume) await removeFile(resume);
    location.reload();
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    setValues({
      occupation,
      industry,
      howHelp,
    });

    const getResumes = async () => {
      setLoadingResumes(true);
      const { data, error } = await supabase.storage.from("resumes").list(id, {
        limit: 100,
        offset: 0,
      });
      if (!error) {
        setResumes(() => {
          return data
            .sort((a, b) => {
              const aModified = new Date(a.created_at).getTime();
              const bModified = new Date(b.created_at).getTime();
              return bModified - aModified;
            })
            .slice(0, 3);
        });
      } else {
        showToast(
          "Something happened while fetching your resumes",
          error.message,
          "error"
        );
      }
      setLoadingResumes(false);
    };
    getResumes();
    return () => {};
  }, []);

  const downloadResume = async (fileName: string) => {
    setLoading({ state: true, resume: fileName });
    try {
      const { data } = await supabase.storage
        .from("resumes")
        .getPublicUrl(`${id}/${fileName}`, {
          download: true,
        });
      const response = await fetch(data.publicUrl);
      const blob = await response.blob();
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = fileName;
      downloadLink.click();
    } catch (error) {
      showToast("Couldn't download the file", error, "error");
    } finally {
      setLoading(null);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(async (formData: any) => {
          const userMetadata: any = {
            firstName: formData?.firstName,
            lastName: formData?.lastName,
            email: formData?.email,
            phone: formData?.phone,
            type: "seeker",
            occupation: values?.occupation,
            industry: values?.industry,
            howHelp: values?.howHelp,
          };
          resume && (userMetadata.resume = resume);
          const { error } = await supabase.auth.updateUser({
            email,
            data: { ...userMetadata },
          });
          if (error) {
            showToast("Sorry 😥, an unexpected error", error.message, "error");
          } else {
            showToast("Congrats", "Your profile is now up to date.");
            location.reload();
          }
        })}
      >
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <TextField
                {...register("firstName")}
                label="First name"
                error={errors.firstName?.message}
                defaultValue={firstName}
              />
            </div>

            <div className="sm:col-span-3">
              <TextField
                {...register("lastName")}
                label="Last name"
                error={errors.lastName?.message}
                defaultValue={lastName}
              />
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-8">
            <div className="sm:col-span-3">
              <TextField
                {...register("email")}
                label="Email address"
                error={errors.email?.message}
                defaultValue={email}
              />
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-8">
            <div className="sm:col-span-3">
              <TextField
                {...register("phone")}
                label="Phone"
                error={errors.phone?.message}
                defaultValue={phone}
              />
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-8">
            <div className="sm:col-span-12">
              <label className="block text-sm font-medium leading-6 text-gray-900 muted">
                Tell us a bit more about yourself
              </label>
              {values ? (
                <Form
                  inputs={inputs.help}
                  values={values}
                  onChange={onChange}
                />
              ) : (
                <>
                  <div className="mt-4 space-y-2 col-span-full flex-col-reverse">
                    <div className="rounded-lg col-span-6 p-3 animate-pulse h-8 bg-slate-200"></div>
                    <div className="rounded-lg col-span-6 p-3 animate-pulse h-8 bg-slate-200"></div>
                    <div className="rounded-lg col-span-full p-3 animate-pulse h-16 bg-slate-200"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-6 sm:p-8">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            My Resumes
          </label>
          <div className="mt-4 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="block col-span-6">
              <ul className="space-y-2 ">
                {resumes.map((r) => (
                  <li
                    key={r.name}
                    className="py-2 px-4 border-2 border-dotted rounded-lg"
                  >
                    <a
                      href="#/"
                      onClick={() => downloadResume(r.name)}
                      className="text-red-400 cursor-pointer leading-tight"
                    >
                      <div className="flex justify-start lg:justify-between px-2 items-center w-full">
                        <span className="flex justify-start space-x-6 md:space-x-0 text-ellipsis line-clamp-1">
                          <DocumentIcon className="h-6 w-6 mr-4 flex-shrink-0" />
                          {r.name.split("_inlight_")[0]}
                        </span>
                        <span className="hidden lg:flex items-center text-white text-center bg-red-500 w-36 px-1 py-2 rounded-md justify-center space-x-6 md:space-x-0 text-ellipsis line-clamp-1">
                          <ButtonText
                            displayText="Download"
                            loading={loading && loading?.resume === r.name}
                          />
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {loadingResumes && (
              <div className="space-y-2 col-span-full flex-col-reverse">
                <div className="rounded-lg col-span-full p-3 animate-pulse h-8 bg-slate-200"></div>
                <div className="rounded-lg col-span-full p-3 animate-pulse h-8 bg-slate-200"></div>
                <div className="rounded-lg col-span-full p-3 animate-pulse h-8 bg-slate-200"></div>
              </div>
            )}
          </div>
          <div className="mt-4 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Resume (Upload a file or drag and drop)
              </label>
              <p className="text-xs leading-5 text-gray-600 mb-4">
                PDF, DOCX up to 10MB
              </p>
              <div className="flex justify-center">
                <UploadResume
                  id={id}
                  removeFile={removeFile}
                  addFile={setResume}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            disabled={isSubmitting}
          >
            <ButtonText displayText="Save" loading={isSubmitting} />
          </button>
        </div>
      </form>
    </>
  );
}
