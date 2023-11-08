import Feature from "@/components/Feature";
import Hero from "@/components/Hero";

import CTA from "@/components/CTA";
import { client } from "@/lib/client";
import { Database } from "@/lib/database.types";
import { getPrograms } from "@/lib/queries";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { WebPage, WithContext } from "schema-dts";

const jsonLd: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "InLight Zambia | Government Programs, Jobs, Skills Development & Finance Opportunities",
  description:
    "Empower your future with InLight Zambia – Your gateway to discover government initiatives, job openings, skill-building resources, and financial opportunities in Zambia. Unleash your potential today!",
  url: "https://inlightzambia.com",
  image: "https://inlightzambia.com/_next/static/media/logo-c.4b129f3c.png",
  breadcrumb: [
    {
      "@type": "BreadcrumbList",
      "@id": "https://inlightzambia.com",
      url: "https://inlightzambia.com",
      name: "Home",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://inlightzambia.com/opportunities?type=job",
      name: "Jobs",
      url: "https://inlightzambia.com/opportunities?type=job",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://inlightzambia.com/opportunities?type=job",
      name: "About",
      url: "https://inlightzambia.com/about",
    },
  ],
};

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const programs = await client.fetch(getPrograms());

  return (
    <div className="bg-white">
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
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
