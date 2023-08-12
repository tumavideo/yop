import Opportunity from "@/components/Opportunity";
import { client } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";

export default async function Skill() {
  const query = findOpportunities("3000");
  const opportunities = await client.fetch(query);
  const skill = opportunities.skill;

  return (
    <section id="opportunities">
      <div className="container">
        {skill.length > 0 && (
          <>
            <Opportunity title="Skills" opps={skill} skill={true} />
          </>
        )}
      </div>
    </section>
  );
}
