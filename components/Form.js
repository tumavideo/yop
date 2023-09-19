'use client';

import axios from "axios";
import { useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function Form({ modal = false }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= MAX_FILE_SIZE) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
      setError("File size exceeds the limit.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progressPercentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressPercentage);
        },
      });

      if (response.status === 200) {
        setUploadSuccess(true);
      } else {
        setError("An error occurred during upload.");
      }
    } catch (error) {
      setError("An error occurred during upload.");
    }
  };

  const renderProgressBar = () => (
    <ProgressBar now={progress} label={`${progress}%`} />
  );

  const renderError = () => <div className="text-danger">{error}</div>;

  const renderForm = () => (
    <div className="modal-body">
      <form
        action="https://formspree.io/f/mgebbgda"
        method="POST"
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name:
          </label>
          <input
            className="form-control"
            type="text"
            name="firstName"
            placeholder="Your first name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name:
          </label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            placeholder="Your last name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number:
          </label>
          <input
            className="form-control"
            type="tel"
            name="phone"
            placeholder="Your phone number"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            placeholder="Your email address"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="about" className="form-label">
            About You:
          </label>
          <textarea
            className="form-control"
            name="about"
            id="about"
            rows="3"
            placeholder="Tell us about yourself"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="resume" className="form-label">
            Your resume (PDF, DOC, DOCX):
          </label>
          <input
            className="form-control"
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
        {error && renderError()}
        {progress > 0 && renderProgressBar()}
        <div className="modal-footer">
          {modal && (
            <button
              type="button"
              className="btn btn-secondary mx-3"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          )}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  const renderThanks = () => (
    <div>
      <h3>Thank you for your submission!</h3>
      <Button variant="primary" onClick={() => window.location.reload()}>
        Back
      </Button>
    </div>
  );

  return <>{uploadSuccess ? renderThanks() : renderForm()}</>;
}
