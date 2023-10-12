import Carousel from "@/components/Carousel";
import Feature from "@/components/Feature";
import Hero from "@/components/Hero";

import CTA from "@/components/CTA";
import { client, urlFor } from "@/lib/client";
import { Database } from "@/lib/database.types";
import { findOpportunities, getPrograms } from "@/lib/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const data = await client.fetch(findOpportunities(5));
  const programs = await client.fetch(getPrograms());
  const { banner } = data;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-5xl">
        <Carousel
          slides={banner.map((b) => urlFor(b.image?.asset)).reverse()}
        />
      </div>
      <Hero showButtons={!session} />

      {!session && (
        <div className="mx-auto max-w-7xl pb-0 md:pb-32">
          <CTA
            company={true}
            description="It’s time to showcase your opportunity. Start posting the  right opportunities to empower a brighter future."
          />
        </div>
      )}

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
    </div>
  );
}
