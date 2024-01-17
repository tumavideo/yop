import Feature from "@/components/Feature";
import Hero from "@/components/Hero";

import CTA from "@/components/CTA";
import { client } from "@/lib/client";
import { Database } from "@/lib/database.types";
import { getPrograms } from "@/lib/queries";
import { homeJsonLd } from "@/seo";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const programs = await client.fetch(getPrograms());

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("referral")
    .select(`referral_code`)
    .eq("user_id", user?.id)
    .single();

  return (
    <div className="bg-white">
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
        />
      </section>
      <Hero showButtons={!session} />
      {!session && (
        <div className="mx-auto max-w-7xl pb-0 md:pb-32">
          <CTA
            company={true}
            description="Discover a variety of opportunities from jobs, skills and funding avenues. It's all just one click away!"
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
