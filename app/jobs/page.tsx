import Opportunity from "@/components/Opportunity";
import { client } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";

export default async function Funding() {
  const query = findOpportunities("3000");
  const opportunities = await client.fetch(query);
  const jobs = opportunities.job;

  return (
    <section id="opportunities">
      <div className="container">
        {jobs.length > 0 && (
          <>
            <Opportunity title="Jobs" opps={jobs} />
          </>
        )}
      </div>
    </section>
  );
}
