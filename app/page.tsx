import axios from "axios";

import Carousel from "@/components/Carousel";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";

import CTA from "@/components/CTA";
import { client, urlFor } from "@/lib/client";
import { Database } from "@/lib/database.types";
import { findOpportunities } from "@/lib/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { BANNER_URL, PROGRAM_URL } from "./api";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const data = await client.fetch(findOpportunities(5));
  const { banner } = data;

  const [bannerData, programData] = await Promise.all([
    axios.get(BANNER_URL),
    axios.get(PROGRAM_URL(0)),
  ]).catch((error) => {
    return [];
  });

  const banners = bannerData?.data?.payload || [];
  const programs = programData?.data?.payload || [];

  return (
    <>
      <div className="mx-auto max-w-5xl bg-white">
        <Carousel
          slides={banners
            .map((b) => b.img)
            .concat(urlFor(banner[0].image?.asset).url())}
        />
      </div>
      <Hero showButtons={!session} />
      <CTA
        company={true}
        description="It’s time to showcase your opportunity. Start posting the  right opportunities to empower a brighter future."
      />
      {session && (
        <>
          {programs.slice(0, 1).map((program, index) => (
            <Feature flip={index % 2} program={program} />
          ))}
        </>
      )}
      {/* <CTA /> */}
      {session && (
        <>
          {programs.slice(2, 3).map((program, index) => (
            <Feature flip={1} program={program} />
          ))}
        </>
      )}
    </>
  );
}
