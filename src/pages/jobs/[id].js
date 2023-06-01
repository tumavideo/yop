import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import { findOpportunities } from "@/lib/queries";
import { client } from "@/lib/client";

export default function Job({ job }) {
  return (
    <>
      <Header />

      <div class="container mt-5">
        <h1>Job Title</h1>

        <ul class="nav nav-tabs mt-4">
          <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="tab" href="#job-tab">
              Job
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#company-tab">
              Company
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="tab" href="#apply-tab">
              Apply
            </a>
          </li>
        </ul>

        <div class="tab-content mt-3">
          <div class="tab-pane fade show active" id="job-tab">
            {job.description && (
              <>
                <h3>Description</h3>
                <p>{job.description}</p>
              </>
            )}

            <h3>Experience</h3>
            <p>3+ years of relevant experience.</p>

            <h3>Great Fit</h3>
            <ul>
              <li>Strong problem-solving skills</li>
              <li>Excellent communication abilities</li>
              <li>Ability to work in a team</li>
            </ul>

            <h3>Nice to Haves</h3>
            <ul>
              <li>Experience with XYZ technology</li>
              <li>Knowledge of ABC framework</li>
            </ul>

            {job.qualifications && (
              <>
                <h3>Qualifications</h3>
                <p>{job.qualifications}</p>
              </>
            )}

            {job.responsibilities && (
              <>
                <h3>Responsibilities</h3>
                <p>{job.responsibilities}</p>
              </>
            )}
          </div>

          <div class="tab-pane fade" id="company-tab">
            <h3>{job.companyRef?.company}</h3>
            <p>{job.companyRef?.bio}</p>
            {job.link && (
              <p>
                Visit our website: <a href="#">www.example.com</a>
              </p>
            )}
          </div>

          <div class="tab-pane fade" id="apply-tab">
            <h3>Application Form</h3>
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="resume" class="form-label">
                  Resume
                </label>
                <input
                  type="file"
                  class="form-control"
                  id="resume"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const query = findOpportunities("30");
  const opportunities = await client.fetch(query);

  const job = opportunities.job.find((job) => job._id === id);

  return {
    props: { job },
  };
}
