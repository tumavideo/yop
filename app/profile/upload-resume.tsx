"use client";

/* eslint-disable */
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/file-input/dist/style.css";
import "@uppy/progress-bar/dist/style.css";
import { useMemo } from "react";
import { showToast } from "@/utils/toast";

export default function UploadResume({ id, removeFile, addFile }) {
  const uppy = useMemo(() => {
    const uppyInstance = new Uppy({
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

    uppyInstance.on("complete", (result) => {
      showToast(
        "Upload complete!",
        `We’ve uploaded these files: ${result.successful[0].name}`
      );
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
      {uppy && (
        <Dashboard
          className="sm:w-86"
          uppy={uppy}
          showRemoveButtonAfterComplete
          proudlyDisplayPoweredByUppy={false}
          metaFields={[{ id: "name", name: "Name", placeholder: "File name" }]}
        />
      )}
    </>
  );
}
