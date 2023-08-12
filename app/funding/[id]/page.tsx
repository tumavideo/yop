import Form from "@/components/Form";

import { client, urlFor } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";

export default async function Funding({ params: { id } }) {
  const query = findOpportunities("3000");
  const opportunities = await client.fetch(query);

  const finance = opportunities.finance.find((f) => f._id === id);

  return (
    <div className="container mt-5">
      <h1>{finance.title}</h1>

      <ul className="nav nav-tabs mt-4">
        <li className="nav-item">
          <a className="nav-link active" data-bs-toggle="tab" href="#job-tab">
            Funding
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#company-tab">
            Company
          </a>
        </li>
        {finance.enableApply && 
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#apply-tab">
              Apply
            </a>
          </li>
        }
      </ul>

      <div className="tab-content mt-3">
        <div className="tab-pane fade show active" id="job-tab">
          {finance.description && (
            <>
              <h3>Description</h3>
              <p>{finance.description}</p>
            </>
          )}

          {finance.qualifications && (
            <>
              <h3>Qualifications</h3>
              <p>{finance.qualifications}</p>
            </>
          )}

          {finance.responsibilities && (
            <>
              <h3>Responsibilities</h3>
              <p>{finance.responsibilities}</p>
            </>
          )}
        </div>

        <div className="tab-pane fade" id="company-tab">
          <img
            style={{ maxWidth: "100%", maxHeight: 240 }}
            className="card-image p-3"
            src={urlFor(finance.companyRef?.logo?.asset).url()}
            alt="govt-1"
          />
          <h3>{finance.companyRef?.company}</h3>
          <p>{finance.companyRef?.bio}</p>
          {finance.companyRef?.website && (
            <p>
              Visit our website: <a href={finance.link} target="_blank">{finance.link}</a>
            </p>
          )}
        </div>

        {finance.enableApply && 
          <div className="tab-pane fade" id="apply-tab">
            <h3>Application Form</h3>
            <Form />
          </div>
        }
      </div>
    </div>
  );
}
