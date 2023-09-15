"use client";

import { client } from "@/lib/client";
import { findOpportunities } from "@/lib/queries";

import Filters from "@/components/Filters";
import ListItem from "@/components/ListItem";
import Opportunity from "@/components/Opportunity";
import { filterByField } from "@/constants";
import { useState } from "react";

export default async function Funding({ searchParams: { type } }) {
  const [listType, setListType] = useState("list");
  const [checkedState, setCheckedState] = useState(
    new Array(filterByField[0].options.length).fill(false)
  );

  const category = type;
  const response = await client.fetch(findOpportunities(30));
  const opportunities = [...response[category]];

  const filterData = opportunities
    .map((j) => j.field)
    .filter((el) => el != null);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

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
          {opportunities.map((project, index) =>
            listType === "grid" ? (
              <ListItem project={project} />
            ) : (
              // <Card opp={project} />
              <Opportunity key={index} opp={project} />
            )
          )}
        </ul>
      </div>
    </div>
  );
}
