import Article from "@/components/Article";
import Feature from "@/components/Feature";
import Filters from "@/components/Filters";
import Nothing from "@/components/Nothing";
import Card from "@/components/Service";
import YTEmbed from "@/components/YTEmbed";

import { filterByDepartment, testimonials } from "@/constants";
import { client } from "@/lib/client";
import { getServicesByCategory } from "@/lib/queries";

import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { POST_URL, PROGRAM_URL, TESTIMONY_URL } from "../api";

export default async function Govt({ searchParams: { category } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const programs = (await axios.get(PROGRAM_URL(0))).data.payload.reverse();
  const posts = (await axios.get(POST_URL(0))).data.payload;
  const testimonies = (await axios.get(TESTIMONY_URL(0))).data.payload;
  const services = await client.fetch(getServicesByCategory(category));

  return (
    <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {!session ? (
          <>
            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
              <div className="flex">
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
                    className="px-5 py-3 text-xl font-medium flex items-center justify-center text-white bg-green-700 rounded-lg cursor-pointer hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
        <Feature key={0} flip={1} program={programs[1]} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          <YTEmbed testimonials={testimonials} />
        </div>
        <Feature key={1} flip={0} program={programs[2]} />
      </div>
    </div>
  );
}
