import Header from "@/components/layout/Header";
import Form from "@/components/Form";

import { findJobById } from "@/lib/queries";
import { client, urlFor } from "@/lib/client";
import dayjs from "dayjs";
import ReactGA from "react-ga";

const TRACKING_ID = process.env.GA; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

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
                <p dangerouslySetInnerHTML={{__html: job.description.replace(/\n/g, "<br>")}}></p>
              </>
            )}

            {job.responsibilities && (
              <>
                <h3>Responsibilities</h3>
                <p dangerouslySetInnerHTML={{__html: job.responsibilities.replace(/\n/g, "<br>")}}></p>
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
                <h3>Experience and Competencies</h3>
                <p dangerouslySetInnerHTML={{__html: job.experience.replace(/\n/g, "<br>")}}></p>
              </>
            )}

            {job.closingDate && (
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
                <a className="btn btn-success text-white"
                   href={job.link}
                   onClick={() =>
                     ReactGA.event({
                       category: "Job Apply",
                       action: job._id,
                       label: job.title,
                     })
                   }
                   target="_blank">Apply on company site</a>
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
                Visit our website: <a href={job.companyRef?.website} target="_blank">{job.companyRef?.website}</a>
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

  const query = findJobById(id);
  const { job } = await client.fetch(query);  

  return {
    props: { job },
  };
}
