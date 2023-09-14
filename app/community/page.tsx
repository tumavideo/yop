import Article from "@/components/Article";
import Feature from "@/components/Feature";
import Filters from "@/components/Filters";
import Nothing from "@/components/Nothing";
import Card from "@/components/Service";
import YTEmbed from "@/components/YTEmbed";

import { testimonials } from "@/constants";
import { client } from "@/lib/client";
import { Database } from "@/lib/database.types";
import { getServices } from "@/lib/queries";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { POST_URL, PROGRAM_URL, TESTIMONY_URL } from "../api";

export default async function Govt() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const programs = (await axios.get(PROGRAM_URL(0))).data.payload;
  const posts = (await axios.get(POST_URL(0))).data.payload;
  const testimonies = (await axios.get(TESTIMONY_URL(0))).data.payload;
  const services = await client.fetch(getServices(20));

  return (
    <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        {programs.map((program, index) => (
          <Feature flip={index % 2} index={index} program={program} />
        ))}
        {!session ? (
          <>
            <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                ZamPortal Services
              </h1>
              <p className="mt-4 max-w-xl text-sm text-gray-700">
                The ZamPortal is a public Governmental resource, representing an
                electronic services directory that groups in a single place all
                public services in Zambia, that are provided to citizens in an
                electronic way, online.
              </p>
            </div>
            <Filters handleOnChange={false} />
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card service={service} />
              ))}
            </ul>
          </>
        ) : (
          <>
            <Nothing />
          </>
        )}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          <YTEmbed testimonials={testimonials} />
        </div>
        <Article />
      </div>
    </div>
  );
}
