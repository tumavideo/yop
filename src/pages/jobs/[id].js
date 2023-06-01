import Header from "@/components/layout/Header";
import Form from "@/components/Form";

import { findOpportunities } from "@/lib/queries";
import { client, urlFor } from "@/lib/client";

export default function Job({ job }) {
  return (
    <>
      <Header />

      <div class="container mt-5">
        <h1>{job.title || job.position}</h1>

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
            <img
              style={{ maxWidth: "100%", maxHeight: 240 }}
              className="card-image p-3"
              src={urlFor(job.companyRef?.logo?.asset).url()}
              alt="govt-1"
            />
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
            <Form />
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
