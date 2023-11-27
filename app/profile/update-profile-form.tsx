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

const profileSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string().min(3).max(255),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function UpdateProfileForm({ user }: { user: User }) {
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();
  const [resume, setResume] = useState(null);
  const { id, email } = user || {};
  const {
    firstName = "",
    lastName = "",
    company = "",
    phone = "",
  } = user ? user?.user_metadata : {};

  // Upload file using standard upload
  async function uploadFile(file: File) {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("resumes")
      .upload(`${id}/${file.name}`, file, {
        cacheControl: "3600",
      });
    if (error) {
      router.refresh();
      console.log(error);
    } else {
      // Handle success
      setResume(data.path);
      showToast("Successfully uploaded resume", "");
    }
    setLoading(false);
  }

  // Upload file using standard upload
  async function removeFile() {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("resumes")
      .remove([resume]);
    if (error) {
      console.log(error);
      router.refresh();
    } else {
      setResume(null);
      showToast("File Removed", "");
    }
    setLoading(false);
  }
  async function handleCancel() {
    if (resume) await removeFile();
    router.refresh();
  }
  // Create a ref to the file input element
  const fileInputRef = useRef(null);

  // Function to open the file input dialog when the button is clicked
  const openFileInput = () => {
    fileInputRef?.current?.click();
  };

  // Function to handle file selection
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // You can perform actions with the selected file here
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
      const { data, error } = await supabase.storage.from("resumes").list(id, {
        limit: 100,
        offset: 0,
      });
      setResumes(() => {
        return data
          .sort((a, b) => {
            const aModified = new Date(a.created_at).getTime(); // Convert to milliseconds
            const bModified = new Date(b.created_at).getTime();
            return bModified - aModified;
          })
          .slice(0, 3);
      });
    };

    getResumes();

    return () => {};
  }, []);

  const downloadResume = async (fileName) => {
    const { data } = supabase.storage
      .from("resumes")
      .getPublicUrl(`${id}/${fileName}`, {
        download: true,
      });
    const url = data.publicUrl;
    window.open(url);
    console.log(data.publicUrl);
    // await supabase.auth.updateUser({
    //   data: {
    //     resume: url,
    //   },
    // });
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
        setResumes((prev) => {
          return [{ name: resume.split("/")[1] }, ...prev];
        });
        setResume(null);
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
                      href="#"
                      onClick={() => downloadResume(r.name)}
                      className="text-red-400 cursor-pointer"
                    >
                      {r.name}
                    </a>
                  </li>
                ))}
              </ul>
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
                    onClick={() => downloadResume(resume.split("/")[1])}
                  />
                  <label
                    htmlFor="file-upload"
                    className="hidden lg:flex relative  cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
                    onClick={() => downloadResume(resume.split("/")[1])}
                  >
                    <span className="text-ellipsis line-clamp-1">
                      {resume.split("/")[1]}
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
