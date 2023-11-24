"use client";

import { PhotoIcon } from "@heroicons/react/24/solid";
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
  const supabase = createClientComponentClient();

  const { id, email } = user || {};
  const {
    firstName = "",
    lastName = "",
    company = "",
    phone = "",
  } = user ? user?.user_metadata : {};

  // Upload file using standard upload
  async function uploadFile(file) {
    const { data, error } = await supabase.storage
      .from("resumes")
      .upload(`${id}/resume.pdf`, file, {
        cacheControl: "3600",
        upsert: true,
      });
    if (error) {
      // Handle error
      console.log(error);
    } else {
      // Handle success
      router.replace("/profile");
    }
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
        limit: 10,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });
      setResumes(data);
    };

    getResumes();

    return () => {};
  }, []);

  const downloadResume = async () => {
    const { data } = supabase.storage
      .from("resumes")
      .getPublicUrl(`${id}/resume.pdf`, {
        download: true,
      });
    const url = data.publicUrl;
    window.open(url);

    await supabase.auth.updateUser({
      data: {
        resume: url,
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(async (formData: any) => {
        const { firstName, lastName, email, phone, resume } = formData;
        const { data, error } = await supabase.auth.updateUser({
          email,
          data: {
            firstName,
            lastName,
            phone,
            resume,
            type: "seeker",
          },
        });
        router.refresh();
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
          <div className="col-span-full">
            <ul>
              {resumes.map((r) => (
                <li className="p-4 border-2 border-dotted rounded-lg">
                  <a
                    href="#"
                    onClick={downloadResume}
                    className="text-red-400 cursor-pointer"
                  >
                    {r.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Resume
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div id="drag-drop" className="text-center">
                <PhotoIcon
                  className="mx-auto h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500"
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
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PDF, DOCX up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
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
