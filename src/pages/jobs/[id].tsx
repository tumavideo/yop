import Header from "@/components/layout/Header";
import Form from "@/components/Form";

import { findOpportunities } from "@/lib/queries";
import { client, urlFor } from "@/lib/client";
import dayjs from "dayjs";

export default function Job({ job }) {
  return (
    <>
      <Header />

      <div className="container mt-5">
        <h1>{job.title || job.position}</h1>

        <ul className="nav nav-tabs mt-4">
          <li className="nav-item">
            <a className="nav-link active" data-bs-toggle="tab" href="#job-tab">
              Job
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#company-tab">
              Company
            </a>
          </li>
          {job.enableApply && 
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#apply-tab">
                Apply
              </a>
            </li>
          }
        </ul>

        <div className="tab-content mt-3">
          <div className="tab-pane fade show active" id="job-tab">
            {job.description && (
              <>
                <h3>Description</h3>
                <p>{job.description}</p>
              </>
            )}

            {job.qualifications && (
              <>
                <h3>Qualifications</h3>
                <p dangerouslySetInnerHTML={{__html: job.qualifications.replace(/\n/g, "<br>")}}></p>
              </>
            )}

            {job.experience && (
              <>
                <h3>Experience</h3>
                <p dangerouslySetInnerHTML={{__html: job.experience.replace(/\n/g, "<br>")}}></p>
              </>
            )}

            {job.responsibilities && (
              <>
                <h3>Responsibilities</h3>
                <p dangerouslySetInnerHTML={{__html: job.responsibilities.replace(/\n/g, "<br>")}}></p>
              </>
            )}


            {job.location && (
              <>
                <h3>Closing Date</h3>
                <p>{dayjs(job.closingDate).format("MMMM D, YYYY")}</p>
              </>
            )}

            {job.location && (
              <>
                <h3>Location</h3>
                <p>{job.location}</p>
              </>
            )}

            {job.link && (
              <p>
                <a className="btn btn-success text-white" href={job.link} target="_blank">Apply on company site</a>
              </p>
            )}
          </div>

          <div className="tab-pane fade" id="company-tab">
            <img
              style={{ maxWidth: "100%", maxHeight: 240 }}
              className="card-image p-3"
              src={urlFor(job.companyRef?.logo?.asset).url()}
              alt="govt-1"
            />
            <h3>{job.companyRef?.company}</h3>
            <p>{job.companyRef?.bio}</p>
            {job.companyRef?.website && (
              <p>
                Visit our website: <a href={job.link} target="_blank">{job.link}</a>
              </p>
            )}
          </div>

          {job.enableApply && 
            <div className="tab-pane fade" id="apply-tab">
              <h3>Application Form</h3>
              <Form />
            </div>
          }
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const query = findOpportunities("3000");
  const opportunities = await client.fetch(query);

  const job = opportunities.job.find((job) => job._id === id);

  return {
    props: { job },
  };
}
