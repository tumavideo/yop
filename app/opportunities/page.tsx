import Opportunity from "@/components/Opportunity";
import { client } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";
import Link from "next/link";

export default async function Job() {
  const query = findOpportunities();
  const opportunities = await client.fetch(query);

  return (
    <section id="opportunities">
      <div className="container">
        {opportunities.job.length > 0 && (
          <>
            <Opportunity title="Jobs" opps={opportunities.job} />

            <div className="d-flex justify-content-center">
              <Link
                href="/jobs"
                className="button btn-primary mt-5 align-items-center _button mb-5"
              >
                View More
              </Link>
            </div>
          </>
        )}
        {opportunities.finance.length > 0 && (
          <>
            <Opportunity
              title="Funding"
              opps={opportunities.finance}
              loan={true}
            />

            <div className="d-flex justify-content-center">
              <Link
                href="/funding"
                className="button btn-primary mt-5 align-items-center _button mb-5"
              >
                View More
              </Link>
            </div>
          </>
        )}
        {opportunities.skill.length > 0 && (
          <>
            <Opportunity
              title="Skills"
              opps={opportunities.skill}
              skill={true}
            />

            <div className="d-flex justify-content-center">
              <Link
                href="/skill"
                className="button btn-primary mt-5 align-items-center _button mb-5"
              >
                View More
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
