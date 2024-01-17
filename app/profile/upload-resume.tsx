"use client";

/* eslint-disable */
import { showToast } from "@/utils/toast";
import Uppy from "@uppy/core";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/file-input/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import { useMemo } from "react";
export default function UploadResume({ id, removeFile, addFile }) {
  const uppy = useMemo(() => {
    const uppyInstance = new Uppy({
      locale: {
        strings: {
          dropPasteFiles: "Upload your resume, %{browseFiles}",
        },
      },
      autoProceed: true,
      allowMultipleUploadBatches: false,
      debug: true,
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 1000000000,
        allowedFileTypes: [".pdf", ".doc", ".docx"],
      },
      onBeforeFileAdded: (currentFile, files) => {
        const modifiedFile = {
          ...currentFile,
          name: `${currentFile.name.replace(
            `.${currentFile.extension}`,
            ""
          )}_inlight_${Date.now()}.${currentFile.extension}`,
        };
        return modifiedFile;
      },
    });
    uppyInstance.use(Tus, {
      id: "uppy-tus",
      endpoint: `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/upload/resumable`,
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      chunkSize: 6 * 1024 * 1024,

      allowedMetaFields: [
        "bucketName",
        "objectName",
        "contentType",
        "cacheControl",
      ],
    });

    uppyInstance.on("file-added", (file) => {
      file.meta = {
        ...file.meta,
        bucketName: "resumes",
        objectName: id ? `${id}/${file.name}` : file.name,
        contentType: file.type,
      };
      addFile(file.meta?.objectName);
    });

    uppyInstance.on("complete", async (result) => {
      console.log("Resume from the result", result);
      if (result.successful) {
        showToast(
          "Upload complete!",
          `We’ve uploaded these files: ${result.successful[0].name}`
        );
      } else {
        showToast(
          "Upload failed!",
          `Failed to upload files: ${result.successful[0].name}`,
          "error"
        );
      }
    });
    uppyInstance.on("file-removed", (file, reason) => {
      if (reason === "removed-by-user") {
        removeFile(`${id}/${file.name}`);
      }
    });
    return uppyInstance;
  }, []);

  return (
    <>
      <div className="h-32 w-56 md:h-80 md:w-96 relative">
        <div className="absolute top-0 right-0 left-0 bottom-0 h-28 w-56 md:h-72 md:w-96 bg-slate-300 animate-pulse rounded-xl"></div>
        <Dashboard
          className="uploader w-56 md:w-96"
          uppy={uppy}
          showRemoveButtonAfterComplete
          doneButtonHandler={null}
          proudlyDisplayPoweredByUppy={false}
          metaFields={[{ id: "name", name: "Name", placeholder: "File name" }]}
        />
      </div>
    </>
  );
}
