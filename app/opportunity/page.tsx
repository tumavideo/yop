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
import assets from "@/assets";
import Adsense from "@/components/Adsense";

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
      <div className="bg-white">
        <div className="container px-4 pb-20 mx-auto space-y-12 md:space-y-0 md:flex-row max-w-7xl">
          <div className="mb-5">
            <Adsense/>
          </div>
          <div className="mx-auto">
            <div className="flex my-auto">
              <img className="w-auto align-middle" src={assets.flag.src} alt="logo"/>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {type === "job" && "Jobs"}
                {type === "skill" && "Skills"}
                {type === "finance" && "Funding"}
                {type === "services" && "ZamPortal Services"}</h1>
            </div>
            {filterData.length > 0 && <Filters filters={filterByField} />}
            <ul
                role="list"
                className="grid grid-cols-1 mt-5 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {opportunities.map((project, index) => (
                  <Opportunity key={index} opp={project} />
              ))}
            </ul>
            {!session && (
                <div className="flex pt-10">
                  <a href="/register?type=seeker"
                     className="mx-auto justify-center border-black hover:border-green-600 border-2 hover:bg-green-600 rounded-md bg-white px-6 py-3 text-sm font-semibold leading-6 text-black shadow-sm hover:text-white"
                  >
                    Sign in to see more Opportunity
                  </a>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}
