import Feature from "@/components/Feature";
import Filters from "@/components/Filters";
import Nothing from "@/components/Nothing";
import Card from "@/components/Service";

import { filterByDepartment } from "@/constants";
import { client } from "@/lib/client";
import { Database } from "@/lib/database.types";
import { getServicesByCategory } from "@/lib/queries";

import Adsense from "@/components/Adsense";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { PROGRAM_URL } from "../api";

export default async function Services({ searchParams: { field } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const programs = (await axios.get(PROGRAM_URL(0))).data.payload.reverse();
  const services = await client.fetch(getServicesByCategory(field));

  return (
    <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <Adsense />
        {session ? (
          <>
            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row gap-y-6 justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                    ZamPortal Services
                  </h1>
                  <p className="mt-4 max-w-xl text-sm text-gray-700">
                    The ZamPortal is a public Governmental resource,
                    representing an electronic services directory that groups in
                    a single place all public services in Zambia, that are
                    provided to citizens in an electronic way, online.
                  </p>
                </div>
                <>
                  <a
                    className="px-5 py-3 max-h-16 text-xl font-medium flex items-center justify-center text-white bg-red-700 rounded-lg cursor-pointer hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                    href="/govt/64cd10aa1d8c0f081aa5e8b8"
                  >
                    LEARN how to use ZamPortal
                  </a>
                </>
              </div>
            </div>
            <Filters filters={filterByDepartment} />
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, idx) => (
                <Card key={idx} service={service} />
              ))}
            </ul>
          </>
        ) : (
          <>
            <Nothing />
          </>
        )}

        {session && (
          <>
            {programs.slice(0, 1).map((program, index) => (
              <Feature flip={1} program={program} />
            ))}
          </>
        )}
        {session && (
          <>
            {programs.slice(1, 2).map((program, index) => (
              <Feature flip={index % 2} program={program} />
            ))}
          </>
        )}
        {session && (
          <>
            {programs.slice(2, 3).map((program, index) => (
              <Feature flip={1} program={program} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
