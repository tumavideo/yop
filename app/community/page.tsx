import Feature from "@/components/Feature";
import Filters from "@/components/Filters";
import Nothing from "@/components/Nothing";
import Card from "@/components/Service";
import YTEmbed from "@/components/YTEmbed";

import { filterByDepartment, testimonials } from "@/constants";
import { client } from "@/lib/client";
import { Database } from "@/lib/database.types";
import { getServicesByCategory } from "@/lib/queries";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { cookies } from "next/headers";
import { PROGRAM_URL } from "../api";

export default async function Govt({ searchParams: { category } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const programs = (await axios.get(PROGRAM_URL(0))).data.payload.reverse();
  const services = await client.fetch(getServicesByCategory(category));

  return (
    <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
          <YTEmbed testimonials={testimonials} />
        </div>
      </div>
    </div>
  );
}
