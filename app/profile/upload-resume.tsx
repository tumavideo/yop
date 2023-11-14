"use client";

/* eslint-disable */
import Uppy from "@uppy/core";
import { Dashboard, FileInput, ProgressBar } from "@uppy/react";
import RemoteSources from "@uppy/remote-sources";
import Tus from "@uppy/tus";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/drag-drop/dist/style.css";
import "@uppy/file-input/dist/style.css";
import "@uppy/progress-bar/dist/style.css";

export default function UploadResume({ onUpload }) {
  const uppy = new Uppy({
    id: "uppy1",
    autoProceed: true,
    debug: true,
    onBeforeUpload(files) {
      onUpload(files);
    },
  })
    .use(Tus, { endpoint: "https://tusd.tusdemo.net/files/" })
    .use(RemoteSources, {
      companionUrl: "https://companion.uppy.io",
      sources: ["GoogleDrive", "Dropbox", "OneDrive", "Url"],
    });

  return (
    <div>
      <Dashboard
        uppy={uppy}
        plugins={["GoogleDrive"]}
        metaFields={[{ id: "name", name: "Name", placeholder: "File name" }]}
      />
      <div className="mb-4"></div>
      <ProgressBar uppy={uppy} hideAfterFinish={false} />
      <div className="mb-4"></div>
      <FileInput uppy={uppy} />
    </div>
  );
}
