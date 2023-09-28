import Filters from "@/components/Filters";
import Nothing from "@/components/Nothing";
import Opportunity from "@/components/Opportunity";
import { filterByField } from "@/constants";
import { client } from "@/lib/client";
import { Database } from "@/lib/database.types";
import { findOpportunities } from "@/lib/queries";
import { compareArrays, unique } from "@/utils";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Opportunities({ searchParams: { field, type } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await client.fetch(findOpportunities(session ? 30 : 5));

  let filtered = [];
  let opportunities = [];

  if (field) {
    filtered = response["job"].filter((j) => j["field"] === field);
  }

  if (filtered.length === 0) {
    opportunities = [...response[type || "job"]];
  } else {
    opportunities = filtered;
  }

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

  filterByField[0].options = compareArrays(
      unique(response.fields),
      filterByField[0].options
  );

  return (
      <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <h1 className="text-6xl md:text-5xl py-5 font-bold tracking-tight text-gray-900">
              {type === "job" && "Jobs"}
              {type === "skill" && "Skills"}
              {type === "finance" && "Funding"}
              {type === "services" && "ZamPortal Services"}
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
                    backgroundColor="bg-blue-100"
                    color="bg-blue-600"
                    firstLine={`Want to see more ${type}s?`}
                />
              </>
          )}
        </div>
      </div>
  );
}
