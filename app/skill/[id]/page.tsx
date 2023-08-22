import Form from "@/components/Form";

import { client, urlFor } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";

export default async function Skill({ params: { id } }) {
  const query = findOpportunities("3000");
  const opportunities = await client.fetch(query);

  const skill = opportunities.skill.find((f) => f._id === id);

  return (
    <div className="container mt-5">
      <h1>{skill.title}</h1>

      <ul className="nav nav-tabs mt-4">
        <li className="nav-item">
          <a className="nav-link active" data-bs-toggle="tab" href="#job-tab">
            Skill
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-toggle="tab" href="#company-tab">
            Company
          </a>
        </li>
        {skill.enableApply && 
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#apply-tab">
              Apply
            </a>
          </li>
        }
      </ul>

      <div className="tab-content mt-3">
        <div className="tab-pane fade show active" id="job-tab">
          {skill.description && (
            <>
              <h3>Description</h3>
              <p dangerouslySetInnerHTML={{__html: skill.description.replace(/\n/g, "<br>")}}></p>
            </>
          )}

          {skill.responsibilities && (
            <>
              <h3>Responsibilities</h3>
              <p dangerouslySetInnerHTML={{__html: skill.responsibilities.replace(/\n/g, "<br>")}}></p>
            </>
          )}

          {skill.qualifications && (
            <>
              <h3>Qualifications</h3>
              <p dangerouslySetInnerHTML={{__html: skill.qualifications.replace(/\n/g, "<br>")}}></p>
            </>
          )}
        </div>

        <div className="tab-pane fade" id="company-tab">
          <img
            style={{ maxWidth: "100%", maxHeight: 240 }}
            className="card-image p-3"
            src={urlFor(skill.companyRef?.logo?.asset).url()}
            alt="govt-1"
          />
          <h3>{skill.companyRef?.company}</h3>
          <p>{skill.companyRef?.bio}</p>
          {skill.companyRef?.website && (
            <p>
              Visit our website: <a href={skill.companyRef?.website} target="_blank">{skill.companyRef?.website}</a>
            </p>
          )}
        </div>
        {skill.enableApply && 
          <div className="tab-pane fade" id="apply-tab">
            <h3>Application Form</h3>
            <Form />
          </div>
        }
      </div>
    </div>
  );
}
