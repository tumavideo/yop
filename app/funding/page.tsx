import Opportunity from "@/components/Opportunity";
import { client } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";

export default async function Funding() {
  const query = findOpportunities("3000");
  const opportunities = await client.fetch(query);
  const finance = opportunities.finance;

  return (
    <section id="opportunities">
      <div className="container">
        {finance.length > 0 && (
          <>
            <Opportunity title="Funding" opps={finance} loan={true} />
          </>
        )}
      </div>
    </section>
  );
}
