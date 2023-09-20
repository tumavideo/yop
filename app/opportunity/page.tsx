import Filters from "@/components/Filters";
import Nothing from "@/components/Nothing";
import Opportunity from "@/components/Opportunity";
import { filterByField } from "@/constants";
import { client } from "@/lib/client";
import { Database } from "@/lib/database.types";
import { findOpportunities } from "@/lib/queries";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Opportunities({ searchParams: { type } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const category = type;
  const response = await client.fetch(findOpportunities(session ? 30 : 5));
  const opportunities = [...response[category]];

  const filterData = opportunities
    .map((j) => j.field)
    .filter((el) => el != null);

  if (opportunities.length === 0) {
    return (
      <section className="flexStart flex-col paddings py-28">
        <p className="no-result-text text-center">
          No opportunities found, please check back later.
        </p>
      </section>
    );
  }

  return (
    <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
          <h1 className="text-6xl md:text-5xl py-5 font-bold tracking-tight text-gray-900">
            {category === "job" && "Jobs"}
            {category === "skill" && "Skills"}
            {category === "finance" && "Funding"}
            {category === "services" && "ZamPortal Services"}
          </h1>
          <hr className="mb-3" />
        </div>
        {filterData.length > 0 && <Filters filters={filterByField} />}
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {opportunities.map((project, index) => (
            <Opportunity key={index} opp={project} />
          ))}
        </ul>
        {!session && (
          <>
            <Nothing
              color="bg-blue-600"
              firstLine={`Want to see more ${type}s?`}
            />
          </>
        )}
      </div>
    </div>
  );
}
