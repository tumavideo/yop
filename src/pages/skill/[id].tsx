import Header from "@/components/layout/Header";
import Form from "@/components/Form";

import { findOpportunities } from "@/lib/queries";
import { client, urlFor } from "@/lib/client";

export default function Skill({ skill }) {
  return (
    <>
      <Header />

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
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#apply-tab">
              Apply
            </a>
          </li>
        </ul>

        <div className="tab-content mt-3">
          <div className="tab-pane fade show active" id="job-tab">
            {skill.description && (
              <>
                <h3>Description</h3>
                <p>{skill.description}</p>
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

            {skill.qualifications && (
              <>
                <h3>Qualifications</h3>
                <p>{skill.qualifications}</p>
              </>
            )}

            {skill.responsibilities && (
              <>
                <h3>Responsibilities</h3>
                <p>{skill.responsibilities}</p>
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
            {skill.link && (
              <p>
                Visit our website: <a href="#">www.example.com</a>
              </p>
            )}
          </div>

          <div className="tab-pane fade" id="apply-tab">
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

  const skill = opportunities.skill.find((f) => f._id === id);

  return {
    props: { skill },
  };
}
