"use client";

import { showToast } from "@/utils/toast";
import {
  FolderArrowDownIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TextField } from "../auth/input";
import dayjs from "dayjs";

const profileSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string().min(3).max(255),
});

type ProfileValues = z.infer<typeof profileSchema>;

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

export interface Bucket {
  id: string;
  name: string;
  owner: string;
  file_size_limit?: number;
  allowed_mime_types?: string[];
  created_at: string;
  updated_at: string;
  public: boolean;
}

export interface FileObject {
  name: string;
  bucket_id?: string;
  owner?: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: Record<string, any>;
  buckets?: Bucket;
}

const displayName = (name: string) => {
  return name.split("/")[1];
};

type ResumeFileObject = FileObject;
export default function UpdateProfileForm({ user }: { user: User }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
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
  } = user ? user?.user_metadata : {};

  async function uploadFile(file: File) {
    setLoading(true);
    const r = dayjs().unix();
    const fileURL = `${id}/${file.name}_inlight_${r}`;
    const { data, error } = await supabase.storage
      .from("resumes")
      .upload(fileURL, file, {
        cacheControl: "3600",
      });
    if (error) {
      showToast(error.name || "Error", error.message, "error");
    } else {
      setResume(data.path);
      showToast("Successfully uploaded resume", "");
    }
    setLoading(false);
  }

  async function removeFile() {
    setLoading(true);
    const { error } = await supabase.storage.from("resumes").remove([resume]);
    if (error) {
      showToast("Error", error.message);
    } else {
      setResume(null);
      showToast("File Removed");
    }
    setLoading(false);
  }

  async function handleCancel() {
    if (resume) await removeFile();
    router.refresh();
  }

  const fileInputRef = useRef(null);

  const openFileInput = () => {
    fileInputRef?.current?.click();
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
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
        showToast(error.name || "Error", error.message, "error");
      }
      setLoadingResumes(false);
    };
    getResumes();
    return () => {};
  }, []);

  const downloadResume = async (fileName) => {
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
      showToast("Error", error, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(async (formData: any) => {
        const userMetadata: any = {
          firstName: formData?.firstName,
          lastName: formData?.lastName,
          email: formData?.email,
          phone: formData?.phone,
          type: "seeker",
        };
        resume && (userMetadata.resume = resume);
        const { data, error } = await supabase.auth.updateUser({
          email,
          data: {
            ...userMetadata,
          },
        });
        showToast("Successfully updated profile", "");
        if (resume) {
          setResumes((prev) => {
            const newFile: ResumeFileObject = {
              name: displayName(resume),
            };
            return [newFile, ...prev];
          });
          setResume(null);
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

          <div className="sm:col-span-4">
            <TextField
              {...register("email")}
              label="Email address"
              error={errors.email?.message}
              defaultValue={email}
            />
          </div>

          <div className="sm:col-span-4">
            <TextField
              {...register("phone")}
              label="Phone"
              error={errors.phone?.message}
              defaultValue={phone}
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-6 sm:p-8">
        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {resumes.length !== 0 && (
            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-4 ">
                My Resumes
              </label>
              <ul>
                {resumes.map((r) => (
                  <li className="p-4 border-2 border-dotted rounded-lg">
                    <a
                      href="#/"
                      onClick={() => downloadResume(r.name)}
                      className="text-red-400 cursor-pointer"
                    >
                      {r.name.split("_inlight_")[0]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {loadingResumes && (
            <div className="space-y-2 col-span-full flex-col-reverse">
              <div className="rounded-lg col-span-full p-3 animate-pulse h-8 bg-slate-200"></div>
              <div className="rounded-lg col-span-full p-3 animate-pulse h-8 bg-slate-200"></div>
              <div className="rounded-lg col-span-full p-3 animate-pulse h-8 bg-slate-200"></div>
            </div>
          )}
          <div className="col-span-full relative">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Resume
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              {!resume ? (
                <div id="drag-drop" className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />

                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className={`relative cursor-pointer rounded-md bg-white font-semibold  focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 ${
                        loading
                          ? "text-slate-300"
                          : "text-red-600 hover:text-red-500"
                      } focus-within:ring-offset-2 `}
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        disabled={loading}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PDF, DOCX up to 10MB
                  </p>
                </div>
              ) : (
                <div className="mt-2 flex justify-center space-x-4 rounded-lg px-6 py-10 items-center">
                  <FolderArrowDownIcon
                    height={100}
                    width={100}
                    className="cursor-pointer lg:hidden text-red-600 text-xl focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                    onClick={() => downloadResume(displayName(resume))}
                  />
                  <label
                    htmlFor="file-upload"
                    className="hidden lg:flex relative  cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                    onClick={() => downloadResume(displayName(resume))}
                  >
                    <span className="text-ellipsis line-clamp-1">
                      {displayName(resume).split("_inlight_")[0]}
                    </span>
                  </label>
                  <div
                    onClick={() => {
                      if (!loading) removeFile();
                    }}
                    className={`cursor-pointer text-lg font-bold ${
                      loading ? "text-grey-600" : "text-red-600"
                    } h-8 w-8 items-center flex rounded-full justify-center`}
                  >
                    <XMarkIcon />
                  </div>
                </div>
              )}
              {loading && (
                <div className="absolute top-12 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-red-500 to-pink-200 animate-spin">
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => handleCancel()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
