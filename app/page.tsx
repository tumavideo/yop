import Feature from "@/components/Feature";
import Hero from "@/components/Hero";

import assets from "@/assets";
import CTA from "@/components/CTA";
import ReferralModalTrigger from "@/components/ReferralModalTrigger";
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
      <div className="background-animate w-full  font-sans py-5 flex justify-center items-center space-x-2 bg-gradient-to-r from-orange-600 via-red-500 to-red-600">
        <h3 className="text-white font-semibold text-lg">
          🎄 12 days of Christmas Giveaway! 👉
        </h3>
        <ReferralModalTrigger session={session} data={data} user={user}>
          <button className="text-amber-900 px-3 py-2 font-bold font-mono rounded-full bg-amber-300 hover:bg-amber-400">
            Unlock!
          </button>
        </ReferralModalTrigger>
      </div>
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
        />
      </section>
      <Hero showButtons={!session} />
      <div className="overflow-hidden bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start">
            <div className={`px-6 lg:px-0 lg:pr-4 lg:pt-4 order-last`}>
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  12 Days of Christmas Giveaways!
                </h1>
                <div className="mt-6 text-lg leading-8 text-gray-600">
                  <p>
                    Starting on 12th December, InLight Zambia will be offering
                    12 days of giveaways! That’s 12 days of unlimited access to
                    opportunities, 12 days of insightful information shared by
                    our team, and a chance to win an InLight Zambia branded tie
                    dye shirt, followed by a K250 and K500 voucher to Shoprite.
                    The more you refer, the better chance you have at winning!
                  </p>
                  <p className="mt-4">
                    <strong>Entry Requirements:</strong>
                  </p>
                  <ul className="list-disc pl-6 mt-2">
                    <li>Sign Up on InLight Zambia and confirm your email.</li>
                    <li>
                      Navigate to your profile and upload a resume to access
                      your referral code.
                    </li>
                    <li>Refer friends!</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Closing Date:</strong> 24th December, 2023.
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                <a href="#/">
                  <img
                    src={assets.christmas.src}
                    alt="Christmas Banner"
                    width={500}
                    height={500}
                    className="bg-transparent -mb-12 max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
                  />
                </a>
              </div>
              <div
                className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
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
